import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const status = searchParams.get("status");
  const paymentStatus = searchParams.get("paymentStatus");
  const search = searchParams.get("q");

  let where = "1=1";
  const params = [];
  if (status) { where += " AND o.status = ?"; params.push(status); }
  if (paymentStatus) { where += " AND o.payment_status = ?"; params.push(paymentStatus); }
  if (search) {
    where += " AND (o.order_number LIKE ? OR u.email LIKE ? OR u.name LIKE ?)";
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const countRows = await query(
    `SELECT COUNT(*) as cnt FROM orders o LEFT JOIN users u ON o.user_id = u.id WHERE ${where}`,
    params
  );
  const rows = await query(
    `SELECT o.*, u.name, u.surname, u.email, u.hotel_name, u.company_name
     FROM orders o LEFT JOIN users u ON o.user_id = u.id
     WHERE ${where} ORDER BY o.created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return NextResponse.json({ orders: rows, total: countRows[0]?.cnt || 0, page, limit });
});
