import { NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
    }
    const related = getRelatedProducts(product);
    return NextResponse.json({ product, related });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
