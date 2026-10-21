package ng.cea.app;
/** Pure policy so unrelated cookies never leave the native cookie jar. */
final class NativePushPolicy {
    private NativePushPolicy() {}
    static String sessionCookie(String cookies) {
        if(cookies!=null)for(String part:cookies.split(";")) {
            String value=part.trim();
            if(value.startsWith("cea_session=") && value.length()>12 && value.indexOf('\r')<0 && value.indexOf('\n')<0)return value;
        }
        return "";
    }
}
