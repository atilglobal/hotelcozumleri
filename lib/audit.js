import { query, getPool } from "@/lib/db";

export async function logAudit({ adminUserId, action, entityType, entityId, metadata, ipAddress }) {
  if (!getPool()) return;
  try {
    const safeMeta = metadata ? JSON.parse(JSON.stringify(metadata, (k, v) => {
      if (/secret|password|key|salt|token/i.test(k)) return "[REDACTED]";
      return v;
    })) : null;
    await query(
      "INSERT INTO audit_logs (admin_user_id, action, entity_type, entity_id, metadata, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [adminUserId || null, action, entityType || null, entityId || null, safeMeta ? JSON.stringify(safeMeta) : null, ipAddress || null]
    );
  } catch {
    // silent
  }
}
