import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const q = searchParams.get("q");
  let where = "u.role = 'customer'";
  const params = [];
  if (q) {
    where += " AND (u.name LIKE ? OR u.surname LIKE ? OR u.email LIKE ? OR u.hotel_name LIKE ?)";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }
  const countRows = await query(`SELECT COUNT(*) as cnt FROM users u WHERE ${where}`, params);
  const rows = await query(
    `SELECT u.id, u.name, u.surname, u.email, u.phone, u.hotel_name, u.company_name, u.city, u.status, u.created_at,
      (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) as order_count,
      (SELECT COALESCE(SUM(grand_total),0) FROM orders o WHERE o.user_id = u.id AND o.payment_status = 'paid') as total_spent
     FROM users u WHERE ${where} ORDER BY u.created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return NextResponse.json({ customers: rows, total: countRows[0]?.cnt || 0, page, limit });
});
