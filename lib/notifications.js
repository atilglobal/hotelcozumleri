import { query, getPool } from "@/lib/db";

export async function createNotification({ type, entityId, title }) {
  if (!getPool()) return;
  try {
    await query(
      "INSERT INTO notifications (type, entity_id, title) VALUES (?, ?, ?)",
      [type, entityId, title]
    );
  } catch {
    // table may not exist yet
  }
}

export async function getUnreadCount() {
  if (!getPool()) return 0;
  try {
    const rows = await query("SELECT COUNT(*) as cnt FROM notifications WHERE is_read = 0");
    return rows[0]?.cnt || 0;
  } catch {
    return 0;
  }
}

export async function markAllRead() {
  if (!getPool()) return;
  await query("UPDATE notifications SET is_read = 1 WHERE is_read = 0");
}
