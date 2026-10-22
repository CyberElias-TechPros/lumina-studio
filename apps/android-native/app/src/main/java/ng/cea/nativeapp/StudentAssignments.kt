package ng.cea.nativeapp

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonPrimitive

@Serializable
data class RubricCriterion(
    val criterion: String,
    val detail: String = "",
    val weight: Int = 0,
)

@Serializable
private data class RawAssignment(
    val id: String,
    val title: String,
    val course: String = "",
    val description: String = "",
    val due: String = "",
    val dueAt: String? = null,
    val status: String,
    val score: Int? = null,
    val max: Int = 100,
    val weight: Int = 0,
    val rubric: JsonElement = JsonNull,
) {
    fun toValidated(): StudentAssignmentItem {
        require(id.matches(StudentAssignmentItem.ID_PATTERN) && title.isNotBlank())
        require(status in StudentAssignmentItem.ALLOWED_STATUSES)
        require(max in 1..10_000 && weight in 0..100)
        require(score == null || score in 0..max)
        val parsedRubric = (rubric as? JsonArray)?.mapNotNull { entry ->
            val obj = entry as? JsonObject ?: return@mapNotNull null
            val name = obj["criterion"]?.jsonPrimitive?.contentOrNull?.trim().orEmpty()
            if (name.isEmpty()) null
            else RubricCriterion(
                criterion = name,
                detail = obj["detail"]?.jsonPrimitive?.contentOrNull ?: "",
                weight = (obj["weight"]?.jsonPrimitive?.intOrNull ?: 0).coerceIn(0, 1000),
            )
        } ?: emptyList()
        require(parsedRubric.size <= 50)
        return StudentAssignmentItem(
            id = id,
            title = title,
            course = course,
            description = description,
            due = due,
            dueAt = dueAt,
            status = status,
            score = score,
            max = max,
            weight = weight,
            rubric = parsedRubric,
        )
    }
}

@Serializable
private data class RawAssignmentPage(
    val items: List<RawAssignment>,
    val nextCursor: String? = null,
    val total: Int = 0,
)

data class StudentAssignmentItem(
    val id: String,
    val title: String,
    val course: String = "",
    val description: String = "",
    val due: String = "",
    val dueAt: String? = null,
    val status: String,
    val score: Int? = null,
    val max: Int = 100,
    val weight: Int = 0,
    val rubric: List<RubricCriterion> = emptyList(),
) {
    fun isGraded(latest: NativeSubmission? = null): Boolean =
        status == "graded" || latest?.status == "graded"

    fun submittable(latest: NativeSubmission? = null): Boolean =
        !isGraded(latest) &&
            status in ALLOWED_STATUSES &&
            id.matches(ID_PATTERN)

    companion object {
        val ID_PATTERN = Regex("[a-zA-Z0-9_-]{1,120}")
        val CURSOR_PATTERN = Regex("[a-zA-Z0-9_-]{1,200}")
        val ALLOWED_STATUSES = setOf("pending", "draft", "submitted", "graded")
        private val json = Json { ignoreUnknownKeys = true }

        fun decodeOne(body: String): StudentAssignmentItem =
            json.decodeFromString<RawAssignment>(body).toValidated()
    }
}

data class AssignmentPage(
    val items: List<StudentAssignmentItem>,
    val nextCursor: String? = null,
    val total: Int = 0,
) {
    companion object {
        private val json = Json { ignoreUnknownKeys = true }

        fun decode(body: String): AssignmentPage {
            val raw = json.decodeFromString<RawAssignmentPage>(body)
            require(raw.items.size <= 100 && raw.total >= 0)
            require(raw.nextCursor == null || raw.nextCursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
            val items = raw.items.map { it.toValidated() }
            require(items.map { it.id }.distinct().size == items.size)
            return AssignmentPage(items = items, nextCursor = raw.nextCursor, total = raw.total)
        }
    }
}

@Serializable
data class NativeSubmission(
    val id: String,
    val status: String,
    val score: Int? = null,
    val feedback: String = "",
    val submittedAt: String,
    val gradedAt: String? = null,
    val late: Boolean = false,
    val file: String = "",
    val size: String = "",
    val body: String = "",
) {
    companion object {
        private val json = Json { ignoreUnknownKeys = true }

        fun decode(rawBody: String, maxScore: Int? = null): NativeSubmission {
            val sub = json.decodeFromString<NativeSubmission>(rawBody)
            require(sub.id.isNotBlank() && sub.submittedAt.isNotBlank())
            require(sub.status in setOf("pending", "submitted", "graded"))
            require(sub.score == null || (sub.score >= 0 && sub.score <= (maxScore ?: 10_000)))
            require(sub.body.length <= 20_000 && sub.feedback.length <= 10_000 && sub.file.length <= 2_000)
            return sub
        }
    }
}

@Serializable
data class SubmissionReceipt(
    val id: String,
    val assignmentId: String,
    val status: String,
    val submittedAt: String,
    val late: Boolean = false,
) {
    companion object {
        private val json = Json { ignoreUnknownKeys = true }

        fun decode(rawBody: String, expectedAssignmentId: String): SubmissionReceipt {
            val receipt = json.decodeFromString<SubmissionReceipt>(rawBody)
            require(
                receipt.id.isNotBlank() &&
                    receipt.assignmentId == expectedAssignmentId &&
                    receipt.status == "submitted" &&
                    receipt.submittedAt.isNotBlank(),
            )
            return receipt
        }
    }
}

data class StudentAssignmentsState(
    val items: List<StudentAssignmentItem> = emptyList(),
    val nextCursor: String? = null,
    val loaded: Boolean = false,
    val submissions: Map<String, NativeSubmission?> = emptyMap(),
    val submissionErrors: Set<String> = emptySet(),
    val submittedDraftTokens: Map<String, Int> = emptyMap(),
)
