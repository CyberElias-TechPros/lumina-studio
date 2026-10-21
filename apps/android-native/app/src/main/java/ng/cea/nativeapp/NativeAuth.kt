package ng.cea.nativeapp

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.currentCoroutineContext
import kotlinx.coroutines.ensureActive
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import java.net.URL
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone
import javax.net.ssl.HttpsURLConnection

@Serializable data class NativeUser(val id: String, val name: String, val email: String, val roleKey: String, val permissions: List<String> = emptyList())
data class NativeSession(val user: NativeUser? = null, val mfaRequired: Boolean = false, val expiresAt: Long = 0)
class AuthFailure(val status: Int) : Exception("Native authentication request failed")
data class AuthReply(val status: Int, val body: String, val cookies: List<String> = emptyList())
fun interface AuthTransport {
    suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply
}

/** Fixed API only; no browser cookie jar, redirects, response cache or credential logging. */
class HttpsAuthTransport : AuthTransport {
    override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply = withContext(Dispatchers.IO) {
        require(path in setOf("sign-in", "mfa/verify", "session", "refresh", "sign-out"))
        require((path == "session") == (body == null))
        val connection = URL("https://cea-api.cyber-e54.workers.dev/v1/auth/$path").openConnection() as HttpsURLConnection
        try {
            connection.instanceFollowRedirects = false
            connection.useCaches = false
            connection.connectTimeout = 10000
            connection.readTimeout = 10000
            connection.requestMethod = if (body == null) "GET" else "POST"
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("Cache-Control", "no-store")
            connection.setRequestProperty("User-Agent", "CEA-Native-Android/0.3")
            if (token != null) connection.setRequestProperty("Authorization", "Bearer $token")
            if (body != null) {
                connection.doOutput = true
                connection.setRequestProperty("Content-Type", "application/json")
                connection.outputStream.use { it.write(body.toString().toByteArray(Charsets.UTF_8)) }
            }
            currentCoroutineContext().ensureActive()
            val status = connection.responseCode
            // Do not reflect arbitrary server error bodies into UI or logs.
            if (status !in 200..299) return@withContext AuthReply(status, "")
            val deadline = System.nanoTime() + 20_000_000_000L
            val response = connection.inputStream.use { input ->
                val output = java.io.ByteArrayOutputStream()
                val buffer = ByteArray(4096)
                while (true) {
                    currentCoroutineContext().ensureActive()
                    check(System.nanoTime() < deadline)
                    val count = input.read(buffer)
                    if (count < 0) break
                    check(output.size() + count <= 65536)
                    output.write(buffer, 0, count)
                }
                output.toString("UTF-8")
            }
            AuthReply(status, response, connection.headerFields.filterKeys { it?.equals("Set-Cookie", true) == true }.values.flatten())
        } finally { connection.disconnect() }
    }
}

/** Process-memory-only credentials for this increment. Calls are serialized by the ViewModel.
 * No token/password is placed in preferences, saved instance state, public cache or backups.
 */
class NativeAuthClient(private val transport: AuthTransport = HttpsAuthTransport(), private val now: () -> Long = System::currentTimeMillis) {
    private var token: String? = null
    var session = NativeSession()
        private set
    private val json = Json { ignoreUnknownKeys = true }
    fun forget() { token = null; session = NativeSession() }
    fun hasSession() = token != null

    suspend fun signIn(email: String, password: String): NativeSession {
        check(token == null) // Account switching must first go through local/server sign-out.
        val body = buildJsonObject { put("email", email.trim()); put("password", password); put("remember", false) }
        return accept(call("sign-in", body), requireCookie = true)
    }
    suspend fun verify(code: String): NativeSession {
        require(session.mfaRequired)
        return accept(call("mfa/verify", buildJsonObject { put("code", code.trim()) }), requireCookie = false)
    }
    suspend fun checkSession(): NativeSession = accept(call("session", null), requireCookie = false)
    suspend fun refresh(): NativeSession = accept(call("refresh", buildJsonObject {}), requireCookie = true)
    suspend fun signOut(): Boolean {
        if (token == null) return true
        return try {
            call("sign-out", buildJsonObject {})
            true
        } catch (error: AuthFailure) {
            error.status == 401 // Already expired/revoked also means no server access.
        } catch (_: java.io.IOException) { false }
        finally { forget() }
    }
    private suspend fun call(path: String, body: JsonObject?): AuthReply {
        if (path != "sign-in" && (token == null || (path != "sign-out" && session.expiresAt <= now()))) {
            forget(); throw AuthFailure(401)
        }
        val reply = transport.request(path, body, token)
        if (reply.status !in 200..299) {
            if (reply.status == 401 || reply.status == 403) forget()
            throw AuthFailure(reply.status)
        }
        return reply
    }
    private fun accept(reply: AuthReply, requireCookie: Boolean): NativeSession {
        try {
            val data = json.parseToJsonElement(reply.body).jsonObject
            val expiryText = data.getValue("expiresAt").jsonPrimitive.content
            require(expiryText.matches(Regex("[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{3}Z")))
            val formatter = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).apply { timeZone = TimeZone.getTimeZone("UTC"); isLenient = false }
            val expiry = formatter.parse(expiryText)?.time ?: error("Invalid expiry")
            require(expiry > now())
            val pending = data["mfaRequired"]?.jsonPrimitive?.booleanOrNull == true
            val user = if (pending) null else json.decodeFromJsonElement<NativeUser>(data.getValue("user"))
            if (user != null) require(user.id.isNotBlank() && user.roleKey.isNotBlank())
            val next = sessionCookie(reply.cookies)
            require(!requireCookie || next != null)
            require(next != null || token != null)
            token = next ?: token
            session = NativeSession(user, pending, expiry)
            return session
        } catch (error: Exception) { forget(); throw AuthFailure(502) }
    }
    companion object {
        fun sessionCookie(headers: List<String>): String? {
            val matching = headers.filter { it.substringBefore('=').trim() == "cea_session" }
            require(matching.size <= 1)
            val header = matching.singleOrNull() ?: return null
            val parts = header.split(';').map { it.trim() }
            require(parts.any { it.equals("Secure", true) } && parts.any { it.equals("HttpOnly", true) })
            val value = parts[0].substringAfter('=')
            require(value.matches(Regex("[a-f0-9]{64}")))
            return value
        }
    }
}
