package ng.cea.nativeapp
import org.junit.Assert.*
import org.junit.Test

class CatalogTest {
    @Test fun parsesTheExistingApiWithoutDependingOnLegacyPriceOrRatingFields() {
        val page = CatalogCodec.page("""{"items":[{"slug":"office","title":"Office skills","price":999,"rating":5,"outcomes":["Write a document"]}],"total":1,"nextCursor":"b2ZmaWNl"}""")
        assertEquals("Office skills", page.items.single().title)
        assertEquals(listOf("Write a document"), page.items.single().outcomes)
    }
    @Test fun searchIsCaseInsensitiveAndIncludesCategories() {
        val values = listOf(Program("office","Office skills",category="Business"),Program("code","Web development"))
        assertEquals(listOf(values[0]),CatalogCodec.search(values," BUSINESS "))
        assertEquals(values,CatalogCodec.search(values,""))
        assertTrue(CatalogCodec.search(values,"missing").isEmpty())
    }
    @Test(expected = IllegalArgumentException::class) fun rejectsBlankIdentity() {
        CatalogCodec.page("""{"items":[{"slug":"","title":"Course"}]}""")
    }
    @Test(expected = IllegalArgumentException::class) fun rejectsOversizedPages() {
        val item = """{"slug":"course","title":"Course"}"""
        CatalogCodec.page("""{"items":[${List(51) { item }.joinToString()}]}""")
    }
}
