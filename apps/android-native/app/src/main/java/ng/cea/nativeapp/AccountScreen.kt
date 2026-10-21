package ng.cea.nativeapp

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LifecycleEventEffect
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun NativeAccount() {
    val model: AccountViewModel = viewModel()
    val state by model.state.collectAsStateWithLifecycle()
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { model.checkSession() }
    AccountScreen(state, model::signIn, model::verify, model::checkSession, model::refresh, model::signOut, model::cancelMfa)
}

@Composable
fun AccountScreen(state: AccountState, signIn: (String, String) -> Unit, verify: (String) -> Unit,
                  checkSession: () -> Unit, refresh: () -> Unit, signOut: () -> Unit, cancelMfa: () -> Unit) {
    // Secrets deliberately do not use rememberSaveable or SavedStateHandle.
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var code by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().verticalScroll(rememberScrollState()).padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Your CEA account", style = MaterialTheme.typography.headlineMedium)
        Text("Use your existing Academy account. This preview keeps your session only in app memory; restarting the process requires sign-in again.")
        if (state.busy) { LinearProgressIndicator(Modifier.fillMaxWidth()); Text("Checking with the Academy…") }
        state.message?.let { Text(it, modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite }) }
        when {
            state.needsCheck -> {
                Text("Your account must be verified online before its details can be shown.")
                Button(onClick = checkSession, enabled = !state.busy) { Text("Check session") }
                OutlinedButton(onClick = signOut, enabled = !state.busy) { Text("Sign out on this phone") }
            }
            state.session.mfaRequired -> {
                Text("Two-step verification", style = MaterialTheme.typography.titleLarge)
                Text("Enter your authenticator code or an unused recovery code. You are not signed in until verification succeeds.")
                OutlinedTextField(value = code, onValueChange = { code = it.take(32) }, label = { Text("Verification or recovery code") },
                    visualTransformation = PasswordVisualTransformation(), keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    enabled = !state.busy, singleLine = true, modifier = Modifier.fillMaxWidth())
                Button(onClick = { val submitted = code; code = ""; verify(submitted) }, enabled = !state.busy && code.trim().length >= 6) { Text("Verify code") }
                OutlinedButton(onClick = { code = ""; cancelMfa() }, enabled = !state.busy) { Text("Cancel verification") }
            }
            state.session.user != null -> {
                val user = state.session.user
                Text("Signed in as ${user.name}", style = MaterialTheme.typography.titleLarge)
                Text(user.email)
                Text("Account role: ${user.roleKey}")
                Text("This role comes from the Academy server. Private courses, assignments and role workspaces are not implemented in this preview yet.")
                OutlinedButton(onClick = refresh, enabled = !state.busy) { Text("Renew session") }
                Button(onClick = signOut, enabled = !state.busy) { Text("Sign out") }
            }
            else -> {
                OutlinedTextField(value = email, onValueChange = { email = it.take(254) }, label = { Text("Email address") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email), enabled = !state.busy, singleLine = true, modifier = Modifier.fillMaxWidth())
                OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("Password") },
                    visualTransformation = PasswordVisualTransformation(), keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    enabled = !state.busy, singleLine = true, modifier = Modifier.fillMaxWidth())
                Button(onClick = { val submitted = password; password = ""; signIn(email, submitted) }, enabled = !state.busy && email.trim().contains('@') && password.isNotEmpty()) { Text("Sign in") }
                Text("New account, forgotten password or email verification? These flows are not native yet. Use the existing CEA website for account creation or recovery; no website is embedded in this app.")
            }
        }
    }
}
