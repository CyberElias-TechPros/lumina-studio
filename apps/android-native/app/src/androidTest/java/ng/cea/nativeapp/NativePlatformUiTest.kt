package ng.cea.nativeapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.platform.app.InstrumentationRegistry
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

class NativePlatformUiTest {
    @get:Rule val compose = createComposeRule()

    @Test
    fun keystoreDraftStoreEncryptsRoundTripsAndClearsOnDevice() {
        val context = InstrumentationRegistry.getInstrumentation().targetContext
        val store = KeystoreDraftStore(context, "test-draft-store")
        store.clear()
        assertNull(store.read())

        val draft = ApplicationDraft(
            programSlug = "web-development",
            firstName = "Chiamaka",
            lastName = "Nwosu",
            email = "chiamaka@example.test",
            phone = "+2348099990000",
            city = "Port Harcourt",
            goal = "Build production web apps",
        )
        store.write(draft)
        assertEquals(draft, store.read())

        store.clear()
        assertNull(store.read())
    }

    @Test
    fun instructorGradingRequiresExplicitConfirmationDialog() {
        var graded: Triple<String, Int, String>? = null
        val instructorSession = NativeSession(user = NativeUser("inst-1", "Elias", "inst@cea.ng", "instructor"))
        val detail = InstructorSubmissionDetail(
            id = "sub-99",
            student = "Amaka Obi",
            title = "Auth Threat Model",
            submitted = "Today",
            status = "submitted",
            score = null,
            late = false,
            file = "",
            size = "",
            body = "Session tokens use HttpOnly cookies and Keystore encryption.",
            feedback = "",
            max = 20,
            isLatest = true,
        )

        compose.setContent {
            MaterialTheme {
                AccountScreen(
                    state = AccountState(
                        session = instructorSession,
                        selectedInstructorSubmission = detail,
                    ),
                    signIn = { _, _, _ -> },
                    verify = {},
                    checkSession = {},
                    refresh = {},
                    signOut = {},
                    cancelMfa = {},
                    gradeInstructorSubmission = { id, score, fb -> graded = Triple(id, score, fb) },
                )
            }
        }

        compose.onNodeWithText("Open instructor workspace").performScrollTo().performClick()
        compose.onNodeWithText("Score (0–20)").performScrollTo().performTextInput("18")
        compose.onNodeWithText("Record grade").performScrollTo().performClick()
        compose.runOnIdle { assertNull(graded) }
        compose.onNodeWithText("Save grade").performClick()
        compose.runOnIdle { assertEquals(Triple("sub-99", 18, ""), graded) }
    }

    @Test
    fun financeTransferVerificationRequiresExplicitConfirmationDialog() {
        var confirmedProof: Triple<String, String, Double>? = null
        val financeSession = NativeSession(user = NativeUser("fin-1", "Finance", "finance@cea.ng", "finance"))
        val proof = PaymentProofItem(
            id = "prf-99",
            ref = "CEA-2026-KL34MN",
            programTitle = "Web Development",
            studentName = "Amaka Obi",
            kind = "full",
            amount = 60_000.0,
            expectedAmount = 60_000.0,
            senderName = "Amaka Obi",
            bankName = "GTBank",
            bankReference = "NIP-778899",
            status = "pending_review",
            submittedAt = "2026-10-22",
        )

        compose.setContent {
            MaterialTheme {
                AccountScreen(
                    state = AccountState(
                        session = financeSession,
                        paymentProofs = listOf(proof),
                    ),
                    signIn = { _, _, _ -> },
                    verify = {},
                    checkSession = {},
                    refresh = {},
                    signOut = {},
                    cancelMfa = {},
                    confirmPaymentProof = { id, ref, amt -> confirmedProof = Triple(id, ref, amt) },
                )
            }
        }

        compose.onNodeWithText("Open admissions & finance workspace").performScrollTo().performClick()
        compose.onNodeWithText("Confirm receipt").performScrollTo().performClick()
        compose.runOnIdle { assertNull(confirmedProof) }
        compose.onAllNodesWithText("Confirm receipt").onLast().performClick()
        compose.runOnIdle { assertEquals(Triple("prf-99", "NIP-778899", 60_000.0), confirmedProof) }
    }

    @Test
    fun studentInteractiveAssessmentRequiresAllAnswersAndConfirmation() {
        var submitted: Pair<String, List<Int>>? = null
        val studentSession = NativeSession(user = NativeUser("stu-1", "Learner", "stu@cea.ng", "student"))
        val quiz = StudentAssessmentItem(
            id = "asm-1",
            title = "Auth Fundamentals Check",
            course = "Cybersecurity",
            questions = 2,
            status = "available",
            attempts = 1,
            attemptsLeft = 1,
        )

        compose.setContent {
            MaterialTheme {
                StudentWorkspace(
                    state = AccountState(
                        session = studentSession,
                        assessments = StudentAssessmentsState(items = listOf(quiz), loaded = true),
                    ),
                    back = {},
                    reload = {},
                    complete = { _, _ -> },
                    submitAssessment = { id, answers -> submitted = id to answers },
                )
            }
        }

        compose.onNodeWithText("Assessments").performClick()
        compose.onNodeWithText("Auth Fundamentals Check").performScrollTo().performClick()
        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Submit assessment"))
        compose.onNodeWithText("Submit assessment").assertIsNotEnabled()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("A signed, self-contained set of claims the server can verify"))
        compose.onNodeWithText("A signed, self-contained set of claims the server can verify").performClick()
        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("To reduce the replay window if a refresh token leaks"))
        compose.onNodeWithText("To reduce the replay window if a refresh token leaks").performClick()

        compose.onNodeWithTag("student-workspace").performScrollToNode(hasText("Submit assessment"))
        compose.onNodeWithText("Submit assessment").assertIsEnabled().performClick()
        compose.runOnIdle { assertNull(submitted) }
        compose.onNodeWithText("Confirm assessment").performClick()
        compose.runOnIdle { assertEquals("asm-1" to listOf(1, 0), submitted) }
    }
}
