import { createMetadata } from "@/lib/metadata";
import { getProducts, getCategories, getBrands } from "@/lib/catalog";
import ShopPageShell from "@/components/shop/ShopPageShell";
import ProductsListing from "@/components/shop/ProductsListing";

export const metadata = createMetadata({
  title: "Ürünler",
  description: "Otel tekstili, sarf malzemeleri, hijyen ürünleri ve operasyonel otel ürünleri.",
  path: "/urunler",
});

export default async function UrunlerPage() {
  const [products, categories, brands] = await Promise.all([
    getProducts(),
    getCategories(),
    getBrands(),
  ]);

  return (
    <ShopPageShell
      title="Oteliniz İçin Profesyonel Ürünler"
      subtitle="Tekstilden hijyene, sarf malzemelerinden operasyonel ürünlere kadar otelinizin ihtiyaçlarını tek noktadan karşılayın."
    >
      <ProductsListing initialProducts={products} categories={categories} brands={brands} />
    </ShopPageShell>
  );
}
