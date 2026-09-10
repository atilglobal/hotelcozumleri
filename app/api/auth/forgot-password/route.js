import { NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/auth";
import { validateEmail } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const limit = rateLimit(`forgot:${ip}`, { limit: 5, windowMs: 60_000 });
    if (!limit.ok) {
      return NextResponse.json({ message: "Çok fazla deneme. Lütfen bir süre sonra tekrar deneyin." }, { status: 429 });
    }

    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });

    const emailErr = validateEmail(data.email);
    if (emailErr) {
      return NextResponse.json({ message: emailErr }, { status: 400 });
    }

    await createPasswordResetToken(data.email);
    return NextResponse.json({
      success: true,
      message: "Eğer bu e-posta kayıtlıysa sıfırlama bağlantısı gönderilecektir.",
    });
  } catch (err) {
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Bu işlem şu anda kullanılamıyor." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
