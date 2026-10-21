package ng.cea.nativeapp

import kotlinx.serialization.decodeFromString

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.util.Locale

@Serializable
data class Program(
    val slug: String,
    val title: String,
    val category: String = "",
    val level: String = "",
    val duration: String = "",
    val mode: String = "",
    val blurb: String = "",
    val outcomes: List<String> = emptyList(),
    val tools: List<String> = emptyList(),
)
@Serializable
data class ProgramPage(val items: List<Program>, val total: Int = 0, val nextCursor: String? = null)
@Serializable
data class CatalogSnapshot(val programs: List<Program>, val fetchedAt: Long)

object CatalogCodec {
    val json = Json { ignoreUnknownKeys = true }
    fun page(value: String): ProgramPage = json.decodeFromString<ProgramPage>(value).also { page ->
        require(page.items.size <= 50) { "Unexpected catalogue size" }
        require(page.items.all { it.slug.isNotBlank() && it.title.isNotBlank() }) { "Invalid course information" }
        require((page.nextCursor?.length ?: 0) <= 512) { "Invalid page cursor" }
    }
    fun search(programs: List<Program>, query: String): List<Program> {
        val needle = query.trim().lowercase(Locale.ROOT)
        return programs.filter { listOf(it.title, it.category, it.blurb).any { text -> text.lowercase(Locale.ROOT).contains(needle) } }
    }
}
