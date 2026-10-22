package ng.cea.nativeapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

class StudentWorkspaceUiTest {
    @get:Rule val compose = createComposeRule()
    private val session = NativeSession(user = NativeUser("student1", "Learner", "local@example.test", "student"))
    @Test fun completionRequiresReadingViewAndExplicitConfirmation() {
        var submitted: Pair<String, String>? = null
        val course = StudentCourse("course", "My private course", pct = 0, modules = listOf(
            StudentModule("module", "Start here", listOf(StudentLesson("lesson", "Published reading", "article", "preview", body = "Instructor notes for enrolled learners.")))
        ))
        compose.setContent { MaterialTheme { StudentWorkspace(AccountState(session = session, dashboard = StudentDashboard(listOf(course))), {}, {}, { c, l -> submitted = c to l }) } }
        compose.onNodeWithText("My private course").performScrollTo().performClick()
        compose.onNodeWithText("Published reading").performScrollTo().performClick()
        compose.onNodeWithText("Instructor notes for enrolled learners.").performScrollTo().assertIsDisplayed()
        compose.onNodeWithText("Mark lesson complete").performScrollTo().performClick()
        compose.runOnIdle { assertNull(submitted) }
        compose.onNodeWithText("Confirm completion").performClick()
        compose.runOnIdle { assertEquals("course" to "lesson", submitted) }
        // No optimistic success is displayed from merely pressing the button.
        compose.onNodeWithText("Completion recorded by the Academy.").assertDoesNotExist()
    }
    @Test fun unverifiedAccountNeverRendersEvenSuppliedPrivateData() {
        val privateCourse = StudentCourse("private", "Do not expose", pct = 0, modules = emptyList())
        compose.setContent { MaterialTheme { StudentWorkspace(AccountState(dashboard = StudentDashboard(listOf(privateCourse))), {}, {}, { _, _ -> }) } }
        compose.onNodeWithText("Do not expose").assertDoesNotExist()
        compose.onNodeWithText("A verified student session is required. Return to Account to verify your session.").assertExists()
    }
}
