import { NextResponse } from "next/server";
import { getProducts, getCategories, getBrands } from "@/lib/catalog";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      categorySlug: searchParams.get("category") || undefined,
      categoryId: searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : undefined,
      brandId: searchParams.get("brandId") ? Number(searchParams.get("brandId")) : undefined,
      search: searchParams.get("q") || undefined,
      sort: searchParams.get("sort") || undefined,
    };
    const [products, categories, brands] = await Promise.all([
      getProducts(filters),
      getCategories(),
      getBrands(),
    ]);
    return NextResponse.json({ products, categories, brands, count: products.length });
  } catch {
    return NextResponse.json({ message: "İşleminiz şu anda tamamlanamadı. Lütfen tekrar deneyin." }, { status: 500 });
  }
}
