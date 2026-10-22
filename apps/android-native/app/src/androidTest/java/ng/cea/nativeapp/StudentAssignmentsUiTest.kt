package ng.cea.nativeapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

class StudentAssignmentsUiTest {
    @get:Rule val compose = createComposeRule()
    private val session = NativeSession(user = NativeUser("student1", "Learner", "local@example.test", "student"))

    @Test fun writtenSubmissionRequiresConfirmationAndNeverDisplaysOptimisticSuccess() {
        var submitted: Pair<String, String>? = null
        var openedId: String? = null
        val assignment = StudentAssignmentItem(
            id = "a1",
            title = "Explain your API design",
            course = "Backend Engineering",
            description = "Describe authentication and validation.",
            due = "2026-11-01",
            status = "pending",
            max = 20,
        )
        val assignmentsState = StudentAssignmentsState(
            items = listOf(assignment),
            loaded = true,
            submissions = mapOf("a1" to null),
        )
        compose.setContent {
            MaterialTheme {
                StudentWorkspace(
                    state = AccountState(session = session, assignments = assignmentsState),
                    back = {},
                    reload = {},
                    complete = { _, _ -> },
                    openAssignment = { openedId = it },
                    submitAssignment = { id, body -> submitted = id to body },
                )
            }
        }
        compose.onNodeWithText("Assignments").performClick()
        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Explain your API design"))
        compose.onNodeWithText("Explain your API design").performClick()
        compose.runOnIdle { assertEquals("a1", openedId) }

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("No submission has been recorded yet."))
        compose.onNodeWithText("No submission has been recorded yet.").assertIsDisplayed()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Submit written answer"))
        compose.onNodeWithText("Submit written answer").assertIsNotEnabled()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasTestTag("assignment-answer-input"))
        compose.onNodeWithTag("assignment-answer-input").performTextInput("My native written solution.")

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Submit written answer"))
        compose.onNodeWithText("Submit written answer").assertIsEnabled().performClick()
        compose.runOnIdle { assertNull(submitted) }

        compose.onNodeWithText("Confirm submission").performClick()
        compose.runOnIdle { assertEquals("a1" to "My native written solution.", submitted) }
        // No optimistic status is fabricated before the server responds.
        compose.onNodeWithText("Status: submitted", substring = true).assertDoesNotExist()
    }

    @Test fun gradedAssignmentShowsPointsAndFeedbackAndDisablesResubmission() {
        val assignment = StudentAssignmentItem(
            id = "a2",
            title = "Database indexing task",
            course = "Backend Engineering",
            description = "Index high-cardinality columns.",
            due = "2026-10-20",
            status = "graded",
            score = 18,
            max = 20,
        )
        val submission = NativeSubmission(
            id = "sub-2",
            status = "graded",
            score = 18,
            feedback = "Clear composite index choice and solid query plan.",
            submittedAt = "2026-10-19T18:00:00.000Z",
            body = "Student submitted SQL reasoning.",
        )
        val assignmentsState = StudentAssignmentsState(
            items = listOf(assignment),
            loaded = true,
            submissions = mapOf("a2" to submission),
        )
        compose.setContent {
            MaterialTheme {
                StudentWorkspace(
                    state = AccountState(session = session, assignments = assignmentsState),
                    back = {},
                    reload = {},
                    complete = { _, _ -> },
                )
            }
        }
        compose.onNodeWithText("Assignments").performClick()
        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Database indexing task"))
        compose.onNodeWithText("Database indexing task").performClick()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Score: 18 / 20"))
        compose.onNodeWithText("Score: 18 / 20").assertIsDisplayed()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Clear composite index choice and solid query plan."))
        compose.onNodeWithText("Clear composite index choice and solid query plan.").assertIsDisplayed()

        compose.onNodeWithTag("student-workspace").performScrollToNode(
            hasText("This assignment has been graded and no longer accepts new submissions."),
        )
        compose.onNodeWithText("This assignment has been graded and no longer accepts new submissions.").assertIsDisplayed()
        compose.onNodeWithText("Submit written answer").assertDoesNotExist()
    }
}
