import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const errors = {};
    if (!data.fullName?.trim()) errors.fullName = "Ad soyad gereklidir.";
    if (!data.hotelName?.trim()) errors.hotelName = "Otel adı gereklidir.";
    if (!data.city?.trim()) errors.city = "Şehir gereklidir.";
    if (!data.roomCount?.trim()) errors.roomCount = "Oda sayısı gereklidir.";
    if (!data.phone?.trim()) errors.phone = "Telefon gereklidir.";
    if (!data.email?.trim()) errors.email = "E-posta gereklidir.";
    if (!data.kvkkAccepted) errors.kvkkAccepted = "KVKK onayı gereklidir.";

    if (Object.keys(errors).length) {
      return NextResponse.json(
        { message: "Lütfen formu eksiksiz doldurun.", errors },
        { status: 400 }
      );
    }

    const { saveHotelioDemo } = await import("@/lib/forms-persist");
    await saveHotelioDemo(data);

    return NextResponse.json({
      success: true,
      message: "Demo talebiniz alındı.",
    });
  } catch {
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
