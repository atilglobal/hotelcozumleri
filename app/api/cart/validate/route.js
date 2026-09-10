import { NextResponse } from "next/server";
import { validateCartItems } from "@/lib/catalog";
import { calculateOrderTotals } from "@/lib/pricing";

export async function POST(request) {
  try {
    const { items } = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ message: "Geçersiz sepet." }, { status: 400 });
    }
    const sanitized = items.map((i) => ({
      productId: Number(i.productId),
      variantId: i.variantId ? Number(i.variantId) : null,
      quantity: Math.max(1, parseInt(i.quantity, 10) || 1),
      logoOption: i.logoOption || null,
    }));
    const { items: validated, errors } = await validateCartItems(sanitized);
    const totals = calculateOrderTotals(validated);
    return NextResponse.json({ items: validated, totals, errors });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
