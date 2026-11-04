package ng.cea.nativeapp

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import java.util.Locale

/**
 * Learn tab. Signed-in students get their learning hub; every record shown here comes
 * from the Academy server — nothing private is cached offline.
 */
@Composable
fun LearnHub(
    state: AccountState,
    onOpenLearning: () -> Unit,
    onOpenDiscoverLessons: () -> Unit,
    onApply: () -> Unit,
    loadCourseCatalog: () -> Unit,
    loadMoreCourseCatalog: () -> Unit,
    loadGradebook: (Boolean) -> Unit,
    loadCertificates: () -> Unit,
    attendanceCheckIn: (String) -> Unit,
    loadCalendar: (Boolean) -> Unit,
    loadLiveClasses: (Boolean) -> Unit,
    openLiveClass: (String) -> Unit,
    closeLiveClass: () -> Unit,
    refreshLiveChat: () -> Unit,
    sendLiveChat: (String, () -> Unit) -> Unit,
    loadPaymentHistory: (Boolean) -> Unit,
    askAssistant: (String) -> Unit,
    resetAssistant: () -> Unit,
) {
    var section by rememberSaveable { mutableStateOf<String?>(null) }
    val isStudent = state.session.user?.roleKey == "student" && !state.session.mfaRequired
    BackHandler(section != null) { section = null }

    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        if (state.busy) {
            item {
                LinearProgressIndicator(Modifier.fillMaxWidth())
                Text("Checking your learning records…")
            }
        }
        state.message?.let { message ->
            item { Text(message, modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite }) }
        }

        if (!isStudent) {
            item { Text("Learn", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
            item {
                Text(
                    if (state.session.user == null) {
                        "Sign in from the Account tab to see your courses, assignments, grades and certificates. Free public lessons are open to everyone."
                    } else {
                        "Your verified role (${state.session.user?.roleKey}) does not include the student workspace. Free public lessons remain available."
                    },
                )
            }
            item { Button(onClick = onOpenDiscoverLessons, modifier = Modifier.fillMaxWidth()) { Text("Read free public lessons") } }
            item { OutlinedButton(onClick = onApply, modifier = Modifier.fillMaxWidth()) { Text("Apply for a course") } }
            return@LazyColumn
        }

        when (section) {
            "grades" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("Grades", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("Your official gradebook, as recorded by the Academy server.") }
                item { OutlinedButton(onClick = { loadGradebook(false) }, enabled = !state.busy) { Text("Refresh grades") } }
                val gradebook = state.learn.gradebook
                if (state.learn.gradebookLoaded && gradebook.isEmpty()) {
                    item { Text("No gradebook entries yet. Grades appear here after your instructors record them.") }
                }
                items(gradebook, key = { "gb-${it.name}" }) { entry ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                Text(entry.name, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                                Text("${entry.letter.ifBlank { "—" }} • ${String.format(Locale.US, "%.0f", entry.pct)}% ${entry.trendSymbol()}")
                            }
                            if (entry.units > 0) Text("${entry.units} unit${if (entry.units == 1) "" else "s"}", style = MaterialTheme.typography.bodySmall)
                            if (entry.items.isNotEmpty()) {
                                Text("Components:", style = MaterialTheme.typography.labelMedium)
                                entry.items.forEach { item ->
                                    Text("• ${item.toString().take(200)}", style = MaterialTheme.typography.bodySmall)
                                }
                            }
                        }
                    }
                }
                if (state.learn.gradebookCursor != null) {
                    item { OutlinedButton(onClick = { loadGradebook(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more") } }
                }
            }
            "certificates" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("Certificates", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("Official certificates issued to you. Anyone can verify a code on the Discover tab without an account.") }
                item { OutlinedButton(onClick = loadCertificates, enabled = !state.busy) { Text("Refresh certificates") } }
                val certs = state.learn.certificates
                if (state.learn.certificatesLoaded && certs.isEmpty()) {
                    item { Text("No certificates issued yet. They appear here when an instructor completes your course.") }
                }
                items(certs, key = { "cert-${it.id}" }) { cert ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(cert.title, fontWeight = FontWeight.SemiBold)
                            Text("Code: ${cert.code}", style = MaterialTheme.typography.bodyMedium)
                            if (cert.courseSlug.isNotBlank()) Text("Course: ${cert.courseSlug}", style = MaterialTheme.typography.bodySmall)
                            if (cert.issuedAt.isNotBlank()) Text("Issued: ${cert.issuedAt}", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
            "attendance" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("Attendance check-in", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("During a live class, your instructor shares a short code. Enter it here to be marked present. The code expires when class ends.") }
                var code by rememberSaveable { mutableStateOf("") }
                OutlinedTextField(
                    value = code,
                    onValueChange = { code = it.uppercase(Locale.US).take(80).filter { c -> c.isLetterOrDigit() || c == '-' } },
                    label = { Text("Class code") },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                    modifier = Modifier.fillMaxWidth(),
                )
                item {
                    Button(
                        onClick = { attendanceCheckIn(code); code = "" },
                        enabled = !state.busy && code.trim().length >= 6,
                        modifier = Modifier.fillMaxWidth(),
                    ) { Text("Check in as present") }
                }
                state.learn.lastCheckIn?.let { result ->
                    item {
                        Card(Modifier.fillMaxWidth()) {
                            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(
                                    if (result.alreadyCheckedIn) "Already marked present" else "Marked present",
                                    fontWeight = FontWeight.SemiBold,
                                    color = MaterialTheme.colorScheme.primary,
                                )
                                if (result.course.isNotBlank()) Text("Class: ${result.course}")
                                if (result.date.isNotBlank()) Text("Date: ${result.date} • Status: ${result.status}")
                                if (result.closesAt.isNotBlank()) Text("Code closes: ${result.closesAt}", style = MaterialTheme.typography.bodySmall)
                            }
                        }
                    }
                }
                item { HorizontalDivider() }
                item { Text("My attendance records", style = MaterialTheme.typography.titleMedium) }
                item {
                    OutlinedButton(onClick = { loadSelfRecords(false) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                        Text("Load my attendance records")
                    }
                }
                if (state.learn.selfRecordsLoaded && state.learn.selfRecords.isEmpty()) {
                    item { Text("No attendance records yet. Check in during a live class.") }
                }
                items(state.learn.selfRecords, key = { "rec-${it.id}" }) { record ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                            Text(record.course.ifBlank { "Class session" }, fontWeight = FontWeight.SemiBold)
                            Text("${record.dateLabel} • ${record.status}", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
                if (state.learn.selfRecordsCursor != null) {
                    item { OutlinedButton(onClick = { loadSelfRecords(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load older records") } }
                }
            }
            "calendar" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("Class calendar", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { OutlinedButton(onClick = { loadCalendar(false) }, enabled = !state.busy) { Text("Refresh calendar") } }
                val events = state.learn.calendar
                if (state.learn.calendarLoaded && events.isEmpty()) {
                    item { Text("No calendar events have been published yet.") }
                }
                items(events, key = { "cal-${it.id}" }) { event ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(event.title, fontWeight = FontWeight.SemiBold)
                            val meta = listOfNotNull(
                                event.date.ifBlank { null },
                                event.day.ifBlank { null },
                                event.time.ifBlank { null },
                                event.location.ifBlank { null },
                            ).joinToString(" • ")
                            if (meta.isNotBlank()) Text(meta, style = MaterialTheme.typography.bodySmall)
                            if (event.kind.isNotBlank()) Text(event.kind, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.secondary)
                        }
                    }
                }
                if (state.learn.calendarCursor != null) {
                    item { OutlinedButton(onClick = { loadCalendar(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more events") } }
                }
            }
            "live" -> {
                item { OutlinedButton(onClick = { section = null; closeLiveClass() }) { Text("Back to Learn") } }
                item {
                    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                        LiveSection(
                            live = state.live,
                            busy = state.busy,
                            onRefresh = { loadLiveClasses(false) },
                            onLoadMore = { loadLiveClasses(true) },
                            onOpen = openLiveClass,
                            onClose = closeLiveClass,
                            onRefreshChat = refreshLiveChat,
                            onSend = sendLiveChat,
                            currentUserId = state.session.user?.id,
                        )
                    }
                }
            }
            "payments" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("Payment history", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("Card and online payments recorded against your account. Tuition bank transfers are tracked separately in Admissions & fees on the Account tab.") }
                item { OutlinedButton(onClick = { loadPaymentHistory(false) }, enabled = !state.busy) { Text("Refresh payments") } }
                val payments = state.learn.paymentHistory
                if (state.learn.paymentsLoaded && payments.isEmpty()) {
                    item { Text("No online payments recorded yet.") }
                }
                items(payments, key = { "pay-${it.id}" }) { payment ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(payment.description.ifBlank { "Payment" }, fontWeight = FontWeight.SemiBold)
                            Text(
                                String.format(Locale.US, "%s %,.0f • %s", payment.currency.ifBlank { "NGN" }, payment.amount, payment.status),
                                color = MaterialTheme.colorScheme.primary,
                            )
                            Text("Reference: ${payment.reference}", style = MaterialTheme.typography.bodySmall)
                            if (!payment.paidAt.isNullOrBlank()) Text("Paid: ${payment.paidAt}", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
                if (state.learn.paymentCursor != null) {
                    item { OutlinedButton(onClick = { loadPaymentHistory(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more payments") } }
                }
            }
            "assistant" -> {
                item { OutlinedButton(onClick = { section = null }) { Text("Back to Learn") } }
                item { Text("AI tutor", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("Ask a study question. Answers come from the Academy's tutor service and are kept on this screen only.") }
                item {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        OutlinedButton(onClick = resetAssistant, enabled = !state.busy) { Text("New conversation") }
                    }
                }
                val turns = state.discover.assistant
                if (turns.isEmpty()) {
                    item { Text("No questions yet. For example: “Explain how HTTPS protects a login form.”") }
                }
                items(turns, key = { "turn-${it.hashCode()}" }) { turn ->
                    Surface(
                        color = if (turn.isUser()) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                        shape = MaterialTheme.shapes.small,
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        SelectionContainer {
                            Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(if (turn.isUser()) "You" else "Tutor", style = MaterialTheme.typography.labelSmall)
                                Text(turn.content)
                            }
                        }
                    }
                }
                var question by rememberSaveable { mutableStateOf("") }
                item {
                    OutlinedTextField(
                        value = question,
                        onValueChange = { if (it.length <= 2000) question = it },
                        label = { Text("Ask the tutor") },
                        minLines = 2,
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    Button(
                        onClick = { askAssistant(question); question = "" },
                        enabled = !state.busy && question.trim().isNotEmpty(),
                        modifier = Modifier.fillMaxWidth(),
                    ) { Text("Ask") }
                }
            }
            else -> {
                item { Text("Learn", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("Your native learning workspace. Everything below is fetched live from the Academy server.") }
                item {
                    Button(onClick = onOpenLearning, modifier = Modifier.fillMaxWidth()) {
                        Text("My courses, assignments & assessments")
                    }
                }
                item { Text("Progress & records", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                LearnHubCard("Grades", "Letter grades, percentages and trends per course.", { section = "grades" }, { if (!state.learn.gradebookLoaded) loadGradebook(false) })
                LearnHubCard("Certificates", "Official certificates and their verification codes.", { section = "certificates" }, { if (!state.learn.certificatesLoaded) loadCertificates() })
                LearnHubCard("Attendance check-in", "Mark yourself present with a live class code.", { section = "attendance" }, {})
                LearnHubCard("Class calendar", "Upcoming sessions, deadlines and events.", { section = "calendar" }, { if (!state.learn.calendarLoaded) loadCalendar(false) })
                LearnHubCard("Payment history", "Online payments recorded on your account.", { section = "payments" }, { if (!state.learn.paymentsLoaded) loadPaymentHistory(false) })
                item { Text("Live & support", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                LearnHubCard("Live classes", "Join scheduled classes and their class chat.", { section = "live" }, { if (!state.live.loaded) loadLiveClasses(false) })
                LearnHubCard("AI tutor", "Ask study questions and get guided answers.", { section = "assistant" }, {})
                if (state.learn.coursesLoaded && state.learn.coursesList.isNotEmpty()) {
                    item { Text("All courses", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                    item { OutlinedButton(onClick = loadCourseCatalog, enabled = !state.busy) { Text("Refresh course list") } }
                    items(state.learn.coursesList, key = { "cl-${it.slug}" }) { course ->
                        OutlinedCard(Modifier.fillMaxWidth()) {
                            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(course.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                                val meta = listOfNotNull(
                                    course.cohort.ifBlank { null },
                                    course.instructor.ifBlank { null },
                                    "Progress ${course.pct}%",
                                ).joinToString(" • ")
                                if (meta.isNotBlank()) Text(meta, style = MaterialTheme.typography.bodySmall)
                            }
                        }
                    }
                    if (state.learn.coursesCursor != null) {
                        item { OutlinedButton(onClick = loadMoreCourseCatalog, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more courses") } }
                    }
                } else {
                    item { OutlinedButton(onClick = loadCourseCatalog, enabled = !state.busy) { Text("Load full course list") } }
                }
            }
        }
    }
}

@Composable
private fun LearnHubCard(title: String, subtitle: String, onClick: () -> Unit, onFirstOpen: () -> Unit) {
    Card(
        Modifier
            .fillMaxWidth()
            .clickable { onFirstOpen(); onClick() },
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodySmall)
            Text("Open", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
        }
    }
}

@Composable
private fun LiveSection(
    live: LiveHubState,
    busy: Boolean,
    onRefresh: () -> Unit,
    onLoadMore: () -> Unit,
    onOpen: (String) -> Unit,
    onClose: () -> Unit,
    onRefreshChat: () -> Unit,
    onSend: (String, () -> Unit) -> Unit,
    onLoadPolls: () -> Unit,
    onVotePoll: (String, String) -> Unit,
    currentUserId: String?,
) {
    if (live.selected != null) {
        val cls = live.selected
        var draft by remember(live.selectedId) { mutableStateOf("") }
        Text(cls.title, style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() })
        Text(
            listOfNotNull(cls.instructor.ifBlank { null }?.let { "Instructor: $it" }, cls.cohort.ifBlank { null }, cls.startsAt.ifBlank { null }, cls.status.ifBlank { null })
                .joinToString(" • "),
            style = MaterialTheme.typography.bodySmall,
        )
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(onClick = onClose, enabled = !busy) { Text("Back to classes") }
            OutlinedButton(onClick = onRefreshChat, enabled = !busy) { Text("Refresh chat") }
        }
        if (!live.chatLoaded) {
            Text("Loading class chat…")
        } else if (live.chat.isEmpty()) {
            Text("No class messages yet. Be the first to say hello.")
        }
        live.chat.forEach { msg ->
            val mine = msg.userId != null && msg.userId == currentUserId
            Surface(
                color = if (mine) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                shape = MaterialTheme.shapes.small,
                modifier = Modifier.fillMaxWidth(),
            ) {
                SelectionContainer {
                    Column(Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(
                            if (mine) "You • ${msg.createdAt}" else "${msg.userName.ifBlank { "Classmate" }} • ${msg.createdAt}",
                            style = MaterialTheme.typography.labelSmall,
                        )
                        Text(msg.body)
                    }
                }
            }
        }
        OutlinedTextField(
            value = draft,
            onValueChange = { if (it.length <= 2000) draft = it },
            label = { Text("Message the class") },
            minLines = 2,
            modifier = Modifier.fillMaxWidth(),
        )
        Button(
            onClick = { onSend(draft.trim()) { draft = "" } },
            enabled = !busy && draft.trim().isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Post to class chat") }
        return
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Live classes (${live.classes.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
        OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
    }
    if (!live.loaded) {
        Text("Live class schedule is loaded from the Academy server.")
        Button(onClick = onRefresh, enabled = !busy) { Text("Load live classes") }
    } else if (live.classes.isEmpty()) {
        Text("No live classes are scheduled right now. Check the calendar for upcoming sessions.")
    } else {
        live.classes.forEach { cls ->
            Card(
                Modifier
                    .fillMaxWidth()
                    .clickable(enabled = !busy, onClickLabel = "Open live class ${cls.title}") { onOpen(cls.id) },
            ) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(cls.title, fontWeight = FontWeight.SemiBold)
                    val meta = listOfNotNull(
                        cls.instructor.ifBlank { null },
                        cls.cohort.ifBlank { null },
                        cls.startsAt.ifBlank { null },
                    ).joinToString(" • ")
                    if (meta.isNotBlank()) Text(meta, style = MaterialTheme.typography.bodySmall)
                    Text(cls.status.ifBlank { "Open class" }, color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
                }
            }
        }
        if (live.nextCursor != null) {
            OutlinedButton(onClick = onLoadMore, enabled = !busy, modifier = Modifier.fillMaxWidth()) { Text("Load older classes") }
        }
    }
}
