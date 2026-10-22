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
import androidx.compose.ui.semantics.LiveRegionMode
import androidx.compose.ui.semantics.liveRegion
import androidx.compose.ui.semantics.semantics
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
fun StudentWorkspace(
    state: AccountState,
    back: () -> Unit,
    reload: () -> Unit,
    complete: (String, String) -> Unit,
    loadAssignments: () -> Unit = {},
    loadMoreAssignments: () -> Unit = {},
    openAssignment: (String) -> Unit = {},
    submitAssignment: (String, String) -> Unit = { _, _ -> },
) {
    // Private navigation and drafts are never saved to disk or instance state. Logout unmounts this tree.
    var section by remember { mutableStateOf("courses") }
    var courseSlug by remember { mutableStateOf<String?>(null) }
    var lessonId by remember { mutableStateOf<String?>(null) }
    var assignmentId by remember { mutableStateOf<String?>(null) }
    var confirmLesson by remember { mutableStateOf(false) }
    var confirmSubmission by remember { mutableStateOf(false) }

    val course = state.dashboard?.courses?.firstOrNull { it.slug == courseSlug }
    val lesson = course?.modules?.flatMap { it.lessons }?.firstOrNull { it.id == lessonId }
    val assignment = state.assignments.items.firstOrNull { it.id == assignmentId }
    val draftToken = assignmentId?.let { state.assignments.submittedDraftTokens[it] } ?: 0
    var draftAnswer by remember(assignmentId, draftToken) { mutableStateOf("") }

    val atRoot = courseSlug == null && lessonId == null && assignmentId == null
    val goBack = {
        when {
            lessonId != null -> lessonId = null
            courseSlug != null -> courseSlug = null
            assignmentId != null -> assignmentId = null
            else -> back()
        }
    }
    BackHandler(onBack = goBack)

    if (confirmLesson && lesson != null && course != null && state.session.user?.roleKey == "student") {
        AlertDialog(
            onDismissRequest = { confirmLesson = false },
            title = { Text("Record lesson completion?") },
            text = { Text("Confirm you have finished reading this lesson. This records learning progress, not a grade or certificate.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        confirmLesson = false
                        complete(course.slug, lesson.id)
                    },
                    enabled = !state.busy,
                ) { Text("Confirm completion") }
            },
            dismissButton = { TextButton(onClick = { confirmLesson = false }) { Text("Not yet") } },
        )
    }

    if (confirmSubmission && assignment != null && state.session.user?.roleKey == "student") {
        AlertDialog(
            onDismissRequest = { confirmSubmission = false },
            title = { Text("Submit written answer?") },
            text = { Text("Send this written answer to your instructor for grading? Submitting again before grading creates a new attempt.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        confirmSubmission = false
                        submitAssignment(assignment.id, draftAnswer)
                    },
                    enabled = !state.busy && draftAnswer.trim().isNotEmpty(),
                ) { Text("Confirm submission") }
            },
            dismissButton = { TextButton(onClick = { confirmSubmission = false }) { Text("Keep editing") } },
        )
    }

    key(section, courseSlug, lessonId, assignmentId) {
        LazyColumn(
            Modifier.fillMaxSize().testTag("student-workspace"),
            contentPadding = PaddingValues(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            item { OutlinedButton(onClick = goBack) { Text(if (atRoot) "Back to account" else "Back") } }
            if (state.busy) {
                item {
                    LinearProgressIndicator(Modifier.fillMaxWidth())
                    Text("Checking your learning records…")
                }
            }
            state.message?.let { message ->
                item { Text(message, modifier = Modifier.semantics { liveRegion = LiveRegionMode.Polite }) }
            }
            if (state.session.user?.roleKey != "student") {
                item { Text("A verified student session is required. Return to Account to verify your session.") }
            } else {
                if (atRoot) {
                    item {
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            if (section == "courses") {
                                Button(onClick = {}) { Text("Courses") }
                            } else {
                                OutlinedButton(
                                    onClick = {
                                        section = "courses"
                                        if (state.dashboard == null && !state.busy) reload()
                                    },
                                ) { Text("Courses") }
                            }
                            if (section == "assignments") {
                                Button(onClick = {}) { Text("Assignments") }
                            } else {
                                OutlinedButton(
                                    onClick = {
                                        section = "assignments"
                                        if (!state.assignments.loaded && !state.busy) loadAssignments()
                                    },
                                ) { Text("Assignments") }
                            }
                        }
                    }
                }

                if (section == "assignments") {
                    if (assignmentId == null) {
                        item { Text("My assignments", style = MaterialTheme.typography.headlineMedium) }
                        item { Text("Assignments, deadlines, written submissions and instructor feedback come from the Academy server.") }
                        if (!state.assignments.loaded) {
                            item { Text("No private assignment records are cached offline. Connect to load your assignments.") }
                            item { Button(onClick = loadAssignments, enabled = !state.busy) { Text("Load my assignments") } }
                        } else {
                            item { OutlinedButton(onClick = loadAssignments, enabled = !state.busy) { Text("Refresh assignments") } }
                            if (state.assignments.items.isEmpty()) {
                                item { Text("No assignments have been published to your account yet.") }
                            }
                            items(state.assignments.items, key = { "asg-${it.id}" }) { item ->
                                OutlinedCard(
                                    onClick = {
                                        assignmentId = item.id
                                        openAssignment(item.id)
                                    },
                                    enabled = !state.busy,
                                    modifier = Modifier.fillMaxWidth(),
                                ) {
                                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                        Text(item.title, style = MaterialTheme.typography.titleLarge)
                                        if (item.course.isNotBlank()) Text(item.course)
                                        val meta = buildList {
                                            if (item.due.isNotBlank()) add("Due: ${item.due}")
                                            add("Status: ${item.status}")
                                            if (item.score != null) add("Score: ${item.score} / ${item.max}")
                                        }.joinToString(" • ")
                                        Text(meta)
                                        Text("Open assignment")
                                    }
                                }
                            }
                            if (state.assignments.nextCursor != null) {
                                item {
                                    OutlinedButton(onClick = loadMoreAssignments, enabled = !state.busy) {
                                        Text("Load more assignments")
                                    }
                                }
                            }
                        }
                    } else if (assignment == null) {
                        item { Text("This assignment is unavailable. Return to your assignment list and refresh.") }
                    } else {
                        val hasLoadedSubmission = assignment.id in state.assignments.submissions
                        val hasSubmissionError = assignment.id in state.assignments.submissionErrors
                        val submission = state.assignments.submissions[assignment.id]
                        item { Text(assignment.title, style = MaterialTheme.typography.headlineMedium) }
                        item {
                            Text(
                                buildList {
                                    if (assignment.course.isNotBlank()) add(assignment.course)
                                    if (assignment.due.isNotBlank()) add("Due: ${assignment.due}")
                                    add("Maximum score: ${assignment.max}")
                                }.joinToString(" • "),
                            )
                        }
                        if (assignment.description.isNotBlank()) {
                            item { SelectionContainer { Text(assignment.description) } }
                        }
                        if (assignment.rubric.isNotEmpty()) {
                            item { Text("Rubric", style = MaterialTheme.typography.titleMedium) }
                            items(assignment.rubric) { r ->
                                Text(
                                    buildString {
                                        append("• ")
                                        append(r.criterion)
                                        if (r.weight > 0) append(" (${r.weight})")
                                        if (r.detail.isNotBlank()) append(" — ${r.detail}")
                                    },
                                )
                            }
                        }
                        item { HorizontalDivider() }
                        item { Text("Latest submission and instructor feedback", style = MaterialTheme.typography.titleLarge) }
                        item {
                            OutlinedButton(
                                onClick = { openAssignment(assignment.id) },
                                enabled = !state.busy,
                            ) { Text("Refresh submission & feedback") }
                        }
                        when {
                            hasSubmissionError -> item {
                                Text("Could not verify your latest submission status. Refresh before submitting.")
                            }
                            !hasLoadedSubmission -> item {
                                Text("Checking your latest submission status…")
                            }
                            submission == null -> item {
                                Text("No submission has been recorded yet.")
                            }
                            else -> {
                                item {
                                    Text(
                                        "Status: ${submission.status} • Submitted: ${submission.submittedAt}" +
                                            if (submission.late) " • Late" else "",
                                    )
                                }
                                if (submission.score != null) {
                                    item { Text("Score: ${submission.score} / ${assignment.max}") }
                                }
                                if (submission.body.isNotBlank()) {
                                    item { Text("Your submitted answer", style = MaterialTheme.typography.titleMedium) }
                                    item { SelectionContainer { Text(submission.body) } }
                                }
                                if (submission.file.isNotBlank()) {
                                    item {
                                        Text(
                                            "Submitted reference: ${submission.file}" +
                                                if (submission.size.isNotBlank()) " (${submission.size})" else "",
                                        )
                                    }
                                }
                                item { Text("Instructor feedback", style = MaterialTheme.typography.titleMedium) }
                                item {
                                    SelectionContainer {
                                        Text(submission.feedback.ifBlank { "No instructor feedback has been returned yet." })
                                    }
                                }
                            }
                        }
                        item { HorizontalDivider() }
                        if (assignment.isGraded(submission)) {
                            item { Text("This assignment has been graded and no longer accepts new submissions.") }
                        } else if (assignment.submittable(submission)) {
                            item { Text("Submit written work", style = MaterialTheme.typography.titleLarge) }
                            item {
                                OutlinedTextField(
                                    value = draftAnswer,
                                    onValueChange = { draftAnswer = it.take(20_000) },
                                    label = { Text("Written answer or repository link") },
                                    enabled = !state.busy,
                                    minLines = 5,
                                    modifier = Modifier.fillMaxWidth().testTag("assignment-answer-input"),
                                )
                            }
                            item {
                                Text(
                                    "Drafts stay in memory on this screen only and are not saved if you leave or close the app. File uploads are not supported in native preview yet. Submitting again before grading sends a new attempt for instructor review.",
                                )
                            }
                            item {
                                val canSubmit =
                                    !state.busy &&
                                        hasLoadedSubmission &&
                                        !hasSubmissionError &&
                                        draftAnswer.trim().isNotEmpty()
                                Button(
                                    onClick = { confirmSubmission = true },
                                    enabled = canSubmit,
                                ) { Text("Submit written answer") }
                            }
                        }
                    }
                } else if (state.dashboard == null) {
                    item { Text("No private learning records are cached offline. Connect to load your courses.") }
                    item { Button(onClick = reload, enabled = !state.busy) { Text("Load my courses") } }
                } else if (courseSlug == null) {
                    item { Text("My enrolled courses", style = MaterialTheme.typography.headlineMedium) }
                    item { Text("Enrolment and progress come from the Academy server. Public notes and saved courses do not grant enrolment.") }
                    item { OutlinedButton(onClick = reload, enabled = !state.busy) { Text("Refresh my learning") } }
                    if (state.dashboard.courses.isEmpty()) {
                        item { Text("You have no enrolled courses yet. Contact admissions about your placement and payment status.") }
                    }
                    items(state.dashboard.courses, key = { "course-${it.slug}" }) { item ->
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
                                Column(Modifier.padding(16.dp)) {
                                    Text(item.title)
                                    Text("${item.type} • ${item.duration} • ${item.status}")
                                }
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
                    if (lesson.completable()) item { Button(onClick = { confirmLesson = true }, enabled = !state.busy) { Text("Mark lesson complete") } }
                    if (lesson.status == "done") item { Text("Completion recorded by the Academy.") }
                }
            }
        }
    }
}
