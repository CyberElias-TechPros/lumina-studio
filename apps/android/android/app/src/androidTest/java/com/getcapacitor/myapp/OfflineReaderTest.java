package com.getcapacitor.myapp;
import static org.junit.Assert.*;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import androidx.test.core.app.ActivityScenario;
import ng.cea.app.OfflineLessonsActivity;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;
public class OfflineReaderTest {
    private WebView findWeb(View view) {
        if (view instanceof WebView) return (WebView)view;
        if (view instanceof ViewGroup) for (int i=0;i<((ViewGroup)view).getChildCount();i++) { WebView found=findWeb(((ViewGroup)view).getChildAt(i)); if(found!=null)return found; }
        return null;
    }
    private String evaluate(ActivityScenario<OfflineLessonsActivity> activity, String script) throws Exception {
        CountDownLatch done=new CountDownLatch(1); AtomicReference<String> result=new AtomicReference<>();
        activity.onActivity(a -> { WebView web=findWeb(a.findViewById(android.R.id.content)); assertNotNull(web); web.evaluateJavascript(script,value->{result.set(value);done.countDown();}); });
        assertTrue("WebView did not answer",done.await(5,TimeUnit.SECONDS)); return result.get();
    }
    @Test public void opensBundledLessonsInRealAndroidWebView() throws Exception {
        try (ActivityScenario<OfflineLessonsActivity> activity=ActivityScenario.launch(OfflineLessonsActivity.class)) {
            String count="";
            for(int attempt=0;attempt<100;attempt++) {
                count=evaluate(activity,"document.querySelectorAll('#results button').length");
                if(count.equals("210"))break;
                android.os.SystemClock.sleep(100);
            }
            assertEquals("Bundled reader did not load", "210",count);
            evaluate(activity,"document.querySelector('#results button').click()");
            android.os.SystemClock.sleep(300);
            assertEquals("\"Sitting down at a computer for the first time\"",evaluate(activity,"document.getElementById('title').textContent"));
            assertEquals("false",evaluate(activity,"document.getElementById('lesson').hidden"));
        }
    }
}
