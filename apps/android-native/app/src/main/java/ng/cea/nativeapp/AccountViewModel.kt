package ng.cea.nativeapp

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.util.UUID

data class AccountState(
    val session: NativeSession = NativeSession(),
    val busy: Boolean = false,
    val message: String? = null,
    val needsCheck: Boolean = false,
    val dashboard: StudentDashboard? = null,
    val assignments: StudentAssignmentsState = StudentAssignmentsState(),
    val assessments: StudentAssessmentsState = StudentAssessmentsState(),
    val profile: AccountProfile? = null,
    val devices: List<DeviceSession> = emptyList(),
    val messageThreads: List<MessageThread> = emptyList(),
    val messagesNextCursor: String? = null,
    val selectedThread: MessageThread? = null,
    val notifications: List<NotificationItem> = emptyList(),
    val notificationsNextCursor: String? = null,
    val instructorCourses: List<InstructorCourseSummary> = emptyList(),
    val instructorSubmissions: List<InstructorSubmissionSummary> = emptyList(),
    val instructorNextCursor: String? = null,
    val selectedInstructorSubmission: InstructorSubmissionDetail? = null,
    val myEnrollments: List<MyEnrollmentSummary> = emptyList(),
    val selectedEnrollment: EnrollmentDetail? = null,
    val selectedReceipt: EnrollmentReceipt? = null,
    val staffEnrollments: List<StaffEnrollmentItem> = emptyList(),
    val paymentProofs: List<PaymentProofItem> = emptyList(),
    val applicationDraft: ApplicationDraft = ApplicationDraft(),
    val draftSavedLocally: Boolean = false,
    val lastSubmittedRef: String? = null,
    val home: HomeState = HomeState(),
    val learn: LearnExtrasState = LearnExtrasState(),
    val live: LiveHubState = LiveHubState(),
    val career: CareerState = CareerState(),
    val discover: DiscoverState = DiscoverState(),
    val paymentStart: TuitionPaymentStart? = null,
    val paymentStatus: TuitionPaymentStatus? = null,
    val attendanceSession: AttendanceSession? = null,
)

class AccountViewModel(application: Application) : AndroidViewModel(application) {
    private val client = NativeAuthClient(store = KeystoreSessionStore(application))
    private val draftStore: DraftStore = KeystoreDraftStore(application)
    private val publicCache = PublicCache(application)
    private val cacheJson = Json { ignoreUnknownKeys = true }
    private val checkoutKeys = mutableMapOf<String, String>()
    private val mutable = MutableStateFlow(AccountState())
    val state = mutable.asStateFlow()
    private var expiryJob: Job? = null
    private var activeSubmissionKey: String = UUID.randomUUID().toString()

    init {
        action {
            val savedDraft = withContext(Dispatchers.IO) { draftStore.read() }
            if (savedDraft != null) {
                mutable.value = mutable.value.copy(
                    applicationDraft = savedDraft,
                    draftSavedLocally = true,
                )
            }
            if (client.restore()) {
                mutable.value = clearedPrivateState(busy = true, needsCheck = true)
                accepted(client.checkSession())
            }
        }
    }

    private fun clearedPrivateState(
        session: NativeSession = NativeSession(),
        busy: Boolean = false,
        message: String? = null,
        needsCheck: Boolean = false,
    ): AccountState {
        val cur = mutable.value
        return AccountState(
            session = session,
            busy = busy,
            message = message,
            needsCheck = needsCheck,
            applicationDraft = cur.applicationDraft,
            draftSavedLocally = cur.draftSavedLocally,
            lastSubmittedRef = cur.lastSubmittedRef,
        )
    }

    private fun action(failureMessage: String? = null, block: suspend () -> Unit) {
        if (mutable.value.busy) return
        mutable.value = mutable.value.copy(busy = true, message = null)
        viewModelScope.launch {
            try {
                block()
            } catch (error: CancellationException) {
                throw error
            } catch (error: Exception) {
                val message = when ((error as? AuthFailure)?.status) {
                    401 -> "Sign-in failed or your session expired. Check your details and sign in again."
                    403 -> "Access is unavailable for this action (verify your email or check account permissions)."
                    404 -> "That record could not be found. Refresh and try again."
                    409 -> "This record changed or was already submitted. Refresh to inspect the latest status."
                    400, 422 -> "Check your details or verification code and try again."
                    429 -> "Too many attempts. Wait before trying again."
                    else -> failureMessage ?: "Could not complete that request. Check your connection and try again."
                }
                val keepVerified =
                    mutable.value.session.user != null &&
                        client.session.user != null &&
                        !client.session.mfaRequired &&
                        client.session.expiresAt > System.currentTimeMillis()
                mutable.value = if (keepVerified) {
                    mutable.value.copy(session = client.session, message = message, needsCheck = false)
                } else {
                    clearedPrivateState(
                        session = if (client.session.mfaRequired) client.session else NativeSession(),
                        message = message,
                        needsCheck = client.hasSession() && !client.session.mfaRequired,
                    )
                }
            } finally {
                mutable.value = mutable.value.copy(busy = false)
            }
        }
    }

    private fun accepted(session: NativeSession, message: String? = null) {
        mutable.value = clearedPrivateState(session = session, busy = true, message = message)
        expiryJob?.cancel()
        expiryJob = viewModelScope.launch {
            delay((session.expiresAt - System.currentTimeMillis()).coerceAtLeast(0))
            while (mutable.value.busy) delay(100)
            if (client.session.expiresAt <= System.currentTimeMillis()) {
                mutable.value = clearedPrivateState(busy = true)
                try {
                    client.forget()
                    mutable.value = clearedPrivateState(message = "Your session expired. Sign in again.")
                } catch (_: Exception) {
                    mutable.value = clearedPrivateState(
                        message = "Your session expired. Secure storage could not be cleared; clear this app’s storage in Android settings before sharing this phone.",
                    )
                }
            }
        }
    }

    private suspend fun verifyCurrentRole(expectedRoles: Set<String>? = null): NativeSession {
        val previous = mutable.value
        val previousUserId = previous.session.user?.id
        mutable.value = clearedPrivateState(busy = true, needsCheck = true)
        val verified = client.checkSession()
        accepted(verified)
        if (expectedRoles != null) {
            require(verified.user?.roleKey in expectedRoles && !verified.mfaRequired)
        }
        if (previousUserId != null && verified.user?.id == previousUserId && verified.user.roleKey == previous.session.user?.roleKey) {
            mutable.value = previous.copy(session = verified, busy = true, message = null, needsCheck = false)
        }
        return verified
    }

    /* ---------------- Auth & Security Lifecycle ---------------- */

    fun signIn(email: String, password: String, remember: Boolean) = action {
        accepted(client.signIn(email, password, remember))
    }

    fun signUp(name: String, email: String, password: String, remember: Boolean) = action(
        "Could not create your account. Check your details or sign in if you already registered.",
    ) {
        accepted(
            client.signUp(name, email, password, remember),
            message = "Account created. Open Security settings to verify your email address.",
        )
    }

    fun forgotPassword(email: String) = action("Could not request a password reset. Check your connection and try again.") {
        client.forgotPassword(email)
        mutable.value = mutable.value.copy(
            message = "If an account exists for that email, reset instructions have been sent.",
        )
    }

    fun resetPassword(token: String, newPassword: String, onDone: () -> Unit = {}) = action(
        "Could not reset your password. Check the reset token and try again.",
    ) {
        client.resetPassword(token, newPassword)
        mutable.value = mutable.value.copy(message = "Password updated. Sign in with your new password.")
        onDone()
    }

    fun verify(code: String) = action { accepted(client.verify(code)) }
    fun refresh() = action { accepted(client.refresh(), message = "Session renewed.") }

    fun checkSession() {
        if (!client.hasSession() || client.session.mfaRequired) return
        action {
            mutable.value = clearedPrivateState(busy = true, needsCheck = true)
            accepted(client.checkSession())
        }
    }

    fun loadSecurityOverview() = action("Could not load your account security details.") {
        verifyCurrentRole()
        val profile = client.accountProfile()
        val devices = client.devices()
        mutable.value = mutable.value.copy(profile = profile, devices = devices)
    }

    fun sendEmailVerification() = action("Could not send a verification code right now.") {
        client.sendEmailVerification()
        mutable.value = mutable.value.copy(message = "A 6-digit verification code was sent to your email.")
    }

    fun verifyEmail(code: String) = action("Invalid or expired verification code.") {
        val updated = client.verifyEmail(code)
        mutable.value = mutable.value.copy(profile = updated, message = "Email verified.")
    }

    fun changePassword(currentPassword: String, newPassword: String, onDone: () -> Unit = {}) = action(
        "Could not update your password. Check your current password and try again.",
    ) {
        client.changePassword(currentPassword, newPassword)
        val devices = client.devices()
        mutable.value = mutable.value.copy(
            devices = devices,
            message = "Password updated and other device sessions revoked.",
        )
        onDone()
    }

    fun revokeDevice(deviceId: String) = action("Could not revoke that device session.") {
        client.revokeDevice(deviceId)
        val devices = client.devices()
        mutable.value = mutable.value.copy(devices = devices, message = "Device session revoked.")
    }

    fun deleteAccount(password: String, mfaCode: String) = action(
        "Account deletion failed. Verify your password or MFA code and try again.",
    ) {
        client.deleteAccount(password, mfaCode)
        expiryJob?.cancel()
        mutable.value = clearedPrivateState(message = "Your CEA account has been permanently deleted.")
    }

    /* ---------------- Student Workspace (Courses, Assignments, Assessments) ---------------- */

    fun loadDashboard() = action {
        verifyCurrentRole(setOf("student"))
        val dashboard = client.studentDashboard()
        mutable.value = mutable.value.copy(dashboard = dashboard)
    }

    fun completeLesson(course: String, lesson: String) = action(
        "Could not confirm the updated progress. Verify your session and reload your courses before trying again.",
    ) {
        val item = mutable.value.dashboard?.courses?.firstOrNull { it.slug == course }
            ?.modules?.flatMap { it.lessons }?.firstOrNull { it.id == lesson }
        require(item?.completable() == true)
        client.completeLesson(course, lesson)
        val dashboard = client.studentDashboard()
        mutable.value = mutable.value.copy(
            dashboard = dashboard,
            message = "Completion saved. Learning records refreshed.",
        )
    }

    fun loadAssignments() = action("Could not load your assignments. Check your connection and try again.") {
        verifyCurrentRole(setOf("student"))
        val page = client.assignments(null)
        mutable.value = mutable.value.copy(
            assignments = mutable.value.assignments.copy(
                items = page.items,
                nextCursor = page.nextCursor,
                loaded = true,
            ),
        )
    }

    fun loadMoreAssignments() = action("Could not load additional assignments. Check your connection and try again.") {
        val cursor = mutable.value.assignments.nextCursor ?: return@action
        val page = client.assignments(cursor)
        val merged = (mutable.value.assignments.items + page.items).distinctBy { it.id }
        mutable.value = mutable.value.copy(
            assignments = mutable.value.assignments.copy(
                items = merged,
                nextCursor = page.nextCursor,
                loaded = true,
            ),
        )
    }

    fun openAssignment(assignmentId: String) = action(
        "Could not load the latest submission status. Check your connection and refresh.",
    ) {
        require(mutable.value.session.user?.roleKey == "student" && !mutable.value.session.mfaRequired)
        try {
            val detail = client.assignment(assignmentId)
            val sub = client.assignmentSubmission(assignmentId, detail.max)
            val updatedItems = mutable.value.assignments.items
                .map { if (it.id == assignmentId) detail else it }
                .let { list -> if (list.any { it.id == assignmentId }) list else list + detail }
            mutable.value = mutable.value.copy(
                assignments = mutable.value.assignments.copy(
                    items = updatedItems,
                    submissions = mutable.value.assignments.submissions + (assignmentId to sub),
                    submissionErrors = mutable.value.assignments.submissionErrors - assignmentId,
                ),
            )
        } catch (error: Exception) {
            if (client.session.user != null) {
                mutable.value = mutable.value.copy(
                    assignments = mutable.value.assignments.copy(
                        submissionErrors = mutable.value.assignments.submissionErrors + assignmentId,
                    ),
                )
            }
            throw error
        }
    }

    fun submitAssignment(assignmentId: String, answer: String) = action(
        "Could not confirm your submission. Refresh submission status before submitting again in case your answer already reached the server.",
    ) {
        val current = mutable.value.assignments
        val item = current.items.firstOrNull { it.id == assignmentId }
        require(
            mutable.value.session.user?.roleKey == "student" &&
                item != null &&
                assignmentId in current.submissions &&
                assignmentId !in current.submissionErrors &&
                item.submittable(current.submissions[assignmentId]),
        )
        client.submitAssignment(assignmentId, answer)
        val refreshedItem = client.assignment(assignmentId)
        val refreshedSub = client.assignmentSubmission(assignmentId, refreshedItem.max)
        val nextToken = (current.submittedDraftTokens[assignmentId] ?: 0) + 1
        mutable.value = mutable.value.copy(
            assignments = current.copy(
                items = current.items.map { if (it.id == assignmentId) refreshedItem else it },
                submissions = current.submissions + (assignmentId to refreshedSub),
                submissionErrors = current.submissionErrors - assignmentId,
                submittedDraftTokens = current.submittedDraftTokens + (assignmentId to nextToken),
            ),
            message = "Written answer submitted and confirmed by the Academy.",
        )
    }

    /** Presign → upload → submit in one flow so the file reference always matches the bytes sent. */
    fun submitAssignmentWithFile(
        assignmentId: String,
        answer: String,
        fileName: String,
        contentType: String,
        bytes: ByteArray,
    ) = action(
        "Could not submit the file. Your written answer was not sent either — nothing was submitted yet, so retry once the connection is stable.",
    ) {
        val current = mutable.value.assignments
        val item = current.items.firstOrNull { it.id == assignmentId }
        require(
            mutable.value.session.user?.roleKey == "student" &&
                item != null &&
                assignmentId in current.submissions &&
                assignmentId !in current.submissionErrors &&
                item.submittable(current.submissions[assignmentId]),
        )
        require(bytes.size in 1..10 * 1024 * 1024)
        require(contentType in NativeAuthClient.ALLOWED_UPLOAD_TYPES)
        val presigned = client.presignUpload(fileName, contentType)
        client.uploadFile(presigned, bytes)
        client.submitAssignmentWithFile(assignmentId, answer, presigned.key, formatBytes(bytes.size))
        val refreshedItem = client.assignment(assignmentId)
        val refreshedSub = client.assignmentSubmission(assignmentId, refreshedItem.max)
        val nextToken = (current.submittedDraftTokens[assignmentId] ?: 0) + 1
        mutable.value = mutable.value.copy(
            assignments = current.copy(
                items = current.items.map { if (it.id == assignmentId) refreshedItem else it },
                submissions = current.submissions + (assignmentId to refreshedSub),
                submissionErrors = current.submissionErrors - assignmentId,
                submittedDraftTokens = current.submittedDraftTokens + (assignmentId to nextToken),
            ),
            message = "File uploaded securely and submitted. Confirmed by the Academy.",
        )
    }

    private fun formatBytes(size: Int): String = when {
        size >= 1024 * 1024 -> String.format(java.util.Locale.US, "%.1f MB", size / (1024.0 * 1024.0))
        size >= 1024 -> String.format(java.util.Locale.US, "%.1f KB", size / 1024.0)
        else -> "$size B"
    }

    fun loadAssessments() = action("Could not load your assessments. Check your connection and try again.") {
        verifyCurrentRole(setOf("student"))
        val (items, cursor) = client.assessments(null)
        mutable.value = mutable.value.copy(
            assessments = StudentAssessmentsState(items = items, nextCursor = cursor, loaded = true),
        )
    }

    fun openAssessment(assessmentId: String) = action("Could not load that assessment.") {
        require(mutable.value.session.user?.roleKey == "student" && !mutable.value.session.mfaRequired)
        val detail = client.assessment(assessmentId)
        val updated = mutable.value.assessments.items
            .map { if (it.id == assessmentId) detail else it }
            .let { list -> if (list.any { it.id == assessmentId }) list else list + detail }
        mutable.value = mutable.value.copy(
            assessments = mutable.value.assessments.copy(items = updated, loaded = true),
        )
    }

    fun submitAssessment(assessmentId: String, answers: List<Int>) = action(
        "Could not submit your assessment answers. Refresh to verify your remaining attempts and official score.",
    ) {
        require(mutable.value.session.user?.roleKey == "student" && !mutable.value.session.mfaRequired)
        client.submitAssessment(assessmentId, answers)
        val refreshed = client.assessment(assessmentId)
        mutable.value = mutable.value.copy(
            assessments = mutable.value.assessments.copy(
                items = mutable.value.assessments.items.map { if (it.id == assessmentId) refreshed else it },
            ),
            message = "Assessment scored by the Academy: ${refreshed.score ?: 0} / ${refreshed.max ?: answers.size}.",
        )
    }

    /* ---------------- Communications (Messages & Notifications) ---------------- */

    fun loadMessages(more: Boolean = false) = action("Could not load conversations.") {
        if (!more) verifyCurrentRole()
        val cursor = if (more) mutable.value.messagesNextCursor ?: return@action else null
        val (items, next) = client.messageThreads(cursor)
        val merged = if (more) (mutable.value.messageThreads + items).distinctBy { it.id } else items
        mutable.value = mutable.value.copy(
            messageThreads = merged,
            messagesNextCursor = next,
            selectedThread = if (more) mutable.value.selectedThread else null,
        )
    }

    fun openMessageThread(threadId: String) = action("Could not open conversation.") {
        val thread = client.messageThread(threadId)
        mutable.value = mutable.value.copy(
            selectedThread = thread,
            messageThreads = mutable.value.messageThreads.map { if (it.id == threadId) thread.copy(unread = 0) else it },
        )
    }

    fun closeMessageThread() {
        mutable.value = mutable.value.copy(selectedThread = null)
    }

    fun sendMessage(threadId: String, body: String, onSent: () -> Unit = {}) = action("Could not send reply.") {
        client.sendMessage(threadId, body)
        val refreshed = client.messageThread(threadId)
        mutable.value = mutable.value.copy(
            selectedThread = refreshed,
            messageThreads = mutable.value.messageThreads.map { if (it.id == threadId) refreshed else it },
            message = "Reply sent.",
        )
        onSent()
    }

    fun loadNotifications(more: Boolean = false) = action("Could not load notifications.") {
        if (!more) verifyCurrentRole()
        val cursor = if (more) mutable.value.notificationsNextCursor ?: return@action else null
        val (items, next) = client.notifications(cursor)
        val merged = if (more) (mutable.value.notifications + items).distinctBy { it.id } else items
        mutable.value = mutable.value.copy(notifications = merged, notificationsNextCursor = next)
    }

    fun markNotificationRead(id: String) = action("Could not update notification.") {
        client.markNotificationRead(id)
        mutable.value = mutable.value.copy(
            notifications = mutable.value.notifications.map { if (it.id == id) it.copy(read = true) else it },
        )
    }

    fun markAllNotificationsRead() = action("Could not mark notifications read.") {
        client.markAllNotificationsRead()
        mutable.value = mutable.value.copy(
            notifications = mutable.value.notifications.map { it.copy(read = true) },
            message = "All notifications marked read.",
        )
    }

    /* ---------------- Instructor Workspace ---------------- */

    fun loadInstructorWorkspace(moreSubmissions: Boolean = false) = action("Could not load instructor workspace.") {
        if (!moreSubmissions) verifyCurrentRole(setOf("instructor", "admin"))
        val cursor = if (moreSubmissions) mutable.value.instructorNextCursor ?: return@action else null
        val courses = if (moreSubmissions) mutable.value.instructorCourses else client.instructorCourses()
        val (subs, next) = client.instructorSubmissions(cursor)
        val merged = if (moreSubmissions) (mutable.value.instructorSubmissions + subs).distinctBy { it.id } else subs
        mutable.value = mutable.value.copy(
            instructorCourses = courses,
            instructorSubmissions = merged,
            instructorNextCursor = next,
        )
    }

    fun openInstructorSubmission(id: String) = action("Could not open submission details.") {
        val detail = client.instructorSubmission(id)
        mutable.value = mutable.value.copy(selectedInstructorSubmission = detail)
    }

    fun closeInstructorSubmission() {
        mutable.value = mutable.value.copy(selectedInstructorSubmission = null)
    }

    fun gradeInstructorSubmission(id: String, score: Int, feedback: String) = action(
        "Could not record grade. Refresh the queue in case a newer attempt was submitted.",
    ) {
        client.gradeSubmission(id, score, feedback)
        val refreshedDetail = client.instructorSubmission(id)
        val (subs, next) = client.instructorSubmissions(null)
        mutable.value = mutable.value.copy(
            selectedInstructorSubmission = refreshedDetail,
            instructorSubmissions = subs,
            instructorNextCursor = next,
            message = "Grade recorded and published to the learner.",
        )
    }

    /* ---------------- Public Application Draft & Admissions / Finance ---------------- */

    fun updateApplicationDraft(next: ApplicationDraft) {
        if (next != mutable.value.applicationDraft) {
            activeSubmissionKey = UUID.randomUUID().toString()
            mutable.value = mutable.value.copy(applicationDraft = next)
        }
    }

    fun prefillApplicationProgram(slug: String) {
        if (slug.isNotBlank() && slug != mutable.value.applicationDraft.programSlug) {
            activeSubmissionKey = UUID.randomUUID().toString()
            mutable.value = mutable.value.copy(
                applicationDraft = mutable.value.applicationDraft.copy(programSlug = slug),
            )
        }
    }

    fun saveDraftLocally() = action("Could not save draft to encrypted device storage.") {
        val snapshot = mutable.value.applicationDraft
        withContext(Dispatchers.IO) { draftStore.write(snapshot) }
        mutable.value = mutable.value.copy(
            draftSavedLocally = true,
            message = "Draft encrypted and saved on this phone only.",
        )
    }

    fun clearLocalDraft() = action("Could not clear local draft.") {
        withContext(Dispatchers.IO) { draftStore.clear() }
        activeSubmissionKey = UUID.randomUUID().toString()
        mutable.value = mutable.value.copy(
            applicationDraft = ApplicationDraft(),
            draftSavedLocally = false,
            message = "Local draft cleared from this phone.",
        )
    }

    fun submitApplication() = action("Could not submit your application. Your details are still on screen so you can retry safely.") {
        val draft = mutable.value.applicationDraft
        val ref = client.submitApplication(draft, activeSubmissionKey)
        withContext(Dispatchers.IO) { draftStore.clear() }
        activeSubmissionKey = UUID.randomUUID().toString()
        mutable.value = mutable.value.copy(
            applicationDraft = ApplicationDraft(programSlug = draft.programSlug),
            draftSavedLocally = false,
            lastSubmittedRef = ref,
            message = "Free application submitted ($ref).",
        )
    }

    fun loadMyEnrollments() = action(
        "Could not load your applications. Ensure your email is verified in Security settings.",
    ) {
        verifyCurrentRole()
        val items = client.myEnrollments()
        mutable.value = mutable.value.copy(
            myEnrollments = items,
            selectedEnrollment = null,
            selectedReceipt = null,
        )
    }

    fun openEnrollment(ref: String) = action("Could not load enrolment details.") {
        val detail = client.enrollmentDetail(ref)
        mutable.value = mutable.value.copy(selectedEnrollment = detail, selectedReceipt = null)
    }

    fun closeEnrollment() {
        mutable.value = mutable.value.copy(selectedEnrollment = null, selectedReceipt = null)
    }

    /* ---------------- 0.8: online tuition payment ---------------- */

    fun startOnlinePayment(ref: String, kind: String) = action(
        "Could not start online payment. If a payment page was already opened, finish it there instead of starting again.",
    ) {
        verifyCurrentRole()
        val clean = ref.trim().uppercase(java.util.Locale.US)
        // Stable per-enrollment key: retrying the same intent resumes the same checkout.
        val checkoutKey = checkoutKeys.getOrPut(clean) { UUID.randomUUID().toString() }
        val start = client.startTuitionPayment(clean, kind, checkoutKey)
        mutable.value = mutable.value.copy(paymentStart = start)
    }

    fun verifyOnlinePayment(ref: String) = action("Could not check the payment status.") {
        verifyCurrentRole()
        val clean = ref.trim().uppercase(java.util.Locale.US)
        val status = client.verifyTuitionPayment(clean)
        val refreshed = runCatching { client.enrollmentDetail(clean) }.getOrNull()
        mutable.value = mutable.value.copy(
            paymentStatus = status,
            selectedEnrollment = refreshed ?: mutable.value.selectedEnrollment,
            message = when {
                status.verified -> "Payment verified — the Academy has marked this enrollment paid."
                status.status == "pending" -> "Payment is still pending. Complete the checkout page, then check again."
                else -> "No completed online payment yet for this enrollment."
            },
        )
    }

    fun clearPaymentStart() {
        mutable.value = mutable.value.copy(paymentStart = null)
    }

    fun acceptTuitionOffer(ref: String, version: Int) = action("Could not accept tuition offer.") {
        client.acceptOffer(ref, version)
        val refreshed = client.enrollmentDetail(ref)
        mutable.value = mutable.value.copy(
            selectedEnrollment = refreshed,
            message = "Official tuition offer accepted.",
        )
    }

    fun reportTransferProof(
        ref: String,
        kind: String,
        amount: Double,
        senderName: String,
        bankName: String,
        bankRef: String,
        onDone: () -> Unit = {},
    ) = action("Could not submit transfer proof. Verify offer acceptance and amount.") {
        client.reportTransfer(ref, kind, amount, senderName, bankName, bankRef)
        val refreshed = client.enrollmentDetail(ref)
        mutable.value = mutable.value.copy(
            selectedEnrollment = refreshed,
            message = "Transfer claim recorded for finance review. Official payment status updates after verification.",
        )
        onDone()
    }

    fun loadOfficialReceipt(ref: String) = action("Official receipt is available once a verified payment is recorded.") {
        val receipt = client.enrollmentReceipt(ref)
        mutable.value = mutable.value.copy(selectedReceipt = receipt)
    }

    fun loadStaffWorkspace() = action("Could not load admissions and finance records.") {
        val verified = verifyCurrentRole(setOf("admin", "admissions", "finance"))
        val enrollments = client.staffEnrollments()
        val proofs = if (verified.user?.roleKey in setOf("admin", "finance")) client.paymentProofs() else emptyList()
        mutable.value = mutable.value.copy(staffEnrollments = enrollments, paymentProofs = proofs)
    }

    fun confirmPaymentProof(id: String, bankReference: String, receivedAmount: Double) = action(
        "Could not confirm bank transfer proof.",
    ) {
        client.confirmPaymentProof(id, bankReference, receivedAmount)
        val enrollments = client.staffEnrollments()
        val proofs = client.paymentProofs()
        mutable.value = mutable.value.copy(
            staffEnrollments = enrollments,
            paymentProofs = proofs,
            message = "Payment verified and student receipt updated.",
        )
    }

    fun rejectPaymentProof(id: String, reason: String) = action("Could not reject transfer proof.") {
        client.rejectPaymentProof(id, reason)
        val proofs = client.paymentProofs()
        mutable.value = mutable.value.copy(
            paymentProofs = proofs,
            message = "Transfer claim marked rejected.",
        )
    }

    /* ---------------- Home hub (portal summary, unread, AI recommendations) ---------------- */

    fun loadHome() = action("Could not load your home overview. Check your connection and try again.") {
        if (client.session.user == null || client.session.mfaRequired) {
            mutable.value = mutable.value.copy(home = mutable.value.home.copy(loaded = true))
            return@action
        }
        verifyCurrentRole()
        val portal = client.portalSummary(null)
        val unread = client.unreadCount()
        mutable.value = mutable.value.copy(
            home = mutable.value.home.copy(portal = portal, unread = unread, loaded = true),
        )
    }

    fun loadAiRecommendations() = action("Could not load tutor recommendations.") {
        verifyCurrentRole(setOf("student"))
        val items = client.aiRecommendations()
        mutable.value = mutable.value.copy(home = mutable.value.home.copy(recommendations = items))
    }

    /* ---------------- Learn hub extras ---------------- */

    fun loadCourseCatalog() = action("Could not load the course list.") {
        verifyCurrentRole()
        val page = client.coursesPage(null)
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                coursesList = page.items,
                coursesCursor = page.nextCursor,
                coursesLoaded = true,
            ),
        )
    }

    fun loadMoreCourseCatalog() = action("Could not load more courses.") {
        val cursor = mutable.value.learn.coursesCursor ?: return@action
        val page = client.coursesPage(cursor)
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                coursesList = (mutable.value.learn.coursesList + page.items).distinctBy { it.slug },
                coursesCursor = page.nextCursor,
            ),
        )
    }

    fun loadGradebook(more: Boolean = false) = action("Could not load your gradebook.") {
        verifyCurrentRole(setOf("student"))
        val cursor = if (more) mutable.value.learn.gradebookCursor else null
        val page = client.gradebook(cursor)
        val current = if (more) mutable.value.learn.gradebook else emptyList()
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                gradebook = (current + page.first).distinctBy { it.name },
                gradebookCursor = page.second,
                gradebookLoaded = true,
            ),
        )
    }

    fun loadCertificates() = action("Could not load your certificates.") {
        verifyCurrentRole()
        val items = client.certificatesMine()
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(certificates = items, certificatesLoaded = true),
        )
    }

    fun loadCalendar(more: Boolean = false) = action("Could not load the class calendar.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.learn.calendarCursor else null
        val page = client.calendarEvents(cursor)
        val current = if (more) mutable.value.learn.calendar else emptyList()
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                calendar = (current + page.first).distinctBy { it.id },
                calendarCursor = page.second,
                calendarLoaded = true,
            ),
        )
    }

    fun attendanceCheckIn(code: String) = action("That class code is invalid or has expired.") {
        verifyCurrentRole(setOf("student"))
        val result = client.attendanceCheckIn(code)
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(lastCheckIn = result),
            message = if (result.alreadyCheckedIn) {
                "You are already marked present for ${result.course.ifBlank { "this class" }}."
            } else {
                "Checked in as present for ${result.course.ifBlank { "class" }}."
            },
        )
    }

    fun loadPaymentHistory(more: Boolean = false) = action("Could not load your payment history.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.learn.paymentCursor else null
        val page = client.paymentHistory(cursor)
        val current = if (more) mutable.value.learn.paymentHistory else emptyList()
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                paymentHistory = (current + page.first).distinctBy { it.id },
                paymentCursor = page.second,
                paymentsLoaded = true,
            ),
        )
    }

    /* ---------------- Live classes hub ---------------- */

    fun loadLiveClasses(more: Boolean = false) = action("Could not load live classes.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.live.nextCursor else null
        val page = client.liveClasses(cursor)
        val current = if (more) mutable.value.live.classes else emptyList()
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(
                classes = (current + page.first).distinctBy { it.id },
                nextCursor = page.second,
                loaded = true,
            ),
        )
    }

    fun openLiveClass(id: String) = action("Could not open that live class.") {
        verifyCurrentRole()
        val detail = client.liveClass(id)
        val chat = client.liveChat(id, null)
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(
                selectedId = id,
                selected = detail,
                chat = chat.first,
                chatCursor = chat.second,
                chatLoaded = true,
            ),
        )
    }

    fun closeLiveClass() {
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(selectedId = null, selected = null, chat = emptyList(), chatCursor = null, chatLoaded = false),
        )
    }

    fun refreshLiveChat() = action("Could not refresh class chat.") {
        val id = mutable.value.live.selectedId ?: return@action
        val chat = client.liveChat(id, null)
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(chat = chat.first, chatCursor = chat.second, chatLoaded = true),
        )
    }

    fun sendLiveChat(text: String, onSent: () -> Unit = {}) = action("Could not post to class chat.") {
        val id = mutable.value.live.selectedId ?: return@action
        val sent = client.sendLiveChat(id, text)
        val chat = client.liveChat(id, null)
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(
                chat = chat.first.ifEmpty { mutable.value.live.chat + sent },
                chatCursor = chat.second,
            ),
            message = "Posted to class chat.",
        )
        onSent()
    }

    /* ---------------- 0.8: live class polls ---------------- */

    fun loadLivePolls(more: Boolean = false) = action("Could not load the class polls.") {
        val id = mutable.value.live.selectedId ?: return@action
        val cursor = if (more) mutable.value.live.pollsCursor else null
        val page = client.livePolls(id, cursor)
        val current = if (more) mutable.value.live.polls else emptyList()
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(
                polls = (current + page.first).distinctBy { it.id },
                pollsCursor = page.second,
                pollsLoaded = true,
            ),
        )
    }

    fun voteLivePoll(pollId: String, option: String) = action("Could not register your vote.") {
        val id = mutable.value.live.selectedId ?: return@action
        val updated = client.voteLivePoll(id, pollId, option)
        val polls = mutable.value.live.polls.map { if (it.id == pollId) updated else it }
        mutable.value = mutable.value.copy(
            live = mutable.value.live.copy(polls = polls),
            message = "Vote recorded.",
        )
    }

    /* ---------------- Career hub ---------------- */

    fun loadMentors(more: Boolean = false) = action("Could not load mentor profiles.") {
        verifyCurrentRole(setOf("student", "alumni", "mentor", "admin"))
        val cursor = if (more) mutable.value.career.mentorsCursor else null
        val page = client.mentorProfiles(cursor)
        val current = if (more) mutable.value.career.mentors else emptyList()
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(
                mentors = (current + page.first).distinctBy { it.id },
                mentorsCursor = page.second,
                mentorsLoaded = true,
            ),
        )
    }

    fun requestMentor(mentorId: String, goal: String) = action("Could not send your mentor request.") {
        verifyCurrentRole(setOf("student", "alumni", "mentor", "admin"))
        val result = client.requestMentor(mentorId, goal)
        mutable.value = mutable.value.copy(
            message = if (result.alreadyRequested) {
                "You already have a pending request with ${result.mentor}."
            } else {
                "Mentor request sent to ${result.mentor}. The Academy will review it."
            },
        )
    }

    fun matchMentor(goal: String) = action("Could not find mentor matches right now.") {
        verifyCurrentRole(setOf("student", "alumni", "mentor", "admin"))
        val match = client.matchMentor(goal)
        mutable.value = mutable.value.copy(career = mutable.value.career.copy(match = match))
    }

    fun loadJobs(more: Boolean = false) = action("Could not load opportunities.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.career.jobsCursor else null
        val page = client.jobPostings(cursor)
        val current = if (more) mutable.value.career.jobs else emptyList()
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(
                jobs = (current + page.first).distinctBy { it.id },
                jobsCursor = page.second,
                jobsLoaded = true,
            ),
        )
    }

    fun loadTalentPool(more: Boolean = false) = action("Could not load the talent pool.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.career.talentCursor else null
        val page = client.talentPool(cursor)
        val current = if (more) mutable.value.career.talent else emptyList()
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(
                talent = (current + page.first).distinctBy { it.id },
                talentCursor = page.second,
                talentLoaded = true,
            ),
        )
    }

    fun loadInterviews(more: Boolean = false) = action("Could not load interviews.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.career.interviewsCursor else null
        val page = client.interviews(cursor)
        val current = if (more) mutable.value.career.interviews else emptyList()
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(
                interviews = (current + page.first).distinctBy { it.id },
                interviewsCursor = page.second,
                interviewsLoaded = true,
            ),
        )
    }

    /* ---------------- 0.8: portfolio projects (career engine) ---------------- */

    fun loadPortfolioProjects(more: Boolean = false) = action("Could not load your portfolio projects.") {
        verifyCurrentRole(setOf("student", "admin"))
        val cursor = if (more) mutable.value.career.projectsCursor else null
        val page = client.portfolioProjects(cursor)
        val current = if (more) mutable.value.career.projects else emptyList()
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(
                projects = (current + page.first).distinctBy { it.id },
                projectsCursor = page.second,
                projectsLoaded = true,
            ),
        )
    }

    fun addPortfolioProject(name: String, detail: String, tags: List<String>, url: String) = action(
        "Could not add the project to your portfolio. Check the details and try again.",
    ) {
        verifyCurrentRole(setOf("student", "admin"))
        val project = client.addPortfolioProject(name, detail, tags, url.ifBlank { null })
        mutable.value = mutable.value.copy(
            career = mutable.value.career.copy(projects = listOf(project) + mutable.value.career.projects),
            message = "Project added to your portfolio.",
        )
    }

    fun loadSelfRecords(more: Boolean = false) = action("Could not load your attendance records.") {
        verifyCurrentRole(setOf("student", "admin"))
        val cursor = if (more) mutable.value.learn.selfRecordsCursor else null
        val page = client.selfRecords(cursor)
        val current = if (more) mutable.value.learn.selfRecords else emptyList()
        mutable.value = mutable.value.copy(
            learn = mutable.value.learn.copy(
                selfRecords = (current + page.first).distinctBy { it.id },
                selfRecordsCursor = page.second,
                selfRecordsLoaded = true,
            ),
        )
    }

    /* ---------------- 0.8: instructor attendance session ---------------- */

    fun createAttendanceSession(course: String, durationMinutes: Int) = action(
        "Could not start an attendance session. Enter a course name and duration, then retry.",
    ) {
        verifyCurrentRole(setOf("instructor", "admin"))
        val session = client.createAttendanceSession(course, durationMinutes)
        mutable.value = mutable.value.copy(
            attendanceSession = session,
            message = "Attendance session started. Share code ${session.code} with the class.",
        )
    }

    /* ---------------- Discover hub (public data + certificate verify + AI tutor) ---------------- */

    fun loadCohorts() = action("Could not load intake dates.") {
        try {
            val items = client.cohorts(null)
            val next = client.cohortsNext(null)
            publicCache.write("cohorts", cacheJson.encodeToString(PublicCache.CachedCohorts(items, System.currentTimeMillis())))
            mutable.value = mutable.value.copy(
                discover = mutable.value.discover.copy(
                    cohorts = items,
                    cohortsLoaded = true,
                    nextCohort = next,
                    nextCohortLoaded = true,
                    cohortsFromCache = false,
                ),
            )
        } catch (error: Exception) {
            if (error is CancellationException) throw error
            // Offline fallback: last good public snapshot.
            val cached = publicCache.read("cohorts")
                ?.let { raw -> runCatching { cacheJson.decodeFromString<PublicCache.CachedCohorts>(raw) }.getOrNull() }
            if (cached != null) {
                mutable.value = mutable.value.copy(
                    discover = mutable.value.discover.copy(
                        cohorts = cached.items,
                        cohortsLoaded = true,
                        cohortsFromCache = true,
                    ),
                )
            } else {
                throw error
            }
        }
    }

    /** Public: fetch the cohort .ics file so the UI can hand it to a calendar app. */
    fun shareCohortIcs(icsPath: String) = action("Could not fetch the cohort calendar file.") {
        val id = icsPath.trim().substringAfterLast('/')
        val ics = client.cohortIcs(id)
        mutable.value = mutable.value.copy(discover = mutable.value.discover.copy(cohortIcs = ics))
    }

    fun clearCohortIcs() {
        mutable.value = mutable.value.copy(discover = mutable.value.discover.copy(cohortIcs = null))
    }

    fun loadLibraryCatalog(more: Boolean = false) = action("Could not load the public library.") {
        val cursor = if (more) mutable.value.discover.libraryCursor else null
        try {
            val page = client.libraryCatalog(cursor)
            val current = if (more) mutable.value.discover.libraryItems else emptyList()
            if (!more) {
                publicCache.write(
                    "library",
                    cacheJson.encodeToString(
                        PublicCache.CachedLibrary(
                            sources = page.first,
                            items = current + page.second,
                            nextCursor = page.third,
                            fetchedAt = System.currentTimeMillis(),
                        ),
                    ),
                )
            }
            mutable.value = mutable.value.copy(
                discover = mutable.value.discover.copy(
                    librarySources = page.first,
                    libraryItems = (current + page.second).distinctBy { it.id },
                    libraryCursor = page.third,
                    libraryLoaded = true,
                    libraryFromCache = false,
                ),
            )
        } catch (error: Exception) {
            if (error is CancellationException) throw error
            if (!more) {
                val cached = publicCache.read("library")
                    ?.let { raw -> runCatching { cacheJson.decodeFromString<PublicCache.CachedLibrary>(raw) }.getOrNull() }
                if (cached != null) {
                    mutable.value = mutable.value.copy(
                        discover = mutable.value.discover.copy(
                            librarySources = cached.sources,
                            libraryItems = cached.items,
                            libraryCursor = cached.nextCursor,
                            libraryLoaded = true,
                            libraryFromCache = true,
                        ),
                    )
                    return@action
                }
            }
            throw error
        }
    }

    fun loadLibraryAuthed(more: Boolean = false) = action("Sign in to open protected course materials.") {
        verifyCurrentRole()
        val cursor = if (more) mutable.value.discover.libraryCursor else null
        val page = client.libraryItems(cursor)
        val current = if (more) mutable.value.discover.libraryItems else emptyList()
        mutable.value = mutable.value.copy(
            discover = mutable.value.discover.copy(
                libraryItems = (current + page.first).distinctBy { it.id },
                libraryCursor = page.second,
                libraryLoaded = true,
                libraryAuthed = true,
            ),
        )
    }

    fun loadShop() = action("Could not load the digital shop catalog.") {
        try {
            val catalog = client.shopCatalog()
            publicCache.write("shop", cacheJson.encodeToString(PublicCache.CachedShop(catalog, System.currentTimeMillis())))
            mutable.value = mutable.value.copy(
                discover = mutable.value.discover.copy(shop = catalog, shopLoaded = true, shopFromCache = false),
            )
        } catch (error: Exception) {
            if (error is CancellationException) throw error
            val cached = publicCache.read("shop")
                ?.let { raw -> runCatching { cacheJson.decodeFromString<PublicCache.CachedShop>(raw) }.getOrNull() }
            if (cached != null) {
                mutable.value = mutable.value.copy(
                    discover = mutable.value.discover.copy(shop = cached.catalog, shopLoaded = true, shopFromCache = true),
                )
            } else {
                throw error
            }
        }
    }

    fun verifyCertificate(code: String) = action("Could not verify that certificate code.") {
        val result = client.verifyCertificate(code)
        mutable.value = mutable.value.copy(
            discover = mutable.value.discover.copy(verification = result),
            message = if (result.valid) "Certificate ${result.code} is valid." else "No certificate matches that code.",
        )
    }

    fun askAssistant(question: String) = action("The tutor could not answer right now. Try again.") {
        verifyCurrentRole()
        val turns = mutable.value.discover.assistant + AssistantTurn("user", question.trim())
        mutable.value = mutable.value.copy(discover = mutable.value.discover.copy(assistant = turns))
        val answer = client.aiAsk(question)
        mutable.value = mutable.value.copy(
            discover = mutable.value.discover.copy(
                assistant = mutable.value.discover.assistant + AssistantTurn("assistant", answer.answer),
            ),
            message = if (answer.mock) "Tutor answered in offline practice mode." else null,
        )
    }

    fun resetAssistant() {
        mutable.value = mutable.value.copy(discover = mutable.value.discover.copy(assistant = emptyList()))
    }

    fun signOut() = action(
        "Secure sign-out could not be completed. Clear this app’s storage in Android settings before sharing this phone.",
    ) {
        mutable.value = clearedPrivateState(busy = true)
        val revoked = client.signOut()
        expiryJob?.cancel()
        mutable.value = clearedPrivateState(
            message = if (revoked) {
                "Signed out."
            } else {
                "Signed out on this phone. Server revocation could not be confirmed. Use Security settings on another signed-in device to revoke this session if needed."
            },
        )
    }

    fun cancelMfa() = action {
        client.forget()
        expiryJob?.cancel()
        mutable.value = clearedPrivateState(
            message = "Verification cancelled on this phone. The unverified server session has not been revoked; it cannot access your account without MFA.",
        )
    }

    override fun onCleared() {
        client.dropMemory()
        super.onCleared()
    }
}
