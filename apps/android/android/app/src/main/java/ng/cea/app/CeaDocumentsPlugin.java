package ng.cea.app;
import android.app.Activity;
import android.content.Intent;
import android.util.Base64;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.ActivityCallback;
import java.io.OutputStream;

/** User-selected SAF destination only. No arbitrary filesystem paths or storage permission. */
@CapacitorPlugin(name="CeaDocuments")
public class CeaDocumentsPlugin extends Plugin {
    private boolean busy;
    @PluginMethod public void download(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            String url=call.getString("url","");
            if(busy || !UrlPolicy.internal(getBridge().getWebView().getUrl()) || !UrlPolicy.download(url)) {call.reject("This download is not available in the app");return;}
            busy=true;
            String cookies=android.webkit.CookieManager.getInstance().getCookie(url);
            getBridge().execute(() -> {
                java.net.HttpURLConnection connection=null;
                try {
                    String current=url;
                    for(int redirect=0;redirect<4;redirect++) {
                        if(!UrlPolicy.download(current) || !UrlPolicy.sameOrigin(url,current))throw new java.io.IOException("Redirect blocked");
                        connection=(java.net.HttpURLConnection)new java.net.URL(current).openConnection();
                        connection.setInstanceFollowRedirects(false);connection.setConnectTimeout(15000);connection.setReadTimeout(20000);
                        connection.setRequestProperty("Accept-Encoding","identity");
                        connection.setRequestProperty("Origin",BuildConfig.CEA_ORIGIN);
                        if(cookies!=null)connection.setRequestProperty("Cookie",cookies);
                        int status=connection.getResponseCode();
                        if(status>=300 && status<400) {String location=connection.getHeaderField("Location");if(location==null)throw new java.io.IOException("Missing redirect");current=new java.net.URL(new java.net.URL(current),location).toString();connection.disconnect();continue;}
                        if(status!=200 || connection.getContentLength()>10*1024*1024)throw new java.io.IOException("Download failed or too large");
                        java.io.ByteArrayOutputStream data=new java.io.ByteArrayOutputStream();
                        try(java.io.InputStream input=connection.getInputStream()) {byte[] buffer=new byte[8192];int count;while((count=input.read(buffer))!=-1) {if(data.size()+count>10*1024*1024)throw new java.io.IOException("Too large");data.write(buffer,0,count);}}
                        call.getData().put("base64",Base64.encodeToString(data.toByteArray(),Base64.NO_WRAP));
                        String mime=connection.getContentType(); if(mime!=null)call.getData().put("mime",mime.split(";")[0]);
                        getActivity().runOnUiThread(() -> {busy=false;save(call);});return;
                    }
                    throw new java.io.IOException("Too many redirects");
                } catch(Exception error) {getActivity().runOnUiThread(() -> {busy=false;call.reject("Download failed. Reopen the page to sign in again, or use the website for files above 10 MB.");});}
                finally {if(connection!=null)connection.disconnect();}
            });
        });
    }
    @PluginMethod public void save(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (!UrlPolicy.internal(getBridge().getWebView().getUrl())) { call.reject("Not a trusted CEA page"); return; }
            if (busy) { call.reject("Finish the current save first"); return; }
            String data=call.getString("base64", ""), name=call.getString("name","CEA-document");
            if (data.isEmpty() || data.length()>14000000 || !data.matches("[A-Za-z0-9+/=\\r\\n]+")) { call.reject("This file is empty or too large. Export it from the website instead."); return; }
            name=name.replaceAll("[^a-zA-Z0-9._ -]","_"); if(name.length()>120)name=name.substring(0,120);
            String mime=call.getString("mime","application/octet-stream");
            if (!mime.matches("[a-zA-Z0-9.+-]+/[a-zA-Z0-9.+-]+")) mime="application/octet-stream";
            Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT); intent.addCategory(Intent.CATEGORY_OPENABLE); intent.setType(mime); intent.putExtra(Intent.EXTRA_TITLE,name);
            busy=true;
            try { startActivityForResult(call,intent,"saved"); } catch (android.content.ActivityNotFoundException e) { busy=false;call.reject("No file-saving app is available on this device"); }
        });
    }
    @ActivityCallback private void saved(PluginCall call, ActivityResult result) {
        busy=false;
        if(call==null)return;
        if(result.getResultCode()!=Activity.RESULT_OK || result.getData()==null || result.getData().getData()==null) {call.reject("Save cancelled");return;}
        android.net.Uri target=result.getData().getData();
        if(!"content".equals(target.getScheme())) {call.reject("Invalid save destination");return;}
        getBridge().execute(() -> {
            try {
                byte[] bytes=Base64.decode(call.getString("base64",""),Base64.DEFAULT);
                if(bytes.length>10*1024*1024) {call.reject("File exceeds the 10 MB limit");return;}
                try(OutputStream stream=getContext().getContentResolver().openOutputStream(target,"wt")) {
                    if(stream==null)throw new java.io.IOException("No destination"); stream.write(bytes);
                }
                call.resolve();
            } catch(Exception error) {call.reject("Could not save this file. Try another location.");}
        });
    }
}
