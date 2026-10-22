package ng.cea.nativeapp

import androidx.test.platform.app.InstrumentationRegistry
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import java.io.File
import java.security.KeyStore

class KeystoreSessionStoreTest {
    private val context = InstrumentationRegistry.getInstrumentation().targetContext
    private val namespace = "account-session-instrumentation-test"
    private val store get() = KeystoreSessionStore(context, namespace)
    private val file get() = File(context.noBackupFilesDir, "$namespace.enc")
    private val token = "a".repeat(64)
    @Before fun before() { store.clear() }
    @After fun after() { store.clear() }
    @Test fun survivesStoreRecreationWithoutPlaintextAndUsesFreshEncryptionNonce() {
        store.write(StoredSession(token, 4000000000000))
        val first = file.readBytes()
        assertFalse(String(first, Charsets.ISO_8859_1).contains(token))
        assertEquals(token, store.read()!!.token)
        store.write(StoredSession(token, 4000000000000))
        assertFalse(first.contentEquals(file.readBytes()))
        assertEquals(token, store.read()!!.token)
        store.clear()
        assertNull(store.read())
        assertFalse(file.exists())
    }
    @Test fun tamperingFailsClosedAndDeletesUnreadableSession() {
        store.write(StoredSession(token, 4000000000000))
        val bytes = file.readBytes()
        bytes[bytes.lastIndex] = (bytes.last().toInt() xor 1).toByte()
        file.writeBytes(bytes)
        assertNull(store.read())
        assertFalse(file.exists())
    }
    @Test fun lostKeyDoesNotCreateReplacementToDecryptOldSession() {
        store.write(StoredSession(token, 4000000000000))
        KeyStore.getInstance("AndroidKeyStore").apply { load(null); deleteEntry("ng.cea.nativeapp.$namespace") }
        assertNull(store.read())
        assertFalse(file.exists())
    }
}
