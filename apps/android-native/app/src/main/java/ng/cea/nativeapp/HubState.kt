package ng.cea.nativeapp

/** Home tab: role-scoped portal summary, unread badge, AI recommendations. */
data class HomeState(
    val portal: PortalSummary? = null,
    val unread: Int? = null,
    val recommendations: List<AiRecommendation> = emptyList(),
    val loaded: Boolean = false,
)

/** Learn tab extras beyond courses/assignments/assessments (which live in the student dashboard). */
data class LearnExtrasState(
    val coursesList: List<StudentCourse> = emptyList(),
    val coursesCursor: String? = null,
    val coursesLoaded: Boolean = false,
    val gradebook: List<GradebookEntry> = emptyList(),
    val gradebookCursor: String? = null,
    val gradebookLoaded: Boolean = false,
    val certificates: List<CertificateItem> = emptyList(),
    val certificatesLoaded: Boolean = false,
    val calendar: List<CalendarEventItem> = emptyList(),
    val calendarCursor: String? = null,
    val calendarLoaded: Boolean = false,
    val lastCheckIn: AttendanceCheckInResult? = null,
    val paymentHistory: List<PaymentHistoryItem> = emptyList(),
    val paymentCursor: String? = null,
    val paymentsLoaded: Boolean = false,
)

/** Live classes hub: list + selected class chat. */
data class LiveHubState(
    val classes: List<LiveClassItem> = emptyList(),
    val nextCursor: String? = null,
    val loaded: Boolean = false,
    val selectedId: String? = null,
    val selected: LiveClassItem? = null,
    val chat: List<LiveChatMessage> = emptyList(),
    val chatCursor: String? = null,
    val chatLoaded: Boolean = false,
)

/** Career engine hub: mentors, jobs, talent pool, interviews. */
data class CareerState(
    val mentors: List<MentorProfile> = emptyList(),
    val mentorsCursor: String? = null,
    val mentorsLoaded: Boolean = false,
    val match: MentorMatch? = null,
    val jobs: List<JobPosting> = emptyList(),
    val jobsCursor: String? = null,
    val jobsLoaded: Boolean = false,
    val talent: List<TalentCandidate> = emptyList(),
    val talentCursor: String? = null,
    val talentLoaded: Boolean = false,
    val interviews: List<InterviewItem> = emptyList(),
    val interviewsCursor: String? = null,
    val interviewsLoaded: Boolean = false,
)

/** Discover tab: public cohorts, library, shop, certificate verification, AI tutor. */
data class DiscoverState(
    val cohorts: List<CohortItem> = emptyList(),
    val cohortsLoaded: Boolean = false,
    val nextCohort: CohortNext? = null,
    val nextCohortLoaded: Boolean = false,
    val librarySources: List<LibrarySource> = emptyList(),
    val libraryItems: List<LibraryItem> = emptyList(),
    val libraryCursor: String? = null,
    val libraryLoaded: Boolean = false,
    val libraryAuthed: Boolean = false,
    val shop: ShopCatalog? = null,
    val shopLoaded: Boolean = false,
    val verification: CertificateVerification? = null,
    val assistant: List<AssistantTurn> = emptyList(),
)
