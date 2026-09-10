import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { getUserById } from "@/lib/auth";
import { query, getPool } from "@/lib/db";
import { getOrdersByUser } from "@/lib/orders";
import { getQuotesByUser } from "@/lib/quotes";
import { getAddressesByUser } from "@/lib/addresses";

export async function GET() {
  try {
    const session = await requireSession();
    const user = await getUserById(session.userId);
    if (!user) {
      return NextResponse.json({ message: "Kullanıcı bulunamadı." }, { status: 404 });
    }
    const [orders, quotes, addresses] = await Promise.all([
      getOrdersByUser(session.userId),
      getQuotesByUser(session.userId),
      getAddressesByUser(session.userId),
    ]);
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        companyName: user.company_name,
        hotelName: user.hotel_name,
        city: user.city,
      },
      lastOrder: orders[0] || null,
      activeQuotes: quotes.filter((q) => !["closed", "rejected"].includes(q.status)).slice(0, 3),
      addressCount: addresses.length,
    });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await requireSession();
    if (!getPool()) throw new Error("DB_NOT_CONFIGURED");
    const data = await request.json();
    await query(
      "UPDATE users SET name=?, surname=?, phone=?, company_name=?, hotel_name=?, city=? WHERE id=?",
      [data.name, data.surname, data.phone || null, data.companyName || null, data.hotelName || null, data.city || null, session.userId]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
