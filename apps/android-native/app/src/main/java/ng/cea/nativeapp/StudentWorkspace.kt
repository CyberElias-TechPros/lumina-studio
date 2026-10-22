package ng.cea.nativeapp

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable data class StudentLesson(val id: String, val title: String, val type: String, val status: String, val duration: String = "", val body: String? = null) {
    fun readable() = status in setOf("preview", "in-progress", "done")
    fun completable() = readable() && status != "done" && type == "article" && !body.isNullOrBlank() && id.matches(Regex("[a-zA-Z0-9_-]{1,120}"))
}
@Serializable data class StudentModule(val id: String, val title: String, val lessons: List<StudentLesson>)
@Serializable data class StudentCourse(val slug: String, val title: String, val subtitle: String = "", val instructor: String = "", val pct: Int, val modules: List<StudentModule>)
@Serializable data class StudentDashboard(val courses: List<StudentCourse>) {
    companion object {
        fun decode(body: String): StudentDashboard {
            val data = Json { ignoreUnknownKeys = true }.decodeFromString<StudentDashboard>(body)
            require(data.courses.size <= 100 && data.courses.map { it.slug }.distinct().size == data.courses.size)
            data.courses.forEach { course ->
                require(course.slug.matches(Regex("[a-zA-Z0-9_-]{1,120}")) && course.title.isNotBlank() && course.pct in 0..100)
                val lessons = course.modules.flatMap { it.lessons }
                require(lessons.size <= 1000 && lessons.map { it.id }.distinct().size == lessons.size)
            }
            return data
        }
    }
}

@Composable
fun StudentWorkspace(state: AccountState, back: () -> Unit, reload: () -> Unit, complete: (String, String) -> Unit) {
    // Private navigation is not saved to disk/instance state. Logout removes the whole data tree.
    var courseSlug by remember { mutableStateOf<String?>(null) }
    var lessonId by remember { mutableStateOf<String?>(null) }
    var confirm by remember { mutableStateOf(false) }
    val course = state.dashboard?.courses?.firstOrNull { it.slug == courseSlug }
    val lesson = course?.modules?.flatMap { it.lessons }?.firstOrNull { it.id == lessonId }
    val goBack = { if (lessonId != null) lessonId = null else if (courseSlug != null) courseSlug = null else back() }
    BackHandler(onBack = goBack)
    if (confirm && lesson != null && course != null && state.session.user?.roleKey == "student") {
        AlertDialog(onDismissRequest = { confirm = false }, title = { Text("Record lesson completion?") },
            text = { Text("Confirm you have finished reading this lesson. This records learning progress, not a grade or certificate.") },
            confirmButton = { TextButton(onClick = { confirm = false; complete(course.slug, lesson.id) }, enabled = !state.busy) { Text("Confirm completion") } },
            dismissButton = { TextButton(onClick = { confirm = false }) { Text("Not yet") } })
    }
    key(courseSlug, lessonId) {
        LazyColumn(Modifier.fillMaxSize().testTag("student-workspace"), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
            item { OutlinedButton(onClick = goBack) { Text(if (courseSlug == null) "Back to account" else "Back") } }
            if (state.busy) item { LinearProgressIndicator(Modifier.fillMaxWidth()); Text("Checking your learning records…") }
            state.message?.let { message -> item { Text(message) } }
            if (state.session.user?.roleKey != "student") {
                item { Text("A verified student session is required. Return to Account to verify your session.") }
            } else if (state.dashboard == null) {
                item { Text("No private learning records are cached offline. Connect to load your courses.") }
                item { Button(onClick = reload, enabled = !state.busy) { Text("Load my courses") } }
            } else if (courseSlug == null) {
                item { Text("My enrolled courses", style = MaterialTheme.typography.headlineMedium) }
                item { Text("Enrolment and progress come from the Academy server. Public notes and saved courses do not grant enrolment.") }
                item { OutlinedButton(onClick = reload, enabled = !state.busy) { Text("Refresh my learning") } }
                if (state.dashboard.courses.isEmpty()) item { Text("You have no enrolled courses yet. Contact admissions about your placement and payment status.") }
                items(state.dashboard.courses, key = { it.slug }) { item ->
                    OutlinedCard(onClick = { courseSlug = item.slug }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                            Text(item.title, style = MaterialTheme.typography.titleLarge)
                            Text(item.subtitle)
                            Text("Progress: ${item.pct}%")
                            Text("Open course")
                        }
                    }
                }
            } else if (course == null) {
                item { Text("This course is no longer in your current enrolments. Return to your course list and refresh.") }
            } else if (lessonId == null) {
                item { Text(course.title, style = MaterialTheme.typography.headlineMedium) }
                item { Text("Instructor: ${course.instructor} • Progress: ${course.pct}%") }
                course.modules.forEach { module ->
                    item { Text(module.title, style = MaterialTheme.typography.titleLarge) }
                    items(module.lessons) { item ->
                        OutlinedCard(onClick = { lessonId = item.id }, enabled = item.readable() && !state.busy, modifier = Modifier.fillMaxWidth()) {
                            Column(Modifier.padding(16.dp)) { Text(item.title); Text("${item.type} • ${item.duration} • ${item.status}") }
                        }
                    }
                }
            } else if (lesson == null || !lesson.readable()) {
                item { Text("This lesson is unavailable or locked. Refresh your course list to check access.") }
            } else {
                item { Text(lesson.title, style = MaterialTheme.typography.headlineMedium) }
                item { Text("${lesson.type} • ${lesson.duration} • ${lesson.status}") }
                if (!lesson.body.isNullOrBlank()) item { SelectionContainer { Text(lesson.body) } }
                else item { Text("No lesson text has been published for this item. Ask your instructor for the learning material.") }
                if (lesson.type != "article") item { Text("Interactive quizzes, assignments and video playback are not implemented here yet. Text above, if provided, is instructor-supplied notes—not a working player or assessment.") }
                if (lesson.completable()) item { Button(onClick = { confirm = true }, enabled = !state.busy) { Text("Mark lesson complete") } }
                if (lesson.status == "done") item { Text("Completion recorded by the Academy.") }
            }
        }
    }
}
