import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const status = searchParams.get("status");
  let where = "1=1";
  const params = [];
  if (status) { where += " AND status = ?"; params.push(status); }
  const countRows = await query(`SELECT COUNT(*) as cnt FROM quote_requests WHERE ${where}`, params);
  const rows = await query(`SELECT * FROM quote_requests WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
  return NextResponse.json({ quotes: rows, total: countRows[0]?.cnt || 0, page, limit });
});
