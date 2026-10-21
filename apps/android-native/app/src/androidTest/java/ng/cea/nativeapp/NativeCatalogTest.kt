package ng.cea.nativeapp
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Rule
import org.junit.Test

class NativeCatalogTest {
    @get:Rule val compose = createComposeRule()
    private val courses = listOf(Program("office","Office skills",category="Business",blurb="Create useful documents",outcomes=listOf("Write a document")), Program("code","Web development",category="Technology"))
    @Test fun browseSearchSaveAndNativeBackWithoutAnyNetwork() {
        compose.setContent {
            var favorites by remember { mutableStateOf(emptySet<String>()) }
            CeaNativeApp(CatalogState(programs=courses,loading=false,favorites=favorites),{}, { slug -> favorites=if(slug in favorites) favorites-slug else favorites+slug },{})
        }
        compose.onNodeWithText("Search courses").performTextInput("Office")
        compose.onNodeWithText("Office skills").performScrollTo().performClick()
        compose.onNodeWithText("Save course").performScrollTo().performClick()
        compose.onNodeWithText("Remove from saved courses").assertExists()
        compose.onNodeWithContentDescription("Back to courses").performClick()
        compose.onNodeWithText("Saved", useUnmergedTree=true).performClick()
        compose.onNodeWithText("Office skills").assertExists()
    }
    @Test fun honestOfflineErrorOffersRetry() {
        compose.setContent { CeaNativeApp(CatalogState(loading=false,error=true),{}, {},{}) }
        compose.onNodeWithText("Couldn't load courses. Check your connection and try again.").assertExists()
        compose.onNodeWithText("Refresh catalogue").assertIsEnabled()
        compose.onNodeWithText("No saved catalogue is available on this phone yet.").performScrollTo().assertIsDisplayed()
    }
}
