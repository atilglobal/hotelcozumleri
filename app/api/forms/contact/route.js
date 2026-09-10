import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";

export async function POST(request) {
  try {
    const data = await request.json();

    if (data.website) {
      return NextResponse.json({ success: true });
    }

    const errors = validateContactForm(data);
    if (Object.keys(errors).length) {
      return NextResponse.json(
        { message: "Lütfen formu eksiksiz doldurun.", errors },
        { status: 400 }
      );
    }

    const { saveFormSubmission } = await import("@/lib/forms-persist");
    await saveFormSubmission({
      formType: "contact",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      payload: data,
    });

    return NextResponse.json({
      success: true,
      message: "Mesajınız alındı.",
    });
  } catch {
    return NextResponse.json(
      { message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
