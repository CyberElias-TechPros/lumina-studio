package ng.cea.app;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.util.AtomicFile;
import android.util.Base64;
import android.webkit.CookieManager;
import androidx.core.app.NotificationManagerCompat;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.android.gms.tasks.Tasks;
import java.util.concurrent.TimeUnit;
import org.json.JSONObject;
import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Properties;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
import javax.net.ssl.HttpsURLConnection;

/** Native-only cookie/installation proof handling. No JavaScript bridge exposes secrets. */
public final class NativePushController {
    public interface Callback { void done(String message); }
    private static final ExecutorService worker = Executors.newSingleThreadExecutor();
    private static final Handler main = new Handler(Looper.getMainLooper());
    private static final AtomicBoolean syncing = new AtomicBoolean(false);
    private static final AtomicLong generation = new AtomicLong();
    private static volatile String bindingHash = "";
    private static volatile long attemptedAt = -60000;
    private NativePushController() {}
    private static void finish(Context context, Callback callback, String message) {
        context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).edit().putString("status",message).apply();
        if(callback!=null)main.post(()->callback.done(message));
    }
    public static String status(Context context) {
        return context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).getString("status","Off. Choose Enable to connect this phone to your signed-in account.");
    }
    public static void allowAccountLink(Context context) {
        context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).edit().putBoolean("accountConsent",true).apply();
    }
    private static boolean accountConsented(Context context) {
        return context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).getBoolean("accountConsent",false);
    }
    public static void tokenChanged() { bindingHash=""; }
    public static void foreground(Context context) {
        if(CeaNotificationService.enabled(context) && !NotificationManagerCompat.from(context).areNotificationsEnabled()) {
            disable(context,null); return;
        }
        if(!CeaNotificationService.enabled(context)) {
            if(context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).getBoolean("pendingRemoval",false) && SystemClock.elapsedRealtime()-attemptedAt>=60000) {
                attemptedAt=SystemClock.elapsedRealtime(); worker.execute(()->removeRegistration(context.getApplicationContext(),null));
            }
            return;
        }
        sync(context,false,null);
    }
    public static void sync(Context original, boolean force, Callback callback) {
        Context context=original.getApplicationContext();
        if(!CeaNotificationService.enabled(context) || !accountConsented(context)) { if(callback!=null)finish(context,callback,"Choose Enable or Reconnect to link this phone to your signed-in account.");return; }
        if(!force && SystemClock.elapsedRealtime()-attemptedAt<60000)return;
        if(!syncing.compareAndSet(false,true)) { if(callback!=null)main.post(()->callback.done("Connection is already in progress. Please wait."));return; }
        attemptedAt=SystemClock.elapsedRealtime(); final long epoch=generation.get();
        worker.execute(()->{
                try {
                    if(epoch!=generation.get() || !CeaNotificationService.enabled(context))return;
                    String cookie=NativePushPolicy.sessionCookie(CookieManager.getInstance().getCookie(BuildConfig.CEA_API_ORIGIN));
                    if(cookie.isEmpty()) { bindingHash="";finish(context,callback,"Sign in to CEA, then return here to connect this phone.");return; }
                    String token=Tasks.await(FirebaseMessaging.getInstance().getToken(),15,TimeUnit.SECONDS);
                    if(epoch!=generation.get() || !CeaNotificationService.enabled(context))return;
                    String hash=Base64.encodeToString(MessageDigest.getInstance("SHA-256").digest((cookie+"\n"+token).getBytes(StandardCharsets.UTF_8)),Base64.NO_WRAP);
                    if(!force && hash.equals(bindingHash))return;
                    Properties identity=identity(context);
                    JSONObject body=new JSONObject().put("installationId",identity.getProperty("id")).put("deviceSecret",identity.getProperty("secret")).put("token",token);
                    Reply reply=request("PUT","",cookie,body);
                    if(epoch!=generation.get() || !CeaNotificationService.enabled(context))return;
                    if(reply.status==200 && reply.body.optBoolean("registered")) {
                        bindingHash=hash;finish(context,callback,"Phone connected to your signed-in account. You can send a test below. Automatic class/message alerts are not enabled yet.");
                    } else { bindingHash="";finish(context,callback,problem(reply.status)); }
                } catch(Exception ignored) { if(epoch==generation.get() && CeaNotificationService.enabled(context))finish(context,callback,"Could not connect this phone to CEA. Check your connection and try again."); }
                finally { syncing.set(false); }
        });
    }
    public static void disable(Context original, Callback callback) {
        Context context=original.getApplicationContext(); generation.incrementAndGet();bindingHash="";
        CeaNotificationService.setEnabled(context,false);
        context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).edit().putBoolean("accountConsent",false).apply();
        FirebaseMessaging.getInstance().setAutoInitEnabled(false);
        NotificationManagerCompat.from(context).cancelAll();
        context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).edit().putBoolean("pendingRemoval",true).apply();
        worker.execute(()->removeRegistration(context,callback));
    }
    private static void removeRegistration(Context context, Callback callback) {
        if(CeaNotificationService.enabled(context))return; // Never delete a later explicit opt-in.
        boolean removed=false;
        try {
            String cookie=NativePushPolicy.sessionCookie(CookieManager.getInstance().getCookie(BuildConfig.CEA_API_ORIGIN));
            File file=new File(context.getNoBackupFilesDir(),"cea-push-installation.properties");
            if(!file.exists())removed=true;
            else if(!cookie.isEmpty())removed=request("DELETE","/"+identity(context).getProperty("id"),cookie,null).status==200;
        } catch(Exception ignored) { /* Keep removal pending for a later foreground retry. */ }
        boolean tokenRemoved=false;
        try {Tasks.await(FirebaseMessaging.getInstance().deleteToken(),15,TimeUnit.SECONDS);tokenRemoved=true;}catch(Exception ignored) {}
        if(CeaNotificationService.enabled(context))return;
        boolean complete=removed && tokenRemoved;
        context.getSharedPreferences("cea-notifications",Context.MODE_PRIVATE).edit().putBoolean("pendingRemoval",!complete).apply();
        finish(context,callback,complete ? "Phone notifications disabled and registration removed." : "Alerts are off locally. Registration removal is pending; reopen CEA when connected. Android settings can also block all notifications.");
    }

    public static void test(Context original, Callback callback) {
        Context context=original.getApplicationContext();
        worker.execute(()->{
            if(!CeaNotificationService.enabled(context) || !accountConsented(context)) {finish(context,callback,"Enable and connect this phone first.");return;}
            try {
                String cookie=NativePushPolicy.sessionCookie(CookieManager.getInstance().getCookie(BuildConfig.CEA_API_ORIGIN));
                if(cookie.isEmpty()) {finish(context,callback,"Sign in to CEA before sending a test.");return;}
                Reply reply=request("POST","/test",cookie,new JSONObject());
                if(reply.status!=200) {finish(context,callback,problem(reply.status));return;}
                int accepted=reply.body.optInt("accepted");
                if(accepted>0)finish(context,callback,"Firebase accepted the test for "+accepted+" of your phones. Display is not guaranteed; check Android permission and connectivity.");
                else if(reply.body.optInt("removed")>0) {bindingHash="";finish(context,callback,"The phone registration expired. Disable, then enable notifications to obtain a new registration.");}
                else if(reply.body.optInt("failed")>0)finish(context,callback,"The provider could not accept the test. Try again later.");
                else finish(context,callback,"No eligible devices accepted the test. Connect your phone and check account notification preferences and quiet hours (Lagos time).");
            } catch(Exception ignored) {finish(context,callback,"Could not send the test. Check your connection and try again later.");}
        });
    }
    private static Properties identity(Context context) throws IOException {
        AtomicFile file=new AtomicFile(new File(context.getNoBackupFilesDir(),"cea-push-installation.properties"));
        Properties properties=new Properties();
        if(file.getBaseFile().exists()) {try(InputStream input=file.openRead()) {properties.load(input);}return properties;}
        byte[] secret=new byte[32];new SecureRandom().nextBytes(secret);
        properties.setProperty("id",UUID.randomUUID().toString());
        properties.setProperty("secret",Base64.encodeToString(secret,Base64.NO_WRAP|Base64.NO_PADDING|Base64.URL_SAFE));
        FileOutputStream output=file.startWrite();
        try {properties.store(output,null);file.finishWrite(output);}catch(IOException e) {file.failWrite(output);throw e;}
        return properties;
    }
    private static String problem(int code) {
        if(code==401)return "Your sign-in expired. Sign in to CEA again, then reconnect this phone.";
        if(code==429)return "Too many attempts. Wait before trying again (tests are limited to three per hour).";
        if(code==409)return "Device registration conflicts or your account has too many phones. Remove an old registration or contact support.";
        if(code==503)return "Phone notification service is not configured or is temporarily unavailable. In-app notifications still work.";
        return "CEA could not complete this request. The notification API may not be deployed yet. In-app notifications still work.";
    }
    private static final class Reply { int status;JSONObject body;Reply(int status,JSONObject body){this.status=status;this.body=body;} }
    private static Reply request(String method,String suffix,String cookie,JSONObject body) throws Exception {
        if(cookie.isEmpty())return new Reply(401,new JSONObject());
        String base=BuildConfig.CEA_API_ORIGIN.replaceAll("/+$","");
        HttpsURLConnection connection=(HttpsURLConnection)new URL(base+"/v1/push/devices"+suffix).openConnection();
        try {
            connection.setInstanceFollowRedirects(false);connection.setConnectTimeout(10000);connection.setReadTimeout(10000);
            connection.setRequestMethod(method);connection.setRequestProperty("Cookie",cookie);
            connection.setRequestProperty("Origin",BuildConfig.CEA_ORIGIN);connection.setRequestProperty("Accept","application/json");
            if(body!=null) {
                connection.setRequestProperty("Content-Type","application/json");connection.setDoOutput(true);
                byte[] bytes=body.toString().getBytes(StandardCharsets.UTF_8);connection.setFixedLengthStreamingMode(bytes.length);
                try(OutputStream output=connection.getOutputStream()) {output.write(bytes);}
            }
            int code=connection.getResponseCode();
            if(code!=200)return new Reply(code,new JSONObject());
            try(InputStream input=connection.getInputStream();ByteArrayOutputStream bytes=new ByteArrayOutputStream()) {
                byte[] buffer=new byte[1024];int count;
                while((count=input.read(buffer))!=-1) {if(bytes.size()+count>8192)throw new IOException("Response too large");bytes.write(buffer,0,count);}
                return new Reply(code,new JSONObject(bytes.toString("UTF-8")));
            }
        } finally {connection.disconnect();}
    }
}
