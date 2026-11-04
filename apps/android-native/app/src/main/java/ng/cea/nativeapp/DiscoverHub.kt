package ng.cea.nativeapp

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import java.text.DateFormat
import java.util.Date
import java.util.Locale

/**
 * Discover tab: everything public and explorable — the course catalogue, free bundled
 * lessons, intake cohorts, the library, the digital shop, career opportunities and
 * certificate verification. All rendered natively.
 */
@Composable
fun DiscoverHub(
    state: AccountState,
    catalog: CatalogState,
    refreshCatalog: () -> Unit,
    favorite: (String) -> Unit,
    onApply: (String) -> Unit,
    callAcademy: () -> Unit,
    loadCohorts: () -> Unit,
    loadLibraryCatalog: (Boolean) -> Unit,
    loadLibraryAuthed: (Boolean) -> Unit,
    loadShop: () -> Unit,
    verifyCertificate: (String) -> Unit,
    loadMentors: (Boolean) -> Unit,
    requestMentor: (String, String) -> Unit,
    matchMentor: (String) -> Unit,
    loadJobs: (Boolean) -> Unit,
    loadTalentPool: (Boolean) -> Unit,
    loadInterviews: (Boolean) -> Unit,
    initialSection: String? = null,
    onConsumeSection: () -> Unit = {},
) {
    var section by rememberSaveable { mutableStateOf(initialSection) }
    LaunchedEffect(initialSection) { if (initialSection != null) onConsumeSection() }
    BackHandler(section != null) { section = null }

    when (section) {
        "explore" -> ExploreBrowser(
            catalog = catalog,
            refresh = refreshCatalog,
            favorite = favorite,
            onApply = { slug -> section = null; onApply(slug) },
            callAcademy = callAcademy,
            onBack = { section = null },
        )
        "lessons" -> {
            BackHandler(true) { section = null }
            Column(Modifier.fillMaxSize()) {
                OutlinedButton(onClick = { section = null }, Modifier.padding(16.dp)) { Text("Back to Discover") }
                Box(Modifier.weight(1f)) { BundledLessons() }
            }
        }
        "cohorts" -> CohortsSection(state, onBack = { section = null }, onLoad = loadCohorts, onApply = { section = null; onApply(it) }, onShareIcs = shareCohortIcs, programs = catalog.programs)
        "library" -> LibrarySection(
            state = state,
            onBack = { section = null },
            onLoadCatalog = loadLibraryCatalog,
            onLoadAuthed = loadLibraryAuthed,
        )
        "shop" -> ShopSection(state, onBack = { section = null }, onLoad = loadShop)
        "verify" -> VerifyCertificateSection(state, onBack = { section = null }, onVerify = verifyCertificate)
        "career" -> CareerSection(
            state = state,
            onBack = { section = null },
            loadMentors = loadMentors,
            requestMentor = requestMentor,
            matchMentor = matchMentor,
            loadJobs = loadJobs,
            loadTalentPool = loadTalentPool,
            loadInterviews = loadInterviews,
        )
        else -> {
            LazyColumn(
                Modifier.fillMaxSize(),
                contentPadding = PaddingValues(20.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
            ) {
                item {
                    Text("Discover", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() })
                    Text("Explore programmes, free lessons, intakes, resources and opportunities — all native, no browser.")
                }
                if (state.busy) {
                    item {
                        LinearProgressIndicator(Modifier.fillMaxWidth())
                        Text("Checking with the Academy…")
                    }
                }
                state.message?.let { message -> item { Text(message) } }
                item { DiscoverCard("Course catalogue", "${catalog.programs.size} public programmes with outcomes and tools.", { section = "explore" }) }
                item { DiscoverCard("Free public lessons", "Bundled learning notes that work fully offline.", { section = "lessons" }) }
                item { DiscoverCard("Intake cohorts", "Upcoming start dates, days, times and modes.", { section = "cohorts" }, onFirstOpen = { if (!state.discover.cohortsLoaded) loadCohorts() }) }
                item { DiscoverCard("Resource library", "Public reading list; sign in for protected course materials.", { section = "library" }, onFirstOpen = { if (!state.discover.libraryLoaded) loadLibraryCatalog(false) }) }
                item { DiscoverCard("Digital shop", "Official digital products and templates.", { section = "shop" }, onFirstOpen = { if (!state.discover.shopLoaded) loadShop() }) }
                item { DiscoverCard("Opportunities & mentors", "Jobs, talent pool, interviews and mentor matching.", { section = "career" }) }
                item { DiscoverCard("Verify a certificate", "Confirm an official certificate code.", { section = "verify" }) }
                item { OutlinedButton(onClick = callAcademy, modifier = Modifier.fillMaxWidth()) { Text("Call the Academy") } }
            }
        }
    }
}

@Composable
private fun DiscoverCard(title: String, subtitle: String, onClick: () -> Unit, onFirstOpen: () -> Unit = {}) {
    Card(
        Modifier
            .fillMaxWidth()
            .clickable { onFirstOpen(); onClick() },
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
            Text(subtitle, style = MaterialTheme.typography.bodySmall)
            Text("Open", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
        }
    }
}

/** Course catalogue browser with search, saved filter, detail view and apply handoff. */
@Composable
fun ExploreBrowser(
    catalog: CatalogState,
    refresh: () -> Unit,
    favorite: (String) -> Unit,
    onApply: (String) -> Unit,
    callAcademy: () -> Unit,
    onBack: () -> Unit,
) {
    var query by rememberSaveable { mutableStateOf("") }
    var savedOnly by rememberSaveable { mutableStateOf(false) }
    var selectedSlug by rememberSaveable { mutableStateOf<String?>(null) }
    val selected = catalog.programs.firstOrNull { it.slug == selectedSlug }
    BackHandler(selectedSlug != null) { selectedSlug = null }

    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        if (selected != null) {
            item { Text(selected.title, style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
            item {
                Text(
                    listOf(selected.level, selected.duration, selected.mode)
                        .filter { it.isNotBlank() }
                        .joinToString(" · "),
                )
            }
            item { SelectionContainer { Text(selected.blurb) } }
            if (catalog.fromCache) {
                item { Text("Saved public information. Reconnect to check the latest details.") }
            }
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Button(onClick = { favorite(selected.slug) }) {
                        Text(if (selected.slug in catalog.favorites) "Remove from saved courses" else "Save course")
                    }
                    OutlinedButton(onClick = { onApply(selected.slug) }) { Text("Apply for this course") }
                }
            }
            if (selected.outcomes.isNotEmpty()) {
                item { Text("What you can work towards", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                items(selected.outcomes) { outcome -> Text("• $outcome") }
            }
            if (selected.tools.isNotEmpty()) {
                item { Text("Tools: ${selected.tools.joinToString()}") }
            }
            item {
                Text("Applications are free. Official tuition offers, transfer verification and receipts are confirmed directly on CEA servers.")
            }
            item { OutlinedButton(onClick = callAcademy) { Text("Call the Academy") } }
            return@LazyColumn
        }
        item { Text("Course catalogue", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        item { Text("What would you like to learn?") }
        item {
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                label = { Text("Search courses") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            )
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(selected = !savedOnly, onClick = { savedOnly = false }, label = { Text("All courses") })
                FilterChip(selected = savedOnly, onClick = { savedOnly = true }, label = { Text("Saved") })
            }
        }
        item {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                if (catalog.loading) {
                    LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
                    Text("Checking the public catalogue…")
                }
                if (catalog.error) {
                    Text(
                        if (catalog.fetchedAt != null) {
                            "Could not refresh. Showing saved public information."
                        } else {
                            "Couldn't load courses. Check your connection and try again."
                        },
                    )
                }
                catalog.fetchedAt?.let {
                    Text(
                        (if (catalog.fromCache) "Saved copy • " else "Last checked • ") +
                            DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT).format(Date(it)),
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
            }
        }
        item { OutlinedButton(onClick = refresh, enabled = !catalog.loading) { Text("Refresh catalogue") } }
        val visible = CatalogCodec.search(catalog.programs.filter { !savedOnly || it.slug in catalog.favorites }, query)
        if (visible.isEmpty() && !catalog.loading) {
            item {
                Text(
                    when {
                        catalog.error && catalog.fetchedAt == null -> "No saved catalogue is available on this phone yet."
                        query.isNotBlank() -> "No matching courses. Try a different word or clear your search."
                        savedOnly -> "No saved courses yet. Open a course in All courses and choose Save course."
                        else -> "No courses are currently listed by the API. Contact the Academy for guidance."
                    },
                )
            }
        }
        items(visible, key = { it.slug }) { program ->
            OutlinedCard(onClick = { selectedSlug = program.slug }, modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    if (program.category.isNotBlank()) {
                        Text(program.category, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                    }
                    Text(program.title, style = MaterialTheme.typography.titleLarge)
                    Text(program.blurb, maxLines = 3)
                    Text(
                        listOf(program.level, program.duration).filter { it.isNotBlank() }.joinToString(" · "),
                        style = MaterialTheme.typography.bodySmall,
                    )
                    Text(
                        if (program.slug in catalog.favorites) "Saved • View course" else "View course",
                        color = MaterialTheme.colorScheme.primary,
                    )
                }
            }
        }
    }
}

@Composable
private fun CohortsSection(
    state: AccountState,
    onBack: () -> Unit,
    onLoad: () -> Unit,
    onApply: (String) -> Unit,
    onShareIcs: (String) -> Unit,
    programs: List<Program>,
) {
    var programFilter by rememberSaveable { mutableStateOf<String?>(null) }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        item { Text("Intake cohorts", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        item { Text("Upcoming scheduled intakes published by the Academy. Applications are free.") }
        item { OutlinedButton(onClick = onLoad, enabled = !state.busy) { Text("Refresh intakes") } }
        if (state.discover.cohortsFromCache) {
            item { Text("You are offline — showing the last saved copy of the intake list.", color = MaterialTheme.colorScheme.secondary, style = MaterialTheme.typography.bodySmall) }
        }
        val next = state.discover.nextCohort?.cohort
        val nextIcs = state.discover.nextCohort?.ics
        if (next != null) {
            item {
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Next intake: ${next.label}", fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
                        Text(cohortMeta(next))
                        if (next.enrollmentOpen) {
                            Button(onClick = { onApply(next.programSlug.ifBlank { "" }) }, enabled = next.programSlug.isNotBlank()) { Text("Apply for this intake") }
                        } else {
                            Text("Enrolment for this intake is closed.", color = MaterialTheme.colorScheme.error)
                        }
                        if (!nextIcs.isNullOrBlank()) {
                            OutlinedButton(onClick = { onShareIcs(nextIcs) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) {
                                Text("Share intake invite (.ics)")
                            }
                        }
                    }
                }
            }
        }
        if (programs.isNotEmpty()) {
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(selected = programFilter == null, onClick = { programFilter = null }, label = { Text("All") })
                    programs.take(4).forEach { p ->
                        FilterChip(
                            selected = programFilter == p.slug,
                            onClick = { programFilter = if (programFilter == p.slug) null else p.slug },
                            label = { Text(p.title.take(18)) },
                        )
                    }
                }
            }
        }
        val cohorts = state.discover.cohorts.filter { programFilter == null || it.programSlug == programFilter }
        if (state.discover.cohortsLoaded && cohorts.isEmpty()) {
            item { Text("No upcoming intakes match this filter right now.") }
        }
        items(cohorts, key = { "cohort-${it.id}" }) { cohort ->
            OutlinedCard(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(cohort.label, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(cohortMeta(cohort))
                    if (cohort.notes.isNotBlank()) Text(cohort.notes, style = MaterialTheme.typography.bodySmall)
                    Text(
                        if (cohort.enrollmentOpen) "Enrolment open • ${cohort.status}" else "Enrolment closed • ${cohort.status}",
                        color = if (cohort.enrollmentOpen) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                        style = MaterialTheme.typography.labelMedium,
                    )
                }
            }
        }
    }
}

private fun cohortMeta(cohort: CohortItem): String =
    listOfNotNull(
        cohort.startDate.ifBlank { null }?.let { "Starts $it" },
        cohort.endDate.ifBlank { null }?.let { "ends $it" },
        cohort.days.ifBlank { null },
        listOfNotNull(cohort.timeSlot.ifBlank { null }, cohort.startTime.ifBlank { null }).joinToString(" ").ifBlank { null },
        cohort.mode.ifBlank { null }?.replaceFirstChar { it.titlecase(Locale.US) },
        if (cohort.capacity > 0) "Capacity ${cohort.capacity}" else null,
    ).joinToString(" • ")

@Composable
private fun LibrarySection(
    state: AccountState,
    onBack: () -> Unit,
    onLoadCatalog: (Boolean) -> Unit,
    onLoadAuthed: (Boolean) -> Unit,
) {
    val discover = state.discover
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        item { Text("Resource library", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        if (discover.librarySources.isNotEmpty()) {
            item { Text("Public sources", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
            items(discover.librarySources, key = { "src-${it.key}" }) { source ->
                Text("• ${source.name.ifBlank { source.key }} — ${source.itemCount} item${if (source.itemCount == 1) "" else "s"}")
            }
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = { onLoadCatalog(false) }, enabled = !state.busy) { Text("Refresh public items") }
                if (state.session.user != null && !state.session.mfaRequired) {
                    Button(onClick = { onLoadAuthed(false) }, enabled = !state.busy) { Text("Include my course materials") }
                }
            }
        }
        if (!discover.libraryAuthed) {
            item { Text("Showing public items only. Sign in to also see protected course materials.", style = MaterialTheme.typography.bodySmall) }
        }
        val items = discover.libraryItems
        if (discover.libraryFromCache) {
            item { Text("You are offline — showing the last saved copy of the library.", color = MaterialTheme.colorScheme.secondary, style = MaterialTheme.typography.bodySmall) }
        }
        if (discover.libraryLoaded && items.isEmpty()) {
            item { Text("The public library is empty right now.") }
        }
        items(items, key = { "lib-${it.id}" }) { item ->
            OutlinedCard(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(item.name, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f))
                        if (item.isProtected) {
                            Text("Protected", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.error)
                        }
                    }
                    Text(
                        listOfNotNull(item.folderPath.ifBlank { null }, item.kind).joinToString(" • "),
                        style = MaterialTheme.typography.bodySmall,
                    )
                    if (item.url.isNotBlank()) Text("Opens the official resource link.", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
                }
            }
        }
        if (discover.libraryCursor != null) {
            item { OutlinedButton(onClick = { if (discover.libraryAuthed) onLoadAuthed(true) else onLoadCatalog(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more items") } }
        }
    }
}

@Composable
private fun ShopSection(state: AccountState, onBack: () -> Unit, onLoad: () -> Unit) {
    val context = LocalContext.current
    val shop = state.discover.shop
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        item { Text("Digital shop", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        item {
            Text(
                "Official digital products from the Academy. The catalog below is native; checkout is completed on the official CEA store to keep your card details on the hosted payment page.",
            )
        }
        item { OutlinedButton(onClick = onLoad, enabled = !state.busy) { Text("Refresh shop") } }
        if (state.discover.shopFromCache) {
            item { Text("You are offline — showing the last saved copy of the shop catalog.", color = MaterialTheme.colorScheme.secondary, style = MaterialTheme.typography.bodySmall) }
        }
        if (state.discover.shopLoaded && (shop == null || shop.products.isEmpty())) {
            item { Text("No digital products are on sale right now.") }
        }
        shop?.products?.forEach { product ->
            OutlinedCard(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text(product.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                    Text(
                        String.format(Locale.US, "%s %,.0f", product.priceCurrency.ifBlank { "NGN" }, product.price),
                        color = MaterialTheme.colorScheme.primary,
                        fontWeight = FontWeight.Medium,
                    )
                    if (product.shortDescription.isNotBlank()) Text(product.shortDescription)
                    if (product.highlights.isNotEmpty()) {
                        product.highlights.forEach { Text("• $it", style = MaterialTheme.typography.bodySmall) }
                    }
                    val meta = listOfNotNull(
                        product.fileFormat.ifBlank { null },
                        if (product.deliveryHours > 0) "Delivery within ${product.deliveryHours}h" else null,
                        product.license.ifBlank { null },
                    ).joinToString(" • ")
                    if (meta.isNotBlank()) Text(meta, style = MaterialTheme.typography.bodySmall)
                    Text(
                        when (product.availability) {
                            "in_stock" -> "In stock"
                            "preorder" -> "Preorder"
                            else -> "Currently unavailable"
                        },
                        style = MaterialTheme.typography.labelMedium,
                        color = if (product.purchasable()) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                    )
                    if (product.purchasable() && shop.storeUrl.isNotBlank()) {
                        OutlinedButton(onClick = {
                            try {
                                context.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(shop.storeUrl)))
                            } catch (_: ActivityNotFoundException) {
                                Toast.makeText(context, "Open ${shop.storeUrl} in your browser to complete purchase.", Toast.LENGTH_LONG).show()
                            }
                        }) { Text("Buy on the official store") }
                    }
                }
            }
        }
    }
}

@Composable
private fun VerifyCertificateSection(state: AccountState, onBack: () -> Unit, onVerify: (String) -> Unit) {
    var code by rememberSaveable { mutableStateOf("") }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        item { Text("Verify a certificate", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        item { Text("Enter an official certificate code to confirm it against Academy records. This check is public — no account needed.") }
        item {
            OutlinedTextField(
                value = code,
                onValueChange = { code = it.uppercase(Locale.US).take(64).filter { c -> c.isLetterOrDigit() || c == '-' } },
                label = { Text("Certificate code") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
        }
        item {
            Button(
                onClick = { onVerify(code); },
                enabled = !state.busy && code.trim().length >= 8,
                modifier = Modifier.fillMaxWidth(),
            ) { Text("Verify certificate") }
        }
        state.discover.verification?.let { result ->
            item {
                Card(Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(
                            if (result.valid) "Valid certificate" else "Not valid",
                            style = MaterialTheme.typography.titleMedium,
                            color = if (result.valid) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                            fontWeight = FontWeight.SemiBold,
                        )
                        if (result.valid) {
                            Text("Title: ${result.title.orEmpty()}")
                            Text("Code: ${result.code.orEmpty()}")
                            if (!result.issuedAt.isNullOrBlank()) Text("Issued: ${result.issuedAt}", style = MaterialTheme.typography.bodySmall)
                        } else if (result.message.isNotBlank()) {
                            Text(result.message)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun CareerSection(
    state: AccountState,
    onBack: () -> Unit,
    loadMentors: (Boolean) -> Unit,
    requestMentor: (String, String) -> Unit,
    matchMentor: (String) -> Unit,
    loadJobs: (Boolean) -> Unit,
    loadTalentPool: (Boolean) -> Unit,
    loadInterviews: (Boolean) -> Unit,
    loadPortfolioProjects: (Boolean) -> Unit = { _ -> },
    addPortfolioProject: (String, String, List<String>, String) -> Unit = { _, _, _, _ -> },
) {
    var tab by rememberSaveable { mutableStateOf("mentors") }
    val isStudent = state.session.user?.roleKey == "student" && !state.session.mfaRequired
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
        item { OutlinedButton(onClick = onBack) { Text("Back to Discover") } }
        item { Text("Opportunities & mentors", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() }) }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                val tabs = buildList {
                    add("mentors" to "Mentors")
                    add("jobs" to "Jobs")
                    add("talent" to "Talent pool")
                    add("interviews" to "Interviews")
                    if (isStudent) add("portfolio" to "My portfolio")
                }
                tabs.forEach { (key, label) ->
                    FilterChip(
                        selected = tab == key,
                        onClick = {
                            tab = key
                            when (key) {
                                "mentors" -> if (!state.career.mentorsLoaded) loadMentors(false)
                                "jobs" -> if (!state.career.jobsLoaded) loadJobs(false)
                                "talent" -> if (!state.career.talentLoaded) loadTalentPool(false)
                                "interviews" -> if (!state.career.interviewsLoaded) loadInterviews(false)
                                "portfolio" -> if (!state.career.projectsLoaded) loadPortfolioProjects(false)
                            }
                        },
                        label = { Text(label) },
                    )
                }
            }
        }
        when (tab) {
            "mentors" -> {
                item { Text("Find a mentor", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                var goal by rememberSaveable { mutableStateOf("") }
                item {
                    OutlinedTextField(
                        value = goal,
                        onValueChange = { if (it.length <= 500) goal = it },
                        label = { Text("Your goal (used for matching)") },
                        minLines = 2,
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Button(onClick = { matchMentor(goal) }, enabled = !state.busy && goal.trim().isNotEmpty()) { Text("Match me") }
                        OutlinedButton(onClick = { loadMentors(false) }, enabled = !state.busy) { Text("Refresh mentors") }
                    }
                }
                state.career.match?.let { match ->
                    if (match.matches.isEmpty()) {
                        item { Text("No strong mentor match yet — try a more specific goal, or browse all mentors below.") }
                    } else {
                        item { Text("Suggested mentors", style = MaterialTheme.typography.titleMedium) }
                        items(match.matches, key = { "match-${it.id}" }) { mentor ->
                            MentorCard(mentor, state.busy, onRequest = { g -> requestMentor(mentor.id, g.ifBlank { goal }) })
                        }
                    }
                }
                item { HorizontalDivider() }
                item { Text("All mentors (${state.career.mentors.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() }) }
                if (state.career.mentorsLoaded && state.career.mentors.isEmpty()) {
                    item { Text("No mentor profiles are published yet.") }
                }
                items(state.career.mentors, key = { "mentor-${it.id}" }) { mentor ->
                    MentorCard(mentor, state.busy, onRequest = { g -> requestMentor(mentor.id, g.ifBlank { goal }) })
                }
                if (state.career.mentorsCursor != null) {
                    item { OutlinedButton(onClick = { loadMentors(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more mentors") } }
                }
            }
            "jobs" -> {
                item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text("Job postings (${state.career.jobs.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                    OutlinedButton(onClick = { loadJobs(false) }, enabled = !state.busy) { Text("Refresh") }
                } }
                if (state.career.jobsLoaded && state.career.jobs.isEmpty()) {
                    item { Text("No postings visible to your role right now.") }
                }
                items(state.career.jobs, key = { "job-${it.id}" }) { job ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(job.title, fontWeight = FontWeight.SemiBold)
                            if (job.detail.isNotBlank()) Text(job.detail, maxLines = 4, style = MaterialTheme.typography.bodySmall)
                            Text(
                                listOfNotNull(job.posted.ifBlank { null }, job.status.ifBlank { null }, "${job.applicants} applicants", "${job.views} views").joinToString(" • "),
                                style = MaterialTheme.typography.labelSmall,
                            )
                        }
                    }
                }
                if (state.career.jobsCursor != null) {
                    item { OutlinedButton(onClick = { loadJobs(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more") } }
                }
            }
            "talent" -> {
                item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text("Talent pool (${state.career.talent.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                    OutlinedButton(onClick = { loadTalentPool(false) }, enabled = !state.busy) { Text("Refresh") }
                } }
                if (state.career.talentLoaded && state.career.talent.isEmpty()) {
                    item { Text("The talent pool is empty right now.") }
                }
                items(state.career.talent, key = { "talent-${it.id}" }) { candidate ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(candidate.name.ifBlank { "Candidate" }, fontWeight = FontWeight.SemiBold)
                            if (candidate.program.isNotBlank()) Text(candidate.program, style = MaterialTheme.typography.bodySmall)
                            Text(
                                "Match ${candidate.match}% • Score ${String.format(Locale.US, "%.0f", candidate.score)} • ${candidate.stage}" +
                                    if (candidate.isAvailable()) " • Available" else "",
                                color = MaterialTheme.colorScheme.primary,
                                style = MaterialTheme.typography.labelMedium,
                            )
                            if (candidate.skills.isNotEmpty()) Text(candidate.skills.joinToString(", "), style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
                if (state.career.talentCursor != null) {
                    item { OutlinedButton(onClick = { loadTalentPool(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more") } }
                }
            }
            "interviews" -> {
                item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text("Interviews (${state.career.interviews.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                    OutlinedButton(onClick = { loadInterviews(false) }, enabled = !state.busy) { Text("Refresh") }
                } }
                if (state.career.interviewsLoaded && state.career.interviews.isEmpty()) {
                    item { Text("No interviews scheduled.") }
                }
                items(state.career.interviews, key = { "iv-${it.id}" }) { interview ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(interview.role.ifBlank { "Interview" }, fontWeight = FontWeight.SemiBold)
                            Text(
                                listOfNotNull(interview.candidate.ifBlank { null }, interview.date.ifBlank { null }, interview.mode.ifBlank { null }, interview.status.ifBlank { null })
                                    .joinToString(" • "),
                                style = MaterialTheme.typography.bodySmall,
                            )
                        }
                    }
                }
                if (state.career.interviewsCursor != null) {
                    item { OutlinedButton(onClick = { loadInterviews(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more") } }
                }
            }
            "portfolio" -> {
                item { Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                    Text("My portfolio (${state.career.projects.size})", style = MaterialTheme.typography.titleLarge, modifier = Modifier.semantics { heading() })
                    OutlinedButton(onClick = { loadPortfolioProjects(false) }, enabled = !state.busy) { Text("Refresh") }
                } }
                item { Text("Projects you publish to your student portfolio. Recruiters with access can see these.") }
                if (state.career.projectsLoaded && state.career.projects.isEmpty()) {
                    item { Text("No projects yet — add your first one below.") }
                }
                items(state.career.projects, key = { "proj-${it.id}" }) { project ->
                    Card(Modifier.fillMaxWidth()) {
                        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                            Text(project.name, fontWeight = FontWeight.SemiBold)
                            if (project.detail.isNotBlank()) Text(project.detail, maxLines = 4, style = MaterialTheme.typography.bodySmall)
                            if (project.tags.isNotEmpty()) Text(project.tags.joinToString(", "), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.secondary)
                            if (project.url.isNotBlank()) Text(project.url, style = MaterialTheme.typography.labelSmall)
                            if (project.featured != 0) Text("Featured", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
                        }
                    }
                }
                if (state.career.projectsCursor != null) {
                    item { OutlinedButton(onClick = { loadPortfolioProjects(true) }, enabled = !state.busy, modifier = Modifier.fillMaxWidth()) { Text("Load more") } }
                }
                item { HorizontalDivider() }
                item { Text("Add a project", style = MaterialTheme.typography.titleMedium) }
                var name by rememberSaveable { mutableStateOf("") }
                var detail by rememberSaveable { mutableStateOf("") }
                var tags by rememberSaveable { mutableStateOf("") }
                var url by rememberSaveable { mutableStateOf("") }
                item {
                    OutlinedTextField(
                        value = name,
                        onValueChange = { if (it.length <= 160) name = it },
                        label = { Text("Project name") },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    OutlinedTextField(
                        value = detail,
                        onValueChange = { if (it.length <= 2000) detail = it },
                        label = { Text("What you built and achieved") },
                        minLines = 3,
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    OutlinedTextField(
                        value = tags,
                        onValueChange = { if (it.length <= 300) tags = it },
                        label = { Text("Skills tags, comma separated") },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    OutlinedTextField(
                        value = url,
                        onValueChange = { if (it.length <= 2000) url = it },
                        label = { Text("Link (https://…) — optional") },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
                item {
                    Button(
                        onClick = {
                            addPortfolioProject(
                                name,
                                detail,
                                tags.split(',').map { it.trim() }.filter { it.isNotEmpty() },
                                url,
                            )
                            name = ""; detail = ""; tags = ""; url = ""
                        },
                        enabled = !state.busy && name.trim().isNotEmpty() && detail.trim().isNotEmpty(),
                        modifier = Modifier.fillMaxWidth(),
                    ) { Text("Add to portfolio") }
                }
            }
        }
    }
}

@Composable
private fun MentorCard(mentor: MentorProfile, busy: Boolean, onRequest: (String) -> Unit) {
    var goal by remember(mentor.id) { mutableStateOf("") }
    var confirm by remember { mutableStateOf(false) }
    if (confirm) {
        AlertDialog(
            onDismissRequest = { if (!busy) confirm = false },
            title = { Text("Request mentorship?") },
            text = { Text("Send a mentorship request to ${mentor.name}? Your goal: ${goal.ifBlank { "(from the goal field above)" }}") },
            confirmButton = {
                Button(onClick = { confirm = false; onRequest(goal) }, enabled = !busy) { Text("Send request") }
            },
            dismissButton = { TextButton(onClick = { confirm = false }, enabled = !busy) { Text("Cancel") } },
        )
    }
    Card(Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(mentor.name, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
                if (mentor.match != null) Text("Match ${mentor.match}%", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
            }
            if (mentor.focus.isNotBlank()) Text(mentor.focus, style = MaterialTheme.typography.bodyMedium)
            if (mentor.bio.isNotBlank()) Text(mentor.bio, maxLines = 3, style = MaterialTheme.typography.bodySmall)
            val chips = (mentor.areas + mentor.skills).distinct().take(6)
            if (chips.isNotEmpty()) Text(chips.joinToString(" • "), style = MaterialTheme.typography.labelSmall)
            Text(
                listOfNotNull(
                    mentor.availability.ifBlank { null },
                    "${String.format(Locale.US, "%.1f", mentor.rating)} rating",
                    "${mentor.sessionsCount} sessions",
                ).joinToString(" • "),
                style = MaterialTheme.typography.bodySmall,
            )
            OutlinedTextField(
                value = goal,
                onValueChange = { if (it.length <= 500) goal = it },
                label = { Text("Your goal for this mentor") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            Button(onClick = { confirm = true }, enabled = !busy && goal.trim().length >= 1, modifier = Modifier.fillMaxWidth()) {
                Text("Request mentorship")
            }
        }
    }
}
