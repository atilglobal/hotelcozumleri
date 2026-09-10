import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { createAdminUser } from "@/lib/admin/auth";
import { canDeleteAdmin } from "@/lib/admin/permissions";

export const GET = withAdmin(async () => {
  const rows = await query("SELECT id, name, surname, email, role, status, last_login_at, created_at FROM admin_users ORDER BY created_at DESC");
  return NextResponse.json({ users: rows });
}, { requireSuper: true });

export const POST = withAdmin(async (request, _ctx, session) => {
  const data = await request.json();
  const result = await createAdminUser(data, session.role);
  return NextResponse.json({ success: true, id: result.id });
}, { requireSuper: true });

export const PUT = withAdmin(async (request, _ctx, session) => {
  const { id, status, role } = await request.json();
  const target = await query("SELECT role FROM admin_users WHERE id = ?", [id]);
  if (!target.length) return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
  if (role === "SUPER_ADMIN" && session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ message: "Yetkiniz yok." }, { status: 403 });
  }
  if (status === "inactive" && !canDeleteAdmin(session.role, target[0].role)) {
    return NextResponse.json({ message: "Bu kullanıcı pasife alınamaz." }, { status: 403 });
  }
  await query("UPDATE admin_users SET status = ?, role = COALESCE(?, role) WHERE id = ?", [status, role, id]);
  return NextResponse.json({ success: true });
}, { requireSuper: true });
