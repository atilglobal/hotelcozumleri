import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getProductBySlug, getAllProductSlugs, getRelatedProducts } from "@/lib/catalog";
import { productSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import ShopPageShell from "@/components/shop/ShopPageShell";
import ProductDetailClient from "@/components/shop/ProductDetailClient";
import Breadcrumb from "@/components/ui/Breadcrumb";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return createMetadata({
    title: product.seo_title || product.name,
    description: product.seo_description || product.short_description,
    path: `/urunler/${slug}`,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <ShopPageShell>
      <Breadcrumb
        items={[
          { label: "Ana Sayfa", href: "/" },
          { label: "Ürünler", href: "/urunler" },
          { label: product.name },
        ]}
        className="mb-8"
      />
      <JsonLd data={breadcrumbSchema([
        { label: "Ana Sayfa", href: "/" },
        { label: "Ürünler", href: "/urunler" },
        { label: product.name, href: `/urunler/${slug}` },
      ])} />
      <JsonLd data={productSchema(product)} />
      <ProductDetailClient product={product} related={related} />
    </ShopPageShell>
  );
}
