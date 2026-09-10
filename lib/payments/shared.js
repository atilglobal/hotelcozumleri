import { query, getPool } from "@/lib/db";
import { deductOrderStock } from "@/lib/inventory";
import { createNotification } from "@/lib/notifications";

export async function createPaymentTransaction({ orderId, provider, amount, requestReference, providerReference, status }) {
  if (!getPool()) return null;
  const result = await query(
    `INSERT INTO payment_transactions (order_id, provider, amount, currency, status, request_reference, provider_reference)
     VALUES (?, ?, ?, 'TRY', ?, ?, ?)`,
    [orderId, provider, amount, status, requestReference || null, providerReference || null]
  );
  return result.insertId;
}

export async function markOrderPaid(orderId, provider, providerTransactionId, metadata = {}) {
  if (!getPool()) return;

  const existing = await query(
    "SELECT id FROM payment_transactions WHERE order_id = ? AND status = 'paid' LIMIT 1",
    [orderId]
  );
  if (existing.length) return { ok: true, duplicate: true };

  const orders = await query("SELECT payment_status FROM orders WHERE id = ? LIMIT 1", [orderId]);
  if (orders.length && orders[0].payment_status === "paid") return { ok: true, duplicate: true };

  await query(
    "UPDATE payment_transactions SET status = 'paid', provider_transaction_id = ?, provider_reference = ?, updated_at = NOW() WHERE order_id = ? AND provider = ? AND status IN ('pending','processing') ORDER BY id DESC LIMIT 1",
    [providerTransactionId, providerTransactionId, orderId, provider]
  );
  await query(
    "UPDATE orders SET payment_status = 'paid', status = 'confirmed' WHERE id = ?",
    [orderId]
  );
  const prev = await query("SELECT status FROM orders WHERE id = ? LIMIT 1", [orderId]);
  await query(
    "INSERT INTO order_status_history (order_id, old_status, new_status, note) VALUES (?, ?, 'confirmed', 'Ödeme onaylandı')",
    [orderId, prev[0]?.status || "pending"]
  );
  await deductOrderStock(orderId);
  await createNotification({ type: "order", entityId: orderId, title: "Ödeme alındı" });
  return { ok: true };
}

export async function confirmBankTransfer(orderId, adminId) {
  if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
  const orders = await query("SELECT * FROM orders WHERE id = ? AND payment_method = 'bank_transfer' LIMIT 1", [orderId]);
  if (!orders.length) throw new Error("NOT_FOUND");
  if (orders[0].payment_status === "paid") return { ok: true, duplicate: true };

  await markOrderPaid(orderId, "bank_transfer", `manual-${orderId}`, { confirmedBy: adminId });
  return { ok: true };
}
