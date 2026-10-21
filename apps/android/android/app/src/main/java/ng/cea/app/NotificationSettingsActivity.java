package ng.cea.app;

import android.Manifest;
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
    private Button enable, disable;
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
        explanation.setText("Optional: register this phone with Google Firebase to receive CEA messages. This shares a device registration token with Firebase. It also connects to your signed-in CEA account. Automatic class/message alerts are not enabled yet. Your in-app notification centre still works.");layout.addView(explanation);
        status=new TextView(this);status.setTextSize(18);layout.addView(status);
        enable=new Button(this);enable.setText("Enable on this phone");enable.setOnClickListener(v->{
            if(Build.VERSION.SDK_INT>=33 && ContextCompat.checkSelfPermission(this,Manifest.permission.POST_NOTIFICATIONS)!=PackageManager.PERMISSION_GRANTED) {setBusy(true);permission.launch(Manifest.permission.POST_NOTIFICATIONS);}
            else registerDevice();
        });layout.addView(enable);
        disable=new Button(this);disable.setText("Disable and remove device registration");disable.setOnClickListener(v->unregisterDevice());layout.addView(disable);
        Button reconnect=new Button(this);reconnect.setText("Reconnect signed-in account");reconnect.setOnClickListener(v->{if(busy)return;if(CeaNotificationService.enabled(this))NativePushController.allowAccountLink(this);setBusy(true);NativePushController.sync(this,true,this::completed);});layout.addView(reconnect);
        Button test=new Button(this);test.setText("Send test to my connected phones");test.setOnClickListener(v->{if(busy)return;setBusy(true);NativePushController.test(this,this::completed);});layout.addView(test);
        Button settings=new Button(this);settings.setText("Open Android notification settings");settings.setOnClickListener(v->{
            Intent intent=Build.VERSION.SDK_INT>=26 ? new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE,getPackageName()) : new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,android.net.Uri.parse("package:"+getPackageName()));
            startActivity(intent);
        });layout.addView(settings);
        android.widget.ScrollView scroll=new android.widget.ScrollView(this);scroll.addView(layout);setContentView(scroll);UiInsets.apply(this,scroll);
        updateStatus();
    }
    private void updateStatus() {status.setText(NativePushController.status(this));}
    private void completed(String message) {
        if(isFinishing() || isDestroyed())return;
        setBusy(false);status.setText(message);
    }
    private void setBusy(boolean value) {busy=value;enable.setEnabled(!value);disable.setEnabled(!value);}
    private void registerDevice() {
        if(busy)return;
        if(!NotificationManagerCompat.from(this).areNotificationsEnabled()) {status.setText("Android notifications are blocked. Open Android notification settings to allow them.");return;}
        setBusy(true);status.setText("Connecting this phone…");
        NativePushController.allowAccountLink(this);
        CeaNotificationService.setEnabled(this,true);
        FirebaseMessaging.getInstance().setAutoInitEnabled(true);
        NativePushController.sync(this,true,this::completed);
    }
    private void unregisterDevice() {
        if(busy)return;setBusy(true);
        NativePushController.disable(this,this::completed);
    }
}
