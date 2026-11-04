package ng.cea.nativeapp

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import org.junit.Assert.*
import org.junit.Test

/** New engine endpoints: exact paths, GET/POST split, auth requirements and decoding. */
class EngineApiTest {
    private val token = "d".repeat(64)
    private fun cookie(value: String = token) = "cea_session=$value; HttpOnly; Secure; Path=/"
    private fun sessionBody(role: String = "student") =
        """{"expiresAt":"2099-01-01T00:00:00.000Z","user":{"id":"u-$role","name":"User $role","email":"$role@cea.ng","roleKey":"$role"}}"""

    private class FakeTransport(val replies: MutableList<AuthReply>) : AuthTransport {
        val requests = mutableListOf<Triple<String, JsonObject?, String?>>()
        override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply {
            requests.add(Triple(path, body, token))
            return replies.removeAt(0)
        }
    }

    private suspend fun signedInClient(fake: AuthTransport, role: String = "student"): NativeAuthClient {
        val client = NativeAuthClient(fake)
        client.signIn("$role@cea.ng", "password-123")
        return client
    }

    private fun replies(vararg bodies: String) = bodies.map { AuthReply(200, it) }.toMutableList()

    @Test fun publicEndpointsWorkWithoutAnySession() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(200, """{"items":[{"id":"co-1","programSlug":"web-development","label":"Jan 2027 intake","startDate":"2027-01-11","mode":"onsite","capacity":40,"enrollmentOpen":true}]}"""),
                AuthReply(200, """{"cohort":null}"""),
                AuthReply(200, """{"sources":[{"key":"docs","name":"Docs","itemCount":3}],"items":[],"nextCursor":null}"""),
                AuthReply(200, """{"currency":"NGN","country":"NG","storeUrl":"https://www.cea.ng/shop","products":[]}"""),
                AuthReply(200, """{"valid":true,"certificate":{"code":"CEA-2026-AB12CD","title":"Web Development Diploma","issuedAt":"2026-05-01"}}"""),
            ),
        )
        val client = NativeAuthClient(fake)
        assertFalse(client.hasSession())
        assertEquals(1, client.cohorts(null).size)
        assertNull(client.cohortsNext(null).cohort)
        val catalog = client.libraryCatalog(null)
        assertEquals("docs", catalog.first.single().key)
        assertTrue(client.shopCatalog().products.isEmpty())
        val verification = client.verifyCertificate("cea-2026-ab12cd")
        assertTrue(verification.valid)
        assertEquals("certificates/verify?code=CEA-2026-AB12CD", fake.requests[4].first)
        // Public calls must never attach a credential.
        assertNull(fake.requests[4].third)
        assertEquals("cohorts", fake.requests[0].first)
        assertEquals("cohorts/next", fake.requests[1].first)
        assertEquals("library/catalog", fake.requests[2].first)
        assertEquals("shop/catalog", fake.requests[3].first)
    }

    @Test fun privateEndpointsRequireVerifiedSession() = runBlocking {
        val client = NativeAuthClient(FakeTransport(mutableListOf()))
        val calls: List<suspend NativeAuthClient.() -> Unit> = listOf(
            { coursesPage(null) },
            { gradebook(null) },
            { calendarEvents(null) },
            { certificatesMine() },
            { attendanceCheckIn("ABC123") },
            { liveClasses(null) },
            { liveChat("cls-1", null) },
            { mentorProfiles(null) },
            { jobPostings(null) },
            { paymentHistory(null) },
            { portalSummary(null) },
            { unreadCount() },
            { aiAsk("What is HTTPS?") },
            { libraryItems(null) },
        )
        for (call in calls) {
            try {
                client.call()
                fail("Expected AuthFailure without a session")
            } catch (error: AuthFailure) {
                assertEquals(401, error.status)
            }
        }
    }

    @Test fun learningEngineCallsUseGetWithBearerAndDecodePages() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"items":[{"slug":"web","title":"Web Dev","subtitle":"s","cohort":"C1","instructor":"Elias","pct":40,"tone":"good","modules":[]}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"items":[{"name":"Web Dev","units":3,"letter":"B","pct":82.5,"trend":"up","items":[]}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"items":[{"id":"ev-1","date":"2026-11-10","day":"Mon","title":"Orientation","kind":"class","time":"09:00","location":"Hall A"}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"items":[{"id":"cert-1","courseSlug":"web","title":"Web Dev Certificate","code":"CEA-2026-AB12CD","issuedAt":"2026-05-01"}],"total":1}"""),
            ),
        )
        val client = signedInClient(fake)
        val courses = client.coursesPage(null)
        assertEquals("courses", fake.requests[1].first)
        assertEquals("web", courses.items.single().slug)
        assertEquals(token, fake.requests[1].third)
        assertNull(fake.requests[1].second)

        val gradebook = client.gradebook(null)
        assertEquals("courses/gradebook", fake.requests[2].first)
        assertEquals("B", gradebook.first.single().letter)
        assertEquals(82.5, gradebook.first.single().pct, 0.001)

        val calendar = client.calendarEvents(null)
        assertEquals("calendar/events", fake.requests[3].first)
        assertEquals("Orientation", calendar.first.single().title)

        val certs = client.certificatesMine()
        assertEquals("certificates/mine", fake.requests[4].first)
        assertEquals("CEA-2026-AB12CD", certs.single().code)
    }

    @Test fun liveChatUsesGetForHistoryAndPostForSending() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"cls-1","title":"Live: React","instructor":"Elias","cohort":"C1","status":"live","startsAt":"2026-11-03T09:00:00Z"}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"items":[{"id":"m-1","roomId":"cls-1","channel":"live","userId":"u-student","userName":"User student","body":"Hello class","createdAt":"2026-11-03T09:01:00Z"}],"total":1,"nextCursor":null}"""),
                AuthReply(201, """{"id":"m-2","roomId":"cls-1","channel":"live","userId":"u-student","userName":"User student","body":"Great session","createdAt":"2026-11-03T09:02:00Z"}"""),
            ),
        )
        val client = signedInClient(fake)
        val classes = client.liveClasses(null)
        assertEquals("live/classes", fake.requests[1].first)
        assertEquals("cls-1", classes.first.single().id)
        val history = client.liveChat("cls-1", null)
        assertEquals("live/classes/cls-1/chat", fake.requests[2].first)
        assertNull(fake.requests[2].second)
        assertEquals("Hello class", history.first.single().body)
        client.sendLiveChat("cls-1", "Great session")
        assertEquals("live/classes/cls-1/chat", fake.requests[3].first)
        assertEquals("Great session", fake.requests[3].second?.get("body")?.jsonPrimitive?.content)
    }

    @Test fun attendanceCheckInPostsUppercasedCode() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"ok":true,"alreadyCheckedIn":false,"attendance":{"id":"a-1","date":"2026-11-03","status":"present","note":""},"course":"Web Dev","closesAt":"2026-11-03T11:00:00Z"}"""),
            ),
        )
        val client = signedInClient(fake)
        val result = client.attendanceCheckIn("abc-123")
        assertEquals("attendance/check-in", fake.requests[1].first)
        assertEquals("ABC-123", fake.requests[1].second?.get("sessionCode")?.jsonPrimitive?.content)
        assertEquals("Web Dev", result.course)
        assertFalse(result.alreadyCheckedIn)
    }

    @Test fun careerAndPortalCallsHitExpectedPaths() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"m-1","name":"Ada","focus":"Frontend","bio":"b","skills":["react"],"areas":["web"],"availability":"Weekends","rating":4.8,"sessionsCount":12}],"total":1,"nextCursor":null}"""),
                AuthReply(201, """{"ok":true,"alreadyRequested":false,"id":"r-1","mentor":"Ada"}"""),
                AuthReply(200, """{"program":"","goal":"web","matches":[{"id":"m-1","name":"Ada","focus":"Frontend","rating":4.8,"sessionsCount":12,"match":91}]}"""),
                AuthReply(200, """{"items":[{"id":"j-1","title":"Junior Dev","applicants":5,"views":120,"posted":"2026-10-01","status":"open","detail":"d","tone":"t"}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"portal":"learner","group":"learner","restricted":false,"generatedAt":"2026-11-03T00:00:00Z","metrics":[{"key":"courses","label":"Courses","value":3,"format":"number"}],"activity":[{"id":"n-1","title":"Welcome","body":"b","time":"2026-11-01","engine":"learning","read":false}]}"""),
                AuthReply(200, """{"count":7}"""),
                AuthReply(200, """{"answer":"HTTPS encrypts traffic.","model":"mock","mock":true}"""),
            ),
        )
        val client = signedInClient(fake)
        assertEquals(1, client.mentorProfiles(null).first.size)
        assertEquals("mentor/profiles", fake.requests[1].first)
        val request = client.requestMentor("m-1", "Build a portfolio site", "web-development")
        assertEquals("mentor/requests", fake.requests[2].first)
        assertFalse(request.alreadyRequested)
        assertEquals("Ada", request.mentor)
        val match = client.matchMentor("web")
        assertEquals("mentor/match", fake.requests[3].first)
        assertEquals(91, match.matches.single().match)
        assertEquals(1, client.jobPostings(null).first.size)
        assertEquals("recruitment/postings", fake.requests[4].first)
        val portal = client.portalSummary(null)
        assertEquals("portal/summary", fake.requests[5].first)
        assertEquals(3.0, portal.metrics.single().value, 0.0)
        assertEquals("Welcome", portal.activity.single().title)
        assertEquals(7, client.unreadCount())
        assertEquals("notifications/unread-count", fake.requests[6].first)
        val answer = client.aiAsk("What is HTTPS?")
        assertEquals("ai/ask", fake.requests[7].first)
        assertTrue(answer.mock)
        assertTrue(answer.answer.contains("HTTPS"))
    }

    @Test fun malformedEngineResponsesFailClosed() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("student"), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"bad id with spaces","title":"x"}],"total":1}"""),
                AuthReply(200, """{"items":[{"id":"ev-1","title":""}]}"""),
                AuthReply(200, """{"valid":true,"certificate":{"code":"short","title":"t"}}"""),
            ),
        )
        val client = signedInClient(fake)
        try { client.liveClasses(null); fail("Invalid id accepted") } catch (error: AuthFailure) { assertEquals(502, error.status) }
        try { client.calendarEvents(null); fail("Blank title accepted") } catch (error: AuthFailure) { assertEquals(502, error.status) }
        try { client.verifyCertificate("CEA-2026-AB12CD"); fail("Invalid verification accepted") } catch (error: AuthFailure) { assertEquals(502, error.status) }
    }

    /* ---------------- 0.8: online payment, uploads, polls, attendance sessions, portfolio, ICS ---------------- */

    private class FakeUploadTransport(val replies: MutableList<AuthReply>) : AuthTransport {
        val requests = mutableListOf<Triple<String, JsonObject?, String?>>()
        val uploads = mutableListOf<Triple<String, String, ByteArray>>()
        override suspend fun request(path: String, body: JsonObject?, token: String?): AuthReply {
            requests.add(Triple(path, body, token))
            return replies.removeAt(0)
        }
        override suspend fun upload(path: String, contentType: String, bytes: ByteArray, token: String?): AuthReply {
            uploads.add(Triple(path, contentType, bytes))
            return replies.removeAt(0)
        }
    }

    @Test fun tuitionPaymentFlowUsesEnrollmentPathsAndUppercasesRef() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody(), listOf(cookie())),
                AuthReply(200, """{"reference":"CEA-CHK-0001","authorizationUrl":"https://checkout.paystack.example/cea-chk-0001","amount":50000,"mock":false}"""),
                AuthReply(200, """{"reference":"CEA-CHK-0001","amount":50000,"status":"success","enrollmentPaymentStatus":"paid","verified":true}"""),
            ),
        )
        val client = signedInClient(fake)
        val start = client.startTuitionPayment(" cea-2026-ab12cd ", "deposit", "chk-key-0123456789ab")
        assertEquals("CEA-CHK-0001", start.reference)
        assertFalse(start.mock)
        assertEquals("enrollments/CEA-2026-AB12CD/payments", fake.requests[1].first)
        assertEquals("deposit", fake.requests[1].second?.get("kind")?.jsonPrimitive?.content)
        assertEquals("chk-key-0123456789ab", fake.requests[1].second?.get("checkoutKey")?.jsonPrimitive?.content)
        assertEquals(token, fake.requests[1].third)
        val status = client.verifyTuitionPayment("CEA-2026-AB12CD")
        assertTrue(status.verified)
        assertEquals("paid", status.enrollmentPaymentStatus)
        assertEquals("enrollments/CEA-2026-AB12CD/payments/verify", fake.requests[2].first)
        assertNull(fake.requests[2].second)
    }

    @Test fun tuitionPaymentRejectsBadKindAndCheckoutKey() = runBlocking {
        val fake = FakeTransport(mutableListOf(AuthReply(201, sessionBody(), listOf(cookie()))))
        val client = signedInClient(fake)
        try { client.startTuitionPayment("CEA-2026-AB12CD", "half", "chk-key-0123456789ab"); fail("bad kind accepted") }
        catch (_: IllegalArgumentException) { }
        try { client.startTuitionPayment("CEA-2026-AB12CD", "full", "short"); fail("bad checkoutKey accepted") }
        catch (_: IllegalArgumentException) { }
        assertEquals(1, fake.requests.size) // only the sign-in call happened
    }

    @Test fun uploadFlowPresignsPutsBytesThenSubmitsFileReference() = runBlocking {
        val fake = FakeUploadTransport(
            mutableListOf(
                AuthReply(201, sessionBody(), listOf(cookie())),
                AuthReply(201, """{"key":"u-1/assignments/abc.pdf","uploadUrl":"/v1/uploads/u-1/assignments/abc.pdf","method":"PUT","expiresIn":3600,"mock":true,"contentType":"application/pdf"}"""),
                AuthReply(200, """{"ok":true,"key":"u-1/assignments/abc.pdf","size":1234}"""),
                AuthReply(200, """{"id":"as-1","status":"submitted"}"""),
            ),
        )
        val client = signedInClient(fake)
        val presigned = client.presignUpload("essay.pdf", "application/pdf")
        assertEquals("u-1/assignments/abc.pdf", presigned.key)
        assertEquals("uploads/presign", fake.requests[1].first)
        val bytes = ByteArray(1234) { 7 }
        val result = client.uploadFile(presigned, bytes)
        assertTrue(result.ok)
        assertEquals("uploads/u-1/assignments/abc.pdf", fake.uploads.single().first)
        assertEquals("application/pdf", fake.uploads.single().second)
        assertEquals(1234, fake.uploads.single().third.size)
        client.submitAssignmentWithFile("as-1", "See attached.", presigned.key, "1.2 KB")
        assertEquals("assignments/as-1/submit", fake.requests[3].first)
        assertEquals(presigned.key, fake.requests[3].second?.get("file")?.jsonPrimitive?.content)
        assertEquals("1.2 KB", fake.requests[3].second?.get("size")?.jsonPrimitive?.content)
        assertEquals("See attached.", fake.requests[3].second?.get("body")?.jsonPrimitive?.content)
    }

    @Test fun uploadRejectsDisallowedTypeAndOversizeBeforeAnyNetwork() = runBlocking {
        val fake = FakeUploadTransport(mutableListOf(AuthReply(201, sessionBody(), listOf(cookie()))))
        val client = signedInClient(fake)
        try { client.presignUpload("virus.exe", "application/x-msdownload"); fail("disallowed mime accepted") }
        catch (_: IllegalArgumentException) { }
        val presigned = PresignedUpload("u-1/x.pdf", contentType = "application/pdf")
        try { client.uploadFile(presigned, ByteArray(10 * 1024 * 1024 + 1)); fail("oversize upload accepted") }
        catch (_: IllegalArgumentException) { }
        assertTrue(fake.uploads.isEmpty())
        assertEquals(1, fake.requests.size)
    }

    @Test fun livePollsLoadAndVoteHitClassScopedPaths() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody(), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"poll-1","question":"Async or sync?","options":["async","sync"],"status":"open","totalVotes":4}],"total":1,"nextCursor":null}"""),
                AuthReply(200, """{"id":"poll-1","question":"Async or sync?","options":["async","sync"],"status":"open","results":{"async":3,"sync":2},"totalVotes":5}"""),
            ),
        )
        val client = signedInClient(fake)
        val (polls, cursor) = client.livePolls("lc-1", null)
        assertEquals("live/classes/lc-1/polls", fake.requests[1].first)
        assertNull(cursor)
        assertTrue(polls.single().canVote())
        val voted = client.voteLivePoll("lc-1", "poll-1", "async")
        assertEquals("live/classes/lc-1/polls/poll-1/vote", fake.requests[2].first)
        assertEquals("async", fake.requests[2].second?.get("option")?.jsonPrimitive?.content)
        assertEquals(5, voted.totalVotes)
        assertEquals(3, voted.results?.get("async"))
    }

    @Test fun attendanceSessionRequiresInstructorRole() = runBlocking {
        val fake = FakeTransport(mutableListOf(AuthReply(201, sessionBody("student"), listOf(cookie()))))
        val student = signedInClient(fake, "student")
        try { student.createAttendanceSession("Algebra", 30); fail("student allowed to create session") }
        catch (_: IllegalArgumentException) { }

        val instructorFake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody("instructor"), listOf(cookie())),
                AuthReply(201, """{"id":"ses-1","course":"Algebra","code":"482913","startsAt":"2026-11-04T10:00:00.000Z","closesAt":"2026-11-04T10:30:00.000Z"}"""),
            ),
        )
        val instructor = signedInClient(instructorFake, "instructor")
        val session = instructor.createAttendanceSession(" Algebra ", 30)
        assertEquals("482913", session.code)
        assertEquals("attendance/sessions", instructorFake.requests[1].first)
        assertEquals("Algebra", instructorFake.requests[1].second?.get("course")?.jsonPrimitive?.content)
        assertEquals(30, instructorFake.requests[1].second?.get("durationMinutes")?.jsonPrimitive?.int?.toInt())
    }

    @Test fun portfolioAndRecordsUseSelfDashboardCollections() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(201, sessionBody(), listOf(cookie())),
                AuthReply(200, """{"items":[{"id":"pr-1","name":"Portfolio site","detail":"Built with Kotlin","tags":["kotlin"],"featured":1,"url":"https://example.com"}],"total":1,"nextCursor":"cur-9"}"""),
                AuthReply(201, """{"id":"pr-2","name":"API","detail":"REST API","tags":["api"],"featured":0,"url":""}"""),
                AuthReply(200, """{"items":[{"id":"rec-1","dateLabel":"2026-11-03","course":"Algebra","status":"Present"}],"total":1,"nextCursor":null}"""),
            ),
        )
        val client = signedInClient(fake)
        val (projects, cursor) = client.portfolioProjects(null)
        assertEquals("student-self-dashboard/projects", fake.requests[1].first)
        assertEquals("cur-9", cursor)
        assertEquals("kotlin", projects.single().tags.single())
        val added = client.addPortfolioProject("API", "REST API", listOf("api"), "")
        assertEquals("pr-2", added.id)
        assertEquals("student-self-dashboard/projects", fake.requests[2].first)
        val (records, _) = client.selfRecords(null)
        assertEquals("student-self-dashboard/records", fake.requests[3].first)
        assertEquals("Present", records.single().status)
    }

    @Test fun cohortIcsIsPublicAndMustBeCalendarText() = runBlocking {
        val fake = FakeTransport(
            mutableListOf(
                AuthReply(200, "BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nSUMMARY:Jan 2027 intake\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n"),
            ),
        )
        val client = NativeAuthClient(fake)
        val ics = client.cohortIcs("co-1")
        assertTrue(ics.startsWith("BEGIN:VCALENDAR"))
        assertEquals("cohorts/co-1/ics", fake.requests[0].first)
        assertNull(fake.requests[0].third)

        val bad = FakeTransport(mutableListOf(AuthReply(200, """{"error":"nope"}""")))
        try { NativeAuthClient(bad).cohortIcs("co-1"); fail("non-ics body accepted") }
        catch (_: IllegalArgumentException) { }
    }

}