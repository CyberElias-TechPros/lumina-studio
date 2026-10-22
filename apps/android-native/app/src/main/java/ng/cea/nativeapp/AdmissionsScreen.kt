package ng.cea.nativeapp

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import java.util.Locale

@Composable
fun PublicApplicationCard(
    programs: List<Program>,
    draft: ApplicationDraft,
    draftSavedLocally: Boolean,
    submittedRef: String?,
    busy: Boolean,
    onDraftChange: (ApplicationDraft) -> Unit,
    onSaveDraftLocally: () -> Unit,
    onClearLocalDraft: () -> Unit,
    onSubmitApplication: () -> Unit,
) {
    var acceptPolicies by remember { mutableStateOf(false) }
    val selectedSlug = draft.programSlug.ifBlank { programs.firstOrNull()?.slug ?: "web-development" }
    LaunchedEffect(selectedSlug) {
        if (draft.programSlug.isBlank() && selectedSlug.isNotBlank()) {
            onDraftChange(draft.copy(programSlug = selectedSlug))
        }
    }

    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(
                "Course application (free)",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.semantics { heading() },
            )
            Text(
                "Applications are free. CEA never charges an application fee; official tuition offers and receipts are verified on CEA servers.",
                style = MaterialTheme.typography.bodySmall,
            )
            if (submittedRef != null) {
                Surface(color = MaterialTheme.colorScheme.secondaryContainer, shape = MaterialTheme.shapes.small, modifier = Modifier.fillMaxWidth()) {
                    SelectionContainer {
                        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text("Application received", fontWeight = FontWeight.SemiBold)
                            Text("Reference: $submittedRef")
                            Text("Keep this reference. Sign in with the same email and verify it to track offers, transfer proofs, and official receipts.", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }

            if (programs.isNotEmpty()) {
                Text("Select programme", style = MaterialTheme.typography.labelLarge)
                programs.take(10).forEach { program ->
                    val chosen = selectedSlug == program.slug
                    Row(
                        Modifier
                            .fillMaxWidth()
                            .clickable(enabled = !busy) { onDraftChange(draft.copy(programSlug = program.slug)) }
                            .padding(vertical = 2.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        RadioButton(selected = chosen, onClick = { onDraftChange(draft.copy(programSlug = program.slug)) }, enabled = !busy)
                        Column {
                            Text(program.title, fontWeight = if (chosen) FontWeight.SemiBold else FontWeight.Normal)
                            val subtitle = listOfNotNull(
                                program.duration.takeIf { it.isNotBlank() },
                                program.mode.takeIf { it.isNotBlank() },
                            ).joinToString(" • ")
                            if (subtitle.isNotBlank()) Text(subtitle, style = MaterialTheme.typography.labelSmall)
                        }
                    }
                }
            }

            OutlinedTextField(
                value = draft.firstName,
                onValueChange = { if (it.length <= 60) onDraftChange(draft.copy(firstName = it)) },
                label = { Text("First name") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.lastName,
                onValueChange = { if (it.length <= 60) onDraftChange(draft.copy(lastName = it)) },
                label = { Text("Last name") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.email,
                onValueChange = { if (it.length <= 120) onDraftChange(draft.copy(email = it)) },
                label = { Text("Email address") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.phone,
                onValueChange = { if (it.length <= 20) onDraftChange(draft.copy(phone = it)) },
                label = { Text("Phone / WhatsApp number") },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.city,
                onValueChange = { if (it.length <= 80) onDraftChange(draft.copy(city = it)) },
                label = { Text("City or state") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(
                    selected = draft.mode == "onsite",
                    onClick = { onDraftChange(draft.copy(mode = "onsite")) },
                    label = { Text("Port Harcourt campus") },
                )
                FilterChip(
                    selected = draft.mode == "hybrid",
                    onClick = { onDraftChange(draft.copy(mode = "hybrid")) },
                    label = { Text("Hybrid") },
                )
            }
            val planOptions = draft.copy(programSlug = selectedSlug).validPaymentPlans()
            val activePlan = draft.copy(programSlug = selectedSlug).normalizedPaymentPlan()
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                planOptions.forEach { (planKey, label) ->
                    FilterChip(
                        selected = activePlan == planKey,
                        onClick = { onDraftChange(draft.copy(programSlug = selectedSlug, paymentPlan = planKey)) },
                        label = { Text(label) },
                    )
                }
            }
            OutlinedTextField(
                value = draft.goal,
                onValueChange = { if (it.length <= 600) onDraftChange(draft.copy(goal = it)) },
                label = { Text("Learning goal (optional)") },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )

            Row(verticalAlignment = Alignment.CenterVertically) {
                Checkbox(checked = acceptPolicies, onCheckedChange = { acceptPolicies = it }, enabled = !busy)
                Text("I agree to CEA's privacy policy and enrolment terms.", style = MaterialTheme.typography.bodySmall)
            }

            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = onSaveDraftLocally, enabled = !busy, modifier = Modifier.weight(1f)) {
                    Text(if (draftSavedLocally) "Update local draft" else "Save draft locally")
                }
                if (draftSavedLocally) {
                    TextButton(onClick = onClearLocalDraft, enabled = !busy) { Text("Clear local draft") }
                }
            }

            val ready =
                selectedSlug.isNotBlank() &&
                    draft.firstName.trim().length >= 2 &&
                    draft.lastName.trim().length >= 2 &&
                    draft.email.trim().contains('@') &&
                    draft.phone.trim().length >= 7 &&
                    draft.city.trim().length >= 2 &&
                    acceptPolicies
            Button(
                onClick = onSubmitApplication,
                enabled = !busy && ready,
                modifier = Modifier.fillMaxWidth(),
            ) {
                Text("Submit free application")
            }
        }
    }
}

@Composable
fun ColumnScope.MyAdmissionsWorkspace(
    items: List<MyEnrollmentSummary>,
    selectedDetail: EnrollmentDetail?,
    selectedReceipt: EnrollmentReceipt?,
    busy: Boolean,
    onRefresh: () -> Unit,
    onOpenEnrollment: (String) -> Unit,
    onBackToList: () -> Unit,
    onAcceptOffer: (String, Int) -> Unit,
    onReportTransfer: (String, String, Double, String, String, String, () -> Unit) -> Unit,
    onLoadReceipt: (String) -> Unit,
    onStartNewApplication: () -> Unit,
) {
    var confirmOffer by remember { mutableStateOf(false) }

    if (selectedDetail != null) {
        if (confirmOffer && selectedDetail.canAcceptOffer()) {
            AlertDialog(
                onDismissRequest = { if (!busy) confirmOffer = false },
                title = { Text("Accept official tuition offer?") },
                text = {
                    Text(
                        String.format(
                            Locale.US,
                            "Accept offer v%d for %s (%s) under policy %s? Payable fee: NGN %,.0f.",
                            selectedDetail.offerVersion,
                            selectedDetail.programTitle,
                            selectedDetail.ref,
                            EnrollmentDetail.POLICY_VERSION,
                            selectedDetail.feeDue,
                        ),
                    )
                },
                confirmButton = {
                    Button(
                        onClick = {
                            confirmOffer = false
                            onAcceptOffer(selectedDetail.ref, selectedDetail.offerVersion)
                        },
                        enabled = !busy,
                    ) { Text("Accept offer") }
                },
                dismissButton = {
                    TextButton(onClick = { confirmOffer = false }, enabled = !busy) { Text("Cancel") }
                },
            )
        }

        var kind by remember(selectedDetail.ref) { mutableStateOf("full") }
        var amountInput by remember(selectedDetail.ref, selectedDetail.amountDue) {
            mutableStateOf(if (selectedDetail.amountDue > 0) String.format(Locale.US, "%.0f", selectedDetail.amountDue) else "")
        }
        var senderName by remember(selectedDetail.ref) { mutableStateOf("") }
        var bankName by remember(selectedDetail.ref) { mutableStateOf("") }
        var bankRef by remember(selectedDetail.ref) { mutableStateOf("") }

        OutlinedButton(onClick = onBackToList, enabled = !busy) { Text("All applications & payments") }
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(selectedDetail.ref, style = MaterialTheme.typography.labelLarge, color = MaterialTheme.colorScheme.secondary)
                Text(selectedDetail.programTitle, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, modifier = Modifier.semantics { heading() })
                Text("Stage: ${selectedDetail.stage} • Payment status: ${selectedDetail.paymentStatus}")
                selectedDetail.cohortLabel?.takeIf { it.isNotBlank() }?.let { Text("Cohort: $it") }
                Text(
                    String.format(
                        Locale.US,
                        "Payable tuition: NGN %,.0f • Verified paid: NGN %,.0f • Remaining due: NGN %,.0f",
                        selectedDetail.feeDue,
                        selectedDetail.paidAmount,
                        selectedDetail.amountDue,
                    ),
                    fontWeight = FontWeight.Medium,
                )

                if (selectedDetail.offerVersion > 0) {
                    HorizontalDivider()
                    Text("Official tuition offer (v${selectedDetail.offerVersion})", fontWeight = FontWeight.SemiBold)
                    Text(
                        String.format(
                            Locale.US,
                            "Status: %s • Minimum deposit: NGN %,.0f",
                            selectedDetail.offerStatus,
                            selectedDetail.depositAmount,
                        ),
                        style = MaterialTheme.typography.bodySmall,
                    )
                    if (selectedDetail.canAcceptOffer()) {
                        Button(onClick = { confirmOffer = true }, enabled = !busy, modifier = Modifier.fillMaxWidth()) {
                            Text("Accept tuition offer")
                        }
                    }
                }

                HorizontalDivider()
                OutlinedButton(onClick = { onLoadReceipt(selectedDetail.ref) }, enabled = !busy, modifier = Modifier.fillMaxWidth()) {
                    Text("View official receipt")
                }

                if (selectedReceipt != null && selectedReceipt.ref == selectedDetail.ref) {
                    Surface(color = MaterialTheme.colorScheme.secondaryContainer, shape = MaterialTheme.shapes.small, modifier = Modifier.fillMaxWidth()) {
                        SelectionContainer {
                            Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(
                                    "Official CEA Receipt${selectedReceipt.latestReceiptNo?.let { " • $it" }.orEmpty()}",
                                    fontWeight = FontWeight.SemiBold,
                                )
                                Text("${selectedReceipt.studentName} • ${selectedReceipt.programTitle}", style = MaterialTheme.typography.bodySmall)
                                Text(
                                    String.format(
                                        Locale.US,
                                        "Verified paid: NGN %,.2f • Remaining balance: NGN %,.2f",
                                        selectedReceipt.paidAmount,
                                        selectedReceipt.balance,
                                    ),
                                    style = MaterialTheme.typography.bodySmall,
                                )
                            }
                        }
                    }
                }

                if (selectedDetail.transferReviewStatus == "pending_review") {
                    HorizontalDivider()
                    Text(
                        "A bank transfer claim is currently pending review by CEA Finance.",
                        color = MaterialTheme.colorScheme.primary,
                    )
                } else if (selectedDetail.canReportTransfer()) {
                    HorizontalDivider()
                    Text("Report bank transfer proof", fontWeight = FontWeight.SemiBold)
                    Text(
                        "Submitting transfer details records a pending review claim only. Payment status changes after CEA Finance verifies receipt.",
                        style = MaterialTheme.typography.bodySmall,
                    )
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        listOf("deposit" to "Deposit", "full" to "Full", "balance" to "Balance").forEach { (value, label) ->
                            FilterChip(selected = kind == value, onClick = { kind = value }, label = { Text(label) })
                        }
                    }
                    OutlinedTextField(
                        value = amountInput,
                        onValueChange = { if (it.length <= 14) amountInput = it },
                        label = { Text("Transferred amount (NGN)") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = senderName,
                        onValueChange = { if (it.length <= 80) senderName = it },
                        label = { Text("Sender account name") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = bankName,
                        onValueChange = { if (it.length <= 60) bankName = it },
                        label = { Text("Bank name (optional)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    OutlinedTextField(
                        value = bankRef,
                        onValueChange = { if (it.length <= 80) bankRef = it },
                        label = { Text("Bank / NIP session reference (optional)") },
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    val parsedAmount = amountInput.trim().toDoubleOrNull()
                    val canSubmitProof = parsedAmount != null && parsedAmount > 0.0 && senderName.trim().length >= 2
                    Button(
                        onClick = {
                            val amt = parsedAmount ?: return@Button
                            onReportTransfer(selectedDetail.ref, kind, amt, senderName, bankName, bankRef) {
                                bankRef = ""
                            }
                        },
                        enabled = !busy && canSubmitProof,
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        Text("Submit transfer proof for review")
                    }
                } else if (selectedDetail.checkoutReason.isNotBlank()) {
                    HorizontalDivider()
                    Text(selectedDetail.checkoutReason, style = MaterialTheme.typography.bodySmall)
                }
            }
        }
        return
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Applications & tuition (${items.size})", style = MaterialTheme.typography.titleMedium, modifier = Modifier.semantics { heading() })
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = onStartNewApplication, enabled = !busy) { Text("Apply") }
            OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
        }
    }
    if (items.isEmpty()) {
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("No verified applications found for this email yet.")
                Text("Verify your email in Security settings if you already applied, or submit a free application now.", style = MaterialTheme.typography.bodySmall)
            }
        }
    } else {
        items.forEach { item ->
            Card(
                Modifier
                    .fillMaxWidth()
                    .clickable(enabled = !busy, onClickLabel = "Open enrolment ${item.ref}") {
                        onOpenEnrollment(item.ref)
                    },
            ) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("${item.ref} • ${item.programTitle}", fontWeight = FontWeight.SemiBold)
                    Text("Offer: ${item.offerStatus}", style = MaterialTheme.typography.bodySmall)
                    Text(
                        String.format(Locale.US, "Verified paid: NGN %,.0f", item.paidAmount),
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.primary,
                    )
                }
            }
        }
    }
}
