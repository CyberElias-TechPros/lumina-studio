package ng.cea.nativeapp

import kotlinx.serialization.decodeFromString

import android.content.Context
import android.net.Uri
import android.util.AtomicFile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.encodeToString
import java.io.File
import java.net.URL
import javax.net.ssl.HttpsURLConnection

/** Public catalogue only. No session, HTML, private lessons or financial records are cached. */
class CatalogRepository(context: Context) {
    private val file = AtomicFile(File(context.filesDir, "public-catalog-v1.json"))
    suspend fun cached(): CatalogSnapshot? = withContext(Dispatchers.IO) {
        try {
            if (file.baseFile.length() > MAX_BYTES) return@withContext null
            file.openRead().bufferedReader().use { CatalogCodec.json.decodeFromString<CatalogSnapshot>(it.readText()) }
        } catch (_: Exception) { null }
    }
    suspend fun fetch(): CatalogSnapshot = withContext(Dispatchers.IO) {
        val programs = linkedMapOf<String, Program>()
        val seen = mutableSetOf<String>()
        var cursor: String? = null
        var finished = false
        var downloaded = 0
        val deadline = android.os.SystemClock.elapsedRealtime() + 20000
        for (pageNumber in 0 until 10) {
            val path = "/v1/programs?limit=50" + (cursor?.let { "&cursor=${Uri.encode(it)}" } ?: "")
            check(android.os.SystemClock.elapsedRealtime() < deadline) { "Catalogue download timed out" }
            val raw = get(path)
            downloaded += raw.toByteArray(Charsets.UTF_8).size
            check(downloaded <= MAX_BYTES) { "Catalogue exceeded download limit" }
            val page = CatalogCodec.page(raw)
            page.items.forEach { programs[it.slug] = it }
            val next = page.nextCursor
            if (page.items.isEmpty() || next == null || programs.size >= page.total && page.total > 0) {
                finished = true; break
            }
            check(seen.add(next)) { "Catalogue pagination did not advance" }
            cursor = next
        }
        check(finished) { "Catalogue exceeded download limit" }
        val snapshot = CatalogSnapshot(programs.values.toList(), System.currentTimeMillis())
        val encoded = CatalogCodec.json.encodeToString(snapshot).toByteArray(Charsets.UTF_8)
        check(encoded.size <= MAX_BYTES) { "Catalogue exceeded storage limit" }
        // Storage exhaustion must not turn a successful online read into a failure.
        var output: java.io.FileOutputStream? = null
        try { output = file.startWrite(); output.write(encoded); file.finishWrite(output) }
        catch (_: java.io.IOException) { output?.let { file.failWrite(it) } }
        snapshot
    }
    private fun get(path: String): String {
        val connection = URL("https://cea-api.cyber-e54.workers.dev$path").openConnection() as HttpsURLConnection
        try {
            connection.instanceFollowRedirects = false
            connection.connectTimeout = 10000
            connection.readTimeout = 10000
            connection.requestMethod = "GET"
            connection.setRequestProperty("Accept", "application/json")
            check(connection.responseCode == 200) { "Catalogue unavailable" }
            return connection.inputStream.use { input ->
                val output = java.io.ByteArrayOutputStream()
                val buffer = ByteArray(8192)
                while (true) {
                    val count = input.read(buffer)
                    if (count < 0) break
                    check(output.size() + count <= MAX_BYTES) { "Catalogue exceeded download limit" }
                    output.write(buffer, 0, count)
                }
                output.toString("UTF-8")
            }
        } finally { connection.disconnect() }
    }
    companion object { private const val MAX_BYTES = 2 * 1024 * 1024 }
}
