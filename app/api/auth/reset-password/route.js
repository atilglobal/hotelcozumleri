import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/auth";
import { validatePassword } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.token || !data.password) {
      return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
    }
    const passwordErr = validatePassword(data.password);
    if (passwordErr) return NextResponse.json({ message: passwordErr }, { status: 400 });
    await resetPassword(data.token, data.password);
    return NextResponse.json({ success: true, message: "Şifreniz güncellendi." });
  } catch (err) {
    if (err.message === "INVALID_TOKEN") {
      return NextResponse.json({ message: "Geçersiz veya süresi dolmuş bağlantı." }, { status: 400 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Bu işlem şu anda kullanılamıyor." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
