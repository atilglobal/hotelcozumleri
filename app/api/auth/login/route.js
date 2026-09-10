import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";
import { validateEmail, validateRequired } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const limit = rateLimit(`login:${ip}`, { limit: 10, windowMs: 60_000 });
    if (!limit.ok) {
      return NextResponse.json({ message: "Çok fazla deneme. Lütfen bir süre sonra tekrar deneyin." }, { status: 429 });
    }

    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });

    const errors = {};
    const email = validateEmail(data.email);
    if (email) errors.email = email;
    const password = validateRequired(data.password, "Şifre");
    if (password) errors.password = password;
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "Lütfen formu kontrol edin.", errors }, { status: 400 });
    }

    const result = await loginUser({ email: data.email, password: data.password, remember: data.remember });
    return NextResponse.json({ success: true, user: { id: result.userId, email: result.email, name: result.name } });
  } catch (err) {
    if (err.message === "INVALID_CREDENTIALS") {
      return NextResponse.json({ message: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    if (err.message === "ACCOUNT_INACTIVE") {
      return NextResponse.json({ message: "Hesabınız aktif değil." }, { status: 403 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Giriş şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
