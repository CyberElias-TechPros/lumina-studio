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
