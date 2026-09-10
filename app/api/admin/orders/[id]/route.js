import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { logAudit } from "@/lib/audit";
import { confirmBankTransfer } from "@/lib/payments/shared";
import { restoreOrderStock } from "@/lib/inventory";

export const GET = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const orders = await query(
    `SELECT o.*, u.name, u.surname, u.email, u.phone, u.hotel_name, u.company_name
     FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE o.id = ? LIMIT 1`,
    [id]
  );
  if (!orders.length) return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
  const items = await query("SELECT * FROM order_items WHERE order_id = ?", [id]);
  const history = await query("SELECT h.*, a.name as admin_name, a.surname as admin_surname FROM order_status_history h LEFT JOIN admin_users a ON h.changed_by = a.id WHERE h.order_id = ? ORDER BY h.created_at DESC", [id]);
  const notes = await query("SELECT n.*, a.name, a.surname FROM admin_notes n JOIN admin_users a ON n.admin_user_id = a.id WHERE n.entity_type = 'order' AND n.entity_id = ? ORDER BY n.created_at DESC", [id]);
  const payments = await query("SELECT id, provider, amount, status, provider_transaction_id, created_at FROM payment_transactions WHERE order_id = ? ORDER BY created_at DESC", [id]);
  let shippingAddress = null;
  let billingAddress = null;
  if (orders[0].shipping_address_id) {
    const sa = await query("SELECT * FROM addresses WHERE id = ?", [orders[0].shipping_address_id]);
    shippingAddress = sa[0] || null;
  }
  if (orders[0].billing_address_id) {
    const ba = await query("SELECT * FROM addresses WHERE id = ?", [orders[0].billing_address_id]);
    billingAddress = ba[0] || null;
  }
  return NextResponse.json({ order: { ...orders[0], items, history, notes, payments, shippingAddress, billingAddress } });
});

export const PUT = withAdmin(async (request, { params }, session) => {
  const { id } = await params;
  const data = await request.json();
  const ip = request.headers.get("x-forwarded-for");

  if (data.action === "confirm_bank_transfer") {
    await confirmBankTransfer(Number(id), session.adminId);
    await logAudit({ adminUserId: session.adminId, action: "bank_transfer_confirmed", entityType: "order", entityId: Number(id), ipAddress: ip });
    return NextResponse.json({ success: true });
  }

  if (data.status) {
    const current = await query("SELECT status FROM orders WHERE id = ? LIMIT 1", [id]);
    if (!current.length) return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    await query("UPDATE orders SET status = ? WHERE id = ?", [data.status, id]);
    await query(
      "INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, note) VALUES (?, ?, ?, ?, ?)",
      [id, current[0].status, data.status, session.adminId, data.note || null]
    );
    if (data.status === "cancelled") await restoreOrderStock(Number(id));
    await logAudit({ adminUserId: session.adminId, action: "order_status_changed", entityType: "order", entityId: Number(id), metadata: { status: data.status }, ipAddress: ip });
  }

  if (data.adminNote) {
    await query(
      "INSERT INTO admin_notes (entity_type, entity_id, admin_user_id, note) VALUES ('order', ?, ?, ?)",
      [id, session.adminId, data.adminNote]
    );
  }

  return NextResponse.json({ success: true });
});
