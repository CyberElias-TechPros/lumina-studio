package ng.cea.nativeapp

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LifecycleEventEffect
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun NativeAccount(
    programs: List<Program> = emptyList(),
    initialApplySlug: String? = null,
    onConsumeApplySlug: () -> Unit = {},
) {
    val model: AccountViewModel = viewModel()
    val state by model.state.collectAsStateWithLifecycle()
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) { model.checkSession() }

    var learning by remember { mutableStateOf(false) }
    var applyRequested by remember { mutableStateOf(false) }

    LaunchedEffect(initialApplySlug) {
        if (!initialApplySlug.isNullOrBlank()) {
            model.prefillApplicationProgram(initialApplySlug)
            applyRequested = true
            learning = false
            onConsumeApplySlug()
        }
    }

    if (learning && state.session.user?.roleKey == "student") {
        StudentWorkspace(
            state = state,
            back = { learning = false },
            reload = model::loadDashboard,
            complete = model::completeLesson,
            loadAssignments = model::loadAssignments,
            loadMoreAssignments = model::loadMoreAssignments,
            openAssignment = model::openAssignment,
            submitAssignment = model::submitAssignment,
            loadAssessments = model::loadAssessments,
            openAssessment = model::openAssessment,
            submitAssessment = model::submitAssessment,
        )
    } else {
        AccountScreen(
            state = state,
            signIn = model::signIn,
            verify = model::verify,
            checkSession = model::checkSession,
            refresh = model::refresh,
            signOut = {
                learning = false
                model.signOut()
            },
            cancelMfa = model::cancelMfa,
            openLearning = {
                learning = true
                model.loadDashboard()
            },
            programs = programs,
            initialApplyMode = applyRequested,
            onClearApplyRequest = { applyRequested = false },
            signUp = model::signUp,
            forgotPassword = model::forgotPassword,
            resetPassword = model::resetPassword,
            loadSecurity = model::loadSecurityOverview,
            sendEmailVerification = model::sendEmailVerification,
            verifyEmail = model::verifyEmail,
            changePassword = model::changePassword,
            revokeDevice = model::revokeDevice,
            deleteAccount = model::deleteAccount,
            loadMessages = model::loadMessages,
            openMessageThread = model::openMessageThread,
            closeMessageThread = model::closeMessageThread,
            sendMessage = model::sendMessage,
            loadNotifications = model::loadNotifications,
            markNotificationRead = model::markNotificationRead,
            markAllNotificationsRead = model::markAllNotificationsRead,
            loadInstructor = model::loadInstructorWorkspace,
            openInstructorSubmission = model::openInstructorSubmission,
            closeInstructorSubmission = model::closeInstructorSubmission,
            gradeInstructorSubmission = model::gradeInstructorSubmission,
            updateApplicationDraft = model::updateApplicationDraft,
            saveDraftLocally = model::saveDraftLocally,
            clearLocalDraft = model::clearLocalDraft,
            submitApplication = model::submitApplication,
            loadMyEnrollments = model::loadMyEnrollments,
            openEnrollment = model::openEnrollment,
            closeEnrollment = model::closeEnrollment,
            acceptTuitionOffer = model::acceptTuitionOffer,
            reportTransferProof = model::reportTransferProof,
            loadOfficialReceipt = model::loadOfficialReceipt,
            loadStaffWorkspace = model::loadStaffWorkspace,
            confirmPaymentProof = model::confirmPaymentProof,
            rejectPaymentProof = model::rejectPaymentProof,
        )
    }
}

@Composable
fun AccountScreen(
    state: AccountState,
    signIn: (String, String, Boolean) -> Unit,
    verify: (String) -> Unit,
    checkSession: () -> Unit,
    refresh: () -> Unit,
    signOut: () -> Unit,
    cancelMfa: () -> Unit,
    openLearning: (() -> Unit)? = null,
    programs: List<Program> = emptyList(),
    initialApplyMode: Boolean = false,
    onClearApplyRequest: () -> Unit = {},
    signUp: (String, String, String, Boolean) -> Unit = { _, _, _, _ -> },
    forgotPassword: (String) -> Unit = {},
    resetPassword: (String, String, () -> Unit) -> Unit = { _, _, _ -> },
    loadSecurity: () -> Unit = {},
    sendEmailVerification: () -> Unit = {},
    verifyEmail: (String) -> Unit = {},
    changePassword: (String, String, () -> Unit) -> Unit = { _, _, _ -> },
    revokeDevice: (String) -> Unit = {},
    deleteAccount: (String, String) -> Unit = { _, _ -> },
    loadMessages: (Boolean) -> Unit = {},
    openMessageThread: (String) -> Unit = {},
    closeMessageThread: () -> Unit = {},
    sendMessage: (String, String, () -> Unit) -> Unit = { _, _, _ -> },
    loadNotifications: (Boolean) -> Unit = {},
    markNotificationRead: (String) -> Unit = {},
    markAllNotificationsRead: () -> Unit = {},
    loadInstructor: (Boolean) -> Unit = {},
    openInstructorSubmission: (String) -> Unit = {},
    closeInstructorSubmission: () -> Unit = {},
    gradeInstructorSubmission: (String, Int, String) -> Unit = { _, _, _ -> },
    updateApplicationDraft: (ApplicationDraft) -> Unit = {},
    saveDraftLocally: () -> Unit = {},
    clearLocalDraft: () -> Unit = {},
    submitApplication: () -> Unit = {},
    loadMyEnrollments: () -> Unit = {},
    openEnrollment: (String) -> Unit = {},
    closeEnrollment: () -> Unit = {},
    acceptTuitionOffer: (String, Int) -> Unit = { _, _ -> },
    reportTransferProof: (String, String, Double, String, String, String, () -> Unit) -> Unit = { _, _, _, _, _, _, _ -> },
    loadOfficialReceipt: (String) -> Unit = {},
    loadStaffWorkspace: () -> Unit = {},
    confirmPaymentProof: (String, String, Double) -> Unit = { _, _, _ -> },
    rejectPaymentProof: (String, String) -> Unit = { _, _ -> },
) {
    // Secrets and private drafts deliberately never use rememberSaveable or SavedStateHandle.
    var authTab by remember { mutableStateOf(if (initialApplyMode) "apply" else "signin") }
    var signedInTab by remember(state.session.user?.id) { mutableStateOf(if (initialApplyMode) "apply" else "overview") }

    LaunchedEffect(initialApplyMode) {
        if (initialApplyMode) {
            authTab = "apply"
            signedInTab = "apply"
            onClearApplyRequest()
        }
    }

    var fullName by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var code by remember { mutableStateOf("") }
    var rememberSession by remember { mutableStateOf(false) }
    var recoveryToken by remember { mutableStateOf("") }
    var recoveryPassword by remember { mutableStateOf("") }

    Column(
        Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        Text("Your CEA account", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() })
        Text("Sign in, register, apply for free, or manage your verified Academy workspace. Optional session storage is encrypted with Android Keystore and verified online before private records are displayed.")
        if (state.busy) {
            LinearProgressIndicator(Modifier.fillMaxWidth())
            Text("Checking with the Academy…")
        }
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
                OutlinedTextField(
                    value = code,
                    onValueChange = { code = it.take(32) },
                    label = { Text("Verification or recovery code") },
                    visualTransformation = PasswordVisualTransformation(),
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    enabled = !state.busy,
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                Button(
                    onClick = {
                        val submitted = code
                        code = ""
                        verify(submitted)
                    },
                    enabled = !state.busy && code.trim().length >= 6,
                ) { Text("Verify code") }
                OutlinedButton(onClick = { code = ""; cancelMfa() }, enabled = !state.busy) {
                    Text("Cancel verification")
                }
            }

            state.session.user != null -> {
                val user = state.session.user
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("Signed in as ${user.name}", style = MaterialTheme.typography.titleLarge)
                        Text(user.email)
                        Text(
                            if (state.session.remembered) {
                                "Sign-in saved with Android Keystore protection on this phone."
                            } else {
                                "Session is in app memory only. Restarting requires sign-in again."
                            },
                            style = MaterialTheme.typography.bodySmall,
                        )
                        Text("Verified server role: ${user.roleKey}", fontWeight = FontWeight.Medium)
                    }
                }

                val sections = buildList {
                    add("overview" to "Overview")
                    if (user.roleKey in setOf("instructor", "admin")) add("instructor" to "Instructor")
                    if (user.roleKey in setOf("admin", "admissions", "finance")) add("staff" to "Staff ops")
                    add("admissions" to "Admissions & fees")
                    add("messages" to "Messages")
                    add("alerts" to "Alerts")
                    add("security" to "Security")
                }

                Row(
                    Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    sections.forEach { (key, label) ->
                        FilterChip(
                            selected = signedInTab == key,
                            onClick = {
                                signedInTab = key
                                when (key) {
                                    "instructor" -> loadInstructor(false)
                                    "staff" -> loadStaffWorkspace()
                                    "admissions" -> loadMyEnrollments()
                                    "messages" -> loadMessages(false)
                                    "alerts" -> loadNotifications(false)
                                    "security" -> loadSecurity()
                                }
                            },
                            label = { Text(label) },
                        )
                    }
                }

                when (signedInTab) {
                    "instructor" -> {
                        InstructorWorkspace(
                            courses = state.instructorCourses,
                            submissions = state.instructorSubmissions,
                            nextCursor = state.instructorNextCursor,
                            selectedSubmission = state.selectedInstructorSubmission,
                            busy = state.busy,
                            onRefresh = { loadInstructor(false) },
                            onLoadMore = { loadInstructor(true) },
                            onOpenSubmission = openInstructorSubmission,
                            onBackToQueue = closeInstructorSubmission,
                            onGradeSubmission = gradeInstructorSubmission,
                        )
                    }

                    "staff" -> {
                        StaffFinanceWorkspace(
                            canVerifyPayments = user.roleKey in setOf("admin", "finance"),
                            enrollments = state.staffEnrollments,
                            proofs = state.paymentProofs,
                            busy = state.busy,
                            onRefresh = loadStaffWorkspace,
                            onConfirmProof = confirmPaymentProof,
                            onRejectProof = rejectPaymentProof,
                        )
                    }

                    "admissions" -> {
                        MyAdmissionsWorkspace(
                            items = state.myEnrollments,
                            selectedDetail = state.selectedEnrollment,
                            selectedReceipt = state.selectedReceipt,
                            busy = state.busy,
                            onRefresh = loadMyEnrollments,
                            onOpenEnrollment = openEnrollment,
                            onBackToList = closeEnrollment,
                            onAcceptOffer = acceptTuitionOffer,
                            onReportTransfer = reportTransferProof,
                            onLoadReceipt = loadOfficialReceipt,
                            onStartNewApplication = { signedInTab = "apply" },
                        )
                    }

                    "apply" -> {
                        OutlinedButton(onClick = { signedInTab = "admissions" }, enabled = !state.busy) {
                            Text("Back to applications & tuition")
                        }
                        PublicApplicationCard(
                            programs = programs,
                            draft = state.applicationDraft,
                            draftSavedLocally = state.draftSavedLocally,
                            submittedRef = state.lastSubmittedRef,
                            busy = state.busy,
                            onDraftChange = updateApplicationDraft,
                            onSaveDraftLocally = saveDraftLocally,
                            onClearLocalDraft = clearLocalDraft,
                            onSubmitApplication = submitApplication,
                        )
                    }

                    "messages" -> {
                        MessagesWorkspace(
                            threads = state.messageThreads,
                            nextCursor = state.messagesNextCursor,
                            selectedThread = state.selectedThread,
                            busy = state.busy,
                            onRefresh = { loadMessages(false) },
                            onLoadMore = { loadMessages(true) },
                            onOpenThread = openMessageThread,
                            onBackToThreads = closeMessageThread,
                            onSendReply = sendMessage,
                        )
                    }

                    "alerts" -> {
                        NotificationsWorkspace(
                            items = state.notifications,
                            nextCursor = state.notificationsNextCursor,
                            busy = state.busy,
                            onRefresh = { loadNotifications(false) },
                            onLoadMore = { loadNotifications(true) },
                            onMarkRead = markNotificationRead,
                            onMarkAllRead = markAllNotificationsRead,
                        )
                    }

                    "security" -> {
                        SecuritySection(
                            profile = state.profile,
                            devices = state.devices,
                            busy = state.busy,
                            onRefresh = loadSecurity,
                            onSendEmailVerification = sendEmailVerification,
                            onVerifyEmail = verifyEmail,
                            onChangePassword = changePassword,
                            onRevokeDevice = revokeDevice,
                            onDeleteAccount = deleteAccount,
                        )
                    }

                    else -> {
                        if (user.roleKey == "student" && openLearning != null) {
                            Button(onClick = openLearning, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                                Text("My learning")
                            }
                        }
                        if (user.roleKey in setOf("instructor", "admin")) {
                            Button(
                                onClick = {
                                    signedInTab = "instructor"
                                    loadInstructor(false)
                                },
                                enabled = !state.busy,
                                modifier = Modifier.fillMaxWidth(),
                            ) { Text("Open instructor workspace") }
                        }
                        if (user.roleKey in setOf("admin", "admissions", "finance")) {
                            Button(
                                onClick = {
                                    signedInTab = "staff"
                                    loadStaffWorkspace()
                                },
                                enabled = !state.busy,
                                modifier = Modifier.fillMaxWidth(),
                            ) { Text("Open admissions & finance workspace") }
                        }
                        OutlinedButton(onClick = refresh, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                            Text("Renew session")
                        }
                        Button(onClick = signOut, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                            Text("Sign out")
                        }
                    }
                }
            }

            else -> {
                Row(
                    Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                ) {
                    listOf(
                        "signin" to "Existing account",
                        "signup" to "Create account",
                        "recovery" to "Password recovery",
                        "apply" to "Free application",
                    ).forEach { (key, label) ->
                        FilterChip(
                            selected = authTab == key,
                            onClick = { authTab = key },
                            label = { Text(label) },
                        )
                    }
                }

                when (authTab) {
                    "signup" -> {
                        OutlinedTextField(
                            value = fullName,
                            onValueChange = { fullName = it.take(120) },
                            label = { Text("Full name") },
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = email,
                            onValueChange = { email = it.take(254) },
                            label = { Text("Email address") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = password,
                            onValueChange = { password = it },
                            label = { Text("Create password (8+ characters)") },
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .toggleable(
                                    value = rememberSession,
                                    enabled = !state.busy,
                                    role = Role.Checkbox,
                                    onValueChange = { rememberSession = it },
                                ),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Checkbox(checked = rememberSession, onCheckedChange = null, enabled = !state.busy)
                            Text("Keep me signed in on this phone. Do not enable on a shared phone.")
                        }
                        Button(
                            onClick = {
                                val submitted = password
                                password = ""
                                signUp(fullName, email, submitted, rememberSession)
                            },
                            enabled = !state.busy && fullName.trim().length >= 2 && email.trim().contains('@') && password.length >= 8,
                            modifier = Modifier.fillMaxWidth(),
                        ) { Text("Register account") }
                    }

                    "recovery" -> {
                        Text("Step 1: Request a password reset link or token", fontWeight = FontWeight.SemiBold)
                        OutlinedTextField(
                            value = email,
                            onValueChange = { email = it.take(254) },
                            label = { Text("Account email address") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Button(
                            onClick = { forgotPassword(email) },
                            enabled = !state.busy && email.trim().contains('@'),
                            modifier = Modifier.fillMaxWidth(),
                        ) { Text("Send reset instructions") }

                        HorizontalDivider()
                        Text("Step 2: Set a new password with your reset token", fontWeight = FontWeight.SemiBold)
                        OutlinedTextField(
                            value = recoveryToken,
                            onValueChange = { recoveryToken = it.take(200) },
                            label = { Text("Reset token from email") },
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = recoveryPassword,
                            onValueChange = { recoveryPassword = it },
                            label = { Text("New password (8+ characters)") },
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Button(
                            onClick = {
                                val tokenSnapshot = recoveryToken
                                val pwSnapshot = recoveryPassword
                                recoveryPassword = ""
                                resetPassword(tokenSnapshot, pwSnapshot) {
                                    recoveryToken = ""
                                    authTab = "signin"
                                }
                            },
                            enabled = !state.busy && recoveryToken.trim().length >= 16 && recoveryPassword.length >= 8,
                            modifier = Modifier.fillMaxWidth(),
                        ) { Text("Save new password") }
                    }

                    "apply" -> {
                        PublicApplicationCard(
                            programs = programs,
                            draft = state.applicationDraft,
                            draftSavedLocally = state.draftSavedLocally,
                            submittedRef = state.lastSubmittedRef,
                            busy = state.busy,
                            onDraftChange = updateApplicationDraft,
                            onSaveDraftLocally = saveDraftLocally,
                            onClearLocalDraft = clearLocalDraft,
                            onSubmitApplication = submitApplication,
                        )
                    }

                    else -> {
                        OutlinedTextField(
                            value = email,
                            onValueChange = { email = it.take(254) },
                            label = { Text("Email address") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = password,
                            onValueChange = { password = it },
                            label = { Text("Password") },
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                            enabled = !state.busy,
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .toggleable(
                                    value = rememberSession,
                                    enabled = !state.busy,
                                    role = Role.Checkbox,
                                    onValueChange = { rememberSession = it },
                                ),
                            verticalAlignment = Alignment.CenterVertically,
                        ) {
                            Checkbox(checked = rememberSession, onCheckedChange = null, enabled = !state.busy)
                            Text("Keep me signed in on this phone. Do not enable on a shared phone.")
                        }
                        Button(
                            onClick = {
                                val submitted = password
                                password = ""
                                signIn(email, submitted, rememberSession)
                            },
                            enabled = !state.busy && email.trim().contains('@') && password.isNotEmpty(),
                            modifier = Modifier.fillMaxWidth(),
                        ) { Text("Sign in") }
                    }
                }
            }
        }
    }
}

@Composable
private fun ColumnScope.SecuritySection(
    profile: AccountProfile?,
    devices: List<DeviceSession>,
    busy: Boolean,
    onRefresh: () -> Unit,
    onSendEmailVerification: () -> Unit,
    onVerifyEmail: (String) -> Unit,
    onChangePassword: (String, String, () -> Unit) -> Unit,
    onRevokeDevice: (String) -> Unit,
    onDeleteAccount: (String, String) -> Unit,
) {
    var verifyCode by remember { mutableStateOf("") }
    var currentPw by remember { mutableStateOf("") }
    var newPw by remember { mutableStateOf("") }
    var deleteWord by remember { mutableStateOf("") }
    var deletePw by remember { mutableStateOf("") }
    var deleteMfa by remember { mutableStateOf("") }
    var confirmDeleteDialog by remember { mutableStateOf(false) }

    if (confirmDeleteDialog) {
        AlertDialog(
            onDismissRequest = { if (!busy) confirmDeleteDialog = false },
            title = { Text("Permanently delete your CEA account?") },
            text = { Text("This revokes all sessions and permanently removes your account access. This action cannot be undone.") },
            confirmButton = {
                Button(
                    onClick = {
                        confirmDeleteDialog = false
                        val pw = deletePw
                        val mfa = deleteMfa
                        deletePw = ""
                        deleteMfa = ""
                        deleteWord = ""
                        onDeleteAccount(pw, mfa)
                    },
                    enabled = !busy,
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.error),
                ) { Text("Delete permanently") }
            },
            dismissButton = {
                TextButton(onClick = { confirmDeleteDialog = false }, enabled = !busy) { Text("Cancel") }
            },
        )
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Security & devices", style = MaterialTheme.typography.titleMedium, modifier = Modifier.semantics { heading() })
        OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
    }

    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Email verification", fontWeight = FontWeight.SemiBold)
            if (profile?.emailVerified == true) {
                Text("Verified (${profile.email})", color = MaterialTheme.colorScheme.primary)
            } else {
                Text("Unverified — verify your email to view applications, offers, and receipts.")
                OutlinedButton(onClick = onSendEmailVerification, enabled = !busy) { Text("Send 6-digit code") }
                OutlinedTextField(
                    value = verifyCode,
                    onValueChange = { if (it.length <= 6 && it.all(Char::isDigit)) verifyCode = it },
                    label = { Text("6-digit verification code") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                Button(
                    onClick = {
                        val c = verifyCode
                        verifyCode = ""
                        onVerifyEmail(c)
                    },
                    enabled = !busy && verifyCode.length == 6,
                    modifier = Modifier.fillMaxWidth(),
                ) { Text("Verify email") }
            }
        }
    }

    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Change password", fontWeight = FontWeight.SemiBold)
            OutlinedTextField(
                value = currentPw,
                onValueChange = { currentPw = it },
                label = { Text("Current password") },
                visualTransformation = PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = newPw,
                onValueChange = { newPw = it },
                label = { Text("New password (8+ characters)") },
                visualTransformation = PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            Button(
                onClick = {
                    val cur = currentPw
                    val nxt = newPw
                    currentPw = ""
                    newPw = ""
                    onChangePassword(cur, nxt) {}
                },
                enabled = !busy && newPw.length >= 8,
                modifier = Modifier.fillMaxWidth(),
            ) { Text("Update password") }
        }
    }

    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Signed-in devices (${devices.size})", fontWeight = FontWeight.SemiBold)
            if (devices.isEmpty()) {
                Text("Tap Refresh to inspect active device sessions.")
            } else {
                devices.forEach { d ->
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text(
                                "${d.deviceLabel}${if (d.current) " (This phone)" else ""}",
                                fontWeight = if (d.current) FontWeight.SemiBold else FontWeight.Normal,
                            )
                            Text("Expires: ${d.expiresAt}", style = MaterialTheme.typography.labelSmall)
                        }
                        if (!d.current && d.active) {
                            TextButton(onClick = { onRevokeDevice(d.id) }, enabled = !busy) { Text("Revoke") }
                        }
                    }
                }
            }
        }
    }

    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("Delete account", fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.error)
            Text("Type DELETE and confirm your password to permanently erase your CEA account.", style = MaterialTheme.typography.bodySmall)
            OutlinedTextField(
                value = deleteWord,
                onValueChange = { deleteWord = it.take(10) },
                label = { Text("Type DELETE to confirm") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = deletePw,
                onValueChange = { deletePw = it },
                label = { Text("Account password") },
                visualTransformation = PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            if (profile?.mfaEnabled == true) {
                OutlinedTextField(
                    value = deleteMfa,
                    onValueChange = { deleteMfa = it.take(32) },
                    label = { Text("2FA or recovery code") },
                    visualTransformation = PasswordVisualTransformation(),
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
            }
            OutlinedButton(
                onClick = { confirmDeleteDialog = true },
                enabled = !busy && deleteWord == "DELETE" && (profile?.hasPassword == false || deletePw.isNotEmpty()),
                modifier = Modifier.fillMaxWidth(),
            ) { Text("Delete account permanently") }
        }
    }
}
