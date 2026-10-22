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
fun ColumnScope.InstructorWorkspace(
    courses: List<InstructorCourseSummary>,
    submissions: List<InstructorSubmissionSummary>,
    nextCursor: String?,
    selectedSubmission: InstructorSubmissionDetail?,
    busy: Boolean,
    onRefresh: () -> Unit,
    onLoadMore: () -> Unit,
    onOpenSubmission: (String) -> Unit,
    onBackToQueue: () -> Unit,
    onGradeSubmission: (String, Int, String) -> Unit,
) {
    var subTab by remember { mutableIntStateOf(0) }
    var confirmGrade by remember { mutableStateOf(false) }

    if (selectedSubmission != null) {
        val maxPoints = selectedSubmission.max ?: 100
        var scoreInput by remember(selectedSubmission.id, selectedSubmission.score) {
            mutableStateOf(selectedSubmission.score?.toString() ?: "")
        }
        var feedbackInput by remember(selectedSubmission.id, selectedSubmission.feedback) {
            mutableStateOf(selectedSubmission.feedback)
        }
        val parsedScore = scoreInput.trim().toIntOrNull()
        val scoreValid = parsedScore != null && parsedScore in 0..maxPoints && selectedSubmission.canGrade()

        if (confirmGrade && scoreValid) {
            AlertDialog(
                onDismissRequest = { if (!busy) confirmGrade = false },
                title = { Text("Save official grade?") },
                text = {
                    Text(
                        "Record ${parsedScore}/$maxPoints for ${selectedSubmission.student} on ${selectedSubmission.title}?",
                    )
                },
                confirmButton = {
                    Button(
                        onClick = {
                            val scoreValue = parsedScore ?: return@Button
                            confirmGrade = false
                            onGradeSubmission(selectedSubmission.id, scoreValue, feedbackInput)
                        },
                        enabled = !busy,
                    ) { Text("Save grade") }
                },
                dismissButton = {
                    TextButton(onClick = { confirmGrade = false }, enabled = !busy) { Text("Cancel") }
                },
            )
        }

        OutlinedButton(onClick = onBackToQueue, enabled = !busy) { Text("Back to grading queue") }
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(selectedSubmission.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold, modifier = Modifier.semantics { heading() })
                Text("Student: ${selectedSubmission.student} • Submitted: ${selectedSubmission.submitted}")
                Text(
                    if (selectedSubmission.status == "graded" && selectedSubmission.score != null) {
                        "Current status: Graded (${selectedSubmission.score}/$maxPoints)"
                    } else {
                        "Current status: Awaiting review (max $maxPoints)"
                    },
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.Medium,
                )
                if (!selectedSubmission.isLatest) {
                    Text(
                        "A newer attempt exists for this learner. Refresh the queue to grade the latest attempt.",
                        color = MaterialTheme.colorScheme.error,
                    )
                }
                Text("Submitted work", fontWeight = FontWeight.SemiBold)
                Surface(color = MaterialTheme.colorScheme.surfaceVariant, shape = MaterialTheme.shapes.small, modifier = Modifier.fillMaxWidth()) {
                    SelectionContainer {
                        Text(
                            selectedSubmission.body.ifBlank { "No written text recorded for this attempt." },
                            Modifier.padding(12.dp),
                        )
                    }
                }
                if (selectedSubmission.canGrade()) {
                    OutlinedTextField(
                        value = scoreInput,
                        onValueChange = { if (it.length <= 5 && it.all(Char::isDigit)) scoreInput = it },
                        label = { Text("Score (0–$maxPoints)") },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        singleLine = true,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    if (scoreInput.isNotBlank() && parsedScore !in 0..maxPoints) {
                        Text("Enter a whole score between 0 and $maxPoints.", color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
                    }
                    OutlinedTextField(
                        value = feedbackInput,
                        onValueChange = { if (it.length <= 5_000) feedbackInput = it },
                        label = { Text("Instructor feedback (optional)") },
                        minLines = 3,
                        modifier = Modifier.fillMaxWidth(),
                    )
                    Button(
                        onClick = { confirmGrade = true },
                        enabled = !busy && scoreValid,
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        Text(if (selectedSubmission.status == "graded") "Update grade" else "Record grade")
                    }
                }
            }
        }
        return
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
        FilterChip(
            selected = subTab == 0,
            onClick = { subTab = 0 },
            label = { Text("Grading queue (${submissions.size})") },
        )
        FilterChip(
            selected = subTab == 1,
            onClick = { subTab = 1 },
            label = { Text("My courses (${courses.size})") },
        )
        Spacer(Modifier.weight(1f))
        OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
    }

    if (subTab == 0) {
        if (submissions.isEmpty()) {
            Card(Modifier.fillMaxWidth()) { Text("No student submissions in your grading queue yet.", Modifier.padding(16.dp)) }
        } else {
            submissions.forEach { item ->
                Card(
                    Modifier
                        .fillMaxWidth()
                        .clickable(enabled = !busy, onClickLabel = "Open submission from ${item.student}") {
                            onOpenSubmission(item.id)
                        },
                ) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(item.title, fontWeight = FontWeight.SemiBold)
                        Text("${item.student} • ${item.submitted}", style = MaterialTheme.typography.bodySmall)
                        Text(
                            if (item.status == "graded" && item.score != null) "Graded: ${item.score}" else "Submitted — needs review",
                            color = MaterialTheme.colorScheme.primary,
                            style = MaterialTheme.typography.labelMedium,
                        )
                    }
                }
            }
            if (nextCursor != null) {
                OutlinedButton(onClick = onLoadMore, enabled = !busy, modifier = Modifier.fillMaxWidth()) {
                    Text("Load older submissions")
                }
            }
        }
    } else {
        if (courses.isEmpty()) {
            Card(Modifier.fillMaxWidth()) { Text("No instructor courses assigned yet.", Modifier.padding(16.dp)) }
        } else {
            courses.forEach { course ->
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(course.title, fontWeight = FontWeight.SemiBold)
                        val meta = listOfNotNull(
                            course.status.takeIf { it.isNotBlank() }?.replaceFirstChar { it.titlecase(Locale.US) },
                            course.cohort.takeIf { it.isNotBlank() },
                        ).joinToString(" • ")
                        if (meta.isNotBlank()) Text(meta, style = MaterialTheme.typography.bodySmall)
                    }
                }
            }
        }
    }
}

@Composable
fun ColumnScope.StaffFinanceWorkspace(
    canVerifyPayments: Boolean,
    enrollments: List<StaffEnrollmentItem>,
    proofs: List<PaymentProofItem>,
    busy: Boolean,
    onRefresh: () -> Unit,
    onConfirmProof: (String, String, Double) -> Unit,
    onRejectProof: (String, String) -> Unit,
) {
    var subTab by remember { mutableIntStateOf(if (canVerifyPayments) 0 else 1) }
    var pendingConfirm by remember { mutableStateOf<Triple<PaymentProofItem, String, Double>?>(null) }
    var pendingReject by remember { mutableStateOf<Pair<PaymentProofItem, String>?>(null) }

    pendingConfirm?.let { (proof, bankRef, amount) ->
        AlertDialog(
            onDismissRequest = { if (!busy) pendingConfirm = null },
            title = { Text("Confirm verified payment?") },
            text = {
                Text(
                    String.format(
                        Locale.US,
                        "Confirm NGN %,.2f received under bank reference %s for %s (%s)? This updates official student payment status.",
                        amount,
                        bankRef,
                        proof.ref,
                        proof.senderName,
                    ),
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        pendingConfirm = null
                        onConfirmProof(proof.id, bankRef, amount)
                    },
                    enabled = !busy,
                ) { Text("Confirm receipt") }
            },
            dismissButton = {
                TextButton(onClick = { pendingConfirm = null }, enabled = !busy) { Text("Cancel") }
            },
        )
    }

    pendingReject?.let { (proof, reason) ->
        AlertDialog(
            onDismissRequest = { if (!busy) pendingReject = null },
            title = { Text("Reject transfer claim?") },
            text = { Text("Mark transfer proof for ${proof.ref} (${proof.senderName}) as rejected?") },
            confirmButton = {
                Button(
                    onClick = {
                        pendingReject = null
                        onRejectProof(proof.id, reason)
                    },
                    enabled = !busy,
                ) { Text("Reject proof") }
            },
            dismissButton = {
                TextButton(onClick = { pendingReject = null }, enabled = !busy) { Text("Cancel") }
            },
        )
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.CenterVertically) {
        if (canVerifyPayments) {
            FilterChip(
                selected = subTab == 0,
                onClick = { subTab = 0 },
                label = { Text("Transfer proofs (${proofs.size})") },
            )
        }
        FilterChip(
            selected = subTab == 1 || !canVerifyPayments,
            onClick = { subTab = 1 },
            label = { Text("Enrollments (${enrollments.size})") },
        )
        Spacer(Modifier.weight(1f))
        OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
    }

    if (canVerifyPayments && subTab == 0) {
        val actionable = proofs.filter { it.status == "pending_review" }
        if (actionable.isEmpty()) {
            Card(Modifier.fillMaxWidth()) { Text("No pending bank-transfer proofs awaiting finance verification.", Modifier.padding(16.dp)) }
        } else {
            actionable.forEach { proof ->
                var bankRef by remember(proof.id) { mutableStateOf(proof.bankReference) }
                var receivedText by remember(proof.id) { mutableStateOf(String.format(Locale.US, "%.2f", proof.amount)) }
                var rejectReason by remember(proof.id) { mutableStateOf("") }
                val parsedAmount = receivedText.trim().toDoubleOrNull()
                val validConfirm = bankRef.trim().length in 4..120 && parsedAmount != null && parsedAmount > 0.0
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("${proof.ref} • ${proof.programTitle}", fontWeight = FontWeight.SemiBold)
                        Text(
                            String.format(
                                Locale.US,
                                "Claimed NGN %,.2f (%s) from %s%s",
                                proof.amount,
                                proof.kind,
                                proof.senderName,
                                proof.bankName.takeIf { it.isNotBlank() }?.let { " • $it" } ?: "",
                            ),
                        )
                        OutlinedTextField(
                            value = bankRef,
                            onValueChange = { if (it.length <= 120) bankRef = it },
                            label = { Text("Verified bank reference (min 4 chars)") },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = receivedText,
                            onValueChange = { if (it.length <= 16) receivedText = it },
                            label = { Text("Verified amount received (NGN)") },
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        OutlinedTextField(
                            value = rejectReason,
                            onValueChange = { if (it.length <= 300) rejectReason = it },
                            label = { Text("Rejection note (optional)") },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                        )
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Button(
                                onClick = { pendingConfirm = Triple(proof, bankRef.trim(), parsedAmount ?: proof.amount) },
                                enabled = !busy && validConfirm,
                                modifier = Modifier.weight(1f),
                            ) { Text("Confirm receipt") }
                            OutlinedButton(
                                onClick = { pendingReject = proof to rejectReason.trim() },
                                enabled = !busy,
                                modifier = Modifier.weight(1f),
                            ) { Text("Reject claim") }
                        }
                    }
                }
            }
        }
    } else {
        if (enrollments.isEmpty()) {
            Card(Modifier.fillMaxWidth()) { Text("No enrollments recorded yet.", Modifier.padding(16.dp)) }
        } else {
            enrollments.forEach { row ->
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("${row.ref} • ${row.fullName}", fontWeight = FontWeight.SemiBold)
                        Text(row.programTitle, style = MaterialTheme.typography.bodyMedium)
                        Text(
                            String.format(
                                Locale.US,
                                "Stage: %s • Payment: %s (NGN %,.0f / %,.0f)",
                                row.stage,
                                row.paymentStatus,
                                row.paidAmount,
                                row.feeTotal,
                            ),
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                }
            }
        }
    }
}
