package ng.cea.nativeapp

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.heading
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

@Composable
fun ColumnScope.MessagesWorkspace(
    threads: List<MessageThread>,
    nextCursor: String?,
    selectedThread: MessageThread?,
    busy: Boolean,
    onRefresh: () -> Unit,
    onLoadMore: () -> Unit,
    onOpenThread: (String) -> Unit,
    onBackToThreads: () -> Unit,
    onSendReply: (String, String, () -> Unit) -> Unit,
) {
    if (selectedThread != null) {
        var replyDraft by remember(selectedThread.id) { mutableStateOf("") }
        OutlinedButton(onClick = onBackToThreads, enabled = !busy) { Text("All conversations") }
        Card(Modifier.fillMaxWidth()) {
            Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Text(
                    selectedThread.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.semantics { heading() },
                )
                if (selectedThread.role.isNotBlank()) {
                    Text(selectedThread.role, style = MaterialTheme.typography.bodyMedium, color = MaterialTheme.colorScheme.secondary)
                }
                if (selectedThread.messages.isEmpty()) {
                    Text("No messages in this conversation yet.")
                } else {
                    selectedThread.messages.forEach { msg ->
                        Surface(
                            color = if (msg.mine) MaterialTheme.colorScheme.secondaryContainer else MaterialTheme.colorScheme.surfaceVariant,
                            shape = MaterialTheme.shapes.small,
                            modifier = Modifier.fillMaxWidth(),
                        ) {
                            SelectionContainer {
                                Column(Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                    Text(
                                        if (msg.mine) "You • ${msg.time}" else "${selectedThread.name} • ${msg.time}",
                                        style = MaterialTheme.typography.labelSmall,
                                    )
                                    Text(msg.text, style = MaterialTheme.typography.bodyMedium)
                                }
                            }
                        }
                    }
                }
                OutlinedTextField(
                    value = replyDraft,
                    onValueChange = { if (it.length <= 5_000) replyDraft = it },
                    label = { Text("Reply message") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 3,
                )
                val trimmed = replyDraft.trim()
                Button(
                    onClick = { onSendReply(selectedThread.id, trimmed) { replyDraft = "" } },
                    enabled = !busy && trimmed.isNotEmpty(),
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Text("Send reply")
                }
            }
        }
        return
    }

    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Direct conversations (${threads.size})", style = MaterialTheme.typography.titleMedium, modifier = Modifier.semantics { heading() })
        OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh messages") }
    }
    if (threads.isEmpty()) {
        Card(Modifier.fillMaxWidth()) {
            Text("No message conversations yet.", Modifier.padding(16.dp))
        }
    } else {
        threads.forEach { thread ->
            val preview = thread.messages.lastOrNull()?.text.orEmpty()
            Card(
                Modifier
                    .fillMaxWidth()
                    .clickable(enabled = !busy, onClickLabel = "Open conversation with ${thread.name}") {
                        onOpenThread(thread.id)
                    },
            ) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(thread.name, fontWeight = FontWeight.SemiBold)
                        if (thread.unread > 0) {
                            Text("${thread.unread} unread", color = MaterialTheme.colorScheme.primary, style = MaterialTheme.typography.labelMedium)
                        }
                    }
                    if (thread.role.isNotBlank()) {
                        Text(thread.role, style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.secondary)
                    }
                    if (preview.isNotBlank()) {
                        Text(preview, style = MaterialTheme.typography.bodySmall, maxLines = 2)
                    }
                }
            }
        }
        if (nextCursor != null) {
            OutlinedButton(onClick = onLoadMore, enabled = !busy, modifier = Modifier.fillMaxWidth()) {
                Text("Load older conversations")
            }
        }
    }
}

@Composable
fun ColumnScope.NotificationsWorkspace(
    items: List<NotificationItem>,
    nextCursor: String?,
    busy: Boolean,
    onRefresh: () -> Unit,
    onLoadMore: () -> Unit,
    onMarkRead: (String) -> Unit,
    onMarkAllRead: () -> Unit,
) {
    val unreadCount = items.count { !it.read }
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Text("Notifications ($unreadCount unread)", style = MaterialTheme.typography.titleMedium, modifier = Modifier.semantics { heading() })
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            if (unreadCount > 0) {
                OutlinedButton(onClick = onMarkAllRead, enabled = !busy) { Text("Mark all read") }
            }
            OutlinedButton(onClick = onRefresh, enabled = !busy) { Text("Refresh") }
        }
    }
    if (items.isEmpty()) {
        Card(Modifier.fillMaxWidth()) {
            Text("You're all caught up — no notifications yet.", Modifier.padding(16.dp))
        }
    } else {
        items.forEach { item ->
            Card(Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Text(item.title, fontWeight = if (!item.read) FontWeight.Bold else FontWeight.Medium, modifier = Modifier.weight(1f))
                        if (!item.read) {
                            TextButton(onClick = { onMarkRead(item.id) }, enabled = !busy) { Text("Mark read") }
                        } else {
                            Text("Read", style = MaterialTheme.typography.labelSmall)
                        }
                    }
                    if (item.body.isNotBlank()) Text(item.body, style = MaterialTheme.typography.bodyMedium)
                    Text(item.time, style = MaterialTheme.typography.labelSmall)
                }
            }
        }
        if (nextCursor != null) {
            OutlinedButton(onClick = onLoadMore, enabled = !busy, modifier = Modifier.fillMaxWidth()) {
                Text("Load older notifications")
            }
        }
    }
}
