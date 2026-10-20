package ng.cea.app;

import android.content.Intent;
import android.content.ActivityNotFoundException;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebResourceRequest;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.print.PrintManager;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {
    private static final String HOME = BuildConfig.CEA_ORIGIN;
    @Override public void onCreate(Bundle state) {
        registerPlugin(CeaDocumentsPlugin.class);
        super.onCreate(state);
        if (bridge == null) return;
        WebView web = bridge.getWebView();
        // CEA's API is on a different HTTPS origin and uses HttpOnly SameSite=None cookies.
        android.webkit.CookieManager.getInstance().setAcceptCookie(true);
        android.webkit.CookieManager.getInstance().setAcceptThirdPartyCookies(web, true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(true); // Android system document picker.
        bridge.setWebViewClient(new BridgeWebViewClient(bridge) {
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view,url);
                if (UrlPolicy.internal(url)) {
                    try (java.io.InputStream input=getAssets().open("native/downloads.js")) {
                        java.io.ByteArrayOutputStream bytes=new java.io.ByteArrayOutputStream(); byte[] buffer=new byte[4096];int count;
                        while((count=input.read(buffer))!=-1)bytes.write(buffer,0,count);
                        view.evaluateJavascript(bytes.toString("UTF-8"),null);
                    } catch(java.io.IOException e) { Toast.makeText(MainActivity.this,"File export is unavailable. Use the website for downloads.",Toast.LENGTH_LONG).show(); }
                }
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return navigate(request.getUrl().toString());
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return navigate(url); }
        });
        ViewGroup content = findViewById(android.R.id.content);
        View existing = content.getChildAt(0); content.removeView(existing);
        LinearLayout layout = new LinearLayout(this); layout.setOrientation(LinearLayout.VERTICAL);
        LinearLayout bar = new LinearLayout(this);
        Button menu = new Button(this); menu.setText("CEA menu"); menu.setOnClickListener(v -> menu());
        Button lessons = new Button(this); lessons.setText("Offline lessons"); lessons.setOnClickListener(v -> offline());
        bar.addView(menu, new LinearLayout.LayoutParams(0,-2,1)); bar.addView(lessons,new LinearLayout.LayoutParams(0,-2,1));
        layout.addView(bar); layout.addView(existing,new LinearLayout.LayoutParams(-1,0,1)); content.addView(layout); UiInsets.apply(this,layout);
        web.setDownloadListener((url, agent, disposition, mime, length) -> {
            if (UrlPolicy.download(url)) {
                com.getcapacitor.JSObject options=new com.getcapacitor.JSObject();
                options.put("url",url); options.put("mime",mime==null?"application/octet-stream":mime);
                options.put("name",android.webkit.URLUtil.guessFileName(url,disposition,mime));
                web.evaluateJavascript("window.Capacitor.nativePromise('CeaDocuments','download',"+options.toString()+").catch(function(e){alert(e.message || 'Download failed');})",null);
                return;
            }
            // Third-party/signed file URLs open without forwarding CEA session cookies.
            new AlertDialog.Builder(this).setTitle("Save this file")
                .setMessage("For a receipt or certificate page, choose Save page as PDF in the CEA menu. Direct files open in your browser; private files may require sign-in there.")
                .setPositiveButton("Open file", (d,w) -> openExternal(url)).setNegativeButton("Cancel",null).show();
        });
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override public void handleOnBackPressed() {
                if (web.canGoBack()) web.goBack();
                else new AlertDialog.Builder(MainActivity.this).setTitle("Close CEA?").setMessage("Saved application answers stay on this device. Clear them first if this is a shared phone.")
                    .setPositiveButton("Close",(d,w)->finish()).setNegativeButton("Stay",null).show();
            }
        });
    }
    private boolean navigate(String url) {
        if (UrlPolicy.internal(url)) return bridge.launchIntent(Uri.parse(url));
        String path=Uri.parse(url).getPath();
        if (UrlPolicy.download(url) && path!=null && path.startsWith("/v1/uploads/")) {
            new AlertDialog.Builder(this).setTitle("Save this CEA file?")
                .setMessage("Choose where to save the file. Only save private files on a device you trust.")
                .setPositiveButton("Save",(d,w)-> {
                    com.getcapacitor.JSObject options=new com.getcapacitor.JSObject();options.put("url",url);
                    options.put("name",android.webkit.URLUtil.guessFileName(url,null,null));
                    bridge.getWebView().evaluateJavascript("window.Capacitor.nativePromise('CeaDocuments','download',"+options.toString()+").catch(function(e){alert(e.message || 'Download failed');})",null);
                }).setNegativeButton("Cancel",null).show();
            return true;
        }
        if (UrlPolicy.external(url)) new AlertDialog.Builder(this).setTitle("Open another app?")
            .setMessage("This link opens outside CEA. Return here afterwards. Payment is only confirmed by CEA after checking with the provider.")
            .setPositiveButton("Open",(d,w)->openExternal(url)).setNegativeButton("Stay",null).show();
        else Toast.makeText(this,"This type of link cannot be opened. Use the website or contact CEA for help.",Toast.LENGTH_LONG).show();
        return true;
    }
    private void openExternal(String url) {
        if (!UrlPolicy.external(url)) { Toast.makeText(this,"Use Save page as PDF for this document.",Toast.LENGTH_LONG).show(); return; }
        try {
            Intent external = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            if ("https".equalsIgnoreCase(Uri.parse(url).getScheme())) {
                // Resolve a generic web URL to avoid verified CEA App Links reopening this Activity.
                Intent probe = new Intent(Intent.ACTION_VIEW, Uri.parse("https://example.com"));
                android.content.pm.ResolveInfo browser = getPackageManager().resolveActivity(probe, android.content.pm.PackageManager.MATCH_DEFAULT_ONLY);
                if (browser == null || browser.activityInfo == null || browser.activityInfo.packageName.equals(getPackageName()) || browser.activityInfo.packageName.equals("android")) {
                    Toast.makeText(this,"Set a default browser in Android settings to open this link.",Toast.LENGTH_LONG).show(); return;
                }
                external.setPackage(browser.activityInfo.packageName);
            }
            startActivity(external);
        }
        catch (ActivityNotFoundException e) { Toast.makeText(this,"No app can open this link on this device.",Toast.LENGTH_LONG).show(); }
    }
    private void offline() { startActivity(new Intent(this, OfflineLessonsActivity.class)); }
    private void menu() {
        String[] items = {"Home", "My CEA workspace", "Offline lessons", "Share public lesson or course", "Save page as PDF", "Refresh page", "Help on WhatsApp", "Phone notifications"};
        new AlertDialog.Builder(this).setTitle("What would you like to do?").setItems(items,(dialog,which)->{
            WebView web = bridge.getWebView();
            switch(which) {
                case 0: web.loadUrl(HOME); break;
                case 1: web.loadUrl(HOME+"/app"); break;
                case 2: offline(); break;
                case 3:
                    Intent share = new Intent(Intent.ACTION_SEND); share.setType("text/plain"); share.putExtra(Intent.EXTRA_TEXT,UrlPolicy.shareable(web.getUrl())); startActivity(Intent.createChooser(share,"Share CEA")); break;
                case 4:
                    if (!UrlPolicy.internal(web.getUrl())) break;
                    new AlertDialog.Builder(this).setTitle("Save a copy of this page?").setMessage("The PDF may contain private information. Only save it on a device you trust.")
                        .setPositiveButton("Continue",(d,w)->((PrintManager)getSystemService(PRINT_SERVICE)).print("CEA document",web.createPrintDocumentAdapter("CEA document"),null)).setNegativeButton("Cancel",null).show(); break;
                case 5: web.reload(); break;
                case 6: openExternal("https://wa.me/2349058628386"); break;
                case 7: startActivity(new Intent(this,NotificationSettingsActivity.class)); break;
                default: break;
            }
        }).show();
    }
    @Override protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (bridge != null && Intent.ACTION_VIEW.equals(intent.getAction()) && intent.getData() != null && UrlPolicy.internal(intent.getData().toString())) {
            bridge.getWebView().loadUrl(intent.getData().toString());
            // Avoid keeping one-time credentials in Activity intent state.
            setIntent(new Intent(this, MainActivity.class));
        }
    }
}
