package com.getcapacitor.myapp;
import static org.junit.Assert.*;
import android.content.Context;
import androidx.test.platform.app.InstrumentationRegistry;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import org.json.JSONObject;
import org.junit.Test;
public class OfflineBundleTest {
    @Test public void containsAllPublicLessonsAndReaderAssets() throws Exception {
        Context context = InstrumentationRegistry.getInstrumentation().getTargetContext();
        try (InputStream stream = context.getAssets().open("reader/lessons.json")) {
            ByteArrayOutputStream bytes = new ByteArrayOutputStream(); byte[] chunk = new byte[4096]; int n;
            while ((n = stream.read(chunk)) != -1) bytes.write(chunk,0,n);
            JSONObject bundle = new JSONObject(bytes.toString("UTF-8"));
            assertEquals(1,bundle.getInt("version"));
            assertTrue(bundle.getJSONArray("posts").length() >= 210);
            assertEquals("sitting-down-at-a-computer",bundle.getJSONArray("posts").getJSONObject(0).getString("slug"));
        }
        for (String file : new String[]{"index.html","reader.js","reader.css"}) try (InputStream ignored = context.getAssets().open("reader/"+file)) { assertNotNull(ignored); }
    }
}
