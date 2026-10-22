package ng.cea.nativeapp

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Star
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import java.text.DateFormat
import java.util.Date

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        window.addFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE)
        setContent {
            val model: CatalogViewModel = viewModel()
            val state by model.state.collectAsStateWithLifecycle()
            CeaNativeApp(state, model::refresh, model::favorite) {
                try {
                    startActivity(Intent(Intent.ACTION_DIAL, Uri.parse("tel:+2349058628386")))
                } catch (_: ActivityNotFoundException) {
                    Toast.makeText(this, "Call the Academy on +234 905 862 8386", Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CeaNativeApp(state: CatalogState, refresh: () -> Unit, favorite: (String) -> Unit, callAcademy: () -> Unit) {
    var tab by rememberSaveable { mutableStateOf("Explore") }
    var query by rememberSaveable { mutableStateOf("") }
    var selectedSlug by rememberSaveable { mutableStateOf<String?>(null) }
    var pendingApplySlug by rememberSaveable { mutableStateOf<String?>(null) }
    val selected = state.programs.firstOrNull { it.slug == selectedSlug }
    BackHandler(selectedSlug != null || tab != "Explore") {
        if (selectedSlug != null) selectedSlug = null else tab = "Explore"
    }
    MaterialTheme(
        colorScheme = lightColorScheme(
            primary = Color(0xFF7A2434),
            onPrimary = Color.White,
            primaryContainer = Color(0xFFF5E0E4),
            onPrimaryContainer = Color(0xFF451420),
            background = Color(0xFFFBF8F4),
            surface = Color(0xFFFBF8F4),
            onBackground = Color(0xFF251D20),
            onSurface = Color(0xFF251D20),
        ),
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text(if (selectedSlug != null) "Course details" else "Cyber Elias Academy") },
                    navigationIcon = {
                        if (selectedSlug != null) {
                            IconButton(onClick = { selectedSlug = null }) {
                                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Back to courses")
                            }
                        }
                    },
                )
            },
            bottomBar = {
                if (selectedSlug == null) {
                    NavigationBar {
                        listOf(
                            "Explore" to Icons.Default.Home,
                            "Lessons" to Icons.Default.Info,
                            "Saved" to Icons.Default.Star,
                            "Account" to Icons.Default.Info,
                            "About" to Icons.Default.Info,
                        ).forEach { (label, icon) ->
                            NavigationBarItem(
                                selected = tab == label,
                                onClick = { tab = label },
                                icon = { Icon(icon, contentDescription = null) },
                                label = { Text(label) },
                            )
                        }
                    }
                }
            },
        ) { padding ->
            if (tab == "Account" && selectedSlug == null) {
                Box(Modifier.fillMaxSize().padding(padding)) {
                    NativeAccount(
                        programs = state.programs,
                        initialApplySlug = pendingApplySlug,
                        onConsumeApplySlug = { pendingApplySlug = null },
                    )
                }
            } else if (tab == "Lessons" && selectedSlug == null) {
                Box(Modifier.fillMaxSize().padding(padding)) { BundledLessons() }
            } else {
                LazyColumn(
                    modifier = Modifier.fillMaxSize().padding(padding),
                    contentPadding = PaddingValues(20.dp),
                    verticalArrangement = Arrangement.spacedBy(16.dp),
                ) {
                    item {
                        Text(
                            "NATIVE ANDROID PREVIEW",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.primary,
                        )
                    }
                    if (selectedSlug != null) {
                        if (selected == null) {
                            item { Text("This course is no longer in the current catalogue. Go back and refresh.") }
                        } else {
                            item { Text(selected.title, style = MaterialTheme.typography.headlineMedium) }
                            item {
                                Text(
                                    listOf(selected.level, selected.duration, selected.mode)
                                        .filter { it.isNotBlank() }
                                        .joinToString(" · "),
                                )
                            }
                            item { Text(selected.blurb) }
                            if (state.fromCache) {
                                item { Text("Saved public information. Reconnect to check the latest details.") }
                            }
                            item {
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Button(onClick = { favorite(selected.slug) }) {
                                        Text(if (selected.slug in state.favorites) "Remove from saved courses" else "Save course")
                                    }
                                    OutlinedButton(
                                        onClick = {
                                            pendingApplySlug = selected.slug
                                            selectedSlug = null
                                            tab = "Account"
                                        },
                                    ) {
                                        Text("Apply for this course")
                                    }
                                }
                            }
                            if (selected.outcomes.isNotEmpty()) {
                                item { Text("What you can work towards", style = MaterialTheme.typography.titleLarge) }
                            }
                            items(selected.outcomes) { outcome -> Text("• $outcome") }
                            if (selected.tools.isNotEmpty()) {
                                item { Text("Tools: ${selected.tools.joinToString()}") }
                            }
                            item {
                                Text("Applications are free. Official tuition offers, transfer verification and receipts are confirmed directly on CEA servers.")
                            }
                            item { OutlinedButton(onClick = callAcademy) { Text("Call the Academy") } }
                        }
                    } else if (tab == "About") {
                        item { Text("A native CEA experience", style = MaterialTheme.typography.headlineMedium) }
                        item {
                            Text("Built natively in Kotlin and Jetpack Compose against CEA's HTTPS API with no embedded WebView.")
                        }
                        item { Text("Available natively in 0.6", style = MaterialTheme.typography.titleLarge) }
                        item {
                            Text(
                                "Offline public catalogue & shortlist, bundled public lessons with illustrations, account registration, sign-in, 2FA/recovery verification, password reset & change, 6-digit email verification, active device session revocation, permanent account deletion, free course applications with optional Keystore-encrypted local draft saving, canonical tuition offer acceptance, bank-transfer proof reporting & official receipts, student courses, text lesson completion, written assignments & instructor feedback, server-scored interactive assessments, instructor grading & courses, staff admissions/finance transfer verification, direct messaging, and in-app notifications.",
                            )
                        }
                        item { Text("Remaining scope & rollout notes", style = MaterialTheme.typography.titleLarge) }
                        item {
                            Text(
                                "Video streaming, file-attachment uploads, in-app card checkout, production Firebase push credentials, and owner-signed Google Play / production APK release credentials remain separate from this preview package.",
                            )
                        }
                        item { Text("Saved courses are a local shortlist—not enrolment, downloaded lessons or proof of payment.") }
                        item { OutlinedButton(onClick = callAcademy) { Text("Call the Academy") } }
                    } else {
                        item {
                            Text(
                                if (tab == "Saved") "Your course shortlist" else "What would you like to learn?",
                                style = MaterialTheme.typography.headlineMedium,
                            )
                        }
                        item {
                            Text(
                                if (tab == "Saved") {
                                    "Saved on this phone. Enrolment is a separate step."
                                } else {
                                    "Explore practical skills and find a course that fits your next step."
                                },
                            )
                        }
                        item {
                            OutlinedTextField(
                                value = query,
                                onValueChange = { query = it },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true,
                                label = { Text("Search courses") },
                                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                            )
                        }
                        item {
                            Column(
                                modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite },
                                verticalArrangement = Arrangement.spacedBy(8.dp),
                            ) {
                                if (state.loading) {
                                    LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
                                    Text("Checking the public catalogue…")
                                }
                                if (state.error) {
                                    Text(
                                        if (state.fetchedAt != null) {
                                            "Could not refresh. Showing saved public information."
                                        } else {
                                            "Couldn't load courses. Check your connection and try again."
                                        },
                                    )
                                }
                                state.fetchedAt?.let {
                                    Text(
                                        (if (state.fromCache) "Saved copy • " else "Last checked • ") +
                                            DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(Date(it)),
                                        style = MaterialTheme.typography.bodySmall,
                                    )
                                }
                            }
                        }
                        item { OutlinedButton(onClick = refresh, enabled = !state.loading) { Text("Refresh catalogue") } }
                        val visible = CatalogCodec.search(state.programs.filter { tab != "Saved" || it.slug in state.favorites }, query)
                        if (visible.isEmpty() && !state.loading) {
                            item {
                                Text(
                                    when {
                                        state.error && state.fetchedAt == null -> "No saved catalogue is available on this phone yet."
                                        query.isNotBlank() -> "No matching courses. Try a different word or clear your search."
                                        tab == "Saved" -> "No saved courses yet. Open a course in Explore and choose Save course."
                                        else -> "No courses are currently listed by the API. Contact the Academy for guidance."
                                    },
                                )
                            }
                        }
                        items(visible, key = { it.slug }) { program ->
                            OutlinedCard(onClick = { selectedSlug = program.slug }, modifier = Modifier.fillMaxWidth()) {
                                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                                    if (program.category.isNotBlank()) {
                                        Text(
                                            program.category,
                                            style = MaterialTheme.typography.labelMedium,
                                            color = MaterialTheme.colorScheme.primary,
                                        )
                                    }
                                    Text(program.title, style = MaterialTheme.typography.titleLarge)
                                    Text(program.blurb, maxLines = 3)
                                    Text(
                                        listOf(program.level, program.duration).filter { it.isNotBlank() }.joinToString(" · "),
                                        style = MaterialTheme.typography.bodySmall,
                                    )
                                    Text(
                                        if (program.slug in state.favorites) "Saved • View course" else "View course",
                                        color = MaterialTheme.colorScheme.primary,
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
