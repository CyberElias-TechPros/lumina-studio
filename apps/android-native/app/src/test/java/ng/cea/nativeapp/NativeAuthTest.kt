package ng.cea.nativeapp

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonObject
import org.junit.Assert.*
import org.junit.Test

class NativeAuthTest {
    private val token = "a".repeat(64)
    private val rotated = "b".repeat(64)
    private fun cookie(value: String = token) = "cea_session=$value; HttpOnly; Secure; Path=/"
    private val userBody = """{"expiresAt":"2099-01-01T00:00:00.000Z","user":{"id":"u1","name":"Learner","email":"test@example.com","roleKey":"student","permissions":["course:read"]}}"""
    private val pendingBody = """{"expiresAt":"2099-01-01T00:00:00.000Z","mfaRequired":true}"""
    private class Fake(var replies: MutableList<AuthReply>) : AuthTransport {
        val requests = mutableListOf<Triple<String, JsonObject?, String?>>()
        override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply {
            requests.add(Triple(path, body, token)); return replies.removeAt(0)
        }
    }
    @Test fun credentialsRemainSeparateFromUiAndRefreshRotatesBearer() = runBlocking {
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())), AuthReply(200, userBody, listOf(cookie(rotated))), AuthReply(200, "{}")))
        val client = NativeAuthClient(fake)
        assertEquals("student", client.signIn("test@example.com", "password").user!!.roleKey)
        assertNull(fake.requests[0].third)
        assertFalse(client.session.toString().contains(token))
        client.refresh()
        assertEquals(token, fake.requests[1].third)
        assertTrue(client.signOut())
        assertEquals(rotated, fake.requests[2].third)
        assertFalse(client.hasSession())
    }
    @Test fun mfaDoesNotGrantUserBeforeVerification() = runBlocking {
        val fake = Fake(mutableListOf(AuthReply(200, pendingBody, listOf(cookie())), AuthReply(200, userBody)))
        val client = NativeAuthClient(fake)
        assertTrue(client.signIn("test@example.com", "password").mfaRequired)
        assertNull(client.session.user)
        assertNotNull(client.verify("123456").user)
        assertEquals("mfa/verify", fake.requests.last().first)
        assertEquals(token, fake.requests.last().third)
    }
    @Test fun rejectedSessionIsClearedAndAnotherAccountDoesNotReuseToken() = runBlocking {
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())), AuthReply(401, ""), AuthReply(200, userBody, listOf(cookie(rotated)))))
        val client = NativeAuthClient(fake)
        client.signIn("one@example.com", "password")
        try { client.checkSession(); fail("Expected rejection") } catch (_: AuthFailure) { }
        assertFalse(client.hasSession())
        client.signIn("two@example.com", "password")
        assertNull(fake.requests.last().third)
    }
    @Test fun failedServerSignOutStillClearsLocalSession() = runBlocking {
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())), AuthReply(503, "")))
        val client = NativeAuthClient(fake)
        client.signIn("test@example.com", "password")
        assertFalse(client.signOut())
        assertNull(client.session.user)
        assertFalse(client.hasSession())
    }
    @Test fun processRestartDoesNotRestoreCredentials() = runBlocking {
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie()))))
        NativeAuthClient(fake).signIn("test@example.com", "password")
        assertFalse(NativeAuthClient(fake).hasSession())
    }
    @Test fun insecureOrDuplicatedSessionCookieIsRejected() {
        for (headers in listOf(listOf("cea_session=$token"), listOf(cookie(), cookie()), listOf(cookie("bad\r\nheader")))) {
            try { NativeAuthClient.sessionCookie(headers); fail("Unsafe cookie accepted") } catch (_: IllegalArgumentException) { }
        }
    }
    @Test fun expiryPreventsNetworkAccess() = runBlocking {
        var now = 0L
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie()))))
        val client = NativeAuthClient(fake) { now }
        client.signIn("test@example.com", "password")
        now = Long.MAX_VALUE
        try { client.checkSession(); fail("Expired session accepted") } catch (_: AuthFailure) { }
        assertEquals(1, fake.requests.size)
        assertFalse(client.hasSession())
    }
    @Test fun malformedSuccessfulResponseFailsClosed() = runBlocking {
        val client = NativeAuthClient(Fake(mutableListOf(AuthReply(200, "{}", listOf(cookie())))))
        try { client.signIn("test@example.com", "password"); fail("Malformed session accepted") } catch (_: AuthFailure) { }
        assertFalse(client.hasSession())
    }

    @Test fun rememberedSessionRestoresCredentialButNotIdentityUntilServerValidation() = runBlocking {
        val store = MemorySessionStore()
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())), AuthReply(200, userBody), AuthReply(200, "{}")))
        val first = NativeAuthClient(fake, store)
        first.signIn("test@example.com", "password", true)
        assertNotNull(store.read())
        first.dropMemory()
        val second = NativeAuthClient(fake, store)
        assertTrue(second.restore())
        assertNull(second.session.user)
        assertNotNull(second.checkSession().user)
        second.signOut()
        assertNull(store.read())
        assertFalse(NativeAuthClient(fake, store).restore())
    }
    @Test fun pendingMfaIsNeverPersistedEvenWhenRememberWasRequested() = runBlocking {
        val store = MemorySessionStore()
        val fake = Fake(mutableListOf(AuthReply(200, pendingBody, listOf(cookie())), AuthReply(200, userBody)))
        val client = NativeAuthClient(fake, store)
        client.signIn("test@example.com", "password", true)
        assertNull(store.read())
        client.verify("123456")
        assertEquals(token, store.read()!!.token)
    }
    @Test fun rotationUpdatesStoredTokenAndRejectionErasesIt() = runBlocking {
        val store = MemorySessionStore()
        val fake = Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())), AuthReply(200, userBody, listOf(cookie(rotated))), AuthReply(401, "")))
        val client = NativeAuthClient(fake, store)
        client.signIn("test@example.com", "password", true)
        client.refresh()
        assertEquals(rotated, store.read()!!.token)
        try { client.checkSession(); fail("Expected rejection") } catch (_: AuthFailure) { }
        assertNull(store.read())
    }
    @Test fun noOptInMeansNoStoredCredential() = runBlocking {
        val store = MemorySessionStore()
        val client = NativeAuthClient(Fake(mutableListOf(AuthReply(200, userBody, listOf(cookie())))), store)
        client.signIn("test@example.com", "password")
        assertNull(store.read())
        assertFalse(client.session.remembered)
    }
    @Test fun expiredStoredCredentialIsErasedWithoutNetworkRequest() = runBlocking {
        val store = MemorySessionStore().apply { write(StoredSession(token, 1)) }
        val fake = Fake(mutableListOf())
        assertFalse(NativeAuthClient(fake, store).restore())
        assertNull(store.read())
        assertTrue(fake.requests.isEmpty())
    }
}
