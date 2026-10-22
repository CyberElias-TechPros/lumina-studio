package ng.cea.nativeapp

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class AccountState(
    val session: NativeSession = NativeSession(),
    val busy: Boolean = false,
    val message: String? = null,
    val needsCheck: Boolean = false,
    val dashboard: StudentDashboard? = null,
    val assignments: StudentAssignmentsState = StudentAssignmentsState(),
)

class AccountViewModel(application: Application) : AndroidViewModel(application) {
    private val client = NativeAuthClient(store = KeystoreSessionStore(application))
    private val mutable = MutableStateFlow(AccountState())
    val state = mutable.asStateFlow()
    private var expiryJob: Job? = null

    init {
        action {
            if (client.restore()) {
                mutable.value = AccountState(busy = true, needsCheck = true)
                accepted(client.checkSession())
            }
        }
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
                    403 -> "Access is unavailable for this account. Contact the Academy."
                    404 -> "That learning record could not be found. Refresh and try again."
                    409 -> "This assignment is no longer accepting submissions. Refresh to view your latest status and feedback."
                    400, 422 -> "Check your details or verification code and try again."
                    429 -> "Too many attempts. Wait before trying again."
                    else -> failureMessage ?: "Could not verify your account. Check your connection and try again."
                }
                val keepVerified =
                    mutable.value.session.user != null &&
                        client.session.user != null &&
                        !client.session.mfaRequired &&
                        client.session.expiresAt > System.currentTimeMillis()
                mutable.value = if (keepVerified) {
                    mutable.value.copy(session = client.session, message = message, needsCheck = false)
                } else {
                    AccountState(
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

    private fun accepted(session: NativeSession) {
        mutable.value = AccountState(session = session, busy = true)
        expiryJob?.cancel()
        expiryJob = viewModelScope.launch {
            delay((session.expiresAt - System.currentTimeMillis()).coerceAtLeast(0))
            // Do not race an in-flight refresh; each completed response is expiry validated.
            while (mutable.value.busy) delay(100)
            if (client.session.expiresAt <= System.currentTimeMillis()) {
                mutable.value = AccountState(busy = true)
                try {
                    client.forget()
                    mutable.value = AccountState(message = "Your session expired. Sign in again.")
                } catch (_: Exception) {
                    mutable.value = AccountState(
                        message = "Your session expired. Secure storage could not be cleared; clear this app’s storage in Android settings before sharing this phone.",
                    )
                }
            }
        }
    }

    private suspend fun verifyCurrentStudent(): NativeSession {
        val previousUserId = mutable.value.session.user?.id
        val previousDashboard = mutable.value.dashboard
        val previousAssignments = mutable.value.assignments
        mutable.value = AccountState(busy = true, needsCheck = true)
        val verified = client.checkSession()
        accepted(verified)
        if (previousUserId != null && verified.user?.id == previousUserId && verified.user.roleKey == "student") {
            mutable.value = mutable.value.copy(
                dashboard = previousDashboard,
                assignments = previousAssignments,
            )
        }
        return verified
    }

    fun signIn(email: String, password: String, remember: Boolean) = action {
        accepted(client.signIn(email, password, remember))
    }

    fun verify(code: String) = action { accepted(client.verify(code)) }
    fun refresh() = action { accepted(client.refresh()) }

    fun checkSession() {
        if (!client.hasSession() || client.session.mfaRequired) return
        action {
            mutable.value = AccountState(busy = true, needsCheck = true)
            accepted(client.checkSession())
        }
    }

    fun loadDashboard() = action {
        verifyCurrentStudent()
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
        // No optimistic completion: display only the refreshed server record.
        val dashboard = client.studentDashboard()
        mutable.value = mutable.value.copy(
            dashboard = dashboard,
            message = "Completion saved. Learning records refreshed.",
        )
    }

    fun loadAssignments() = action("Could not load your assignments. Check your connection and try again.") {
        verifyCurrentStudent()
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
        // No optimistic submission or grade: display only the refreshed server records.
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

    fun signOut() = action(
        "Secure sign-out could not be completed. Clear this app’s storage in Android settings before sharing this phone.",
    ) {
        // Hide account details immediately, including when the device is offline.
        mutable.value = AccountState(busy = true)
        val revoked = client.signOut()
        expiryJob?.cancel()
        mutable.value = AccountState(
            message = if (revoked) {
                "Signed out."
            } else {
                "Signed out on this phone. Server revocation could not be confirmed. Use the website's session controls to revoke this session if needed."
            },
        )
    }

    fun cancelMfa() = action {
        client.forget()
        expiryJob?.cancel()
        mutable.value = AccountState(
            message = "Verification cancelled on this phone. The unverified server session has not been revoked; it cannot access your account without MFA.",
        )
    }

    override fun onCleared() {
        client.dropMemory()
        super.onCleared()
    }
}
