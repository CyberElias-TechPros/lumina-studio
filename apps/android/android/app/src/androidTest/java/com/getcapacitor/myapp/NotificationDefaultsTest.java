package com.getcapacitor.myapp;
import static org.junit.Assert.*;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.matcher.ViewMatchers.*;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import androidx.test.core.app.ActivityScenario;
import androidx.test.platform.app.InstrumentationRegistry;
import com.google.firebase.messaging.FirebaseMessaging;
import ng.cea.app.NotificationSettingsActivity;
import ng.cea.app.CeaNotificationService;
import org.junit.Test;
public class NotificationDefaultsTest {
    @Test public void openingSettingsDoesNotEnableTokenRegistration() {
        assertFalse(CeaNotificationService.enabled(InstrumentationRegistry.getInstrumentation().getTargetContext()));
        assertFalse(FirebaseMessaging.getInstance().isAutoInitEnabled());
        try(ActivityScenario<NotificationSettingsActivity> activity=ActivityScenario.launch(NotificationSettingsActivity.class)) {
            onView(withText("Enable on this phone")).check(matches(isDisplayed()));
            assertFalse(FirebaseMessaging.getInstance().isAutoInitEnabled());
            // Do not grant permissions, create tokens or send messages in CI.
        }
    }
}
