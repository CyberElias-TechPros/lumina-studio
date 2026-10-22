package ng.cea.nativeapp

import org.junit.Assert.*
import org.junit.Test

class StudentWorkspaceTest {
    @Test fun emptyEnrolmentsAreNotReplacedWithPublicCatalogue() {
        assertTrue(StudentDashboard.decode("""{"courses":[],"kpis":{"enrolled":0}}""").courses.isEmpty())
    }
    @Test fun lockedOrUnsupportedLessonCannotBeCompleted() {
        val base = StudentLesson("l1", "Lesson", "article", "preview", body = "Read this")
        assertTrue(base.completable())
        assertFalse(base.copy(status = "locked").readable())
        assertFalse(base.copy(status = "unknown").readable())
        assertFalse(base.copy(status = "locked").completable())
        assertFalse(base.copy(status = "done").completable())
        assertFalse(base.copy(type = "quiz").completable())
        assertFalse(base.copy(type = "video").completable())
        assertFalse(base.copy(body = null).completable())
        assertFalse(base.copy(id = "../escape").completable())
    }
    @Test(expected = IllegalArgumentException::class) fun invalidProgressIsRejected() {
        StudentDashboard.decode("""{"courses":[{"slug":"course","title":"Course","pct":101,"modules":[]}]}""")
    }
}
