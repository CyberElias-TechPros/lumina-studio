package ng.cea.nativeapp

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.material3.MaterialTheme
import org.junit.Rule
import org.junit.Test

class PublicLessonsUiTest {
    @get:Rule val compose = createComposeRule()
    @Test fun searchesReadsAndReturnsToResults() {
        compose.setContent { MaterialTheme { PublicLessonReader(listOf(
            PublicLesson("intro", "Computer basics", body = listOf(LessonBlock("p", text = "This is a native paragraph.")))
        )) } }
        compose.onNodeWithText("Search public lessons").performTextInput("Computer")
        compose.onNodeWithText("Computer basics").performScrollTo().performClick()
        compose.onNodeWithText("This is a native paragraph.").performScrollTo().assertIsDisplayed()
        compose.onAllNodesWithText("Back to public lessons")[0].performClick()
        compose.onNodeWithText("Search public lessons").assertExists()
    }
    @Test fun opensTheRealBundledLibraryWithoutNetwork() {
        compose.setContent { MaterialTheme { BundledLessons() } }
        compose.waitUntil(timeoutMillis = 15000) {
            compose.onAllNodesWithText("Search public lessons").fetchSemanticsNodes().isNotEmpty()
        }
        compose.onNodeWithText("Search public lessons").performTextInput("sitting down at a computer")
        compose.onNodeWithText("Sitting down at a computer for the first time").performScrollTo().performClick()
        compose.onNodeWithTag("public-lesson-list").performScrollToNode(hasText("Name the four things in front of you"))
        compose.onNodeWithText("Name the four things in front of you").assertIsDisplayed()
    }
}
