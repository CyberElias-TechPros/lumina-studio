package ng.cea.nativeapp

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.NonCancellable
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.*
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone
import javax.net.ssl.HttpsURLConnection

@Serializable data class NativeUser(val id: String, val name: String, val email: String, val roleKey: String, val permissions: List<String> = emptyList())
data class NativeSession(val user: NativeUser? = null, val mfaRequired: Boolean = false, val expiresAt: Long = 0, val remembered: Boolean = false)
class AuthFailure(val status: Int) : Exception("Native API request failed")
data class AuthReply(val status: Int, val body: String, val cookies: List<String> = emptyList()) {
    override fun toString() = "AuthReply(status=$status, content=[redacted])"
}
interface AuthTransport {
    suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply

    /** Binary PUT to a presigned/proxied upload object. Default: unsupported. */
    suspend fun upload(path: String, contentType: String, bytes: ByteArray, token: String?): AuthReply =
        throw UnsupportedOperationException("Binary uploads are not supported by this transport")
}

private const val API_BASE = "https://cea-api.cyber-e54.workers.dev/v1/"

/** Fixed API only; no browser cookie jar, redirects, response cache or credential logging. */
class HttpsAuthTransport : AuthTransport {
    override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply = withContext(Dispatchers.IO) {
        val idPart = "[a-zA-Z0-9_-]{1,120}"
        val cursorPart = "[a-zA-Z0-9_-]{1,200}"
        val refPart = "CEA-[0-9]{4}-[A-Z0-9]{6}"
        val slugPart = "[a-zA-Z0-9_-]{1,80}"
        val codePart = "[A-Za-z0-9-]{8,64}"
        val portalPart = "[a-z-]{1,40}"
        val collPart = "[a-zA-Z]{1,40}"

        val authCore = path in setOf(
            "sign-in", "sign-up", "forgot-password", "reset-password",
            "mfa/verify", "session", "refresh", "sign-out", "devices",
        )
        val authDeviceRevoke = path.matches(Regex("devices/$idPart/revoke"))
        val auth = authCore || authDeviceRevoke

        val accountGet = path == "account"
        val accountPost = path in setOf("account/password", "account/verify-email/send", "account/verify-email", "account/delete")
        val studentDashboard = path == "dashboard/student"
        val completion = path.matches(Regex("courses/$idPart/lessons/$idPart/complete"))
        val assignmentList = path == "assignments" || path.matches(Regex("assignments\\?cursor=$cursorPart"))
        val assignmentDetail = path.matches(Regex("assignments/$idPart"))
        val assignmentSubmission = path.matches(Regex("assignments/$idPart/submission"))
        val assignmentSubmit = path.matches(Regex("assignments/$idPart/submit"))
        val assessmentList = path == "assessments" || path.matches(Regex("assessments\\?cursor=$cursorPart"))
        val assessmentDetail = path.matches(Regex("assessments/$idPart"))
        val assessmentSubmit = path.matches(Regex("assessments/$idPart/submit"))

        val instructorCourses = path == "instructor/courses"
        val instructorList = path == "instructor/assignments" || path.matches(Regex("instructor/assignments\\?cursor=$cursorPart"))
        val instructorDetail = path.matches(Regex("instructor/assignments/$idPart"))
        val instructorGrade = path.matches(Regex("instructor/submissions/$idPart/grade"))

        val messageList = path == "messages/threads" || path.matches(Regex("messages/threads\\?cursor=$cursorPart"))
        val messageDetail = path.matches(Regex("messages/threads/$idPart"))
        val messageSend = path.matches(Regex("messages/threads/$idPart/messages"))

        val notificationList = path == "notifications" || path.matches(Regex("notifications\\?cursor=$cursorPart"))
        val notificationRead = path.matches(Regex("notifications/$idPart/read")) || path == "notifications/read-all"
        val notificationUnread = path == "notifications/unread-count"

        val enrollmentCreate = path == "enrollments"
        val enrollmentMine = path == "enrollments/mine"
        val enrollmentDetail = path.matches(Regex("enrollments/$refPart"))
        val enrollmentOfferAccept = path.matches(Regex("enrollments/$refPart/offer/accept"))
        val enrollmentTransfer = path.matches(Regex("enrollments/$refPart/payments/transfer"))
        val enrollmentReceipt = path.matches(Regex("enrollments/$refPart/receipt"))
        val staffEnrollments = path == "enrollments/admin"
        val paymentProofs = path == "enrollments/payment-proofs"
        val paymentProofDecision = path.matches(Regex("enrollments/payment-proofs/$idPart/(confirm|reject)"))

        // Learning engine
        val courseList = path == "courses" || path.matches(Regex("courses\\?cursor=$cursorPart"))
        val courseGradebook = path == "courses/gradebook" || path.matches(Regex("courses/gradebook\\?cursor=$cursorPart"))
        val courseDetail = path.matches(Regex("courses/$slugPart"))
        val calendarEvents = path == "calendar/events" || path.matches(Regex("calendar/events\\?cursor=$cursorPart"))
        val certificatesMine = path == "certificates/mine"
        val certificateVerify = path.matches(Regex("certificates/verify\\?code=$codePart"))
        val attendanceCheckIn = path == "attendance/check-in"
        // Live classes; chat path is dual-use (GET history, POST message)
        val liveList = path == "live/classes" || path.matches(Regex("live/classes\\?cursor=$cursorPart"))
        val liveDetail = path.matches(Regex("live/classes/$idPart"))
        val liveChat = path.matches(Regex("live/classes/$idPart/chat")) || path.matches(Regex("live/classes/$idPart/chat\\?cursor=$cursorPart"))
        // Community (cohorts + library catalog are public)
        val cohortsList = path == "cohorts" || path.matches(Regex("cohorts\\?program=$slugPart"))
        val cohortsNext = path == "cohorts/next" || path.matches(Regex("cohorts/next\\?program=$slugPart"))
        val libraryCatalog = path == "library/catalog" || path.matches(Regex("library/catalog\\?cursor=$cursorPart"))
        val libraryList = path == "library" || path.matches(Regex("library\\?cursor=$cursorPart"))
        val libraryDetail = path.matches(Regex("library/$idPart"))
        // Career engine
        val mentorProfiles = path == "mentor/profiles" || path.matches(Regex("mentor/profiles\\?cursor=$cursorPart"))
        val mentorRequest = path == "mentor/requests"
        val mentorMatch = path == "mentor/match"
        val jobPostings = path == "recruitment/postings" || path.matches(Regex("recruitment/postings\\?cursor=$cursorPart"))
        val jobTalent = path == "recruitment/talent" || path.matches(Regex("recruitment/talent\\?cursor=$cursorPart"))
        val jobInterviews = path == "recruitment/interviews" || path.matches(Regex("recruitment/interviews\\?cursor=$cursorPart"))
        // Money & portal
        val paymentHistory = path == "payments/history" || path.matches(Regex("payments/history\\?cursor=$cursorPart"))
        val portalSummary = path == "portal/summary" || path.matches(Regex("portal/summary\\?portal=$portalPart"))
        // AI tutor (authenticated)
        val aiAsk = path == "ai/ask"
        val aiRecommendations = path == "ai/recommendations"
        // Public digital shop catalog
        val shopCatalog = path == "shop/catalog"
        // Online tuition payment start/status for an enrollment
        val enrollmentPaymentStart = path.matches(Regex("enrollments/$refPart/payments"))
        val enrollmentPaymentVerify = path.matches(Regex("enrollments/$refPart/payments/verify"))
        // Resumable file upload: presign metadata, then binary PUT via upload()
        val uploadsPresign = path == "uploads/presign"
        // Live class polls
        val livePolls = path.matches(Regex("live/classes/$idPart/polls")) || path.matches(Regex("live/classes/$idPart/polls\\?cursor=$cursorPart"))
        val livePollVote = path.matches(Regex("live/classes/$idPart/polls/$idPart/vote"))
        // Instructor attendance session creation
        val attendanceSession = path == "attendance/sessions"
        // Student self dashboard collections (projects, records, ...)
        val ssdList = path.matches(Regex("student-self-dashboard/$collPart")) || path.matches(Regex("student-self-dashboard/$collPart\\?cursor=$cursorPart"))
        val ssdProjectsPost = path == "student-self-dashboard/projects"
        // Public cohort calendar file
        val cohortIcs = path.matches(Regex("cohorts/$idPart/ics"))

        val allowed =
            auth || accountGet || accountPost || studentDashboard || completion ||
                assignmentList || assignmentDetail || assignmentSubmission || assignmentSubmit ||
                assessmentList || assessmentDetail || assessmentSubmit ||
                instructorCourses || instructorList || instructorDetail || instructorGrade ||
                messageList || messageDetail || messageSend ||
                notificationList || notificationRead || notificationUnread ||
                enrollmentCreate || enrollmentMine || enrollmentDetail ||
                enrollmentOfferAccept || enrollmentTransfer || enrollmentReceipt ||
                staffEnrollments || paymentProofs || paymentProofDecision ||
                courseList || courseGradebook || courseDetail || calendarEvents ||
                certificatesMine || certificateVerify || attendanceCheckIn ||
                liveList || liveDetail || liveChat ||
                cohortsList || cohortsNext || libraryCatalog || libraryList || libraryDetail ||
                mentorProfiles || mentorRequest || mentorMatch ||
                jobPostings || jobTalent || jobInterviews ||
                paymentHistory || portalSummary || aiAsk || aiRecommendations || shopCatalog ||
                enrollmentPaymentStart || enrollmentPaymentVerify || uploadsPresign ||
                livePolls || livePollVote || attendanceSession || ssdList || ssdProjectsPost || cohortIcs
        require(allowed)

        val isGet =
            path == "session" || path == "devices" || accountGet || studentDashboard ||
                assignmentList || assignmentDetail || assignmentSubmission ||
                assessmentList || assessmentDetail ||
                instructorCourses || instructorList || instructorDetail ||
                messageList || messageDetail || notificationList || notificationUnread ||
                enrollmentMine || enrollmentDetail || enrollmentReceipt ||
                staffEnrollments || paymentProofs ||
                courseList || courseGradebook || courseDetail || calendarEvents ||
                certificatesMine || certificateVerify ||
                liveList || liveDetail ||
                cohortsList || cohortsNext || libraryCatalog || libraryList || libraryDetail ||
                mentorProfiles || jobPostings || jobTalent || jobInterviews ||
                paymentHistory || portalSummary || aiRecommendations || shopCatalog
        // live chat intentionally serves both GET (history) and POST (send) on one path.
        require(isGet == (body == null) || liveChat)

        val route = if (auth) "auth/$path" else path
        val connection = URL("https://cea-api.cyber-e54.workers.dev/v1/$route").openConnection() as HttpsURLConnection
        try {
            connection.instanceFollowRedirects = false
            connection.useCaches = false
            connection.connectTimeout = 10000
            connection.readTimeout = 10000
            connection.requestMethod = if (body == null) "GET" else "POST"
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("Cache-Control", "no-store")
            connection.setRequestProperty("User-Agent", "CEA-Native-Android/0.7")
            if (token != null) connection.setRequestProperty("Authorization", "Bearer $token")
            if (body != null) {
                connection.doOutput = true
                connection.setRequestProperty("Content-Type", "application/json")
                connection.outputStream.use { it.write(body.toString().toByteArray(Charsets.UTF_8)) }
            }
            currentCoroutineContext().ensureActive()
            val status = connection.responseCode
            // Do not reflect arbitrary server error bodies into UI or logs.
            if (status !in 200..299) return@withContext AuthReply(status, "")
            val maxBytes = when {
                studentDashboard -> 2 * 1024 * 1024
                assignmentList || assessmentList || instructorList || instructorCourses ||
                    messageList || notificationList || staffEnrollments || paymentProofs ||
                    courseList || calendarEvents || liveList || liveChat || libraryList || libraryCatalog ||
                    mentorProfiles || jobPostings || jobTalent || jobInterviews || shopCatalog -> 512 * 1024
                courseGradebook || courseDetail || certificatesMine || liveDetail ||
                    cohortsList || cohortsNext || paymentHistory || portalSummary || aiAsk || aiRecommendations -> 256 * 1024
                assignmentDetail || assignmentSubmission || assessmentDetail || instructorDetail ||
                    messageDetail || enrollmentDetail || enrollmentReceipt || libraryDetail -> 128 * 1024
                certificateVerify || attendanceCheckIn || notificationUnread ||
                    enrollmentPaymentStart || enrollmentPaymentVerify || uploadsPresign ||
                    attendanceSession || cohortIcs -> 16 * 1024
                livePolls -> 128 * 1024
                ssdList -> 256 * 1024
                else -> 65536
            }
            val deadline = System.nanoTime() + 20_000_000_000L
            val response = connection.inputStream.use { input ->
                val output = java.io.ByteArrayOutputStream()
                val buffer = ByteArray(4096)
                while (true) {
                    currentCoroutineContext().ensureActive()
                    check(System.nanoTime() < deadline)
                    val count = input.read(buffer)
                    if (count < 0) break
                    check(output.size() + count <= maxBytes)
                    output.write(buffer, 0, count)
                }
                output.toString("UTF-8")
            }
            AuthReply(status, response, connection.headerFields.filterKeys { it?.equals("Set-Cookie", true) == true }.values.flatten())
        } finally { connection.disconnect() }
    }
}

/** Calls are serialized by the ViewModel. Optional storage holds only an encrypted verified
 * credential, never identity, permissions, passwords, MFA codes or private learning content. */
class NativeAuthClient(
    private val transport: AuthTransport = HttpsAuthTransport(),
    private val store: SessionStore = MemorySessionStore(),
    private val now: () -> Long = System::currentTimeMillis,
) {
    private var token: String? = null
    var session = NativeSession()
        private set
    private val json = Json { ignoreUnknownKeys = true }
    private var remember = false

    fun dropMemory() {
        token = null
        session = NativeSession()
        remember = false
    }

    suspend fun forget() {
        dropMemory()
        withContext(NonCancellable + Dispatchers.IO) { store.clear() }
    }

    suspend fun restore(): Boolean {
        check(token == null)
        val saved = withContext(Dispatchers.IO) { store.read() } ?: return false
        if (!saved.token.matches(Regex("[a-f0-9]{64}")) || saved.expiresAt <= now()) {
            forget()
            return false
        }
        token = saved.token
        remember = true
        // No stored user/permissions: callers MUST verify /session before displaying identity.
        session = NativeSession(expiresAt = saved.expiresAt, remembered = true)
        return true
    }

    fun hasSession() = token != null

    suspend fun signIn(email: String, password: String, rememberSession: Boolean = false): NativeSession {
        check(token == null)
        remember = rememberSession
        withContext(Dispatchers.IO) { store.clear() }
        val body = buildJsonObject {
            put("email", email.trim())
            put("password", password)
            put("remember", rememberSession)
        }
        return accept(call("sign-in", body), requireCookie = true)
    }

    suspend fun signUp(name: String, email: String, password: String, rememberSession: Boolean = false): NativeSession {
        check(token == null)
        require(name.trim().length >= 2 && email.trim().contains('@') && password.length >= 8)
        remember = rememberSession
        withContext(Dispatchers.IO) { store.clear() }
        val body = buildJsonObject {
            put("name", name.trim())
            put("email", email.trim())
            put("password", password)
        }
        return accept(call("sign-up", body), requireCookie = true)
    }

    suspend fun forgotPassword(email: String) {
        require(email.trim().contains('@'))
        val reply = call("forgot-password", buildJsonObject { put("email", email.trim()) })
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun resetPassword(resetToken: String, newPassword: String) {
        require(resetToken.trim().length >= 16 && newPassword.length >= 8)
        val body = buildJsonObject {
            put("token", resetToken.trim())
            put("password", newPassword)
        }
        val reply = call("reset-password", body)
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun verify(code: String): NativeSession {
        require(session.mfaRequired)
        return accept(call("mfa/verify", buildJsonObject { put("code", code.trim()) }), requireCookie = false)
    }

    suspend fun checkSession(): NativeSession = accept(call("session", null), requireCookie = false)
    suspend fun refresh(): NativeSession = accept(call("refresh", buildJsonObject {}), requireCookie = true)

    suspend fun accountProfile(): AccountProfile {
        require(session.user != null && !session.mfaRequired)
        return decodeChecked { AccountProfile.decode(call("account", null).body) }
    }

    suspend fun sendEmailVerification() {
        require(session.user != null && !session.mfaRequired)
        val reply = call("account/verify-email/send", buildJsonObject {})
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun verifyEmail(code: String): AccountProfile {
        require(session.user != null && !session.mfaRequired)
        val trimmed = code.trim()
        require(trimmed.matches(Regex("[0-9]{6}")))
        val body = call("account/verify-email", buildJsonObject { put("code", trimmed) }).body
        return decodeChecked { AccountProfile.decode(body) }
    }

    suspend fun changePassword(currentPassword: String, newPassword: String) {
        require(session.user != null && !session.mfaRequired && newPassword.length >= 8)
        val payload = buildJsonObject {
            if (currentPassword.isNotEmpty()) put("currentPassword", currentPassword)
            put("newPassword", newPassword)
        }
        val reply = call("account/password", payload)
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun devices(): List<DeviceSession> {
        require(session.user != null && !session.mfaRequired)
        val body = call("devices", null).body
        return decodeChecked { DeviceSession.decodeList(body) }
    }

    suspend fun revokeDevice(deviceId: String) {
        require(session.user != null && !session.mfaRequired && deviceId.matches(StudentAssignmentItem.ID_PATTERN))
        val reply = call("devices/$deviceId/revoke", buildJsonObject {})
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun deleteAccount(password: String, mfaCode: String) {
        require(session.user != null && !session.mfaRequired)
        val payload = buildJsonObject {
            put("confirm", "DELETE")
            if (password.isNotEmpty()) put("password", password)
            if (mfaCode.trim().isNotEmpty()) put("code", mfaCode.trim())
        }
        call("account/delete", payload)
        forget()
    }

    suspend fun studentDashboard(): StudentDashboard {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        return StudentDashboard.decode(call("dashboard/student", null).body)
    }

    suspend fun completeLesson(course: String, lesson: String) {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(course.matches(StudentAssignmentItem.ID_PATTERN) && lesson.matches(StudentAssignmentItem.ID_PATTERN))
        val reply = call("courses/$course/lessons/$lesson/complete", buildJsonObject {})
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun assignments(cursor: String? = null): AssignmentPage {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "assignments" else "assignments?cursor=$cursor"
        val body = call(path, null).body
        return decodeChecked { AssignmentPage.decode(body) }
    }

    suspend fun assignment(id: String): StudentAssignmentItem {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("assignments/$id", null).body
        return decodeChecked { StudentAssignmentItem.decodeOne(body) }
    }

    suspend fun assignmentSubmission(id: String, maxScore: Int? = null): NativeSubmission? {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = try {
            call("assignments/$id/submission", null).body
        } catch (error: AuthFailure) {
            if (error.status == 404) return null
            throw error
        }
        return decodeChecked { NativeSubmission.decode(body, maxScore) }
    }

    suspend fun submitAssignment(id: String, answer: String): SubmissionReceipt {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val trimmed = answer.trim()
        require(trimmed.isNotEmpty() && trimmed.length <= 20_000)
        val reply = call("assignments/$id/submit", buildJsonObject { put("body", trimmed) })
        return decodeChecked { SubmissionReceipt.decode(reply.body, id) }
    }

    suspend fun assessments(cursor: String? = null): Pair<List<StudentAssessmentItem>, String?> {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "assessments" else "assessments?cursor=$cursor"
        val body = call(path, null).body
        return decodeChecked { StudentAssessmentItem.decodePage(body) }
    }

    suspend fun assessment(id: String): StudentAssessmentItem {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("assessments/$id", null).body
        return decodeChecked { StudentAssessmentItem.decodeOne(body) }
    }

    suspend fun submitAssessment(id: String, answers: List<Int>) {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        require(answers.size in 1..5 && answers.all { it in -1..3 })
        val payload = buildJsonObject {
            put("answers", JsonArray(answers.map { JsonPrimitive(it) }))
        }
        val reply = call("assessments/$id/submit", payload)
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun instructorCourses(): List<InstructorCourseSummary> {
        require(session.user?.roleKey in setOf("instructor", "admin") && !session.mfaRequired)
        val body = call("instructor/courses", null).body
        return decodeChecked { InstructorCourseSummary.decodeList(body) }
    }

    suspend fun instructorSubmissions(cursor: String? = null): Pair<List<InstructorSubmissionSummary>, String?> {
        require(session.user?.roleKey in setOf("instructor", "admin") && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "instructor/assignments" else "instructor/assignments?cursor=$cursor"
        val body = call(path, null).body
        return decodeChecked { InstructorSubmissionSummary.decodePage(body) }
    }

    suspend fun instructorSubmission(id: String): InstructorSubmissionDetail {
        require(session.user?.roleKey in setOf("instructor", "admin") && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("instructor/assignments/$id", null).body
        return decodeChecked { InstructorSubmissionDetail.decode(body) }
    }

    suspend fun gradeSubmission(id: String, score: Int, feedback: String) {
        require(session.user?.roleKey in setOf("instructor", "admin") && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN) && score in 0..10_000 && feedback.length <= 5_000)
        val payload = buildJsonObject {
            put("score", score)
            if (feedback.trim().isNotEmpty()) put("feedback", feedback.trim())
        }
        val reply = call("instructor/submissions/$id/grade", payload)
        require(json.parseToJsonElement(reply.body).jsonObject["status"]?.jsonPrimitive?.contentOrNull == "graded")
    }

    suspend fun messageThreads(cursor: String? = null): Pair<List<MessageThread>, String?> {
        require(session.user != null && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "messages/threads" else "messages/threads?cursor=$cursor"
        val body = call(path, null).body
        return decodeChecked { MessageThread.decodePage(body) }
    }

    suspend fun messageThread(id: String): MessageThread {
        require(session.user != null && !session.mfaRequired && id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("messages/threads/$id", null).body
        return decodeChecked { MessageThread.decodeOne(body) }
    }

    suspend fun sendMessage(threadId: String, text: String) {
        require(session.user != null && !session.mfaRequired && threadId.matches(StudentAssignmentItem.ID_PATTERN))
        val trimmed = text.trim()
        require(trimmed.length in 1..5_000)
        val reply = call("messages/threads/$threadId/messages", buildJsonObject { put("body", trimmed) })
        require(json.parseToJsonElement(reply.body).jsonObject["mine"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun notifications(cursor: String? = null): Pair<List<NotificationItem>, String?> {
        require(session.user != null && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "notifications" else "notifications?cursor=$cursor"
        val body = call(path, null).body
        return decodeChecked { NotificationItem.decodePage(body) }
    }

    suspend fun markNotificationRead(id: String) {
        require(session.user != null && !session.mfaRequired && id.matches(StudentAssignmentItem.ID_PATTERN))
        val reply = call("notifications/$id/read", buildJsonObject {})
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun markAllNotificationsRead() {
        require(session.user != null && !session.mfaRequired)
        call("notifications/read-all", buildJsonObject {})
    }

    suspend fun submitApplication(draft: ApplicationDraft, submissionKey: String): String {
        require(
            draft.programSlug.trim().matches(Regex("[a-zA-Z0-9_-]{1,80}")) &&
                draft.firstName.trim().length in 2..60 &&
                draft.lastName.trim().length in 2..60 &&
                draft.email.trim().contains('@') &&
                draft.phone.trim().length in 7..30 &&
                draft.city.trim().length in 2..80 &&
                submissionKey.matches(Regex("[0-9a-fA-F-]{36}")),
        )
        val payload = buildJsonObject {
            put("programSlug", draft.programSlug.trim())
            put("firstName", draft.firstName.trim())
            put("lastName", draft.lastName.trim())
            put("email", draft.email.trim())
            put("phone", draft.phone.trim())
            put("city", draft.city.trim())
            put("mode", draft.mode.takeIf { it in setOf("onsite", "online", "hybrid") } ?: "onsite")
            put("paymentPlan", draft.normalizedPaymentPlan())
            put("paymentMethod", "bank-transfer")
            put("hasLaptop", draft.hasLaptop)
            if (draft.goal.trim().isNotEmpty()) put("goal", draft.goal.trim().take(600))
            put("consentPrivacy", true)
            put("consentTerms", true)
            put("submissionKey", submissionKey)
            put("policyVersion", EnrollmentDetail.POLICY_VERSION)
        }
        val reply = call("enrollments", payload)
        return decodeChecked {
            val ref = json.parseToJsonElement(reply.body).jsonObject
                .getValue("enrollment").jsonObject.getValue("ref").jsonPrimitive.content
            require(ref.matches(MyEnrollmentSummary.REF_PATTERN))
            ref
        }
    }

    suspend fun myEnrollments(): List<MyEnrollmentSummary> {
        require(session.user != null && !session.mfaRequired)
        val body = call("enrollments/mine", null).body
        return decodeChecked { MyEnrollmentSummary.decodeList(body) }
    }

    suspend fun enrollmentDetail(ref: String): EnrollmentDetail {
        require(session.user != null && !session.mfaRequired)
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        val body = call("enrollments/$clean", null).body
        return decodeChecked { EnrollmentDetail.decode(body) }
    }

    suspend fun acceptOffer(ref: String, version: Int) {
        require(session.user != null && !session.mfaRequired && version > 0)
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        val payload = buildJsonObject {
            put("version", version)
            put("policyVersion", EnrollmentDetail.POLICY_VERSION)
            put("consent", true)
        }
        val reply = call("enrollments/$clean/offer/accept", payload)
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun reportTransfer(
        ref: String,
        kind: String,
        amount: Double,
        senderName: String,
        bankName: String,
        bankReference: String,
    ) {
        require(session.user != null && !session.mfaRequired)
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        require(kind in setOf("deposit", "full", "balance") && amount in 0.01..1_000_000.0 && senderName.trim().length in 2..80)
        val payload = buildJsonObject {
            put("kind", kind)
            put("amount", kotlin.math.round(amount * 100.0) / 100.0)
            put("senderName", senderName.trim())
            if (bankName.trim().isNotEmpty()) put("bankName", bankName.trim().take(60))
            if (bankReference.trim().isNotEmpty()) put("bankReference", bankReference.trim().take(80))
        }
        call("enrollments/$clean/payments/transfer", payload)
    }

    suspend fun enrollmentReceipt(ref: String): EnrollmentReceipt {
        require(session.user != null && !session.mfaRequired)
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        val body = call("enrollments/$clean/receipt", null).body
        return decodeChecked { EnrollmentReceipt.decode(body) }
    }

    suspend fun staffEnrollments(): List<StaffEnrollmentItem> {
        require(session.user?.roleKey in setOf("admin", "admissions", "finance") && !session.mfaRequired)
        val body = call("enrollments/admin", null).body
        return decodeChecked { StaffEnrollmentItem.decodeList(body) }
    }

    suspend fun paymentProofs(): List<PaymentProofItem> {
        require(session.user?.roleKey in setOf("admin", "finance") && !session.mfaRequired)
        val body = call("enrollments/payment-proofs", null).body
        return decodeChecked { PaymentProofItem.decodeList(body) }
    }

    suspend fun confirmPaymentProof(id: String, bankReference: String, receivedAmount: Double) {
        require(session.user?.roleKey in setOf("admin", "finance") && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN) && bankReference.trim().length in 4..120 && receivedAmount in 0.01..1_000_000.0)
        val payload = buildJsonObject {
            put("bankReference", bankReference.trim())
            put("receivedAmount", kotlin.math.round(receivedAmount * 100.0) / 100.0)
        }
        val reply = call("enrollments/payment-proofs/$id/confirm", payload)
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }

    suspend fun rejectPaymentProof(id: String, reason: String) {
        require(session.user?.roleKey in setOf("admin", "finance") && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN) && reason.length <= 300)
        val payload = buildJsonObject {
            if (reason.trim().isNotEmpty()) put("reason", reason.trim())
        }
        call("enrollments/payment-proofs/$id/reject", payload)
    }

    /* ---------------- Learning engine: courses, grades, calendar, certificates, attendance ---------------- */

    private fun requireVerified() {
        require(session.user != null && !session.mfaRequired)
    }

    private fun cursorParam(cursor: String?): String {
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        return if (cursor == null) "" else "?cursor=$cursor"
    }

    suspend fun coursesPage(cursor: String? = null): CoursePage {
        requireVerified()
        val body = call("courses${cursorParam(cursor)}", null).body
        return decodeChecked { CoursePage.decode(body) }
    }

    suspend fun courseDetail(slug: String): StudentCourse {
        requireVerified()
        require(slug.matches(Regex("[a-zA-Z0-9_-]{1,80}")))
        val body = call("courses/$slug", null).body
        return decodeChecked {
            val course = json.decodeFromString<StudentCourse>(body)
            require(course.slug == slug && course.title.isNotBlank() && course.pct in 0..100)
            val lessons = course.modules.flatMap { it.lessons }
            require(lessons.size <= 1000 && lessons.map { it.id }.distinct().size == lessons.size)
            course
        }
    }

    suspend fun gradebook(cursor: String? = null): Pair<List<GradebookEntry>, String?> {
        requireVerified()
        val body = call("courses/gradebook${cursorParam(cursor)}", null).body
        return decodeChecked { GradebookEntry.decodePage(body) }
    }

    suspend fun calendarEvents(cursor: String? = null): Pair<List<CalendarEventItem>, String?> {
        requireVerified()
        val body = call("calendar/events${cursorParam(cursor)}", null).body
        return decodeChecked { CalendarEventItem.decodePage(body) }
    }

    suspend fun certificatesMine(): List<CertificateItem> {
        requireVerified()
        val body = call("certificates/mine", null).body
        return decodeChecked { CertificateItem.decodeList(body) }
    }

    /** Public: verify any certificate by its code — no session required. */
    suspend fun verifyCertificate(code: String): CertificateVerification {
        val clean = code.trim().uppercase(Locale.US)
        require(clean.matches(Regex("[A-Z0-9-]{8,64}")))
        val body = call("certificates/verify?code=$clean", null).body
        return decodeChecked { CertificateVerification.decode(body) }
    }

    suspend fun attendanceCheckIn(sessionCode: String): AttendanceCheckInResult {
        requireVerified()
        val clean = sessionCode.trim().uppercase(Locale.US)
        require(clean.matches(Regex("[A-Z0-9-]{6,80}")))
        val payload = buildJsonObject { put("sessionCode", clean) }
        val reply = call("attendance/check-in", payload)
        return decodeChecked { AttendanceCheckInResult.decode(reply.body) }
    }

    /* ---------------- Live classes ---------------- */

    suspend fun liveClasses(cursor: String? = null): Pair<List<LiveClassItem>, String?> {
        requireVerified()
        val body = call("live/classes${cursorParam(cursor)}", null).body
        return decodeChecked { LiveClassItem.decodePage(body) }
    }

    suspend fun liveClass(id: String): LiveClassItem {
        requireVerified()
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("live/classes/$id", null).body
        return decodeChecked { LiveClassItem.decodeOne(body) }
    }

    suspend fun liveChat(classId: String, cursor: String? = null): Pair<List<LiveChatMessage>, String?> {
        requireVerified()
        require(classId.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("live/classes/$classId/chat${cursorParam(cursor)}", null).body
        return decodeChecked { LiveChatMessage.decodePage(body) }
    }

    suspend fun sendLiveChat(classId: String, text: String): LiveChatMessage {
        requireVerified()
        require(classId.matches(StudentAssignmentItem.ID_PATTERN))
        val clean = text.trim()
        require(clean.length in 1..2000)
        val payload = buildJsonObject { put("body", clean) }
        val reply = call("live/classes/$classId/chat", payload)
        return decodeChecked { LiveChatMessage.decodeOne(reply.body) }
    }

    /* ---------------- Community: cohorts (public) & library ---------------- */

    suspend fun cohorts(program: String? = null): List<CohortItem> {
        val path = if (program == null) {
            "cohorts"
        } else {
            require(program.matches(Regex("[a-zA-Z0-9_-]{1,80}")))
            "cohorts?program=$program"
        }
        val body = call(path, null).body
        return decodeChecked { CohortItem.decodeList(body) }
    }

    suspend fun cohortsNext(program: String? = null): CohortNext {
        val path = if (program == null) {
            "cohorts/next"
        } else {
            require(program.matches(Regex("[a-zA-Z0-9_-]{1,80}")))
            "cohorts/next?program=$program"
        }
        val body = call(path, null).body
        return decodeChecked { CohortNext.decode(body) }
    }

    /** Public catalog: sources + public items only, no session required. */
    suspend fun libraryCatalog(cursor: String? = null): Triple<List<LibrarySource>, List<LibraryItem>, String?> {
        val body = call("library/catalog${cursorParam(cursor)}", null).body
        return decodeChecked { LibraryItem.decodeCatalog(body) }
    }

    /** Full library including protected course materials — authenticated. */
    suspend fun libraryItems(cursor: String? = null): Pair<List<LibraryItem>, String?> {
        requireVerified()
        val body = call("library${cursorParam(cursor)}", null).body
        return decodeChecked { LibraryItem.decodePage(body) }
    }

    suspend fun libraryItem(id: String): LibraryItem {
        requireVerified()
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("library/$id", null).body
        return decodeChecked { LibraryItem.decodeOne(body) }
    }

    /* ---------------- Career engine: mentors, jobs, talent, interviews ---------------- */

    suspend fun mentorProfiles(cursor: String? = null): Pair<List<MentorProfile>, String?> {
        requireVerified()
        val body = call("mentor/profiles${cursorParam(cursor)}", null).body
        return decodeChecked { MentorProfile.decodePage(body) }
    }

    suspend fun requestMentor(mentorId: String, goal: String, program: String? = null): MentorRequestResult {
        requireVerified()
        require(mentorId.isNotBlank() && mentorId.length <= 120)
        require(goal.trim().length in 1..500)
        val payload = buildJsonObject {
            put("mentorId", mentorId)
            put("goal", goal.trim())
            if (!program.isNullOrBlank()) put("program", program.trim().take(120))
        }
        val reply = call("mentor/requests", payload)
        return decodeChecked { MentorRequestResult.decode(reply.body) }
    }

    suspend fun matchMentor(goal: String, program: String? = null): MentorMatch {
        requireVerified()
        require(goal.trim().length in 1..500)
        val payload = buildJsonObject {
            put("goal", goal.trim())
            if (!program.isNullOrBlank()) put("program", program.trim().take(120))
        }
        val body = call("mentor/match", payload).body
        return decodeChecked { MentorMatch.decode(body) }
    }

    suspend fun jobPostings(cursor: String? = null): Pair<List<JobPosting>, String?> {
        requireVerified()
        val body = call("recruitment/postings${cursorParam(cursor)}", null).body
        return decodeChecked { JobPosting.decodePage(body) }
    }

    suspend fun talentPool(cursor: String? = null): Pair<List<TalentCandidate>, String?> {
        requireVerified()
        val body = call("recruitment/talent${cursorParam(cursor)}", null).body
        return decodeChecked { TalentCandidate.decodePage(body) }
    }

    suspend fun interviews(cursor: String? = null): Pair<List<InterviewItem>, String?> {
        requireVerified()
        val body = call("recruitment/interviews${cursorParam(cursor)}", null).body
        return decodeChecked { InterviewItem.decodePage(body) }
    }

    /* ---------------- Money, portal home, AI tutor, shop ---------------- */

    suspend fun paymentHistory(cursor: String? = null): Pair<List<PaymentHistoryItem>, String?> {
        requireVerified()
        val body = call("payments/history${cursorParam(cursor)}", null).body
        return decodeChecked { PaymentHistoryItem.decodePage(body) }
    }

    suspend fun portalSummary(portal: String? = null): PortalSummary {
        requireVerified()
        val path = if (portal == null) {
            "portal/summary"
        } else {
            require(portal.matches(Regex("[a-z-]{1,40}")))
            "portal/summary?portal=$portal"
        }
        val body = call(path, null).body
        return decodeChecked { PortalSummary.decode(body) }
    }

    suspend fun unreadCount(): Int {
        requireVerified()
        val body = call("notifications/unread-count", null).body
        return decodeChecked {
            val count = json.parseToJsonElement(body).jsonObject.getValue("count").jsonPrimitive.intOrNull
            require(count != null && count in 0..100_000)
            count
        }
    }

    suspend fun aiAsk(question: String): AiAnswer {
        requireVerified()
        val clean = question.trim()
        require(clean.length in 1..2000)
        val payload = buildJsonObject { put("question", clean) }
        val body = call("ai/ask", payload).body
        return decodeChecked { AiAnswer.decode(body) }
    }

    suspend fun aiRecommendations(): List<AiRecommendation> {
        requireVerified()
        val body = call("ai/recommendations", null).body
        return decodeChecked { AiRecommendation.decodeList(body) }
    }

    /** Public digital shop catalog — checkout itself stays on the official store. */
    suspend fun shopCatalog(): ShopCatalog {
        val body = call("shop/catalog", null).body
        return decodeChecked { ShopProduct.decodeCatalog(body) }
    }

    /* ---------------- 0.8: online tuition payment, uploads, polls, attendance sessions, portfolio ---------------- */

    /** Start (or resume) a hosted online tuition payment. `checkoutKey` makes retries idempotent. */
    suspend fun startTuitionPayment(ref: String, kind: String, checkoutKey: String): TuitionPaymentStart {
        requireVerified()
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        require(kind in setOf("deposit", "full", "balance"))
        require(checkoutKey.matches(Regex("[a-zA-Z0-9-]{16,80}")))
        val payload = buildJsonObject {
            put("kind", kind)
            put("checkoutKey", checkoutKey)
        }
        val reply = call("enrollments/$clean/payments", payload)
        return decodeChecked { TuitionPaymentStart.decode(reply.body) }
    }

    /** Check the latest status of the enrollment's online payment. */
    suspend fun verifyTuitionPayment(ref: String): TuitionPaymentStatus {
        requireVerified()
        val clean = ref.trim().uppercase(Locale.US)
        require(clean.matches(MyEnrollmentSummary.REF_PATTERN))
        val body = call("enrollments/$clean/payments/verify", null).body
        return decodeChecked { TuitionPaymentStatus.decode(body) }
    }

    suspend fun presignUpload(filename: String, contentType: String): PresignedUpload {
        requireVerified()
        require(filename.trim().length in 1..200)
        require(contentType in ALLOWED_UPLOAD_TYPES)
        val payload = buildJsonObject {
            put("filename", filename.trim())
            put("contentType", contentType)
        }
        val reply = call("uploads/presign", payload)
        return decodeChecked { PresignedUpload.decode(reply.body) }
    }

    /** PUT the bytes through the API's upload proxy, then confirm the object landed. */
    suspend fun uploadFile(presigned: PresignedUpload, bytes: ByteArray): UploadResult {
        requireVerified()
        require(bytes.size in 1..10 * 1024 * 1024)
        val reply = transport.upload("uploads/${presigned.key}", presigned.contentType, bytes, token)
        if (reply.status !in 200..299) throw AuthFailure(reply.status)
        return decodeChecked { UploadResult.decode(reply.body) }
    }

    /** Submit an assignment with a written answer and/or an uploaded file reference. */
    suspend fun submitAssignmentWithFile(id: String, answer: String, fileKey: String?, sizeLabel: String) {
        requireVerified()
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        require(answer.length <= 20_000)
        require(fileKey == null || (fileKey.matches(Regex("[a-zA-Z0-9_./-]{1,300}")) && !fileKey.contains("..")))
        require(sizeLabel.length <= 100)
        require(answer.isNotBlank() || fileKey != null)
        val payload = buildJsonObject {
            if (answer.isNotBlank()) put("body", answer)
            if (fileKey != null) {
                put("file", fileKey)
                put("size", sizeLabel)
            }
        }
        call("assignments/$id/submit", payload)
    }

    suspend fun livePolls(classId: String, cursor: String? = null): Pair<List<LivePoll>, String?> {
        requireVerified()
        require(classId.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("live/classes/$classId/polls${cursorParam(cursor)}", null).body
        return decodeChecked { LivePoll.decodePage(body) }
    }

    suspend fun voteLivePoll(classId: String, pollId: String, option: String): LivePoll {
        requireVerified()
        require(classId.matches(StudentAssignmentItem.ID_PATTERN) && pollId.matches(StudentAssignmentItem.ID_PATTERN))
        require(option.isNotBlank() && option.length <= 300)
        val payload = buildJsonObject { put("option", option) }
        val reply = call("live/classes/$classId/polls/$pollId/vote", payload)
        return decodeChecked { LivePoll.decodeOne(reply.body) }
    }

    suspend fun createAttendanceSession(course: String, durationMinutes: Int): AttendanceSession {
        requireVerified()
        require(session.user?.roleKey in setOf("instructor", "admin") && !session.mfaRequired)
        val clean = course.trim()
        require(clean.length in 1..160 && durationMinutes in 1..120)
        val payload = buildJsonObject {
            put("course", clean)
            put("durationMinutes", durationMinutes)
        }
        val reply = call("attendance/sessions", payload)
        return decodeChecked { AttendanceSession.decode(reply.body) }
    }

    suspend fun portfolioProjects(cursor: String? = null): Pair<List<PortfolioProject>, String?> {
        requireVerified()
        val body = call("student-self-dashboard/projects${cursorParam(cursor)}", null).body
        return decodeChecked { PortfolioProject.decodePage(body) }
    }

    suspend fun addPortfolioProject(name: String, detail: String, tags: List<String>, url: String?): PortfolioProject {
        requireVerified()
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        val cleanName = name.trim()
        val cleanDetail = detail.trim()
        require(cleanName.length in 1..160 && cleanDetail.length in 1..2000)
        require(tags.size <= 12 && tags.all { it.trim().length in 1..40 })
        require(url.isNullOrBlank() || url.startsWith("https://"))
        val payload = buildJsonObject {
            put("name", cleanName)
            put("detail", cleanDetail)
            put("tags", kotlinx.serialization.json.JsonArray(tags.map { kotlinx.serialization.json.JsonPrimitive(it.trim()) }))
            if (!url.isNullOrBlank()) put("url", url.trim().take(2000))
        }
        val reply = call("student-self-dashboard/projects", payload)
        return decodeChecked { PortfolioProject.decodeOne(reply.body) }
    }

    suspend fun selfRecords(cursor: String? = null): Pair<List<AttendanceRecord>, String?> {
        requireVerified()
        val body = call("student-self-dashboard/records${cursorParam(cursor)}", null).body
        return decodeChecked { AttendanceRecord.decodePage(body) }
    }

    /** Public: raw .ics calendar file for a cohort. */
    suspend fun cohortIcs(id: String): String {
        require(id.matches(Regex("[a-zA-Z0-9_-]{1,120}")))
        val body = call("cohorts/$id/ics", null).body
        return decodeChecked {
            require(body.startsWith("BEGIN:VCALENDAR") && body.contains("END:VCALENDAR") && body.length <= 16 * 1024)
            body
        }
    }

    suspend fun signOut(): Boolean {
        if (token == null) return true
        return try {
            call("sign-out", buildJsonObject {})
            true
        } catch (error: AuthFailure) {
            error.status == 401
        } catch (_: java.io.IOException) {
            false
        } finally {
            forget()
        }
    }

    private inline fun <T> decodeChecked(block: () -> T): T {
        return try {
            block()
        } catch (error: CancellationException) {
            throw error
        } catch (_: Exception) {
            throw AuthFailure(502)
        }
    }

    private suspend fun call(path: String, body: JsonObject?): AuthReply {
        if (!isPublicPath(path) && (token == null || (path != "sign-out" && session.expiresAt <= now()))) {
            forget()
            throw AuthFailure(401)
        }
        val activeToken = if (path in CREDENTIAL_PATHS) null else token
        val reply = transport.request(path, body, activeToken)
        if (reply.status !in 200..299) {
            val authRejection =
                reply.status == 401 ||
                    (reply.status == 403 && path in setOf("sign-in", "sign-up", "mfa/verify", "session", "refresh"))
            if (authRejection) forget()
            throw AuthFailure(reply.status)
        }
        return reply
    }

    private suspend fun accept(reply: AuthReply, requireCookie: Boolean): NativeSession {
        try {
            val data = json.parseToJsonElement(reply.body).jsonObject
            val expiryText = data.getValue("expiresAt").jsonPrimitive.content
            require(expiryText.matches(Regex("[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{3}Z")))
            val formatter = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply {
                timeZone = TimeZone.getTimeZone("UTC")
                isLenient = false
            }
            val expiry = formatter.parse(expiryText)?.time ?: error("Invalid expiry")
            require(expiry > now())
            val pending = data["mfaRequired"]?.jsonPrimitive?.booleanOrNull == true
            val user = if (pending) null else json.decodeFromJsonElement<NativeUser>(data.getValue("user"))
            if (user != null) require(user.id.isNotBlank() && user.roleKey.isNotBlank())
            val next = sessionCookie(reply.cookies)
            require(!requireCookie || next != null)
            require(next != null || token != null)
            token = next ?: token
            if (remember && !pending) {
                val credential = StoredSession(token!!, expiry)
                withContext(Dispatchers.IO) { store.write(credential) }
            }
            session = NativeSession(user, pending, expiry, remembered = remember && !pending)
            return session
        } catch (error: CancellationException) {
            dropMemory()
            throw error
        } catch (_: Exception) {
            forget()
            throw AuthFailure(502)
        }
    }

    companion object {
        private val CREDENTIAL_PATHS = setOf("sign-in", "sign-up", "forgot-password", "reset-password")

        /** Mirrors the server's upload allowlist (uploads.ts ALLOWED_TYPES). */
        val ALLOWED_UPLOAD_TYPES = setOf(
            "image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf",
            "text/plain", "application/zip", "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        )

        /** Paths the server exposes without a session; the transport allowlist still applies. */
        fun isPublicPath(path: String): Boolean =
            path in CREDENTIAL_PATHS || path == "enrollments" || path == "shop/catalog" ||
                path == "cohorts" || path == "cohorts/next" ||
                Regex("cohorts\\?program=[a-zA-Z0-9_-]{1,80}").matches(path) ||
                Regex("cohorts/next\\?program=[a-zA-Z0-9_-]{1,80}").matches(path) ||
                path == "library/catalog" ||
                Regex("library/catalog\\?cursor=[a-zA-Z0-9_-]{1,200}").matches(path) ||
                Regex("certificates/verify\\?code=[A-Za-z0-9-]{8,64}").matches(path)

        fun sessionCookie(headers: List<String>): String? {
            val matching = headers.filter { it.substringBefore('=').trim() == "cea_session" }
            require(matching.size <= 1)
            val header = matching.singleOrNull() ?: return null
            val parts = header.split(';').map { it.trim() }
            require(parts.any { it.equals("Secure", true) } && parts.any { it.equals("HttpOnly", true) })
            val value = parts[0].substringAfter('=')
            require(value.matches(Regex("[a-f0-9]{64}")))
            return value
        }
    }
}
