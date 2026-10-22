package ng.cea.nativeapp

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.NonCancellable
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
data class NativeSession(val user: NativeUser? = null, val mfaRequired: Boolean = false, val expiresAt: Long = 0, val remembered: Boolean = false)
class AuthFailure(val status: Int) : Exception("Native authentication request failed")
data class AuthReply(val status: Int, val body: String, val cookies: List<String> = emptyList()) {
    override fun toString() = "AuthReply(status=$status, content=[redacted])"
}
fun interface AuthTransport {
    suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply
}

/** Fixed API only; no browser cookie jar, redirects, response cache or credential logging. */
class HttpsAuthTransport : AuthTransport {
    override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply = withContext(Dispatchers.IO) {
        val auth = path in setOf("sign-in", "mfa/verify", "session", "refresh", "sign-out")
        val completion = path.matches(Regex("courses/[a-zA-Z0-9_-]{1,120}/lessons/[a-zA-Z0-9_-]{1,120}/complete"))
        val assignmentList = path == "assignments" || path.matches(Regex("assignments\\?cursor=[a-zA-Z0-9_-]{1,200}"))
        val assignmentDetail = path.matches(Regex("assignments/[a-zA-Z0-9_-]{1,120}"))
        val assignmentSubmission = path.matches(Regex("assignments/[a-zA-Z0-9_-]{1,120}/submission"))
        val assignmentSubmit = path.matches(Regex("assignments/[a-zA-Z0-9_-]{1,120}/submit"))
        require(
            auth ||
                path == "dashboard/student" ||
                completion ||
                assignmentList ||
                assignmentDetail ||
                assignmentSubmission ||
                assignmentSubmit,
        )
        val isGet =
            path == "session" ||
                path == "dashboard/student" ||
                assignmentList ||
                assignmentDetail ||
                assignmentSubmission
        require(isGet == (body == null))
        val route = if (auth) "auth/$path" else path
        val connection = URL("https://cea-api.cyber-e54.workers.dev/v1/$route").openConnection() as HttpsURLConnection
        try {
            connection.instanceFollowRedirects = false
            connection.useCaches = false
            connection.connectTimeout = 10000
            connection.readTimeout = 10000
            connection.requestMethod = if (body == null) "GET" else "POST"
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("Cache-Control", "no-store")
            connection.setRequestProperty("User-Agent", "CEA-Native-Android/0.5")
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
            val maxBytes = when {
                path == "dashboard/student" -> 2 * 1024 * 1024
                assignmentList -> 512 * 1024
                assignmentDetail || assignmentSubmission -> 128 * 1024
                else -> 65536
            }
            val deadline = System.nanoTime() + 20_000_000_000L
            val response = connection.inputStream.use { input ->
                val output = java.io.ByteArrayOutputStream()
                val buffer = ByteArray(4096)
                while (true) {
                    currentCoroutineContext().ensureActive()
                    check(System.nanoTime() < deadline)
                    val count = input.read(buffer)
                    if (count < 0) break
                    check(output.size() + count <= maxBytes)
                    output.write(buffer, 0, count)
                }
                output.toString("UTF-8")
            }
            AuthReply(status, response, connection.headerFields.filterKeys { it?.equals("Set-Cookie", true) == true }.values.flatten())
        } finally { connection.disconnect() }
    }
}

/** Calls are serialized by the ViewModel. Optional storage holds only an encrypted verified
 * credential, never identity, permissions, passwords, MFA codes or private learning content. */
class NativeAuthClient(private val transport: AuthTransport = HttpsAuthTransport(), private val store: SessionStore = MemorySessionStore(), private val now: () -> Long = System::currentTimeMillis) {
    private var token: String? = null
    var session = NativeSession()
        private set
    private val json = Json { ignoreUnknownKeys = true }
    private var remember = false
    fun dropMemory() { token = null; session = NativeSession(); remember = false }
    suspend fun forget() {
        dropMemory()
        withContext(NonCancellable + Dispatchers.IO) { store.clear() }
    }
    suspend fun restore(): Boolean {
        check(token == null)
        val saved = withContext(Dispatchers.IO) { store.read() } ?: return false
        if (!saved.token.matches(Regex("[a-f0-9]{64}")) || saved.expiresAt <= now()) { forget(); return false }
        token = saved.token
        remember = true
        // No stored user/permissions: callers MUST verify /session before displaying identity.
        session = NativeSession(expiresAt = saved.expiresAt, remembered = true)
        return true
    }
    fun hasSession() = token != null

    suspend fun signIn(email: String, password: String, rememberSession: Boolean = false): NativeSession {
        check(token == null) // Account switching must first go through local/server sign-out.
        remember = rememberSession
        withContext(Dispatchers.IO) { store.clear() }
        val body = buildJsonObject { put("email", email.trim()); put("password", password); put("remember", rememberSession) }
        return accept(call("sign-in", body), requireCookie = true)
    }
    suspend fun verify(code: String): NativeSession {
        require(session.mfaRequired)
        return accept(call("mfa/verify", buildJsonObject { put("code", code.trim()) }), requireCookie = false)
    }
    suspend fun checkSession(): NativeSession = accept(call("session", null), requireCookie = false)
    suspend fun refresh(): NativeSession = accept(call("refresh", buildJsonObject {}), requireCookie = true)
    suspend fun studentDashboard(): StudentDashboard {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        return StudentDashboard.decode(call("dashboard/student", null).body)
    }
    suspend fun completeLesson(course: String, lesson: String) {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(course.matches(Regex("[a-zA-Z0-9_-]{1,120}")) && lesson.matches(Regex("[a-zA-Z0-9_-]{1,120}")))
        val reply = call("courses/$course/lessons/$lesson/complete", buildJsonObject {})
        require(json.parseToJsonElement(reply.body).jsonObject["ok"]?.jsonPrimitive?.booleanOrNull == true)
    }
    suspend fun assignments(cursor: String? = null): AssignmentPage {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(cursor == null || cursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
        val path = if (cursor == null) "assignments" else "assignments?cursor=$cursor"
        val body = call(path, null).body
        return try { AssignmentPage.decode(body) }
        catch (error: CancellationException) { throw error }
        catch (_: Exception) { throw AuthFailure(502) }
    }
    suspend fun assignment(id: String): StudentAssignmentItem {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = call("assignments/$id", null).body
        return try { StudentAssignmentItem.decodeOne(body) }
        catch (error: CancellationException) { throw error }
        catch (_: Exception) { throw AuthFailure(502) }
    }
    suspend fun assignmentSubmission(id: String, maxScore: Int? = null): NativeSubmission? {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val body = try {
            call("assignments/$id/submission", null).body
        } catch (error: AuthFailure) {
            if (error.status == 404) return null
            throw error
        }
        return try { NativeSubmission.decode(body, maxScore) }
        catch (error: CancellationException) { throw error }
        catch (_: Exception) { throw AuthFailure(502) }
    }
    suspend fun submitAssignment(id: String, answer: String): SubmissionReceipt {
        require(session.user?.roleKey == "student" && !session.mfaRequired)
        require(id.matches(StudentAssignmentItem.ID_PATTERN))
        val trimmed = answer.trim()
        require(trimmed.isNotEmpty() && trimmed.length <= 20_000)
        val reply = call("assignments/$id/submit", buildJsonObject { put("body", trimmed) })
        return try { SubmissionReceipt.decode(reply.body, id) }
        catch (error: CancellationException) { throw error }
        catch (_: Exception) { throw AuthFailure(502) }
    }
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
    private suspend fun accept(reply: AuthReply, requireCookie: Boolean): NativeSession {
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
            if (remember && !pending) {
                val credential = StoredSession(token!!, expiry)
                withContext(Dispatchers.IO) { store.write(credential) }
            }
            session = NativeSession(user, pending, expiry, remembered = remember && !pending)
            return session
        } catch (error: CancellationException) { dropMemory(); throw error }
        catch (error: Exception) { forget(); throw AuthFailure(502) }
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
