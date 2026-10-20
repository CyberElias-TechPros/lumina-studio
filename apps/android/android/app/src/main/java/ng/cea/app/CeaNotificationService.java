package ng.cea.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

/** Data-only FCM reception. Private records always stay behind the authenticated web workspace. */
public class CeaNotificationService extends FirebaseMessagingService {
    public static final String CHANNEL = "cea-updates";
    public static boolean enabled(Context context) {
        return context.getSharedPreferences("cea-notifications",MODE_PRIVATE).getBoolean("enabled",false);
    }
    public static void setEnabled(Context context, boolean enabled) {
        context.getSharedPreferences("cea-notifications",MODE_PRIVATE).edit().putBoolean("enabled",enabled).apply();
    }
    public static void createChannel(Context context) {
        if(Build.VERSION.SDK_INT>=26) {
            NotificationChannel channel=new NotificationChannel(CHANNEL,"CEA updates",NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription("General alerts to open your CEA notification centre");
            channel.setLockscreenVisibility(android.app.Notification.VISIBILITY_SECRET);
            context.getSystemService(NotificationManager.class).createNotificationChannel(channel);
        }
    }
    @Override public void onMessageReceived(RemoteMessage message) {
        if(!enabled(this) || !NotificationManagerCompat.from(this).areNotificationsEnabled())return;
        createChannel(this);
        Intent open=new Intent(this,MainActivity.class).setAction(Intent.ACTION_VIEW)
            .setData(Uri.parse(BuildConfig.CEA_ORIGIN+"/app/notifications"))
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP|Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pending=PendingIntent.getActivity(this,0,open,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
        // Never trust message-supplied URLs or show student/financial details on a locked phone.
        android.app.Notification notification=new NotificationCompat.Builder(this,CHANNEL)
            .setSmallIcon(R.drawable.ic_notification).setContentTitle("CEA update")
            .setContentText("Open CEA to check your notifications.")
            .setVisibility(NotificationCompat.VISIBILITY_SECRET).setContentIntent(pending).setAutoCancel(true).build();
        try { NotificationManagerCompat.from(this).notify(1,notification); }
        catch(SecurityException ignored) { /* Permission may have been revoked between checks. */ }
    }
    // Tokens are intentionally not logged, copied to web storage or sent to an unauthenticated API.
    // Account-bound token registration/rotation is a separate server-side integration.
}
