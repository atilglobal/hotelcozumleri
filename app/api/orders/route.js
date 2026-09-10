import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { createOrder, getOrdersByUser } from "@/lib/orders";
import { getActivePaymentMethods } from "@/lib/payments";
import { createNotification } from "@/lib/notifications";
import { notifyAdmin, sendOrderConfirmation } from "@/lib/mailer";
import { getUserById } from "@/lib/auth";

export async function GET() {
  try {
    const session = await requireSession();
    const orders = await getOrdersByUser(session.userId);
    return NextResponse.json({ orders });
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
    const result = await createOrder(session.userId, {
      items: data.items,
      paymentMethod: data.paymentMethod,
      customerNote: data.customerNote,
      shippingAddressId: data.shippingAddressId,
      billingAddressId: data.billingAddressId,
    });
    if (result.errors?.length) {
      return NextResponse.json({ message: result.errors[0].message, errors: result.errors }, { status: 400 });
    }

    const methods = await getActivePaymentMethods();
    if (!methods.length) {
      return NextResponse.json({ message: "Şu anda ödeme yöntemi aktif değil. Lütfen daha sonra tekrar deneyin." }, { status: 503 });
    }

    const user = await getUserById(session.userId);
    await createNotification({ type: "order", entityId: result.orderId, title: "Yeni sipariş" });
    await notifyAdmin(`Yeni Sipariş: ${result.orderNumber}`, `<p>Tutar: ${result.grandTotal} TRY</p>`);
    if (user?.email) await sendOrderConfirmation({ order_number: result.orderNumber, grand_total: result.grandTotal }, user.email);

    return NextResponse.json({ success: true, ...result, paymentMethods: methods });
  } catch (err) {
    if (err.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Oturum açmanız gerekiyor." }, { status: 401 });
    }
    if (err.message === "DB_NOT_CONFIGURED") {
      return NextResponse.json({ message: "Sipariş şu anda alınamıyor." }, { status: 503 });
    }
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
