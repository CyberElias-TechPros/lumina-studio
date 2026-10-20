package com.getcapacitor.myapp;
import static androidx.test.espresso.Espresso.*;
import static androidx.test.espresso.action.ViewActions.*;
import static androidx.test.espresso.assertion.ViewAssertions.*;
import static androidx.test.espresso.matcher.ViewMatchers.*;
import androidx.test.core.app.ActivityScenario;
import ng.cea.app.MainActivity;
import org.junit.Test;
/** Public home only; never signs in, writes production data or starts a payment. */
public class NativeShellTest {
    @Test public void nativeMenuOpensOfflineReaderAndReturns() {
        try(ActivityScenario<MainActivity> activity=ActivityScenario.launch(MainActivity.class)) {
            onView(withText("Offline lessons")).check(matches(isDisplayed())).perform(click());
            onView(withText("Back to CEA app")).check(matches(isDisplayed())).perform(click());
            onView(withText("CEA menu")).check(matches(isDisplayed())).perform(click());
            onView(withText("Save page as PDF")).check(matches(isDisplayed()));
            pressBack();
        }
    }
}
