package ng.cea.nativeapp

import android.content.Context
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import java.io.File

/**
 * Tiny offline cache for PUBLIC catalog data only (cohorts, library, shop) so the Discover
 * tab keeps working without connectivity. Never stores credentials or user-scoped data;
 * entries are capped at 512 KiB and plain files in the app's private filesDir.
 */
class PublicCache(context: Context) {
    private val dir = File(context.filesDir, "public-cache")

    @Serializable
    data class CachedCohorts(val items: List<CohortItem>, val fetchedAt: Long)

    @Serializable
    data class CachedLibrary(
        val sources: List<LibrarySource>,
        val items: List<LibraryItem>,
        val nextCursor: String?,
        val fetchedAt: Long,
    )

    @Serializable
    data class CachedShop(val catalog: ShopCatalog, val fetchedAt: Long)

    suspend fun write(key: String, raw: String) = withContext(Dispatchers.IO) {
        runCatching {
            if (raw.length > MAX_BYTES) return@runCatching
            if (!dir.exists()) dir.mkdirs()
            File(dir, "$key.json").writeText(raw)
        }
    }

    suspend fun read(key: String): String? = withContext(Dispatchers.IO) {
        runCatching {
            val file = File(dir, "$key.json")
            if (!file.exists() || file.length() > MAX_BYTES) return@runCatching null
            file.readText()
        }.getOrNull()
    }

    private companion object {
        const val MAX_BYTES = 512 * 1024
    }
}
