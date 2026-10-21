package ng.cea.nativeapp

import androidx.compose.material3.MaterialTheme
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

class NativeAccountUiTest {
    @get:Rule val compose = createComposeRule()
    @Test fun signInIsExplicitAndClearsPasswordField() {
        var submitted: Pair<String, String>? = null
        compose.setContent { MaterialTheme { AccountScreen(AccountState(), { email, password -> submitted = email to password }, {}, {}, {}, {}, {}) } }
        compose.onNodeWithText("Sign in").assertIsNotEnabled()
        compose.onNodeWithText("Email address").performTextInput("learner@example.com")
        compose.onNodeWithText("Password").performTextInput("not-a-real-password")
        compose.onNodeWithText("Sign in").performScrollTo().performClick()
        compose.runOnIdle { assertEquals("learner@example.com" to "not-a-real-password", submitted) }
        compose.onNodeWithText("Sign in").assertIsNotEnabled()
    }
    @Test fun pendingMfaDoesNotShowSignedInAccount() {
        compose.setContent { MaterialTheme { AccountScreen(AccountState(session = NativeSession(mfaRequired = true)), { _, _ -> }, {}, {}, {}, {}, {}) } }
        compose.onNodeWithText("Two-step verification").assertExists()
        compose.onNodeWithText("Renew session").assertDoesNotExist()
        compose.onNodeWithText("Verify code").performScrollTo().assertIsNotEnabled()
    }
}
