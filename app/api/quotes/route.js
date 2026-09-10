import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createQuoteRequest, getQuotesByUser } from "@/lib/quotes";
import { validateEmail, validatePhone, validateRequired } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    const quotes = await getQuotesByUser(session.userId);
    return NextResponse.json({ quotes });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    const data = await request.json();
    if (data.website) return NextResponse.json({ success: true });

    const errors = {};
    const hotelName = validateRequired(data.hotelName, "Otel adı");
    if (hotelName) errors.hotelName = hotelName;
    const contactName = validateRequired(data.contactName, "Yetkili ad soyad");
    if (contactName) errors.contactName = contactName;
    const email = validateEmail(data.email);
    if (email) errors.email = email;
    const phone = validatePhone(data.phone);
    if (phone) errors.phone = phone;
    const city = validateRequired(data.city, "Şehir");
    if (city) errors.city = city;
    if (Object.keys(errors).length) {
      return NextResponse.json({ message: "Lütfen formu kontrol edin.", errors }, { status: 400 });
    }

    const result = await createQuoteRequest(session?.userId || null, data);
    if (result.errors?.length) {
      return NextResponse.json({ message: result.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ success: true, quoteId: result.quoteId });
  } catch (err) {
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Teklif talebi şu anda alınamıyor." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
