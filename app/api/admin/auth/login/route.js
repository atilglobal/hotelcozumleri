import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/admin/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const limit = rateLimit(`admin-login:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limit.ok) {
      return NextResponse.json({ message: "Çok fazla deneme. Lütfen bekleyin." }, { status: 429 });
    }
    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });
    const result = await loginAdmin({ email: data.email, password: data.password });
    return NextResponse.json({ success: true, admin: result });
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Veritabanı yapılandırılmamış." }, { status: 503 });
    }
    return NextResponse.json({ message: "Giriş yapılamadı." }, { status: 500 });
  }
}
