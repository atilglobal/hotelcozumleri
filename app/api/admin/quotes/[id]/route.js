import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const quotes = await query("SELECT * FROM quote_requests WHERE id = ? LIMIT 1", [id]);
  if (!quotes.length) return NextResponse.json({ message: "Teklif bulunamadı." }, { status: 404 });
  const items = await query("SELECT * FROM quote_request_items WHERE quote_request_id = ?", [id]);
  const notes = await query("SELECT n.*, a.name, a.surname FROM admin_notes n JOIN admin_users a ON n.admin_user_id = a.id WHERE n.entity_type = 'quote' AND n.entity_id = ?", [id]);
  return NextResponse.json({ quote: { ...quotes[0], items, notes } });
});

export const PUT = withAdmin(async (request, { params }, session) => {
  const { id } = await params;
  const data = await request.json();
  if (data.status) await query("UPDATE quote_requests SET status = ? WHERE id = ?", [data.status, id]);
  if (data.quoted_subtotal !== undefined) {
    await query("UPDATE quote_requests SET quoted_subtotal=?, quoted_vat=?, quoted_discount=?, quoted_total=? WHERE id=?", [data.quoted_subtotal, data.quoted_vat, data.quoted_discount, data.quoted_total, id]);
  }
  if (data.items?.length) {
    for (const item of data.items) {
      if (item.id && item.quoted_unit_price !== undefined) {
        await query("UPDATE quote_request_items SET quoted_unit_price = ? WHERE id = ?", [item.quoted_unit_price, item.id]);
      }
    }
  }
  if (data.adminNote) {
    await query("INSERT INTO admin_notes (entity_type, entity_id, admin_user_id, note) VALUES ('quote', ?, ?, ?)", [id, session.adminId, data.adminNote]);
  }
  return NextResponse.json({ success: true });
});
