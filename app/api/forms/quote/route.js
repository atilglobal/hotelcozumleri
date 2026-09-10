import { NextResponse } from "next/server";
import { validateQuoteForm } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const errors = validateQuoteForm(data);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { message: "Lütfen formu eksiksiz doldurun.", errors },
        { status: 400 }
      );
    }

    const { saveFormSubmission } = await import("@/lib/forms-persist");
    await saveFormSubmission({
      formType: "service_quote",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      hotelName: data.hotelName,
      city: data.city,
      message: data.note,
      payload: data,
    });

    return NextResponse.json({
      success: true,
      message: "Teklif talebiniz alındı.",
    });
  } catch {
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
