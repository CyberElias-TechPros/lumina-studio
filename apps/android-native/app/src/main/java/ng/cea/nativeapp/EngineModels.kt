package ng.cea.nativeapp

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.contentOrNull

private val engineJson = Json { ignoreUnknownKeys = true }

private const val MAX_PAGE = 100

private fun checkId(id: String) = require(id.matches(StudentAssignmentItem.ID_PATTERN)) { "Invalid id" }
private fun checkCursor(cursor: String?) {
    if (cursor != null) require(cursor.matches(StudentAssignmentItem.CURSOR_PATTERN)) { "Invalid cursor" }
}

/* ---------------- Learning engine: course list, gradebook, calendar ---------------- */

/** GET /v1/courses page. Reuses the StudentCourse shape (same API JSON as /dashboard/student). */
data class CoursePage(val items: List<StudentCourse>, val nextCursor: String?) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<StudentCourse>, val nextCursor: String? = null)

        fun decode(raw: String): CoursePage {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach { course ->
                require(course.slug.matches(Regex("[a-zA-Z0-9_-]{1,120}")) && course.title.isNotBlank() && course.pct in 0..100)
                val lessons = course.modules.flatMap { it.lessons }
                require(lessons.size <= 1000 && lessons.map { it.id }.distinct().size == lessons.size)
                lessons.forEach { checkId(it.id) }
            }
            return CoursePage(page.items, page.nextCursor)
        }
    }
}

@Serializable
data class GradebookEntry(
    val name: String,
    val units: Int = 0,
    val letter: String = "",
    val pct: Double = 0.0,
    val trend: String = "",
    val items: List<JsonElement> = emptyList(),
) {
    fun trendSymbol(): String = when (trend) {
        "up" -> "▲"
        "down" -> "▼"
        else -> "–"
    }

    companion object {
        @Serializable
        private data class RawPage(val items: List<GradebookEntry>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<GradebookEntry>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach { entry ->
                require(entry.name.isNotBlank() && entry.name.length <= 200)
                require(entry.pct in 0.0..100.0 && entry.units in 0..100 && entry.items.size <= 50)
            }
            return page.items to page.nextCursor
        }
    }
}

@Serializable
data class CalendarEventItem(
    val id: String,
    val date: String = "",
    val day: String = "",
    val title: String,
    val kind: String = "",
    val time: String = "",
    val location: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<CalendarEventItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<CalendarEventItem>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.title.isNotBlank() && it.title.length <= 300)
            }
            return page.items to page.nextCursor
        }
    }
}

/* ---------------- Certificates & attendance ---------------- */

@Serializable
data class CertificateItem(
    val id: String,
    val courseSlug: String = "",
    val title: String,
    val code: String,
    val issuedAt: String = "",
) {
    companion object {
        @Serializable
        private data class RawList(val items: List<CertificateItem>, val total: Int = 0)

        fun decodeList(raw: String): List<CertificateItem> {
            val list = engineJson.decodeFromString<RawList>(raw)
            require(list.items.size <= MAX_PAGE)
            list.items.forEach {
                checkId(it.id)
                require(it.title.isNotBlank() && it.code.length in 8..64)
            }
            return list.items
        }
    }
}

data class CertificateVerification(
    val valid: Boolean,
    val message: String = "",
    val code: String? = null,
    val title: String? = null,
    val issuedAt: String? = null,
) {
    companion object {
        fun decode(raw: String): CertificateVerification {
            val obj = engineJson.parseToJsonElement(raw).jsonObject
            val valid = obj["valid"]?.jsonPrimitive?.booleanOrNull == true
            val cert = obj["certificate"] as? JsonObject
            val code = cert?.get("code")?.jsonPrimitive?.contentOrNull
            require(!valid || (code != null && code.length in 8..64 && cert!!["title"]?.jsonPrimitive?.contentOrNull?.isNotBlank() == true))
            return CertificateVerification(
                valid = valid,
                message = obj["message"]?.jsonPrimitive?.contentOrNull ?: "",
                code = code,
                title = cert?.get("title")?.jsonPrimitive?.contentOrNull,
                issuedAt = cert?.get("issuedAt")?.jsonPrimitive?.contentOrNull,
            )
        }
    }
}

data class AttendanceCheckInResult(
    val ok: Boolean,
    val alreadyCheckedIn: Boolean,
    val course: String = "",
    val closesAt: String = "",
    val date: String = "",
    val status: String = "",
) {
    companion object {
        fun decode(raw: String): AttendanceCheckInResult {
            val obj = engineJson.parseToJsonElement(raw).jsonObject
            require(obj["ok"]?.jsonPrimitive?.booleanOrNull == true)
            val attendance = obj["attendance"] as? JsonObject
            return AttendanceCheckInResult(
                ok = true,
                alreadyCheckedIn = obj["alreadyCheckedIn"]?.jsonPrimitive?.booleanOrNull == true,
                course = obj["course"]?.jsonPrimitive?.contentOrNull ?: "",
                closesAt = obj["closesAt"]?.jsonPrimitive?.contentOrNull ?: "",
                date = attendance?.get("date")?.jsonPrimitive?.contentOrNull ?: "",
                status = attendance?.get("status")?.jsonPrimitive?.contentOrNull ?: "",
            )
        }
    }
}

/* ---------------- Live classes ---------------- */

@Serializable
data class LiveClassItem(
    val id: String,
    val title: String,
    val instructor: String = "",
    val cohort: String = "",
    val status: String = "",
    val startsAt: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<LiveClassItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<LiveClassItem>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.title.isNotBlank() && it.title.length <= 300)
            }
            return page.items to page.nextCursor
        }

        fun decodeOne(raw: String): LiveClassItem {
            val item = engineJson.decodeFromString<LiveClassItem>(raw)
            checkId(item.id)
            require(item.title.isNotBlank())
            return item
        }
    }
}

@Serializable
data class LiveChatMessage(
    val id: String,
    val roomId: String = "",
    val channel: String = "",
    val userId: String? = null,
    val userName: String = "",
    val body: String,
    val createdAt: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<LiveChatMessage>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<LiveChatMessage>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.body.isNotBlank() && it.body.length <= 5_000)
            }
            return page.items to page.nextCursor
        }

        fun decodeOne(raw: String): LiveChatMessage {
            val item = engineJson.decodeFromString<LiveChatMessage>(raw)
            checkId(item.id)
            require(item.body.isNotBlank() && item.body.length <= 5_000)
            return item
        }
    }
}

/* ---------------- Community: cohorts & library ---------------- */

@Serializable
data class CohortItem(
    val id: String,
    val programSlug: String = "",
    val label: String = "",
    val kind: String = "",
    val startDate: String = "",
    val endDate: String = "",
    val days: String = "",
    val timeSlot: String = "",
    val mode: String = "",
    val capacity: Int = 0,
    val notes: String = "",
    val status: String = "",
    val enrollmentOpen: Boolean = false,
    val startTime: String? = null,
    val sessionMinutes: Int? = null,
) {
    companion object {
        @Serializable
        private data class RawList(val items: List<CohortItem>)

        fun decodeList(raw: String): List<CohortItem> {
            val list = engineJson.decodeFromString<RawList>(raw)
            require(list.items.size <= 50)
            list.items.forEach {
                require(it.id.isNotBlank() && it.label.isNotBlank())
                require(it.capacity in 0..10_000)
            }
            return list.items
        }
    }
}

data class CohortNext(val cohort: CohortItem?, val ics: String?) {
    companion object {
        fun decode(raw: String): CohortNext {
            val obj = engineJson.parseToJsonElement(raw).jsonObject
            val c = obj["cohort"] as? JsonObject
            val cohort = c?.let {
                CohortItem(
                    id = it.getValue("id").jsonPrimitive.content,
                    programSlug = it["programSlug"]?.jsonPrimitive?.contentOrNull ?: "",
                    label = it["label"]?.jsonPrimitive?.contentOrNull ?: "",
                    kind = it["kind"]?.jsonPrimitive?.contentOrNull ?: "",
                    startDate = it["startDate"]?.jsonPrimitive?.contentOrNull ?: "",
                    endDate = it["endDate"]?.jsonPrimitive?.contentOrNull ?: "",
                    days = it["days"]?.jsonPrimitive?.contentOrNull ?: "",
                    timeSlot = it["timeSlot"]?.jsonPrimitive?.contentOrNull ?: "",
                    mode = it["mode"]?.jsonPrimitive?.contentOrNull ?: "",
                    capacity = it["capacity"]?.jsonPrimitive?.intOrNull ?: 0,
                    notes = it["notes"]?.jsonPrimitive?.contentOrNull ?: "",
                    status = it["status"]?.jsonPrimitive?.contentOrNull ?: "",
                    enrollmentOpen = it["enrollmentOpen"]?.jsonPrimitive?.booleanOrNull == true,
                    startTime = it["startTime"]?.let { e -> if (e is JsonNull) null else e.jsonPrimitive.contentOrNull },
                    sessionMinutes = it["sessionMinutes"]?.let { e -> if (e is JsonNull) null else e.jsonPrimitive.intOrNull },
                )
            }
            if (cohort != null) {
                require(cohort.id.isNotBlank() && cohort.label.isNotBlank() && cohort.capacity in 0..10_000)
            }
            return CohortNext(
                cohort = cohort,
                ics = obj["ics"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
            )
        }
    }
}

@Serializable
data class LibrarySource(val key: String, val name: String = "", val itemCount: Int = 0)

@Serializable
data class LibraryItem(
    val id: String,
    val sourceKey: String = "",
    val folderPath: String = "",
    val name: String,
    val kind: String = "file",
    val driveFileId: String = "",
    val url: String = "",
    val isProtected: Boolean = false,
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<LibraryItem>, val nextCursor: String? = null)

        @Serializable
        private data class RawCatalog(val sources: List<LibrarySource>, val items: List<LibraryItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<LibraryItem>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.name.isNotBlank() && it.kind in setOf("file", "folder", "link"))
                if (it.url.isNotBlank()) require(it.url.startsWith("https://"))
            }
            return page.items to page.nextCursor
        }

        fun decodeCatalog(raw: String): Triple<List<LibrarySource>, List<LibraryItem>, String?> {
            val catalog = engineJson.decodeFromString<RawCatalog>(raw)
            require(catalog.sources.size <= 50 && catalog.items.size <= MAX_PAGE)
            checkCursor(catalog.nextCursor)
            catalog.sources.forEach { require(it.key.isNotBlank() && it.itemCount in 0..100_000) }
            catalog.items.forEach {
                checkId(it.id)
                require(it.name.isNotBlank() && it.kind in setOf("file", "folder", "link"))
                require(it.isProtected == false) { "Public catalog must not contain protected items" }
            }
            return Triple(catalog.sources, catalog.items, catalog.nextCursor)
        }

        fun decodeOne(raw: String): LibraryItem {
            val item = engineJson.decodeFromString<LibraryItem>(raw)
            checkId(item.id)
            require(item.name.isNotBlank() && item.kind in setOf("file", "folder", "link"))
            return item
        }
    }
}

/* ---------------- Career engine: mentors, jobs, talent, interviews ---------------- */

@Serializable
data class MentorProfile(
    val id: String,
    val name: String,
    val focus: String = "",
    val bio: String = "",
    val skills: List<String> = emptyList(),
    val areas: List<String> = emptyList(),
    val availability: String = "",
    val rating: Double = 0.0,
    val sessionsCount: Int = 0,
    val match: Int? = null,
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<MentorProfile>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<MentorProfile>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.name.isNotBlank() && it.rating in 0.0..5.0 && it.sessionsCount in 0..100_000)
            }
            return page.items to page.nextCursor
        }
    }
}

data class MentorRequestResult(val ok: Boolean, val alreadyRequested: Boolean, val mentor: String = "") {
    companion object {
        fun decode(raw: String): MentorRequestResult {
            val obj = engineJson.parseToJsonElement(raw).jsonObject
            require(obj["ok"]?.jsonPrimitive?.booleanOrNull == true)
            return MentorRequestResult(
                ok = true,
                alreadyRequested = obj["alreadyRequested"]?.jsonPrimitive?.booleanOrNull == true,
                mentor = obj["mentor"]?.jsonPrimitive?.contentOrNull ?: "",
            )
        }
    }
}

@Serializable
data class MentorMatch(
    val program: String = "",
    val goal: String = "",
    val matches: List<MentorProfile> = emptyList(),
) {
    companion object {
        fun decode(raw: String): MentorMatch {
            val match = engineJson.decodeFromString<MentorMatch>(raw)
            require(match.matches.size <= 3)
            match.matches.forEach {
                checkId(it.id)
                require(it.name.isNotBlank() && (it.match == null || it.match in 0..100))
            }
            return match
        }
    }
}

@Serializable
data class JobPosting(
    val id: String,
    val title: String,
    val applicants: Int = 0,
    val views: Int = 0,
    val posted: String = "",
    val status: String = "",
    val detail: String = "",
    val tone: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<JobPosting>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<JobPosting>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.title.isNotBlank() && it.applicants in 0..1_000_000 && it.views in 0..10_000_000)
            }
            return page.items to page.nextCursor
        }
    }
}

@Serializable
data class TalentCandidate(
    val id: String,
    val name: String = "",
    val program: String = "",
    val score: Double = 0.0,
    val stage: String = "",
    val match: Int = 0,
    val skills: List<String> = emptyList(),
    val available: Int = 0,
) {
    fun isAvailable() = available != 0

    companion object {
        @Serializable
        private data class RawPage(val items: List<TalentCandidate>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<TalentCandidate>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.score in 0.0..100.0 && it.match in 0..100 && it.skills.size <= 30)
            }
            return page.items to page.nextCursor
        }
    }
}

@Serializable
data class InterviewItem(
    val id: String,
    val candidate: String = "",
    val role: String = "",
    val date: String = "",
    val mode: String = "",
    val status: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<InterviewItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<InterviewItem>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach { checkId(it.id) }
            return page.items to page.nextCursor
        }
    }
}

/* ---------------- Payments history ---------------- */

@Serializable
data class PaymentHistoryItem(
    val id: String,
    val reference: String,
    val email: String = "",
    val amount: Double = 0.0,
    val currency: String = "NGN",
    val status: String = "",
    val provider: String = "",
    val description: String = "",
    val paidAt: String? = null,
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<PaymentHistoryItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<PaymentHistoryItem>, String?> {
            val page = engineJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= MAX_PAGE)
            checkCursor(page.nextCursor)
            page.items.forEach {
                checkId(it.id)
                require(it.reference.isNotBlank() && it.amount in 0.0..1_000_000_000.0)
            }
            return page.items to page.nextCursor
        }
    }
}

/* ---------------- AI tutor & portal home ---------------- */

data class AiAnswer(val answer: String, val mock: Boolean, val model: String = "") {
    companion object {
        fun decode(raw: String): AiAnswer {
            val obj = engineJson.parseToJsonElement(raw).jsonObject
            val answer = obj.getValue("answer").jsonPrimitive.content
            require(answer.isNotBlank() && answer.length <= 20_000)
            return AiAnswer(
                answer = answer,
                mock = obj["mock"]?.jsonPrimitive?.booleanOrNull == true,
                model = obj["model"]?.jsonPrimitive?.contentOrNull ?: "",
            )
        }
    }
}

@Serializable
data class AiRecommendation(
    val id: String,
    val kind: String = "course",
    val title: String,
    val reason: String = "",
    val cta: String = "View",
) {
    companion object {
        @Serializable
        private data class RawList(val items: List<AiRecommendation>, val total: Int = 0, val mock: Boolean = false)

        fun decodeList(raw: String): List<AiRecommendation> {
            val list = engineJson.decodeFromString<RawList>(raw)
            require(list.items.size <= 4)
            list.items.forEach {
                require(it.id.isNotBlank() && it.title.isNotBlank() && it.kind in setOf("course", "assignment", "career"))
            }
            return list.items
        }
    }
}

@Serializable
data class PortalMetric(
    val key: String,
    val label: String,
    val value: Double,
    val format: String = "number",
    val hint: String? = null,
) {
    fun formatted(): String = when (format) {
        "naira" -> "NGN " + String.format(java.util.Locale.US, "%,.0f", value)
        "percent" -> "${value.toInt()}%"
        else -> String.format(java.util.Locale.US, "%,.0f", value)
    }
}

data class PortalSummary(
    val portal: String,
    val group: String,
    val restricted: Boolean,
    val generatedAt: String = "",
    val metrics: List<PortalMetric>,
    val activity: List<NotificationItem>,
) {
    companion object {
        @Serializable
        private data class RawMetric(val key: String, val label: String, val value: Double, val format: String = "number", val hint: String? = null)

        @Serializable
        private data class RawActivity(val id: String, val title: String, val body: String = "", val time: String = "", val engine: String = "", val read: Boolean = false)

        @Serializable
        private data class RawSummary(
            val portal: String = "",
            val group: String = "",
            val restricted: Boolean = false,
            val generatedAt: String = "",
            val metrics: List<RawMetric> = emptyList(),
            val activity: List<RawActivity> = emptyList(),
        )

        fun decode(raw: String): PortalSummary {
            val s = engineJson.decodeFromString<RawSummary>(raw)
            require(s.metrics.size <= 24 && s.activity.size <= 20)
            s.metrics.forEach {
                require(it.key.isNotBlank() && it.label.isNotBlank() && it.format in setOf("number", "naira", "percent"))
                require(it.value in -1e12..1e12)
            }
            s.activity.forEach { checkId(it.id); require(it.title.isNotBlank()) }
            return PortalSummary(
                portal = s.portal,
                group = s.group,
                restricted = s.restricted,
                generatedAt = s.generatedAt,
                metrics = s.metrics.map { PortalMetric(it.key, it.label, it.value, it.format, it.hint) },
                activity = s.activity.map { NotificationItem(it.id, it.title, it.body, it.time, it.engine, it.read) },
            )
        }
    }
}

/* ---------------- Digital shop (public catalog; checkout stays on the official store) ---------------- */

@Serializable
data class ShopProduct(
    val id: String,
    val slug: String,
    val title: String,
    val price: Double = 0.0,
    val priceCurrency: String = "NGN",
    val availability: String = "",
    val description: String = "",
    val shortDescription: String = "",
    val image: String = "",
    val imageAlt: String = "",
    val deliveryHours: Int = 0,
    val fileFormat: String = "",
    val highlights: List<String> = emptyList(),
    val requirements: List<String> = emptyList(),
    val license: String = "",
) {
    fun purchasable() = availability == "in_stock"

    companion object {
        @Serializable
        private data class RawCatalog(
            val currency: String = "NGN",
            val country: String = "NG",
            val storeUrl: String = "",
            val products: List<ShopProduct> = emptyList(),
        )

        fun decodeCatalog(raw: String): ShopCatalog {
            val catalog = engineJson.decodeFromString<RawCatalog>(raw)
            require(catalog.products.size <= 100)
            catalog.products.forEach {
                checkId(it.id)
                require(it.slug.matches(Regex("[a-zA-Z0-9_-]{1,80}")) && it.title.isNotBlank())
                require(it.price in 0.0..100_000_000.0 && it.availability in setOf("in_stock", "out_of_stock", "preorder"))
                if (catalog.storeUrl.isNotBlank()) require(catalog.storeUrl.startsWith("https://"))
            }
            return ShopCatalog(catalog.currency, catalog.country, catalog.storeUrl, catalog.products)
        }
    }
}

data class ShopCatalog(
    val currency: String,
    val country: String,
    val storeUrl: String,
    val products: List<ShopProduct>,
)

/* ---------------- Assistant (authed AI tutor) conversation ---------------- */

data class AssistantTurn(val role: String, val content: String) {
    fun isUser() = role == "user"
}
