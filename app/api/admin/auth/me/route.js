import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { getAdminById } from "@/lib/admin/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session?.adminId) return NextResponse.json({ admin: null });
  const admin = await getAdminById(session.adminId);
  if (!admin) return NextResponse.json({ admin: null });
  return NextResponse.json({
    admin: {
      id: admin.id,
      name: `${admin.name} ${admin.surname}`,
      email: admin.email,
      role: admin.role,
    },
  });
}
