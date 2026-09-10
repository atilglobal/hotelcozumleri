import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { getOrderById } from "@/lib/orders";

export async function GET(_request, { params }) {
  try {
    const session = await requireSession();
    const { id } = await params;
    const order = await getOrderById(Number(id), session.userId);
    if (!order) {
      return NextResponse.json({ message: "Sipariş bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar tekrar deneyin." }, { status: 500 });
  }
}
