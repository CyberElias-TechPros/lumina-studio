package ng.cea.app;

import android.os.Bundle;
import android.graphics.Color;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.widget.Button;
import android.widget.LinearLayout;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import java.io.ByteArrayInputStream;

/** Separate local-only WebView: no Capacitor bridge, no account/session data, no remote requests. */
public class OfflineLessonsActivity extends AppCompatActivity {
    private WebView reader;
    private android.speech.tts.TextToSpeech speech;
    private boolean speechReady;
    private Button readButton;
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout layout = new LinearLayout(this); layout.setOrientation(LinearLayout.VERTICAL); layout.setBackgroundColor(Color.WHITE);
        Button close = new Button(this); close.setText("Back to CEA app"); close.setOnClickListener(v -> finish());
        layout.addView(close, new LinearLayout.LayoutParams(-1, -2));
        LinearLayout tools = new LinearLayout(this);
        readButton = new Button(this); readButton.setText("Read aloud"); readButton.setEnabled(false);
        Button stop = new Button(this); stop.setText("Stop reading"); stop.setOnClickListener(v -> { if (speech != null) speech.stop(); });
        tools.addView(readButton, new LinearLayout.LayoutParams(0,-2,1)); tools.addView(stop,new LinearLayout.LayoutParams(0,-2,1)); layout.addView(tools);
        speech = new android.speech.tts.TextToSpeech(this, status -> {
            speechReady = status == android.speech.tts.TextToSpeech.SUCCESS && speech.setLanguage(java.util.Locale.ENGLISH) >= 0;
            if (speechReady) {
                android.speech.tts.Voice voice = speech.getVoice();
                if (voice == null || voice.isNetworkConnectionRequired()) speechReady = false;
            }
            readButton.setEnabled(speechReady);
            if (!speechReady) { readButton.setText("Offline voice unavailable"); android.widget.Toast.makeText(this,"Install an English offline voice in Android text-to-speech settings to use read aloud.",android.widget.Toast.LENGTH_LONG).show(); }
        });
        readButton.setOnClickListener(v -> readLesson());
        reader = new WebView(this);
        reader.getSettings().setJavaScriptEnabled(true);
        reader.getSettings().setDomStorageEnabled(true);
        reader.getSettings().setAllowFileAccess(false);
        reader.getSettings().setAllowContentAccess(false);
        reader.getSettings().setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        WebViewAssetLoader loader = new WebViewAssetLoader.Builder().addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this)).build();
        reader.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                WebResourceResponse local = loader.shouldInterceptRequest(request.getUrl());
                return local != null ? local : new WebResourceResponse("text/plain", "UTF-8", 403, "Offline only", java.util.Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !"appassets.androidplatform.net".equals(request.getUrl().getHost()) || !"https".equals(request.getUrl().getScheme());
            }
        });
        layout.addView(reader, new LinearLayout.LayoutParams(-1,0,1)); setContentView(layout); UiInsets.apply(this,layout);
        if (state == null || reader.restoreState(state) == null) reader.loadUrl("https://appassets.androidplatform.net/assets/reader/index.html");
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override public void handleOnBackPressed() { if (reader.canGoBack()) reader.goBack(); else finish(); }
        });
    }
    @Override protected void onSaveInstanceState(Bundle state) { reader.saveState(state); super.onSaveInstanceState(state); }
    private void readLesson() {
        if (!speechReady) return;
        reader.evaluateJavascript("document.getElementById('lesson').hidden ? '' : document.getElementById('title').textContent + '. ' + document.getElementById('body').innerText", value -> {
            try {
                Object decoded = new org.json.JSONTokener(value).nextValue();
                if (!(decoded instanceof String) || ((String)decoded).isEmpty()) { android.widget.Toast.makeText(this,"Open a lesson first.",android.widget.Toast.LENGTH_SHORT).show(); return; }
                speech.stop(); String text = (String)decoded;
                for (int start = 0; start < text.length(); start += 3000) speech.speak(text.substring(start,Math.min(start+3000,text.length())),android.speech.tts.TextToSpeech.QUEUE_ADD,null,"lesson-"+start);
            } catch (org.json.JSONException ignored) { /* No untrusted HTML/JS is evaluated. */ }
        });
    }
    @Override protected void onPause() { if (speech != null) speech.stop(); super.onPause(); }
    @Override protected void onDestroy() { if (speech != null) { speech.stop(); speech.shutdown(); } reader.destroy(); super.onDestroy(); }
}
