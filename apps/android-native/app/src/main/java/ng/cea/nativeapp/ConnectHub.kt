package ng.cea.nativeapp

import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.unit.dp

/** Connect tab: direct messages and notifications, both rendered natively. */
@Composable
fun ConnectHub(
    state: AccountState,
    loadMessages: (Boolean) -> Unit,
    openMessageThread: (String) -> Unit,
    closeMessageThread: () -> Unit,
    sendMessage: (String, String, () -> Unit) -> Unit,
    loadNotifications: (Boolean) -> Unit,
    markNotificationRead: (String) -> Unit,
    markAllNotificationsRead: () -> Unit,
) {
    var tab by rememberSaveable { mutableStateOf("messages") }
    val signedIn = state.session.user != null && !state.session.mfaRequired
    BackHandler(state.selectedThread != null && tab == "messages") { closeMessageThread() }

    LazyColumn(
        Modifier.fillMaxSize(),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item {
            Text("Connect", style = MaterialTheme.typography.headlineMedium, modifier = Modifier.semantics { heading() })
            Text("Direct conversations and Academy notifications.")
        }
        if (state.busy) {
            item {
                LinearProgressIndicator(Modifier.fillMaxWidth())
                Text("Checking with the Academy…")
            }
        }
        state.message?.let { message -> item { Text(message) } }
        if (!signedIn) {
            item { Text("Sign in from the Account tab to read and send messages.") }
            return@LazyColumn
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                val unread = state.notifications.count { !it.read }
                FilterChip(
                    selected = tab == "messages",
                    onClick = {
                        tab = "messages"
                        loadMessages(false)
                    },
                    label = { Text("Messages") },
                )
                FilterChip(
                    selected = tab == "alerts",
                    onClick = {
                        tab = "alerts"
                        loadNotifications(false)
                    },
                    label = { Text(if (unread > 0) "Alerts ($unread)" else "Alerts") },
                )
            }
        }
        if (tab == "messages") {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    MessagesWorkspace(
                        threads = state.messageThreads,
                        nextCursor = state.messagesNextCursor,
                        selectedThread = state.selectedThread,
                        busy = state.busy,
                        onRefresh = { loadMessages(false) },
                        onLoadMore = { loadMessages(true) },
                        onOpenThread = openMessageThread,
                        onBackToThreads = closeMessageThread,
                        onSendReply = { id, text, done -> sendMessage(id, text, done) },
                    )
                }
            }
        } else {
            item {
                Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
                    NotificationsWorkspace(
                        items = state.notifications,
                        nextCursor = state.notificationsNextCursor,
                        busy = state.busy,
                        onRefresh = { loadNotifications(false) },
                        onLoadMore = { loadNotifications(true) },
                        onMarkRead = markNotificationRead,
                        onMarkAllRead = markAllNotificationsRead,
                    )
                }
            }
        }
    }
}
