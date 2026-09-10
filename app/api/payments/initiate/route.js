import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { query, getPool } from "@/lib/db";
import { getUserById } from "@/lib/auth";
import { createPayment, getActivePaymentMethods } from "@/lib/payments";
import { getClientIp } from "@/lib/request";

export async function POST(request) {
  try {
    const session = await requireSession();
    if (!getPool()) return NextResponse.json({ message: "Sistem kullanılamıyor." }, { status: 503 });

    const { orderId, provider } = await request.json();
    if (!orderId || !provider) {
      return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
    }

    const active = await getActivePaymentMethods();
    if (!active.some((m) => m.provider === provider)) {
      return NextResponse.json({ message: "Bu ödeme yöntemi şu anda kullanılamıyor." }, { status: 400 });
    }

    const orders = await query("SELECT * FROM orders WHERE id = ? AND user_id = ? LIMIT 1", [orderId, session.userId]);
    if (!orders.length) return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    const order = orders[0];

    if (order.payment_status === "paid") {
      return NextResponse.json({ message: "Sipariş zaten ödendi." }, { status: 400 });
    }

    const user = await getUserById(session.userId);
    const payment = await createPayment(
      order,
      { id: user.id, email: user.email, name: `${user.name} ${user.surname}`, phone: user.phone },
      provider,
      getClientIp(request)
    );
    return NextResponse.json({ success: true, payment });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    console.error("[payment-initiate]", err.message);
    return NextResponse.json({ message: "Ödeme başlatılamadı." }, { status: 500 });
  }
}
