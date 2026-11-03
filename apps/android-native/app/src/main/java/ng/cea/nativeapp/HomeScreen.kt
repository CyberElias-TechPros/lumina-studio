package ng.cea.nativeapp

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import java.text.DateFormat
import java.util.Date

/**
 * Home tab: a role-aware overview. Signed-in users get their portal metrics, unread
 * badge, recent activity and tutor recommendations; visitors get public highlights
 * and clear paths to explore, apply and verify certificates.
 */
@Composable
fun HomeScreen(
    state: AccountState,
    catalog: CatalogState,
    onRefreshHome: () -> Unit,
    onLoadRecommendations: () -> Unit,
    onOpenLearn: () -> Unit,
    onOpenConnect: () -> Unit,
    onOpenDiscover: () -> Unit,
    onApply: () -> Unit,
    onVerifyCertificate: () -> Unit,
    onCallAcademy: () -> Unit,
) {
    val user = state.session.user
    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item {
            Text("Cyber Elias Academy", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() })
            Text(
                if (user != null) "Welcome back, ${user.name}." else "Practical tech skills, taught in Port Harcourt and online.",
            )
        }
        if (state.busy) {
            item {
                LinearProgressIndicator(Modifier.fillMaxWidth())
                Text("Checking with the Academy…")
            }
        }
        state.message?.let { message ->
            item { Text(message, modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite }) }
        }

        if (user != null && !state.session.mfaRequired) {
            item {
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("Signed in as ${user.name}", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text(user.email, style = MaterialTheme.typography.bodyMedium)
                        Text("Verified role: ${user.roleKey}", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
                        state.home.unread?.let { count ->
                            Text(
                                if (count > 0) "$count unread notification${if (count == 1) "" else "s"}" else "No unread notifications",
                                style = MaterialTheme.typography.bodySmall,
                            )
                        }
                    }
                }
            }
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = onOpenLearn, modifier = Modifier.weight(1f)) { Text("Continue learning") }
                    OutlinedButton(onClick = onOpenConnect, modifier = Modifier.weight(1f)) { Text("Messages") }
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedButton(onClick = onRefreshHome, enabled = !state.busy, modifier = Modifier.weight(1f)) { Text("Refresh overview") }
                    OutlinedButton(onClick = onOpenDiscover, modifier = Modifier.weight(1f)) { Text("Explore") }
                }
            }
            val portal = state.home.portal
            if (portal != null) {
                if (portal.metrics.isNotEmpty()) {
                    item { Text("Your overview", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                    items(portal.metrics.chunked(2), key = { row -> row.first().key }) { row ->
                        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            row.forEach { metric ->
                                Card(Modifier.weight(1f)) {
                                    Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                                        Text(metric.label, style = MaterialTheme.typography.labelSmall)
                                        Text(metric.formatted(), style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                                        if (!metric.hint.isNullOrBlank()) {
                                            Text(metric.hint, style = MaterialTheme.typography.bodySmall)
                                        }
                                    }
                                }
                            }
                            if (row.size == 1) Spacer(Modifier.weight(1f))
                        }
                    }
                }
                if (portal.activity.isNotEmpty()) {
                    item { Text("Recent activity", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                    items(portal.activity, key = { "act-${it.id}" }) { activity ->
                        OutlinedCard(Modifier.fillMaxWidth()) {
                            Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text(activity.title, fontWeight = if (activity.read) FontWeight.Normal else FontWeight.Bold)
                                if (activity.body.isNotBlank()) Text(activity.body, style = MaterialTheme.typography.bodySmall)
                                Text(activity.time, style = MaterialTheme.typography.labelSmall)
                            }
                        }
                    }
                }
                if (portal.restricted) {
                    item { Text("Some portal sections are restricted to specific roles.", style = MaterialTheme.typography.bodySmall) }
                }
            }
            if (user.roleKey == "student") {
                item {
                    Row(
                        Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Text("Tutor suggestions", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                        OutlinedButton(onClick = onLoadRecommendations, enabled = !state.busy) { Text("Refresh") }
                    }
                }
                if (state.home.recommendations.isEmpty()) {
                    item { Text("Ask your AI tutor for personalised course, assignment and career suggestions from the Learn tab.") }
                } else {
                    items(state.home.recommendations, key = { "rec-${it.id}" }) { rec ->
                        Card(Modifier.fillMaxWidth()) {
                            Column(Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text("${rec.cta} — ${rec.title}", fontWeight = FontWeight.SemiBold)
                                if (rec.reason.isNotBlank()) Text(rec.reason, style = MaterialTheme.typography.bodySmall)
                                Text(rec.kind.replaceFirstChar { it.titlecase() }, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.secondary)
                            }
                        }
                    }
                }
            }
        } else {
            item {
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("Not signed in", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text("Explore public courses, read free lessons and verify certificates without an account. Sign in to learn, message and track applications.")
                        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                            Button(onClick = onApply, modifier = Modifier.weight(1f)) { Text("Apply for free") }
                            OutlinedButton(onClick = onOpenDiscover, modifier = Modifier.weight(1f)) { Text("Explore") }
                        }
                    }
                }
            }
            item {
                OutlinedCard(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("Browse the catalogue", style = MaterialTheme.typography.titleMedium)
                        Text(
                            if (catalog.programs.isEmpty()) {
                                "Course catalogue is loading or unavailable offline right now."
                            } else {
                                "${catalog.programs.size} public programmes listed by the Academy."
                            },
                        )
                        catalog.fetchedAt?.let {
                            Text(
                                (if (catalog.fromCache) "Saved copy • " else "Last checked • ") +
                                    DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(Date(it)),
                                style = MaterialTheme.typography.bodySmall,
                            )
                        }
                        OutlinedButton(onClick = onOpenDiscover) { Text("Open course catalogue") }
                    }
                }
            }
            item {
                OutlinedCard(Modifier.fillMaxWidth(), onClick = onVerifyCertificate) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("Verify a certificate", style = MaterialTheme.typography.titleMedium)
                        Text("Enter an official certificate code to confirm it against Academy records.")
                        Text("Open certificate check", color = MaterialTheme.colorScheme.primary)
                    }
                }
            }
            item { OutlinedButton(onClick = onCallAcademy, modifier = Modifier.fillMaxWidth()) { Text("Call the Academy") } }
            item { Text("About this app", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
            item {
                Text(
                    "A fully native Android app written in Kotlin and Jetpack Compose against the Academy's HTTPS API — no embedded web view. " +
                        "It covers the course catalogue, free public lessons, applications and tuition receipts, learning workspaces, live classes, messages, " +
                        "opportunities, mentorship, the library and the digital shop, each rendered natively.",
                )
            }
        }
    }
}
