import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { getAddressesByUser, createAddress } from "@/lib/addresses";
import { validatePhone, validateRequired } from "@/lib/validation";

export async function GET() {
  try {
    const session = await requireSession();
    const addresses = await getAddressesByUser(session.userId);
    return NextResponse.json({ addresses });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await requireSession();
    const data = await request.json();
    const errors = {};
    const title = validateRequired(data.title, "Adres başlığı");
    if (title) errors.title = title;
    const fullName = validateRequired(data.fullName, "Ad soyad");
    if (fullName) errors.fullName = fullName;
    const phone = validatePhone(data.phone);
    if (phone) errors.phone = phone;
    const city = validateRequired(data.city, "Şehir");
    if (city) errors.city = city;
    const addressLine = validateRequired(data.addressLine, "Adres");
    if (addressLine) errors.addressLine = addressLine;
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "Lütfen formu kontrol edin.", errors }, { status: 400 });
    }
    const result = await createAddress(session.userId, data);
    return NextResponse.json({ success: true, id: result.id });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Adres kaydı şu anda kullanılamıyor." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
