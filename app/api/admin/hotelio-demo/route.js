import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const countRows = await query("SELECT COUNT(*) as cnt FROM hotelio_demo_requests");
  const rows = await query("SELECT * FROM hotelio_demo_requests ORDER BY created_at DESC LIMIT ? OFFSET ?", [limit, offset]);
  return NextResponse.json({ requests: rows, total: countRows[0]?.cnt || 0, page, limit });
});

export const PUT = withAdmin(async (request, _ctx, session) => {
  const { id, status, adminNote } = await request.json();
  if (status) await query("UPDATE hotelio_demo_requests SET status = ? WHERE id = ?", [status, id]);
  if (adminNote) await query("INSERT INTO admin_notes (entity_type, entity_id, admin_user_id, note) VALUES ('hotelio_demo', ?, ?, ?)", [id, session.adminId, adminNote]);
  return NextResponse.json({ success: true });
});
