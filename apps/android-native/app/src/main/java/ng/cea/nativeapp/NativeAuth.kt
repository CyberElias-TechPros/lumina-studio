package ng.cea.nativeapp

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.NonCancellable
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
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
fun interface AuthTransport {
    suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply
}

/** Fixed API only; no browser cookie jar, redirects, response cache or credential logging. */
class HttpsAuthTransport : AuthTransport {
    override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply = withContext(Dispatchers.IO) {
        val idPart = "[a-zA-Z0-9_-]{1,120}"
        val cursorPart = "[a-zA-Z0-9_-]{1,200}"
        val refPart = "CEA-[0-9]{4}-[A-Z0-9]{6}"

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

        val enrollmentCreate = path == "enrollments"
        val enrollmentMine = path == "enrollments/mine"
        val enrollmentDetail = path.matches(Regex("enrollments/$refPart"))
        val enrollmentOfferAccept = path.matches(Regex("enrollments/$refPart/offer/accept"))
        val enrollmentTransfer = path.matches(Regex("enrollments/$refPart/payments/transfer"))
        val enrollmentReceipt = path.matches(Regex("enrollments/$refPart/receipt"))
        val staffEnrollments = path == "enrollments/admin"
        val paymentProofs = path == "enrollments/payment-proofs"
        val paymentProofDecision = path.matches(Regex("enrollments/payment-proofs/$idPart/(confirm|reject)"))

        val allowed =
            auth || accountGet || accountPost || studentDashboard || completion ||
                assignmentList || assignmentDetail || assignmentSubmission || assignmentSubmit ||
                assessmentList || assessmentDetail || assessmentSubmit ||
                instructorCourses || instructorList || instructorDetail || instructorGrade ||
                messageList || messageDetail || messageSend ||
                notificationList || notificationRead ||
                enrollmentCreate || enrollmentMine || enrollmentDetail ||
                enrollmentOfferAccept || enrollmentTransfer || enrollmentReceipt ||
                staffEnrollments || paymentProofs || paymentProofDecision
        require(allowed)

        val isGet =
            path == "session" || path == "devices" || accountGet || studentDashboard ||
                assignmentList || assignmentDetail || assignmentSubmission ||
                assessmentList || assessmentDetail ||
                instructorCourses || instructorList || instructorDetail ||
                messageList || messageDetail || notificationList ||
                enrollmentMine || enrollmentDetail || enrollmentReceipt ||
                staffEnrollments || paymentProofs
        require(isGet == (body == null))

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
            connection.setRequestProperty("User-Agent", "CEA-Native-Android/0.6")
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
                    messageList || notificationList || staffEnrollments || paymentProofs -> 512 * 1024
                assignmentDetail || assignmentSubmission || assessmentDetail || instructorDetail ||
                    messageDetail || enrollmentDetail || enrollmentReceipt -> 128 * 1024
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
        val publicEndpoint = path in setOf("sign-in", "sign-up", "forgot-password", "reset-password", "enrollments")
        if (!publicEndpoint && (token == null || (path != "sign-out" && session.expiresAt <= now()))) {
            forget()
            throw AuthFailure(401)
        }
        val activeToken = if (path in setOf("sign-in", "sign-up", "forgot-password", "reset-password")) null else token
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
