package ng.cea.nativeapp

import org.junit.Assert.*
import org.junit.Test

class EngineModelsTest {
    @Test fun coursePageDecodesAndValidates() {
        val page = CoursePage.decode(
            """{"items":[{"slug":"web","title":"Web","pct":10,"modules":[{"id":"m1","title":"M","lessons":[{"id":"l1","title":"L","type":"article","status":"preview","body":"text"}]}]}],"total":1,"nextCursor":null}""",
        )
        assertEquals("web", page.items.single().slug)
        assertEquals("l1", page.items.single().modules.single().lessons.single().id)
        assertNull(page.nextCursor)
    }

    @Test(expected = IllegalArgumentException::class)
    fun coursePageRejectsOutOfRangeProgress() {
        CoursePage.decode("""{"items":[{"slug":"web","title":"Web","pct":140,"modules":[]}],"total":1}""")
    }

    @Test(expected = IllegalArgumentException::class)
    fun coursePageRejectsDuplicateLessonIds() {
        CoursePage.decode(
            """{"items":[{"slug":"web","title":"Web","pct":0,"modules":[{"id":"m","title":"M","lessons":[{"id":"l","title":"a","status":"preview"},{"id":"l","title":"b","status":"preview"}]}]}]}""",
        )
    }

    @Test fun gradebookDecodesTrendAndRejectsBadPct() {
        val (items, cursor) = GradebookEntry.decodePage(
            """{"items":[{"name":"Maths","units":2,"letter":"A","pct":91.0,"trend":"up","items":[{"label":"Quiz 1","score":9}]}],"nextCursor":"cur-1"}""",
        )
        assertEquals("▲", items.single().trendSymbol())
        assertEquals("cur-1", cursor)
        try {
            GradebookEntry.decodePage("""{"items":[{"name":"X","pct":900.0}]}""")
            fail("Out-of-range pct accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun certificateVerificationDecodesBothOutcomes() {
        val valid = CertificateVerification.decode("""{"valid":true,"certificate":{"code":"CEA-2026-AB12CD","title":"Diploma","issuedAt":"2026-01-01"}}""")
        assertTrue(valid.valid)
        assertEquals("Diploma", valid.title)
        val invalid = CertificateVerification.decode("""{"valid":false,"message":"No certificate matches this code."}""")
        assertFalse(invalid.valid)
        assertEquals("No certificate matches this code.", invalid.message)
    }

    @Test fun attendanceResultDecodes() {
        val result = AttendanceCheckInResult.decode(
            """{"ok":true,"alreadyCheckedIn":true,"attendance":{"id":"a1","date":"2026-11-03","status":"present","note":""},"course":"Web","closesAt":"2026-11-03T11:00:00Z"}""",
        )
        assertTrue(result.alreadyCheckedIn)
        assertEquals("present", result.status)
    }

    @Test fun cohortNextHandlesNullCohort() {
        assertNull(CohortNext.decode("""{"cohort":null}""").cohort)
        val next = CohortNext.decode(
            """{"cohort":{"id":"c1","programSlug":"web","label":"Jan 2027","startDate":"2027-01-11","mode":"online","capacity":30,"enrollmentOpen":true,"startTime":null,"sessionMinutes":120},"ics":"/v1/cohorts/c1/ics"}""",
        )
        assertEquals("Jan 2027", next.cohort?.label)
        assertTrue(next.cohort!!.enrollmentOpen)
        assertEquals("/v1/cohorts/c1/ics", next.ics)
        assertEquals(120, next.cohort!!.sessionMinutes)
    }

    @Test fun libraryCatalogRejectsProtectedItemsInPublicFeed() {
        try {
            LibraryItem.decodeCatalog(
                """{"sources":[],"items":[{"id":"l1","name":"Secret","kind":"file","isProtected":true}],"nextCursor":null}""",
            )
            fail("Protected item leaked into public catalog decode")
        } catch (_: IllegalArgumentException) { }
        val catalog = LibraryItem.decodeCatalog(
            """{"sources":[{"key":"k","name":"Public","itemCount":1}],"items":[{"id":"l1","name":"Open","kind":"link","url":"https://cea.ng/x","isProtected":false}],"nextCursor":null}""",
        )
        assertEquals(1, catalog.second.size)
        assertEquals("k", catalog.first.single().key)
    }

    @Test(expected = IllegalArgumentException::class)
    fun libraryItemRejectsNonHttpsUrl() {
        LibraryItem.decodePage("""{"items":[{"id":"l1","name":"x","kind":"link","url":"http://evil.example","isProtected":false}]}""")
    }

    @Test fun mentorMatchCapsAtThreeAndValidates() {
        val match = MentorMatch.decode(
            """{"program":"web","goal":"frontend","matches":[{"id":"m1","name":"A","match":80},{"id":"m2","name":"B","match":70},{"id":"m3","name":"C","match":60}]}""",
        )
        assertEquals(3, match.matches.size)
        try {
            MentorMatch.decode("""{"matches":[{"id":"m1","name":"A","match":140}]}""")
            fail("Out-of-range match score accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun portalSummaryFormatsMetrics() {
        val summary = PortalSummary.decode(
            """{"portal":"learner","group":"learner","restricted":false,"generatedAt":"2026-11-03","metrics":[{"key":"paid","label":"Paid","value":150000,"format":"naira"},{"key":"pct","label":"Progress","value":42,"format":"percent"}],"activity":[]}""",
        )
        assertEquals("NGN 150,000", summary.metrics[0].formatted())
        assertEquals("42%", summary.metrics[1].formatted())
    }

    @Test fun shopCatalogDecodesAndValidatesProducts() {
        val catalog = ShopProduct.decodeCatalog(
            """{"currency":"NGN","country":"NG","storeUrl":"https://www.cea.ng/shop","products":[{"id":"p1","slug":"notion-template","title":"Template","price":5000,"priceCurrency":"NGN","availability":"in_stock","description":"d","shortDescription":"s","image":"","imageAlt":"","deliveryHours":24,"fileFormat":"PDF","highlights":["a"],"requirements":[],"license":"single"}]}""",
        )
        assertTrue(catalog.products.single().purchasable())
        try {
            ShopProduct.decodeCatalog("""{"storeUrl":"http://insecure.example","products":[]}""")
            fail("Insecure store URL accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun talentCandidateAvailabilityIsNumericFlag() {
        val (items, _) = TalentCandidate.decodePage(
            """{"items":[{"id":"t1","name":"Ada","program":"Web","score":88.5,"stage":"screening","match":90,"skills":["kotlin"],"available":1}],"nextCursor":null}""",
        )
        assertTrue(items.single().isAvailable())
    }

    @Test fun paymentHistoryValidatesAmounts() {
        val (items, _) = PaymentHistoryItem.decodePage(
            """{"items":[{"id":"p1","reference":"CEA-PAY-1","email":"a@b.c","amount":25000.0,"currency":"NGN","status":"success","provider":"paystack","description":"Tuition","paidAt":"2026-10-01"}],"nextCursor":null}""",
        )
        assertEquals("CEA-PAY-1", items.single().reference)
        try {
            PaymentHistoryItem.decodePage("""{"items":[{"id":"p1","reference":"r","amount":-5}]}""")
            fail("Negative amount accepted")
        } catch (_: IllegalArgumentException) { }
    }

    /* ---------------- 0.8 models ---------------- */

    @Test fun tuitionPaymentStartDecodesAndRejectsNonHttpsUrl() {
        val start = TuitionPaymentStart.decode(
            """{"reference":"CEA-CHK-1","authorizationUrl":"https://pay.example/x","amount":25000.5,"mock":true}""",
        )
        assertEquals("CEA-CHK-1", start.reference)
        assertEquals(25000.5, start.amount, 0.001)
        assertTrue(start.mock)
        try {
            TuitionPaymentStart.decode("""{"reference":"R","authorizationUrl":"http://insecure.example/x","amount":1}""")
            fail("non-https authorization URL accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun tuitionPaymentStatusDecodesVerifiedAndPending() {
        val ok = TuitionPaymentStatus.decode(
            """{"reference":"R1","amount":100,"status":"success","enrollmentPaymentStatus":"paid","verified":true}""",
        )
        assertTrue(ok.verified)
        val pending = TuitionPaymentStatus.decode(
            """{"status":"pending","enrollmentPaymentStatus":"partial","verified":false}""",
        )
        assertFalse(pending.verified)
        assertEquals("partial", pending.enrollmentPaymentStatus)
    }

    @Test fun presignedUploadValidatesKeyAndAllowlistedMime() {
        val good = PresignedUpload.decode(
            """{"key":"u-1/a/b.pdf","uploadUrl":"/v1/uploads/u-1/a/b.pdf","method":"PUT","expiresIn":3600,"mock":false,"contentType":"application/pdf"}""",
        )
        assertEquals("u-1/a/b.pdf", good.key)
        try {
            PresignedUpload.decode("""{"key":"../evil","method":"PUT","contentType":"application/pdf"}""")
            fail("path traversal key accepted")
        } catch (_: IllegalArgumentException) { }
        try {
            PresignedUpload.decode("""{"key":"u-1/x.gif","method":"PUT","contentType":"image/gif"}""")
            fail("disallowed content type accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun uploadResultRequiresOkFlagAndCappedSize() {
        val result = UploadResult.decode("""{"ok":true,"key":"u-1/x.pdf","size":2048}""")
        assertTrue(result.ok)
        assertEquals(2048L, result.size)
        try {
            UploadResult.decode("""{"ok":false,"key":"u-1/x.pdf","size":2048}""")
            fail("ok=false accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun livePollPageValidatesOptionsAndResults() {
        val (polls, cursor) = LivePoll.decodePage(
            """{"items":[{"id":"p1","question":"Q?","options":["a","b"],"status":"open","results":{"a":2,"b":1},"totalVotes":3}],"nextCursor":"c1"}""",
        )
        assertEquals("c1", cursor)
        assertTrue(polls.single().canVote())
        assertEquals(3, polls.single().totalVotes)
        try {
            LivePoll.decodePage("""{"items":[{"id":"p1","question":"Q","options":["a"],"status":"open","results":{"zzz":1},"totalVotes":1}]}""")
            fail("result for unknown option accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun attendanceSessionDecodesAndValidatesCode() {
        val session = AttendanceSession.decode(
            """{"id":"s1","course":"Algebra","code":"123456","startsAt":"2026-11-04T10:00:00Z","closesAt":"2026-11-04T10:30:00Z"}""",
        )
        assertEquals("123456", session.code)
        try {
            AttendanceSession.decode("""{"id":"s1","course":"Algebra","code":""}""")
            fail("blank code accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun portfolioProjectPageDecodesAndRejectsNonHttpsUrl() {
        val (items, cursor) = PortfolioProject.decodePage(
            """{"items":[{"id":"p1","name":"Site","detail":"d","tags":["web"],"featured":0,"url":"https://example.com"}],"nextCursor":null}""",
        )
        assertNull(cursor)
        assertEquals("web", items.single().tags.single())
        try {
            PortfolioProject.decodePage("""{"items":[{"id":"p1","name":"Site","url":"http://insecure.example"}]}""")
            fail("non-https project url accepted")
        } catch (_: IllegalArgumentException) { }
    }

    @Test fun attendanceRecordPageDecodes() {
        val (records, _) = AttendanceRecord.decodePage(
            """{"items":[{"id":"r1","dateLabel":"2026-11-03","course":"Algebra","status":"Present"}]}""",
        )
        assertEquals("Algebra", records.single().course)
    }

}