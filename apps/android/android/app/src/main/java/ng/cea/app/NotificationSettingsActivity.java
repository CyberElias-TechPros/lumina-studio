package ng.cea.app;

import android.Manifest;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;
import com.google.firebase.messaging.FirebaseMessaging;

/** Opt-in only. No Firebase token request until the user presses Enable and grants permission. */
public class NotificationSettingsActivity extends AppCompatActivity {
    private TextView status;
    private Button enable, disable, copy;
    private String token;
    private boolean busy;
    private final ActivityResultLauncher<String> permission = registerForActivityResult(new ActivityResultContracts.RequestPermission(), granted -> {
        setBusy(false);
        if(granted)registerDevice(); else status.setText("Permission was not granted. You can still read notifications inside CEA.");
    });
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        CeaNotificationService.createChannel(this);
        LinearLayout layout=new LinearLayout(this);layout.setOrientation(LinearLayout.VERTICAL);
        Button back=new Button(this);back.setText("Back to CEA app");back.setOnClickListener(v->finish());layout.addView(back);
        TextView heading=new TextView(this);heading.setText("Phone notifications");heading.setTextSize(24);layout.addView(heading);
        TextView explanation=new TextView(this);explanation.setTextSize(18);
        explanation.setText("Optional: register this phone with Google Firebase to receive CEA messages. This shares a device registration token with Firebase. Account-specific class and message alerts are not connected yet. Your in-app notification centre still works.");layout.addView(explanation);
        status=new TextView(this);status.setTextSize(18);layout.addView(status);
        enable=new Button(this);enable.setText("Enable on this phone");enable.setOnClickListener(v->{
            if(Build.VERSION.SDK_INT>=33 && ContextCompat.checkSelfPermission(this,Manifest.permission.POST_NOTIFICATIONS)!=PackageManager.PERMISSION_GRANTED) {setBusy(true);permission.launch(Manifest.permission.POST_NOTIFICATIONS);}
            else registerDevice();
        });layout.addView(enable);
        disable=new Button(this);disable.setText("Disable and remove device registration");disable.setOnClickListener(v->unregisterDevice());layout.addView(disable);
        Button settings=new Button(this);settings.setText("Open Android notification settings");settings.setOnClickListener(v->{
            Intent intent=Build.VERSION.SDK_INT>=26 ? new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE,getPackageName()) : new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,android.net.Uri.parse("package:"+getPackageName()));
            startActivity(intent);
        });layout.addView(settings);
        if(BuildConfig.DEBUG) {
            copy=new Button(this);copy.setText("Copy Firebase test device code");copy.setEnabled(false);
            copy.setOnClickListener(v->{if(token!=null) {
                ((ClipboardManager)getSystemService(CLIPBOARD_SERVICE)).setPrimaryClip(ClipData.newPlainText("Firebase test device code",token));
                status.setText("Copied. Use only in your Firebase Console test-message dialog. Do not post this device code publicly.");
            }});layout.addView(copy);
        }
        android.widget.ScrollView scroll=new android.widget.ScrollView(this);scroll.addView(layout);setContentView(scroll);UiInsets.apply(this,scroll);
        updateStatus();
    }
    private void updateStatus() {
        status.setText(CeaNotificationService.enabled(this) ? "Previously enabled on this phone. Account-alert delivery is not yet connected. Android permission can be managed below." : "Off. No registration is requested until you choose Enable.");
    }
    private void setBusy(boolean value) {busy=value;enable.setEnabled(!value);disable.setEnabled(!value);}
    private void registerDevice() {
        if(busy)return;
        if(!NotificationManagerCompat.from(this).areNotificationsEnabled()) {status.setText("Android notifications are blocked. Open Android notification settings to allow them.");return;}
        setBusy(true);status.setText("Registering this phone…");
        FirebaseMessaging.getInstance().setAutoInitEnabled(true);
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task->{
            CeaNotificationService.setEnabled(this,task.isSuccessful());
            if(!task.isSuccessful())FirebaseMessaging.getInstance().setAutoInitEnabled(false);
            if(isFinishing() || isDestroyed())return;
            setBusy(false);
            if(task.isSuccessful()) {
                token=task.getResult();
                if(copy!=null)copy.setEnabled(token!=null);
                status.setText("Phone registered with Firebase. Account-specific CEA alerts are not connected yet.");
            } else {
                FirebaseMessaging.getInstance().setAutoInitEnabled(false);CeaNotificationService.setEnabled(this,false);
                status.setText("Registration failed. Check your connection and try again. No account alerts have been enabled.");
            }
        });
    }
    private void unregisterDevice() {
        if(busy)return;setBusy(true);
        CeaNotificationService.setEnabled(this,false);FirebaseMessaging.getInstance().setAutoInitEnabled(false);
        NotificationManagerCompat.from(this).cancelAll();token=null;if(copy!=null)copy.setEnabled(false);
        FirebaseMessaging.getInstance().deleteToken().addOnCompleteListener(task->{
            if(isFinishing() || isDestroyed())return;
            setBusy(false);status.setText(task.isSuccessful() ? "Device registration removed. Turn off notifications in Android settings as well if you want Android to block all messages." : "Alerts are disabled in CEA, but device registration could not be removed. Retry when connected, or block notifications in Android settings.");
        });
    }
}
