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

data class AccountState(val session: NativeSession = NativeSession(), val busy: Boolean = false, val message: String? = null, val needsCheck: Boolean = false, val dashboard: StudentDashboard? = null)
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
            try { block() }
            catch (error: CancellationException) { throw error }
            catch (error: Exception) {
                val message = when ((error as? AuthFailure)?.status) {
                    401 -> "Sign-in failed or your session expired. Check your details and sign in again."
                    403 -> "Access is unavailable for this account. Contact the Academy."
                    400, 422 -> "Check your details or verification code and try again."
                    429 -> "Too many attempts. Wait before trying again."
                    else -> failureMessage ?: "Could not verify your account. Check your connection and try again."
                }
                mutable.value = AccountState(session = if (client.session.mfaRequired) client.session else NativeSession(), message = message, needsCheck = client.hasSession() && !client.session.mfaRequired)
            } finally { mutable.value = mutable.value.copy(busy = false) }
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
                    mutable.value = AccountState(message = "Your session expired. Secure storage could not be cleared; clear this app’s storage in Android settings before sharing this phone.")
                }
            }
        }
    }
    fun signIn(email: String, password: String, remember: Boolean) = action { accepted(client.signIn(email, password, remember)) }
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
        mutable.value = AccountState(busy = true, needsCheck = true)
        accepted(client.checkSession())
        val dashboard = client.studentDashboard()
        mutable.value = mutable.value.copy(dashboard = dashboard)
    }
    fun completeLesson(course: String, lesson: String) = action("Could not confirm the updated progress. Verify your session and reload your courses before trying again.") {
        val item = mutable.value.dashboard?.courses?.firstOrNull { it.slug == course }
            ?.modules?.flatMap { it.lessons }?.firstOrNull { it.id == lesson }
        require(item?.completable() == true)
        client.completeLesson(course, lesson)
        // No optimistic completion: display only the refreshed server record.
        val dashboard = client.studentDashboard()
        mutable.value = mutable.value.copy(dashboard = dashboard, message = "Completion saved. Learning records refreshed.")
    }
    fun signOut() = action {
        // Hide account details immediately, including when the device is offline.
        mutable.value = AccountState(busy = true)
        val revoked = client.signOut()
        expiryJob?.cancel()
        mutable.value = AccountState(message = if (revoked) "Signed out." else "Signed out on this phone. Server revocation could not be confirmed. Use the website's session controls to revoke this session if needed.")
    }
    fun cancelMfa() = action {
        client.forget(); expiryJob?.cancel()
        mutable.value = AccountState(message = "Verification cancelled on this phone. The unverified server session has not been revoked; it cannot access your account without MFA.")
    }
    override fun onCleared() { client.dropMemory(); super.onCleared() }
}
