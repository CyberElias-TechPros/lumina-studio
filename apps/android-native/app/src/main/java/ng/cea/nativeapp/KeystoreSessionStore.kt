package ng.cea.nativeapp

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.AtomicFile
import java.io.*
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

/** Device-bound AES-GCM; ciphertext lives outside backup/transfer-eligible directories.
 * A lost/invalidated key or damaged file requires sign-in, never a plaintext fallback.
 * Call on Dispatchers.IO; Android Keystore does not guarantee hardware backing on all phones.
 */
class KeystoreSessionStore(context: Context, namespace: String = "account-session-v1") : SessionStore {
    init { require(namespace.matches(Regex("[a-z0-9-]+"))) }
    private val alias = "ng.cea.nativeapp.$namespace"
    private val file = AtomicFile(File(context.noBackupFilesDir, "$namespace.enc"))
    private val aad = "CEA native session v1".toByteArray(Charsets.UTF_8)
    private fun keystore() = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
    private fun key(create: Boolean): SecretKey {
        (keystore().getKey(alias, null) as? SecretKey)?.let { return it }
        check(create) { "Session key unavailable" }
        return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").apply {
            init(KeyGenParameterSpec.Builder(alias, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setRandomizedEncryptionRequired(true).build())
        }.generateKey()
    }
    override fun read(): StoredSession? {
        if (!file.baseFile.exists() && !File(file.baseFile.path + ".bak").exists()) return null
        return try {
            val bytes = file.openRead().use { input ->
                require(input.channel.size() in 30..4096)
                input.readBytes()
            }
            require(bytes[0].toInt() == 1)
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.DECRYPT_MODE, key(false), GCMParameterSpec(128, bytes.copyOfRange(1, 13)))
            cipher.updateAAD(aad)
            val plain = cipher.doFinal(bytes.copyOfRange(13, bytes.size))
            try {
                DataInputStream(ByteArrayInputStream(plain)).use { input ->
                    val token = input.readUTF()
                    val expiry = input.readLong()
                    require(token.matches(Regex("[a-f0-9]{64}")) && expiry > 0 && input.available() == 0)
                    StoredSession(token, expiry)
                }
            } finally { plain.fill(0) }
        } catch (_: Exception) { clear(); null }
    }
    override fun write(session: StoredSession) {
        require(session.token.matches(Regex("[a-f0-9]{64}")) && session.expiresAt > 0)
        val plain = ByteArrayOutputStream().also { output ->
            DataOutputStream(output).use { it.writeUTF(session.token); it.writeLong(session.expiresAt) }
        }.toByteArray()
        try {
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.ENCRYPT_MODE, key(true))
            cipher.updateAAD(aad)
            require(cipher.iv.size == 12)
            val bytes = byteArrayOf(1) + cipher.iv + cipher.doFinal(plain)
            var output: FileOutputStream? = null
            try { output = file.startWrite(); output.write(bytes); file.finishWrite(output) }
            catch (error: Exception) { output?.let { file.failWrite(it) }; throw error }
        } finally { plain.fill(0) }
    }
    override fun clear() {
        // Destroy the decryption key first. A filesystem deletion failure cannot restore access.
        keystore().deleteEntry(alias)
        file.delete()
        check(!keystore().containsAlias(alias)) { "Session key removal failed" }
    }
}
