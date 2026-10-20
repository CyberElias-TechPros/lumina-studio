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
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        LinearLayout layout = new LinearLayout(this); layout.setOrientation(LinearLayout.VERTICAL); layout.setBackgroundColor(Color.WHITE);
        Button close = new Button(this); close.setText("Back to CEA app"); close.setOnClickListener(v -> finish());
        layout.addView(close, new LinearLayout.LayoutParams(-1, -2));
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
        layout.addView(reader, new LinearLayout.LayoutParams(-1,0,1)); setContentView(layout);
        if (state == null || reader.restoreState(state) == null) reader.loadUrl("https://appassets.androidplatform.net/assets/reader/index.html");
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override public void handleOnBackPressed() { if (reader.canGoBack()) reader.goBack(); else finish(); }
        });
    }
    @Override protected void onSaveInstanceState(Bundle state) { reader.saveState(state); super.onSaveInstanceState(state); }
    @Override protected void onDestroy() { reader.destroy(); super.onDestroy(); }
}
