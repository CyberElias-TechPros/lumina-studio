package ng.cea.nativeapp

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.*
import org.junit.Test

class PlatformFeaturesTest {
    private val token = "c".repeat(64)
    private fun cookie(value: String = token) = "cea_session=$value; HttpOnly; Secure; Path=/"
    private fun sessionBody(role: String) =
        """{"expiresAt":"2099-01-01T00:00:00.000Z","user":{"id":"u-$role","name":"User $role","email":"$role@cea.ng","roleKey":"$role"}}"""

    private class FakeTransport(val replies: MutableList<AuthReply>) : AuthTransport {
        val requests = mutableListOf<Triple<String, JsonObject?, String?>>()
        override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply {
            requests.add(Triple(path, body, token))
            return replies.removeAt(0)
        }
    }

    @Test
    fun accountLifecycleSignUpVerifyDevicesAndDeleteWipesSession() = runBlocking {
        val store = MemorySessionStore()
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(200, """{"id":"u-student","name":"User student","email":"student@cea.ng","roleKey":"student","emailVerified":true}"""),
                AuthReply(200, """{"items":[{"id":"dev-1","deviceLabel":"Pixel 8","expiresAt":"2099-01-01","active":true,"current":true},{"id":"dev-2","deviceLabel":"Laptop","expiresAt":"2099-01-01","active":true,"current":false}]}"""),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(200, """{"ok":true}"""),
            ),
        )
        val client = NativeAuthClient(fake, store)
        val created = client.signUp("Ada Lovelace", "student@cea.ng", "strong-pass-123", rememberSession = true)
        assertEquals("student", created.user?.roleKey)
        assertNotNull(store.read())

        client.sendEmailVerification()
        val verifiedProfile = client.verifyEmail("482910")
        assertTrue(verifiedProfile.emailVerified)

        val devices = client.devices()
        assertEquals(2, devices.size)
        client.revokeDevice("dev-2")
        assertEquals("devices/dev-2/revoke", fake.requests[4].first)

        client.deleteAccount("strong-pass-123", "")
        assertEquals("DELETE", fake.requests[5].second?.get("confirm")?.jsonPrimitive?.content)
        assertFalse(client.hasSession())
        assertNull(store.read())
    }

    @Test
    fun resourceLevel403KeepsVerifiedSessionWhile401WipesSession() = runBlocking {
        val store = MemorySessionStore()
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(200, sessionBody("student"), listOf(cookie())),
                AuthReply(403, ""),
                AuthReply(401, ""),
            ),
        )
        val client = NativeAuthClient(fake, store)
        client.signIn("student@cea.ng", "password123", rememberSession = true)
        try {
            client.myEnrollments()
            fail("Expected 403 before email verification")
        } catch (error: AuthFailure) {
            assertEquals(403, error.status)
        }
        assertTrue("403 on resource endpoint must not wipe session", client.hasSession())
        assertNotNull(store.read())

        try {
            client.myEnrollments()
            fail("Expected 401 on expired token")
        } catch (error: AuthFailure) {
            assertEquals(401, error.status)
        }
        assertFalse("401 must immediately wipe session", client.hasSession())
        assertNull(store.read())
    }

    @Test
    fun admissionsOfferAcceptTransferProofAndOfficialReceiptFlow() = runBlocking {
        val key = "123e4567-e89b-12d3-a456-426614174000"
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, """{"enrollment":{"ref":"CEA-2026-AB23CD"}}"""),
                AuthReply(200, sessionBody("student"), listOf(cookie())),
                AuthReply(
                    200,
                    """{
                        "ref":"CEA-2026-AB23CD",
                        "stage":"offer",
                        "programTitle":"IT Professional Diploma",
                        "feeTotal":300000,
                        "feeDue":270000,
                        "payment":{"status":"unpaid","paidAmount":0,"amountDue":270000,"depositAmount":90000},
                        "offer":{"status":"held","version":2,"acceptedVersion":null},
                        "checkout":{"allowed":true,"reason":""},
                        "learning":{"active":false,"reason":"Pending tuition"}
                    }""",
                ),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(201, """{"ok":true}"""),
                AuthReply(
                    200,
                    """{"receipt":{"ref":"CEA-2026-AB23CD","studentName":"Ada Lovelace","programTitle":"IT Professional Diploma","feeDue":270000,"paidAmount":90000,"balance":180000,"latestReceiptNo":"RCP-2026-001","payments":[]}}""",
                ),
            ),
        )
        val client = NativeAuthClient(fake)
        val longDraft = ApplicationDraft(
            programSlug = "it-professional-diploma",
            firstName = "Ada",
            lastName = "Lovelace",
            email = "ada@cea.ng",
            phone = "+2348012345678",
            city = "Port Harcourt",
            paymentPlan = "full",
        )
        val ref = client.submitApplication(longDraft, key)
        assertEquals("CEA-2026-AB23CD", ref)
        // Long-form diploma automatically normalizes unsupported "full" to valid "full-10-off".
        assertEquals("full-10-off", fake.requests[0].second?.get("paymentPlan")?.jsonPrimitive?.content)

        client.signIn("ada@cea.ng", "password123")
        val detail = client.enrollmentDetail(ref)
        assertTrue(detail.canAcceptOffer())
        assertTrue(detail.canReportTransfer())

        client.acceptOffer(ref, 2)
        assertEquals("tuition-2026-10-17", fake.requests[3].second?.get("policyVersion")?.jsonPrimitive?.content)

        client.reportTransfer(ref, "deposit", 90_000.0, "Ada Lovelace", "GTBank", "NIP-998877")
        val receipt = client.enrollmentReceipt(ref)
        assertEquals("RCP-2026-001", receipt.latestReceiptNo)
        assertEquals(90_000.0, receipt.paidAmount, 0.01)
    }

    @Test
    fun instructorGradingFinanceProofAndAssessmentsUsePostAndDecodeCleanly() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(200, sessionBody("instructor"), listOf(cookie())),
                AuthReply(200, """{"id":"sub-1","student":"Chidi","title":"API Security","submitted":"Today","status":"submitted","body":"Rate limit and HttpOnly","max":20,"isLatest":true}"""),
                AuthReply(200, """{"id":"sub-1","status":"graded","score":19}"""),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(200, sessionBody("finance"), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"prf-1","ref":"CEA-2026-XY89ZT","programTitle":"Web Development","student":{"firstName":"Ngozi","lastName":"Okafor"},"kind":"full","amount":60000,"expectedAmount":60000,"senderName":"Ngozi Okafor","bankName":"Access","bankReference":"NIP-12345","status":"pending_review","submittedAt":"2026-10-22"}]}"""),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(200, """{"ok":true}"""),
                AuthReply(200, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"asm-1","title":"Security Check","course":"Web Security","questions":5,"status":"available","attempts":1,"attemptsLeft":1}]}"""),
                AuthReply(200, """{"ok":true,"id":"asm-1","status":"done","score":5,"max":5}"""),
            ),
        )
        val client = NativeAuthClient(fake)
        client.signIn("instructor@cea.ng", "password123")
        val sub = client.instructorSubmission("sub-1")
        assertTrue(sub.canGrade())
        client.gradeSubmission("sub-1", 19, "Well structured.")
        assertEquals("instructor/submissions/sub-1/grade", fake.requests[2].first)
        client.signOut()

        client.signIn("finance@cea.ng", "password123")
        val proofs = client.paymentProofs()
        assertEquals(1, proofs.size)
        client.confirmPaymentProof("prf-1", "NIP-12345", 60_000.0)
        assertEquals("enrollments/payment-proofs/prf-1/confirm", fake.requests[6].first)
        client.signOut()

        client.signIn("student@cea.ng", "password123")
        val (assessments, _) = client.assessments()
        assertEquals(1, assessments.size)
        assertTrue(assessments.single().canSubmit())
        client.submitAssessment("asm-1", listOf(1, 0, 2, 0, 2))
        assertEquals("assessments/asm-1/submit", fake.requests[10].first)
    }
}
