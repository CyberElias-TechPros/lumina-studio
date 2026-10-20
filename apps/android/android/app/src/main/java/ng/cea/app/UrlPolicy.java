package ng.cea.app;

import java.net.URI;

/** No substring-host checks, arbitrary intents, credentials, or non-HTTPS internal navigation. */
public final class UrlPolicy {
    private UrlPolicy() {}
    public static boolean internal(String value) {
        try {
            URI uri = new URI(value);
            return "https".equalsIgnoreCase(uri.getScheme()) && new URI(BuildConfig.CEA_ORIGIN).getHost().equalsIgnoreCase(uri.getHost())
                && uri.getRawUserInfo() == null && (uri.getPort() == -1 || uri.getPort() == 443);
        } catch (Exception e) { return false; }
    }
    public static boolean external(String value) {
        try {
            URI uri = new URI(value);
            String scheme = uri.getScheme();
            if ("https".equalsIgnoreCase(scheme)) return uri.getHost() != null && uri.getRawUserInfo() == null;
            return ("mailto".equalsIgnoreCase(scheme) || "tel".equalsIgnoreCase(scheme)) && !value.contains("\n") && !value.contains("\r");
        } catch (Exception e) { return false; }
    }
    public static String shareable(String value) {
        if (!internal(value)) return BuildConfig.CEA_ORIGIN;
        try {
            String path = new URI(value).getPath();
            // Never share tokens, applications, receipts or private workspaces through a generic share action.
            if (!(path.equals("/") || path.equals("/classes") || path.startsWith("/classes/")
                    || path.equals("/blog") || path.startsWith("/blog/"))) return BuildConfig.CEA_ORIGIN;
            return new URI("https", new URI(BuildConfig.CEA_ORIGIN).getHost(), path, null).toString();
        } catch (Exception e) { return BuildConfig.CEA_ORIGIN; }
    }
}
