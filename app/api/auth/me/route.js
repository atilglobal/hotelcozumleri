import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ user: null });
    }
    const user = await getUserById(session.userId);
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({
      user: {
        id: user.id,
        name: `${user.name} ${user.surname}`,
        email: user.email,
        phone: user.phone,
        companyName: user.company_name,
        hotelName: user.hotel_name,
        city: user.city,
      },
    });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
