import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getCategoryBySlug, getProducts, getCategories, getBrands } from "@/lib/catalog";
import ShopPageShell from "@/components/shop/ShopPageShell";
import ProductsListing from "@/components/shop/ProductsListing";
import Breadcrumb from "@/components/ui/Breadcrumb";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return createMetadata({
    title: `${category.name} | Otel Ürünleri`,
    description: category.description || `${category.name} kategorisindeki otel ürünleri.`,
    path: `/kategori/${slug}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, categories, brands] = await Promise.all([
    getProducts({ categorySlug: slug }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <ShopPageShell title={category.name} subtitle={category.description}>
      <Breadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Ürünler", href: "/urunler" },
          { label: category.name },
        ]}
        className="mb-8"
      />
      <ProductsListing initialProducts={products} categories={categories} brands={brands} categorySlug={slug} />
    </ShopPageShell>
  );
}
