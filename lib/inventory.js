import { query, getPool } from "@/lib/db";

export async function deductOrderStock(orderId) {
  if (!getPool()) return { ok: false };
  const orders = await query("SELECT stock_deducted FROM orders WHERE id = ? LIMIT 1", [orderId]);
  if (!orders.length || orders[0].stock_deducted) return { ok: true, skipped: true };

  const items = await query(
    "SELECT oi.*, p.stock_type FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
    [orderId]
  );

  for (const item of items) {
    if (item.stock_type !== "stocked") continue;
    const existing = await query(
      "SELECT id FROM inventory_transactions WHERE reference_type = 'order' AND reference_id = ? AND product_id <=> ? AND variant_id <=> ? AND type = 'deduct' LIMIT 1",
      [orderId, item.product_id, item.variant_id]
    );
    if (existing.length) continue;

    if (item.variant_id) {
      await query("UPDATE product_variants SET stock = stock - ? WHERE id = ? AND stock >= ?", [item.quantity, item.variant_id, item.quantity]);
    } else if (item.product_id) {
      await query("UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?", [item.quantity, item.product_id, item.quantity]);
    }
    await query(
      "INSERT INTO inventory_transactions (product_id, variant_id, type, quantity, reference_type, reference_id) VALUES (?, ?, 'deduct', ?, 'order', ?)",
      [item.product_id, item.variant_id, item.quantity, orderId]
    );
  }
  await query("UPDATE orders SET stock_deducted = 1 WHERE id = ?", [orderId]);
  return { ok: true };
}

export async function restoreOrderStock(orderId) {
  if (!getPool()) return { ok: false };
  const orders = await query("SELECT stock_deducted FROM orders WHERE id = ? LIMIT 1", [orderId]);
  if (!orders.length || !orders[0].stock_deducted) return { ok: true, skipped: true };

  const txs = await query(
    "SELECT * FROM inventory_transactions WHERE reference_type = 'order' AND reference_id = ? AND type = 'deduct'",
    [orderId]
  );
  for (const tx of txs) {
    const restored = await query(
      "SELECT id FROM inventory_transactions WHERE reference_type = 'cancel' AND reference_id = ? AND product_id <=> ? AND variant_id <=> ? LIMIT 1",
      [orderId, tx.product_id, tx.variant_id]
    );
    if (restored.length) continue;
    if (tx.variant_id) {
      await query("UPDATE product_variants SET stock = stock + ? WHERE id = ?", [tx.quantity, tx.variant_id]);
    } else if (tx.product_id) {
      await query("UPDATE products SET stock = stock + ? WHERE id = ?", [tx.quantity, tx.product_id]);
    }
    await query(
      "INSERT INTO inventory_transactions (product_id, variant_id, type, quantity, reference_type, reference_id) VALUES (?, ?, 'restore', ?, 'cancel', ?)",
      [tx.product_id, tx.variant_id, tx.quantity, orderId]
    );
  }
  await query("UPDATE orders SET stock_deducted = 0 WHERE id = ?", [orderId]);
  return { ok: true };
}
