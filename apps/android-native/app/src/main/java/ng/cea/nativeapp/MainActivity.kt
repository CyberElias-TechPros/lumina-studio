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
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Mail
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.School
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel

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

/**
 * Root of the fully native app: five tabs (Home, Learn, Discover, Connect, Account),
 * each rendered by native Jetpack Compose screens against the CEA HTTPS API.
 * No WebView, Capacitor or HTML renderer anywhere in this project.
 */
@Composable
fun CeaNativeApp(state: CatalogState, refresh: () -> Unit, favorite: (String) -> Unit, callAcademy: () -> Unit) {
    val account: AccountViewModel = viewModel()
    val accountState by account.state.collectAsStateWithLifecycle()
    CeaAppShell(
        catalog = state,
        refreshCatalog = refresh,
        favorite = favorite,
        callAcademy = callAcademy,
        account = account,
        accountState = accountState,
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CeaAppShell(
    catalog: CatalogState,
    refreshCatalog: () -> Unit,
    favorite: (String) -> Unit,
    callAcademy: () -> Unit,
    account: AccountViewModel,
    accountState: AccountState,
) {
    var tab by rememberSaveable { mutableStateOf("Home") }
    var pendingApplySlug by rememberSaveable { mutableStateOf<String?>(null) }
    var applyNonce by rememberSaveable { mutableIntStateOf(0) }
    var discoverSection by rememberSaveable { mutableStateOf<String?>(null) }
    var learning by rememberSaveable { mutableStateOf(false) }

    BackHandler(tab != "Home" || learning) {
        if (learning) learning = false else tab = "Home"
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
                    title = {
                        Column {
                            Text("Cyber Elias Academy")
                            Text(
                                when (tab) {
                                    "Home" -> "Your overview"
                                    "Learn" -> "Learning workspace"
                                    "Discover" -> "Explore the Academy"
                                    "Connect" -> "Messages & alerts"
                                    else -> "Your account"
                                },
                                style = MaterialTheme.typography.bodySmall,
                            )
                        }
                    },
                )
            },
            bottomBar = {
                NavigationBar {
                    listOf(
                        "Home" to Icons.Default.Home,
                        "Learn" to Icons.Default.School,
                        "Discover" to Icons.Default.Explore,
                        "Connect" to Icons.Default.Mail,
                        "Account" to Icons.Default.Person,
                    ).forEach { (label, icon) ->
                        val badge = label == "Connect" && accountState.notifications.count { !it.read } > 0
                        NavigationBarItem(
                            selected = tab == label,
                            onClick = {
                                tab = label
                                if (label == "Learn") learning = false
                                if (label == "Home") account.loadHome()
                            },
                            icon = {
                                if (badge) {
                                    BadgedBox(badge = { Badge { Text("${accountState.notifications.count { !it.read }}") } }) {
                                        Icon(icon, contentDescription = null)
                                    }
                                } else {
                                    Icon(icon, contentDescription = null)
                                }
                            },
                            label = { Text(label) },
                        )
                    }
                }
            },
        ) { padding ->
            Box(Modifier.fillMaxSize().padding(padding)) {
                when (tab) {
                    "Home" -> HomeScreen(
                        state = accountState,
                        catalog = catalog,
                        onRefreshHome = account::loadHome,
                        onLoadRecommendations = account::loadAiRecommendations,
                        onOpenLearn = { tab = "Learn" },
                        onOpenConnect = { tab = "Connect" },
                        onOpenDiscover = { tab = "Discover" },
                        onApply = { applyNonce += 1; tab = "Account" },
                        onVerifyCertificate = { discoverSection = "verify"; tab = "Discover" },
                        onCallAcademy = callAcademy,
                    )
                    "Learn" -> {
                        if (learning && accountState.session.user?.roleKey == "student") {
                            StudentWorkspace(
                                state = accountState,
                                back = { learning = false },
                                reload = account::loadDashboard,
                                complete = account::completeLesson,
                                loadAssignments = account::loadAssignments,
                                loadMoreAssignments = account::loadMoreAssignments,
                                openAssignment = account::openAssignment,
                                submitAssignment = account::submitAssignment,
                                loadAssessments = account::loadAssessments,
                                openAssessment = account::openAssessment,
                                submitAssessment = account::submitAssessment,
                            )
                        } else {
                            LearnHub(
                                state = accountState,
                                onOpenLearning = {
                                    learning = true
                                    account.loadDashboard()
                                },
                                onOpenDiscoverLessons = { discoverSection = "lessons"; tab = "Discover" },
                                onApply = { applyNonce += 1; tab = "Account" },
                                loadCourseCatalog = account::loadCourseCatalog,
                                loadMoreCourseCatalog = account::loadMoreCourseCatalog,
                                loadGradebook = account::loadGradebook,
                                loadCertificates = account::loadCertificates,
                                attendanceCheckIn = account::attendanceCheckIn,
                                loadCalendar = account::loadCalendar,
                                loadLiveClasses = account::loadLiveClasses,
                                openLiveClass = account::openLiveClass,
                                closeLiveClass = account::closeLiveClass,
                                refreshLiveChat = account::refreshLiveChat,
                                sendLiveChat = account::sendLiveChat,
                                loadLivePolls = account::loadLivePolls,
                                voteLivePoll = account::voteLivePoll,
                                loadSelfRecords = account::loadSelfRecords,
                                loadPaymentHistory = account::loadPaymentHistory,
                                askAssistant = account::askAssistant,
                                resetAssistant = account::resetAssistant,
                            )
                        }
                    }
                    "Discover" -> DiscoverHub(
                        state = accountState,
                        catalog = catalog,
                        refreshCatalog = refreshCatalog,
                        favorite = favorite,
                        onApply = { slug -> pendingApplySlug = slug; tab = "Account" },
                        callAcademy = callAcademy,
                        loadCohorts = account::loadCohorts,
                        loadLibraryCatalog = account::loadLibraryCatalog,
                        loadLibraryAuthed = account::loadLibraryAuthed,
                        loadShop = account::loadShop,
                        verifyCertificate = account::verifyCertificate,
                        loadMentors = account::loadMentors,
                        requestMentor = account::requestMentor,
                        matchMentor = account::matchMentor,
                        loadJobs = account::loadJobs,
                        loadTalentPool = account::loadTalentPool,
                        loadInterviews = account::loadInterviews,
                        initialSection = discoverSection,
                        onConsumeSection = { discoverSection = null },
                    )
                    "Connect" -> ConnectHub(
                        state = accountState,
                        loadMessages = account::loadMessages,
                        openMessageThread = account::openMessageThread,
                        closeMessageThread = account::closeMessageThread,
                        sendMessage = account::sendMessage,
                        loadNotifications = account::loadNotifications,
                        markNotificationRead = account::markNotificationRead,
                        markAllNotificationsRead = account::markAllNotificationsRead,
                    )
                    else -> NativeAccount(
                        programs = catalog.programs,
                        initialApplySlug = pendingApplySlug,
                        onConsumeApplySlug = { pendingApplySlug = null },
                        applyNonce = applyNonce,
                    )
                }
            }
        }
    }
}
