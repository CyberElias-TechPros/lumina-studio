package ng.cea.nativeapp

import android.graphics.BitmapFactory
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable data class LessonBlock(val type: String, val text: String = "", val items: List<String> = emptyList(), val src: String = "", val alt: String = "", val caption: String = "")
@Serializable data class PublicLesson(val slug: String, val title: String, val excerpt: String = "", val series: String = "", val author: String = "", val order: Int = 0, val body: List<LessonBlock>)
@Serializable data class LessonBundle(val version: Int, val posts: List<PublicLesson>)
object LessonCodec {
    fun decode(raw: String): List<PublicLesson> {
        val bundle = Json { ignoreUnknownKeys = true }.decodeFromString<LessonBundle>(raw)
        require(bundle.version == 1 && bundle.posts.isNotEmpty())
        require(bundle.posts.map { it.slug }.distinct().size == bundle.posts.size)
        bundle.posts.forEach { lesson ->
            require(lesson.slug.matches(Regex("[a-z0-9-]+")) && lesson.title.isNotBlank() && lesson.body.isNotEmpty())
            lesson.body.forEach { block ->
                require(block.type in setOf("p", "h2", "ul", "figure"))
                if (block.type == "figure") require(block.src.matches(Regex("/images/blog/[a-z0-9-]+\\.(jpg|png|webp)")))
            }
        }
        return bundle.posts.sortedBy { it.order }
    }
    fun search(lessons: List<PublicLesson>, query: String) = lessons.filter {
        query.isBlank() || "${it.title} ${it.excerpt} ${it.series}".contains(query.trim(), ignoreCase = true)
    }
}

@Composable
fun BundledLessons() {
    val context = LocalContext.current
    var failed by remember { mutableStateOf(false) }
    var attempt by remember { mutableIntStateOf(0) }
    var lessons by remember { mutableStateOf<List<PublicLesson>?>(null) }
    LaunchedEffect(attempt) {
        failed = false
        lessons = withContext(Dispatchers.IO) {
            try { context.assets.open("public-lessons/lessons.json").bufferedReader().use { LessonCodec.decode(it.readText()) } }
            catch (_: java.io.IOException) { null }
            catch (_: IllegalArgumentException) { null }
        }
        failed = lessons == null
    }
    if (lessons != null) PublicLessonReader(lessons!!)
    else Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        if (failed) {
            Text("The bundled lessons could not be opened. No internet connection is required.")
            Button(onClick = { attempt++ }) { Text("Retry lessons") }
        } else { CircularProgressIndicator(); Text("Opening public lessons…") }
    }
}

@Composable
fun PublicLessonReader(lessons: List<PublicLesson>) {
    var selectedSlug by rememberSaveable { mutableStateOf<String?>(null) }
    var query by rememberSaveable { mutableStateOf("") }
    val selected = lessons.firstOrNull { it.slug == selectedSlug }
    BackHandler(selectedSlug != null) { selectedSlug = null }
    // A new list state per screen keeps detail scrolling separate from search results.
    key(selectedSlug) {
        LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            if (selected == null) {
                item { Text("Public lessons", style = MaterialTheme.typography.headlineMedium) }
                item { Text("${lessons.size} lessons included with this app, available offline. These are public learning notes—not enrolment or assessed course progress. Updates arrive with app updates.") }
                item { OutlinedTextField(value = query, onValueChange = { query = it }, label = { Text("Search public lessons") }, singleLine = true, modifier = Modifier.fillMaxWidth()) }
                val visible = LessonCodec.search(lessons, query)
                if (visible.isEmpty()) item { Text("No matching lessons. Try a different word.") }
                items(visible, key = { it.slug }) { lesson ->
                    OutlinedCard(onClick = { selectedSlug = lesson.slug }, modifier = Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text(lesson.title, style = MaterialTheme.typography.titleLarge)
                            Text(lesson.excerpt)
                            Text("Read offline", color = MaterialTheme.colorScheme.primary)
                        }
                    }
                }
            } else {
                item { OutlinedButton(onClick = { selectedSlug = null }) { Text("Back to public lessons") } }
                item { Text(selected.title, style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
                item { Text("${selected.series} • ${selected.author}") }
                items(selected.body) { block ->
                    when (block.type) {
                        "h2" -> Text(block.text, style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                        "p" -> SelectionContainer { Text(block.text) }
                        "ul" -> Column(verticalArrangement = Arrangement.spacedBy(8.dp)) { block.items.forEach { SelectionContainer { Text("• $it") } } }
                        "figure" -> LessonFigure(block)
                    }
                }
                item { OutlinedButton(onClick = { selectedSlug = null }) { Text("Back to public lessons") } }
            }
        }
    }
}

@Composable
private fun LessonFigure(block: LessonBlock) {
    val context = LocalContext.current
    var bitmap by remember(block.src) { mutableStateOf<android.graphics.Bitmap?>(null) }
    LaunchedEffect(block.src) {
        bitmap = withContext(Dispatchers.IO) {
            try { context.assets.open("public-lessons${block.src}").use {
                BitmapFactory.decodeStream(it, null, BitmapFactory.Options().apply { inSampleSize = 2 })
            } } catch (_: java.io.IOException) { null }
        }
    }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        bitmap?.let { Image(it.asImageBitmap(), contentDescription = block.alt, modifier = Modifier.fillMaxWidth()) }
            ?: Text("Illustration: ${block.alt}")
        Text(block.caption, style = MaterialTheme.typography.bodySmall)
    }
}
