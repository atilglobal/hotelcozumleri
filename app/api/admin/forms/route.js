import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const formType = searchParams.get("type");
  let where = "1=1";
  const params = [];
  if (formType) { where += " AND form_type = ?"; params.push(formType); }
  const countRows = await query(`SELECT COUNT(*) as cnt FROM form_submissions WHERE ${where}`, params);
  const rows = await query(`SELECT * FROM form_submissions WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
  return NextResponse.json({ forms: rows, total: countRows[0]?.cnt || 0, page, limit });
});

export const PUT = withAdmin(async (request) => {
  const { id, status } = await request.json();
  await query("UPDATE form_submissions SET status = ? WHERE id = ?", [status, id]);
  return NextResponse.json({ success: true });
});
