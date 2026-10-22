package ng.cea.nativeapp

import android.content.Context
import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import android.util.AtomicFile
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.io.File
import java.io.FileOutputStream
import java.security.KeyStore
import javax.crypto.Cipher
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec

private val platformJson = Json { ignoreUnknownKeys = true }

@Serializable
data class AccountProfile(
    val id: String,
    val name: String,
    val email: String,
    val phone: String? = null,
    val roleKey: String,
    val emailVerified: Boolean = false,
    val mfaEnabled: Boolean = false,
    val hasPassword: Boolean = true,
    val createdAt: String = "",
) {
    companion object {
        fun decode(raw: String): AccountProfile {
            val profile = platformJson.decodeFromString<AccountProfile>(raw)
            require(profile.id.isNotBlank() && profile.email.contains('@') && profile.roleKey.isNotBlank())
            return profile
        }
    }
}

@Serializable
data class DeviceSession(
    val id: String,
    val deviceLabel: String = "Device",
    val ip: String = "",
    val createdAt: String = "",
    val expiresAt: String = "",
    val active: Boolean = false,
    val mfaPending: Boolean = false,
    val current: Boolean = false,
) {
    companion object {
        @Serializable
        private data class DeviceList(val items: List<DeviceSession>)

        fun decodeList(raw: String): List<DeviceSession> {
            val items = platformJson.decodeFromString<DeviceList>(raw).items
            require(items.size <= 100 && items.all { it.id.matches(StudentAssignmentItem.ID_PATTERN) })
            return items
        }
    }
}

@Serializable
data class MessageItem(
    val text: String,
    val time: String = "",
    val mine: Boolean = false,
)

@Serializable
data class MessageThread(
    val id: String,
    val name: String,
    val role: String = "",
    val unread: Int = 0,
    val messages: List<MessageItem> = emptyList(),
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<MessageThread>, val nextCursor: String? = null)

        fun decodeOne(raw: String): MessageThread {
            val thread = platformJson.decodeFromString<MessageThread>(raw)
            require(thread.id.matches(StudentAssignmentItem.ID_PATTERN) && thread.name.isNotBlank())
            require(thread.messages.size <= 500)
            return thread
        }

        fun decodePage(raw: String): Pair<List<MessageThread>, String?> {
            val page = platformJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= 100 && page.items.all { it.id.matches(StudentAssignmentItem.ID_PATTERN) })
            require(page.nextCursor == null || page.nextCursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
            return page.items to page.nextCursor
        }
    }
}

@Serializable
data class NotificationItem(
    val id: String,
    val title: String,
    val body: String = "",
    val time: String = "",
    val engine: String = "",
    val read: Boolean = false,
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<NotificationItem>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<NotificationItem>, String?> {
            val page = platformJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= 100 && page.items.all { it.id.matches(StudentAssignmentItem.ID_PATTERN) })
            require(page.nextCursor == null || page.nextCursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
            return page.items to page.nextCursor
        }
    }
}

@Serializable
data class InstructorSubmissionSummary(
    val id: String,
    val student: String,
    val title: String,
    val submitted: String = "",
    val status: String,
    val score: Int? = null,
    val late: Boolean = false,
    val file: String = "",
    val size: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<InstructorSubmissionSummary>, val nextCursor: String? = null)

        fun decodePage(raw: String): Pair<List<InstructorSubmissionSummary>, String?> {
            val page = platformJson.decodeFromString<RawPage>(raw)
            require(page.items.size <= 100 && page.items.all { it.id.matches(StudentAssignmentItem.ID_PATTERN) })
            require(page.nextCursor == null || page.nextCursor.matches(StudentAssignmentItem.CURSOR_PATTERN))
            return page.items to page.nextCursor
        }
    }
}

data class InstructorSubmissionDetail(
    val id: String,
    val student: String,
    val title: String,
    val submitted: String,
    val status: String,
    val score: Int?,
    val late: Boolean,
    val file: String,
    val size: String,
    val body: String,
    val feedback: String,
    val max: Int?,
    val isLatest: Boolean,
) {
    fun canGrade(): Boolean = isLatest && max != null && max in 1..10_000 && id.matches(StudentAssignmentItem.ID_PATTERN)

    companion object {
        @Serializable
        private data class RawDetail(
            val id: String,
            val student: String,
            val title: String,
            val submitted: String = "",
            val status: String,
            val score: Int? = null,
            val late: Boolean = false,
            val file: String = "",
            val size: String = "",
            val body: String = "",
            val feedback: String = "",
            val max: Int? = null,
            val rubric: JsonElement = JsonNull,
            val isLatest: Boolean = true,
        )

        fun decode(raw: String): InstructorSubmissionDetail {
            val d = platformJson.decodeFromString<RawDetail>(raw)
            require(d.id.matches(StudentAssignmentItem.ID_PATTERN) && d.title.isNotBlank() && d.student.isNotBlank())
            require(d.max == null || d.max in 1..10_000)
            require(d.score == null || (d.score >= 0 && d.score <= (d.max ?: 10_000)))
            require(d.body.length <= 20_000 && d.feedback.length <= 10_000)
            return InstructorSubmissionDetail(
                id = d.id,
                student = d.student,
                title = d.title,
                submitted = d.submitted,
                status = d.status,
                score = d.score,
                late = d.late,
                file = d.file,
                size = d.size,
                body = d.body,
                feedback = d.feedback,
                max = d.max,
                isLatest = d.isLatest,
            )
        }
    }
}

@Serializable
data class InstructorCourseSummary(
    val id: String,
    val title: String,
    val cohort: String = "",
    val status: String = "",
) {
    companion object {
        @Serializable
        private data class RawPage(val items: List<InstructorCourseSummary>)

        fun decodeList(raw: String): List<InstructorCourseSummary> {
            val items = platformJson.decodeFromString<RawPage>(raw).items
            require(items.size <= 100 && items.all { it.id.isNotBlank() && it.title.isNotBlank() })
            return items
        }
    }
}

data class AssessmentQuestionPrompt(val prompt: String, val options: List<String>)

@Serializable
data class StudentAssessmentItem(
    val id: String,
    val title: String,
    val course: String = "",
    val kind: String = "",
    val questions: Int = 5,
    val duration: String = "",
    val due: String = "",
    val status: String = "",
    val score: Int? = null,
    val max: Int? = null,
    val attempts: Int = 1,
    val attemptsLeft: Int = 0,
    val window: String = "",
) {
    fun canSubmit(): Boolean =
        id.matches(StudentAssignmentItem.ID_PATTERN) &&
            status == "available" &&
            attemptsLeft > 0 &&
            questions in 1..5

    companion object {
        val SECURITY_PROMPTS = listOf(
            AssessmentQuestionPrompt(
                "Which statement best describes a JWT access token?",
                listOf(
                    "A server-side session store keyed by a random ID",
                    "A signed, self-contained set of claims the server can verify",
                    "An encrypted blob only the client can read",
                    "A database row containing the user's password hash",
                ),
            ),
            AssessmentQuestionPrompt(
                "Why is the refresh token rotated after every use?",
                listOf(
                    "To reduce the replay window if a refresh token leaks",
                    "Because access tokens expire every 5 minutes",
                    "To avoid storing any state on the server",
                    "To satisfy GDPR token retention rules",
                ),
            ),
            AssessmentQuestionPrompt(
                "Which cookie attribute prevents JavaScript from reading the session cookie?",
                listOf("Secure", "SameSite=Strict", "HttpOnly", "Domain"),
            ),
            AssessmentQuestionPrompt(
                "What is the primary defence against credential stuffing on the login endpoint?",
                listOf("Rate limiting", "Longer passwords", "Faster hashing", "Bigger token expiry"),
            ),
            AssessmentQuestionPrompt(
                "Which hashing algorithm is appropriate for storing passwords?",
                listOf("MD5", "SHA-256", "bcrypt with salt rounds", "Base64"),
            ),
        )

        fun decodePage(raw: String): Pair<List<StudentAssessmentItem>, String?> {
            val root = platformJson.parseToJsonElement(raw).jsonObject
            val items = root.getValue("items").jsonArray.map { decodeOne(it.toString()) }
            require(items.size <= 100 && items.map { it.id }.distinct().size == items.size)
            val next = root["nextCursor"]?.jsonPrimitive?.contentOrNull?.takeIf { it.isNotBlank() }
            if (next != null) require(next.matches(StudentAssignmentItem.CURSOR_PATTERN))
            return items to next
        }

        fun decodeOne(raw: String): StudentAssessmentItem {
            val item = platformJson.decodeFromString<StudentAssessmentItem>(raw)
            require(
                item.id.matches(StudentAssignmentItem.ID_PATTERN) &&
                    item.title.isNotBlank() &&
                    item.questions in 1..50 &&
                    item.attemptsLeft >= 0 &&
                    (item.score == null || item.max == null || item.score in 0..item.max),
            )
            return item
        }
    }
}

data class StudentAssessmentsState(
    val items: List<StudentAssessmentItem> = emptyList(),
    val nextCursor: String? = null,
    val loaded: Boolean = false,
)

@Serializable
data class ApplicationDraft(
    val programSlug: String = "",
    val firstName: String = "",
    val lastName: String = "",
    val email: String = "",
    val phone: String = "",
    val city: String = "",
    val mode: String = "onsite",
    val paymentPlan: String = "full",
    val hasLaptop: Boolean = true,
    val goal: String = "",
) {
    fun validPaymentPlans(): List<Pair<String, String>> =
        if (programSlug.trim() in LONG_PROGRAM_SLUGS) {
            listOf("full-10-off" to "Full tuition (10% off)", "deposit-monthly" to "30% deposit + monthly")
        } else {
            listOf("full" to "Full tuition", "50-50" to "50% deposit + balance")
        }

    fun normalizedPaymentPlan(): String {
        val options = validPaymentPlans().map { it.first }
        return if (paymentPlan in options) paymentPlan else options.first()
    }

    companion object {
        val LONG_PROGRAM_SLUGS = setOf(
            "it-professional-diploma",
            "web-development-professional",
            "data-analytics-ai",
            "cybersecurity-foundations",
            "digital-business-bootcamp",
        )
    }
}

interface DraftStore {
    fun read(): ApplicationDraft?
    fun write(draft: ApplicationDraft)
    fun clear()
}

class MemoryDraftStore : DraftStore {
    private var draft: ApplicationDraft? = null
    override fun read(): ApplicationDraft? = draft
    override fun write(draft: ApplicationDraft) {
        this.draft = draft
    }
    override fun clear() {
        draft = null
    }
}

/** Encrypts local unsubmitted application PII with Android Keystore AES-GCM in noBackupFilesDir. */
class KeystoreDraftStore(context: Context, namespace: String = "application-draft-v1") : DraftStore {
    init {
        require(namespace.matches(Regex("[a-z0-9-]+")))
    }

    private val alias = "ng.cea.nativeapp.$namespace"
    private val file = AtomicFile(File(context.noBackupFilesDir, "$namespace.enc"))
    private val aad = "CEA native draft v1".toByteArray(Charsets.UTF_8)

    private fun keystore() = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }

    private fun key(create: Boolean): SecretKey {
        (keystore().getKey(alias, null) as? SecretKey)?.let { return it }
        check(create) { "Draft key unavailable" }
        return KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore").apply {
            init(
                KeyGenParameterSpec.Builder(
                    alias,
                    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT,
                )
                    .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                    .setRandomizedEncryptionRequired(true)
                    .build(),
            )
        }.generateKey()
    }

    override fun read(): ApplicationDraft? {
        if (!file.baseFile.exists() && !File(file.baseFile.path + ".bak").exists()) return null
        return try {
            val bytes = file.openRead().use { input ->
                require(input.channel.size() in 16..32_768)
                input.readBytes()
            }
            require(bytes[0].toInt() == 1)
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.DECRYPT_MODE, key(false), GCMParameterSpec(128, bytes.copyOfRange(1, 13)))
            cipher.updateAAD(aad)
            val plain = cipher.doFinal(bytes.copyOfRange(13, bytes.size))
            try {
                platformJson.decodeFromString<ApplicationDraft>(plain.toString(Charsets.UTF_8))
            } finally {
                plain.fill(0)
            }
        } catch (_: Exception) {
            clear()
            null
        }
    }

    override fun write(draft: ApplicationDraft) {
        val plain = platformJson.encodeToString(draft).toByteArray(Charsets.UTF_8)
        require(plain.size <= 16_384)
        try {
            val cipher = Cipher.getInstance("AES/GCM/NoPadding")
            cipher.init(Cipher.ENCRYPT_MODE, key(true))
            cipher.updateAAD(aad)
            require(cipher.iv.size == 12)
            val bytes = byteArrayOf(1) + cipher.iv + cipher.doFinal(plain)
            var output: FileOutputStream? = null
            try {
                output = file.startWrite()
                output.write(bytes)
                file.finishWrite(output)
            } catch (error: Exception) {
                output?.let { file.failWrite(it) }
                throw error
            }
        } finally {
            plain.fill(0)
        }
    }

    override fun clear() {
        keystore().deleteEntry(alias)
        file.delete()
    }
}

@Serializable
data class MyEnrollmentSummary(
    val ref: String,
    val programTitle: String = "",
    val offerStatus: String = "",
    val paidAmount: Double = 0.0,
    val activatedAt: String? = null,
) {
    companion object {
        val REF_PATTERN = Regex("CEA-[0-9]{4}-[A-Z0-9]{6}")

        @Serializable
        private data class Wrapper(val items: List<MyEnrollmentSummary>)

        fun decodeList(raw: String): List<MyEnrollmentSummary> {
            val items = platformJson.decodeFromString<Wrapper>(raw).items
            require(items.size <= 100 && items.all { it.ref.matches(REF_PATTERN) })
            return items
        }
    }
}

data class EnrollmentDetail(
    val ref: String,
    val stage: String,
    val programTitle: String,
    val feeTotal: Double,
    val feeDue: Double,
    val paidAmount: Double,
    val amountDue: Double,
    val depositAmount: Double,
    val paymentStatus: String,
    val offerStatus: String,
    val offerVersion: Int,
    val acceptedOfferVersion: Int?,
    val offerExpiresAt: String?,
    val balanceDueAt: String?,
    val equipment: String?,
    val cohortLabel: String?,
    val checkoutAllowed: Boolean,
    val checkoutReason: String,
    val transferReviewStatus: String?,
    val learningActive: Boolean,
    val learningReason: String,
) {
    fun canAcceptOffer(): Boolean =
        offerVersion > 0 &&
            offerStatus in setOf("held", "confirmed") &&
            acceptedOfferVersion != offerVersion

    fun canReportTransfer(): Boolean =
        checkoutAllowed && transferReviewStatus != "pending_review" && amountDue > 0.0

    companion object {
        const val POLICY_VERSION = "tuition-2026-10-17"

        fun decode(raw: String): EnrollmentDetail {
            val obj = platformJson.parseToJsonElement(raw).jsonObject
            val ref = obj.getValue("ref").jsonPrimitive.content
            require(ref.matches(MyEnrollmentSummary.REF_PATTERN))
            val payment = obj.getValue("payment").jsonObject
            val offer = obj.getValue("offer").jsonObject
            val checkout = obj.getValue("checkout").jsonObject
            val learning = obj.getValue("learning").jsonObject
            val cohortObj = offer["cohort"] as? JsonObject
            val reviewObj = payment["review"] as? JsonObject
            return EnrollmentDetail(
                ref = ref,
                stage = obj["stage"]?.jsonPrimitive?.contentOrNull ?: "",
                programTitle = obj["programTitle"]?.jsonPrimitive?.contentOrNull ?: "",
                feeTotal = obj["feeTotal"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                feeDue = obj["feeDue"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                paidAmount = payment["paidAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                amountDue = payment["amountDue"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                depositAmount = payment["depositAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                paymentStatus = payment["status"]?.jsonPrimitive?.contentOrNull ?: "",
                offerStatus = offer["status"]?.jsonPrimitive?.contentOrNull ?: "",
                offerVersion = offer["version"]?.jsonPrimitive?.intOrNull ?: 0,
                acceptedOfferVersion = offer["acceptedVersion"]?.let { if (it is JsonNull) null else it.jsonPrimitive.intOrNull },
                offerExpiresAt = offer["expiresAt"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                balanceDueAt = offer["balanceDueAt"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                equipment = offer["equipment"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                cohortLabel = cohortObj?.get("label")?.jsonPrimitive?.contentOrNull,
                checkoutAllowed = checkout["allowed"]?.jsonPrimitive?.booleanOrNull == true,
                checkoutReason = checkout["reason"]?.jsonPrimitive?.contentOrNull ?: "",
                transferReviewStatus = reviewObj?.get("status")?.jsonPrimitive?.contentOrNull,
                learningActive = learning["active"]?.jsonPrimitive?.booleanOrNull == true,
                learningReason = learning["reason"]?.jsonPrimitive?.contentOrNull ?: "",
            )
        }
    }
}

data class VerifiedReceiptPayment(
    val reference: String,
    val kind: String,
    val amount: Double,
    val method: String,
    val receiptNo: String?,
    val paidAt: String?,
)

data class EnrollmentReceipt(
    val ref: String,
    val studentName: String,
    val programTitle: String,
    val feeDue: Double,
    val paidAmount: Double,
    val balance: Double,
    val latestReceiptNo: String?,
    val payments: List<VerifiedReceiptPayment>,
) {
    companion object {
        fun decode(raw: String): EnrollmentReceipt {
            val r = platformJson.parseToJsonElement(raw).jsonObject.getValue("receipt").jsonObject
            val ref = r.getValue("ref").jsonPrimitive.content
            require(ref.matches(MyEnrollmentSummary.REF_PATTERN))
            val payments = (r["payments"] as? JsonArray)?.map { el ->
                val p = el.jsonObject
                VerifiedReceiptPayment(
                    reference = p["reference"]?.jsonPrimitive?.contentOrNull ?: "",
                    kind = p["kind"]?.jsonPrimitive?.contentOrNull ?: "",
                    amount = p["amount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                    method = p["method"]?.jsonPrimitive?.contentOrNull ?: "",
                    receiptNo = p["receiptNo"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                    paidAt = p["paidAt"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                )
            } ?: emptyList()
            return EnrollmentReceipt(
                ref = ref,
                studentName = r["studentName"]?.jsonPrimitive?.contentOrNull ?: "",
                programTitle = r["programTitle"]?.jsonPrimitive?.contentOrNull ?: "",
                feeDue = r["feeDue"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                paidAmount = r["paidAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                balance = r["balance"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                latestReceiptNo = r["latestReceiptNo"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull },
                payments = payments,
            )
        }
    }
}

data class StaffEnrollmentItem(
    val ref: String,
    val programTitle: String,
    val fullName: String,
    val stage: String,
    val paymentStatus: String,
    val paidAmount: Double,
    val feeTotal: Double,
) {
    companion object {
        fun decodeList(raw: String): List<StaffEnrollmentItem> {
            val arr = platformJson.parseToJsonElement(raw).jsonObject["items"]?.jsonArray ?: JsonArray(emptyList())
            require(arr.size <= 100)
            return arr.map { el ->
                val o = el.jsonObject
                val ref = o.getValue("ref").jsonPrimitive.content
                require(ref.matches(MyEnrollmentSummary.REF_PATTERN))
                val p = o["payment"] as? JsonObject
                val s = o["student"] as? JsonObject
                StaffEnrollmentItem(
                    ref = ref,
                    programTitle = o["programTitle"]?.jsonPrimitive?.contentOrNull ?: "",
                    fullName = s?.get("fullName")?.jsonPrimitive?.contentOrNull ?: "",
                    stage = o["stage"]?.jsonPrimitive?.contentOrNull ?: "",
                    paymentStatus = p?.get("status")?.jsonPrimitive?.contentOrNull ?: "",
                    paidAmount = p?.get("paidAmount")?.jsonPrimitive?.doubleOrNull ?: 0.0,
                    feeTotal = o["feeTotal"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                )
            }
        }
    }
}

data class PaymentProofItem(
    val id: String,
    val ref: String,
    val programTitle: String,
    val studentName: String,
    val kind: String,
    val amount: Double,
    val expectedAmount: Double,
    val senderName: String,
    val bankName: String,
    val bankReference: String,
    val status: String,
    val submittedAt: String,
) {
    companion object {
        fun decodeList(raw: String): List<PaymentProofItem> {
            val arr = platformJson.parseToJsonElement(raw).jsonObject["items"]?.jsonArray ?: JsonArray(emptyList())
            require(arr.size <= 100)
            return arr.map { el ->
                val o = el.jsonObject
                val id = o.getValue("id").jsonPrimitive.content
                val ref = o.getValue("ref").jsonPrimitive.content
                require(id.matches(StudentAssignmentItem.ID_PATTERN) && ref.matches(MyEnrollmentSummary.REF_PATTERN))
                val s = o["student"] as? JsonObject
                val first = s?.get("firstName")?.jsonPrimitive?.contentOrNull.orEmpty()
                val last = s?.get("lastName")?.jsonPrimitive?.contentOrNull.orEmpty()
                PaymentProofItem(
                    id = id,
                    ref = ref,
                    programTitle = o["programTitle"]?.jsonPrimitive?.contentOrNull ?: "",
                    studentName = "$first $last".trim(),
                    kind = o["kind"]?.jsonPrimitive?.contentOrNull ?: "",
                    amount = o["amount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                    expectedAmount = o["expectedAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                    senderName = o["senderName"]?.jsonPrimitive?.contentOrNull ?: "",
                    bankName = o["bankName"]?.let { if (it is JsonNull) "" else it.jsonPrimitive.contentOrNull.orEmpty() } ?: "",
                    bankReference = o["bankReference"]?.let { if (it is JsonNull) "" else it.jsonPrimitive.contentOrNull.orEmpty() } ?: "",
                    status = o["status"]?.jsonPrimitive?.contentOrNull ?: "",
                    submittedAt = o["submittedAt"]?.jsonPrimitive?.contentOrNull ?: "",
                )
            }
        }
    }
}
