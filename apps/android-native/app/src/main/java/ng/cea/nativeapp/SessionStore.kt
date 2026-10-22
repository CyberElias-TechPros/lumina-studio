package ng.cea.nativeapp

/** No identity, role, password, MFA code or private coursework is stored here. */
class StoredSession(val token: String, val expiresAt: Long) {
    override fun toString() = "StoredSession([redacted])"
}
interface SessionStore {
    fun read(): StoredSession?
    fun write(session: StoredSession)
    fun clear()
}
class MemorySessionStore : SessionStore {
    private var record: StoredSession? = null
    override fun read() = record
    override fun write(session: StoredSession) { record = session }
    override fun clear() { record = null }
}
