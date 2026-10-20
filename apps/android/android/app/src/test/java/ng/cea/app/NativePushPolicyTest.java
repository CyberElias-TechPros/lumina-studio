package ng.cea.app;
import org.junit.Test;
import static org.junit.Assert.*;
public class NativePushPolicyTest {
    @Test public void onlySessionCookieLeavesTheJar() {
        assertEquals("cea_session=opaque",NativePushPolicy.sessionCookie("analytics=secret; cea_session=opaque; other=private"));
    }
    @Test public void absentOrLookalikeCookiesAreNotCredentials() {
        assertEquals("",NativePushPolicy.sessionCookie(null));
        assertEquals("",NativePushPolicy.sessionCookie("other_cea_session=value"));
        assertEquals("",NativePushPolicy.sessionCookie("cea_session="));
    }
    @Test public void rejectsHeaderInjection() {
        assertEquals("",NativePushPolicy.sessionCookie("cea_session=value\r\nInjected: secret"));
    }
}
