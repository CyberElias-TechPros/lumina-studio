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
)

class AccountViewModel(application: Application) : AndroidViewModel(application) {
    private val client = NativeAuthClient(store = KeystoreSessionStore(application))
    private val draftStore: DraftStore = KeystoreDraftStore(application)
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
