import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/session";
import { canAccessRoute } from "@/lib/admin/permissions";

export async function withAdmin(handler, { requireSuper = false } = {}) {
  return async (request, context) => {
    try {
      const session = await requireAdminSession();
      if (requireSuper && session.role !== "SUPER_ADMIN") {
        return NextResponse.json({ message: "Bu işlem için yetkiniz yok." }, { status: 403 });
      }
      const pathname = new URL(request.url).pathname.replace("/api/admin", "/admin");
      if (!canAccessRoute(session.role, pathname)) {
        return NextResponse.json({ message: "Bu işlem için yetkiniz yok." }, { status: 403 });
      }
      return handler(request, context, session);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
      }
      console.error("[admin-api]", err.message);
      return NextResponse.json({ message: "İşlem tamamlanamadı." }, { status: 500 });
    }
  };
}

export function parsePagination(searchParams, defaults = { page: 1, limit: 20 }) {
  const page = Math.max(1, parseInt(searchParams.get("page") || defaults.page, 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || defaults.limit, 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}
