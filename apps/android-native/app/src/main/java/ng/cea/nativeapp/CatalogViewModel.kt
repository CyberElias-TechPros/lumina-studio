package ng.cea.nativeapp

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/** Native state survives rotation. Only public favourites persist; no network writes. */
data class CatalogState(
    val programs: List<Program> = emptyList(),
    val loading: Boolean = true,
    val error: Boolean = false,
    val fromCache: Boolean = false,
    val fetchedAt: Long? = null,
    val favorites: Set<String> = emptySet(),
)
class CatalogViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = CatalogRepository(application)
    private val preferences = application.getSharedPreferences("public-favorites", 0)
    private val mutable = MutableStateFlow(CatalogState(favorites = preferences.getStringSet("slugs", emptySet())!!.toSet()))
    val state = mutable.asStateFlow()
    private var running = false
    init {
        viewModelScope.launch {
            running = true
            repository.cached()?.let { mutable.value = mutable.value.copy(programs = it.programs, fetchedAt = it.fetchedAt, fromCache = true) }
            running = false
            refresh()
        }
    }
    fun refresh() {
        if (running) return
        running = true
        mutable.value = mutable.value.copy(loading = true, error = false)
        viewModelScope.launch {
            try {
                val snapshot = repository.fetch()
                mutable.value = mutable.value.copy(programs = snapshot.programs, fetchedAt = snapshot.fetchedAt, fromCache = false)
            } catch (error: CancellationException) { throw error }
            catch (_: Exception) { mutable.value = mutable.value.copy(error = true, fromCache = mutable.value.fetchedAt != null) }
            finally { mutable.value = mutable.value.copy(loading = false); running = false }
        }
    }
    fun favorite(slug: String) {
        val current = mutable.value.favorites
        val next = if (slug in current) current - slug else current + slug
        preferences.edit().putStringSet("slugs", next).apply()
        mutable.value = mutable.value.copy(favorites = next)
    }
}
