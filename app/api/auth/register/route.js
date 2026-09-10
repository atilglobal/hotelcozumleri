import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { validateEmail, validateRequired, validatePassword } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });

    const errors = {};
    const name = validateRequired(data.name, "Ad");
    if (name) errors.name = name;
    const surname = validateRequired(data.surname, "Soyad");
    if (surname) errors.surname = surname;
    const email = validateEmail(data.email);
    if (email) errors.email = email;
    const passwordErr = validatePassword(data.password);
    if (passwordErr) errors.password = passwordErr;
    if (data.password !== data.passwordConfirm) errors.passwordConfirm = "Şifreler eşleşmiyor.";
    if (!data.kvkkAccepted) errors.kvkkAccepted = "KVKK metnini onaylamanız gerekmektedir.";
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "Lütfen formu kontrol edin.", errors }, { status: 400 });
    }

    const result = await registerUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      companyName: data.companyName,
      hotelName: data.hotelName,
    });
    return NextResponse.json({
      success: true,
      user: { id: result.userId, email: result.email, name: `${data.name} ${data.surname}` },
    });
  } catch (err) {
    if (err.message === "EMAIL_EXISTS") {
      return NextResponse.json({ message: "Bu e-posta adresi zaten kayıtlı." }, { status: 409 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Kayıt şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
