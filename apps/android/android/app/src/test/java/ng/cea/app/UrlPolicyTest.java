package ng.cea.app;
import org.junit.Test;
import static org.junit.Assert.*;
public class UrlPolicyTest {
    @Test public void exactHttpsOriginOnly() {
        assertTrue(UrlPolicy.internal("https://www.cea.ng/auth/magic-link?token=x"));
        for (String url : new String[]{"http://www.cea.ng", "https://www.cea.ng.evil.test", "https://www.cea.ng@evil.test", "https://evil.test@www.cea.ng", "https://www.cea.ng:444", "javascript:alert(1)", "intent://x", "file:///x"}) assertFalse(url, UrlPolicy.internal(url));
    }
    @Test public void sharingNeverIncludesPrivateData() {
        assertEquals("https://www.cea.ng/blog/files", UrlPolicy.shareable("https://www.cea.ng/blog/files?token=secret#private"));
        assertEquals("https://www.cea.ng", UrlPolicy.shareable("https://www.cea.ng/apply/receipt/PRIVATE?token=secret"));
        assertEquals("https://www.cea.ng", UrlPolicy.shareable("https://www.cea.ng/auth/magic-link?token=secret"));
    }
    @Test public void arbitraryIntentAndCleartextBlocked() {
        assertFalse(UrlPolicy.external("intent://evil")); assertFalse(UrlPolicy.external("http://example.com"));
        assertTrue(UrlPolicy.external("https://checkout.paystack.com/test")); assertTrue(UrlPolicy.external("tel:+2349058628386"));
    }
}
