package ng.cea.nativeapp

import org.junit.Assert.*
import org.junit.Test

class StudentAssignmentsTest {
    @Test fun assignmentPageDecodesValidItemsAndBounds() {
        val page = AssignmentPage.decode(
            """{"items":[{"id":"asg-1","title":"API architecture","course":"Backend","description":"Explain routing.","due":"2026-11-01","status":"pending","max":20,"weight":15,"rubric":[{"criterion":"Clarity","detail":"Clear structure","weight":10}]}],"nextCursor":"YXNnLTE","total":2}""",
        )
        assertEquals(1, page.items.size)
        assertEquals("YXNnLTE", page.nextCursor)
        assertEquals(20, page.items[0].max)
        assertEquals("Clarity", page.items[0].rubric.single().criterion)
        assertTrue(page.items[0].submittable(null))
    }

    @Test fun gradedAssignmentOrSubmissionBlocksNewSubmissions() {
        val openItem = StudentAssignmentItem(id = "a1", title = "Task", status = "submitted", max = 20)
        val ungradedSub = NativeSubmission(id = "s1", status = "submitted", submittedAt = "2026-10-22T10:00:00.000Z")
        val gradedSub = ungradedSub.copy(status = "graded", score = 18, feedback = "Good work")
        assertTrue(openItem.submittable(ungradedSub))
        assertFalse(openItem.submittable(gradedSub))
        assertFalse(openItem.copy(status = "graded", score = 18).submittable(null))
        assertFalse(openItem.copy(id = "../escape").submittable(null))
    }

    @Test(expected = IllegalArgumentException::class)
    fun assignmentScoreExceedingMaxIsRejected() {
        StudentAssignmentItem.decodeOne(
            """{"id":"a1","title":"Task","status":"graded","score":21,"max":20}""",
        )
    }

    @Test(expected = IllegalArgumentException::class)
    fun submissionScoreExceedingMaxIsRejected() {
        NativeSubmission.decode(
            """{"id":"s1","status":"graded","score":25,"submittedAt":"2026-10-22T10:00:00.000Z"}""",
            maxScore = 20,
        )
    }

    @Test(expected = IllegalArgumentException::class)
    fun mismatchedSubmissionReceiptAssignmentIsRejected() {
        SubmissionReceipt.decode(
            """{"id":"s1","assignmentId":"other","status":"submitted","submittedAt":"2026-10-22T10:00:00.000Z"}""",
            expectedAssignmentId = "a1",
        )
    }
}
