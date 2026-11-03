package ng.cea.nativeapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

/** Native rendering of the new Home / Learn / Discover hubs with fixture state only. */
class HubScreensUiTest {
    @get:Rule val compose = createComposeRule()
    private val studentSession = NativeSession(user = NativeUser("u1", "Learner", "learner@example.test", "student"))

    private fun portalState() = AccountState(
        session = studentSession,
        home = HomeState(
            portal = PortalSummary(
                portal = "learner",
                group = "learner",
                restricted = false,
                metrics = listOf(PortalMetric("courses", "Courses", 3.0, "number")),
                activity = listOf(NotificationItem("n1", "Assignment graded", "Score 18/20", "2026-11-02", "learning", false)),
            ),
            unread = 2,
            loaded = true,
        ),
    )

    @Test fun homeShowsPortalMetricsActivityAndActionsForSignedInStudent() {
        compose.setContent {
            MaterialTheme {
                HomeScreen(
                    state = portalState(),
                    catalog = CatalogState(programs = listOf(Program("web", "Web Development")), loading = false, fetchedAt = 1762000000000L),
                    onRefreshHome = {}, onLoadRecommendations = {}, onOpenLearn = {}, onOpenConnect = {},
                    onOpenDiscover = {}, onApply = {}, onVerifyCertificate = {}, onCallAcademy = {},
                )
            }
        }
        compose.onNodeWithText("Welcome back, Learner.").assertIsDisplayed()
        compose.onNodeWithText("2 unread notifications").assertExists()
        compose.onNodeWithText("Courses").assertExists()
        compose.onNodeWithText("3").assertExists()
        compose.onNodeWithText("Assignment graded").performScrollTo().assertIsDisplayed()
        compose.onNodeWithText("Continue learning").assertExists()
        compose.onNodeWithText("Tutor suggestions").performScrollTo().assertExists()
    }

    @Test fun homeForVisitorOffersApplyExploreAndVerifyWithoutAccount() {
        compose.setContent {
            MaterialTheme {
                HomeScreen(
                    state = AccountState(),
                    catalog = CatalogState(programs = listOf(Program("web", "Web Development")), loading = false),
                    onRefreshHome = {}, onLoadRecommendations = {}, onOpenLearn = {}, onOpenConnect = {},
                    onOpenDiscover = {}, onApply = {}, onVerifyCertificate = {}, onCallAcademy = {},
                )
            }
        }
        compose.onNodeWithText("Not signed in").assertIsDisplayed()
        compose.onNodeWithText("Apply for free").assertExists()
        compose.onNodeWithText("Verify a certificate").performScrollTo().assertExists()
        compose.onNodeWithText("About this app").performScrollTo().assertExists()
    }

    @Test fun learnHubListsNativeSectionsAndAssistantRequiresQuestion() {
        var asked: String? = null
        compose.setContent {
            MaterialTheme {
                LearnHub(
                    state = AccountState(session = studentSession),
                    onOpenLearning = {}, onOpenDiscoverLessons = {}, onApply = {},
                    loadCourseCatalog = {}, loadMoreCourseCatalog = {}, loadGradebook = {},
                    loadCertificates = {}, attendanceCheckIn = {}, loadCalendar = {},
                    loadLiveClasses = {}, openLiveClass = {}, closeLiveClass = {},
                    refreshLiveChat = {}, sendLiveChat = { _, _ -> }, loadPaymentHistory = {},
                    askAssistant = { asked = it }, resetAssistant = {},
                )
            }
        }
        compose.onNodeWithText("My courses, assignments & assessments").assertIsDisplayed()
        compose.onNodeWithText("AI tutor").performScrollTo().performClick()
        compose.onNodeWithText("Ask the tutor").performScrollTo().performTextInput("Explain HTTPS")
        compose.onNodeWithText("Ask").performScrollTo().performClick()
        compose.runOnIdle { assertEquals("Explain HTTPS", asked) }
    }

    @Test fun learnHubBlocksWorkspaceForAnonymousVisitor() {
        compose.setContent {
            MaterialTheme {
                LearnHub(
                    state = AccountState(),
                    onOpenLearning = {}, onOpenDiscoverLessons = {}, onApply = {},
                    loadCourseCatalog = {}, loadMoreCourseCatalog = {}, loadGradebook = {},
                    loadCertificates = {}, attendanceCheckIn = {}, loadCalendar = {},
                    loadLiveClasses = {}, openLiveClass = {}, closeLiveClass = {},
                    refreshLiveChat = {}, sendLiveChat = { _, _ -> }, loadPaymentHistory = {},
                    askAssistant = {}, resetAssistant = {},
                )
            }
        }
        compose.onNodeWithText("Sign in from the Account tab").assertIsDisplayed()
        compose.onNodeWithText("Read free public lessons").assertExists()
        compose.onNodeWithText("My courses, assignments & assessments").assertDoesNotExist()
    }

    @Test fun discoverHubOpensCertificateVerifyAndRequiresMinLength() {
        var verified: String? = null
        compose.setContent {
            MaterialTheme {
                DiscoverHub(
                    state = AccountState(),
                    catalog = CatalogState(loading = false),
                    refreshCatalog = {}, favorite = {}, onApply = {}, callAcademy = {},
                    loadCohorts = {}, loadLibraryCatalog = {}, loadLibraryAuthed = {},
                    loadShop = {}, verifyCertificate = { verified = it },
                    loadMentors = {}, requestMentor = { _, _ -> }, matchMentor = {},
                    loadJobs = {}, loadTalentPool = {}, loadInterviews = {},
                )
            }
        }
        compose.onNodeWithText("Course catalogue").assertIsDisplayed()
        compose.onNodeWithText("Digital shop").performScrollTo().assertExists()
        compose.onNodeWithText("Verify a certificate").performScrollTo().performClick()
        compose.onNodeWithText("Verify certificate").assertIsNotEnabled()
        compose.onNodeWithText("Certificate code").performTextInput("CEA-2026-AB12CD")
        compose.onNodeWithText("Verify certificate").performScrollTo().performClick()
        compose.runOnIdle { assertEquals("CEA-2026-AB12CD", verified) }
    }

    @Test fun discoverHubRendersShopCatalogNatively() {
        val shop = ShopCatalog(
            currency = "NGN",
            country = "NG",
            storeUrl = "https://www.cea.ng/shop",
            products = listOf(
                ShopProduct(
                    id = "p1", slug = "template", title = "Portfolio Template", price = 5000.0,
                    availability = "in_stock", shortDescription = "Stand out.", highlights = listOf("ATS friendly"),
                    deliveryHours = 24, fileFormat = "PDF", license = "Single seat",
                ),
            ),
        )
        compose.setContent {
            MaterialTheme {
                DiscoverHub(
                    state = AccountState(discover = DiscoverState(shop = shop, shopLoaded = true)),
                    catalog = CatalogState(loading = false),
                    refreshCatalog = {}, favorite = {}, onApply = {}, callAcademy = {},
                    loadCohorts = {}, loadLibraryCatalog = {}, loadLibraryAuthed = {},
                    loadShop = {}, verifyCertificate = {},
                    loadMentors = {}, requestMentor = { _, _ -> }, matchMentor = {},
                    loadJobs = {}, loadTalentPool = {}, loadInterviews = {},
                    initialSection = "shop",
                )
            }
        }
        compose.onNodeWithText("Digital shop").assertIsDisplayed()
        compose.onNodeWithText("Portfolio Template").assertExists()
        compose.onNodeWithText("NGN 5,000").assertExists()
        compose.onNodeWithText("In stock").assertExists()
        compose.onNodeWithText("Buy on the official store").assertExists()
    }
}
