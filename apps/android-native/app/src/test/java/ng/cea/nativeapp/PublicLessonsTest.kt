package ng.cea.nativeapp

import org.junit.Assert.*
import org.junit.Test

class PublicLessonsTest {
    private val valid = """{"version":1,"posts":[{"slug":"intro","title":"Computer basics","body":[{"type":"p","text":"Start here"}]}]}"""
    @Test fun decodesPublicTextAndSearchesWithoutNetwork() {
        val lessons = LessonCodec.decode(valid)
        assertEquals("Start here", lessons.single().body.single().text)
        assertEquals(lessons, LessonCodec.search(lessons, " COMPUTER "))
        assertTrue(LessonCodec.search(lessons, "missing").isEmpty())
    }
    @Test(expected = IllegalArgumentException::class) fun rejectsUnsupportedVersion() {
        LessonCodec.decode(valid.replace("\"version\":1", "\"version\":2"))
    }
    @Test(expected = IllegalArgumentException::class) fun rejectsNonNativeBlocks() {
        LessonCodec.decode(valid.replace("\"type\":\"p\"", "\"type\":\"html\""))
    }
    @Test(expected = IllegalArgumentException::class) fun rejectsRemoteFigures() {
        LessonCodec.decode(valid.replace("{\"type\":\"p\",\"text\":\"Start here\"}", "{\"type\":\"figure\",\"src\":\"https://example.com/image.jpg\"}"))
    }
}
