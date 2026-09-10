"use client";

import { demoProducts } from "@/data/catalog";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

export default function WishlistView() {
  const { productIds, hydrated } = useWishlist();
  const products = demoProducts.filter((p) => productIds.includes(p.id));

  if (!hydrated) return null;

  if (!products.length) {
    return (
      <EmptyState
        title="Henüz favori ürününüz bulunmuyor."
        description="Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz."
        actionHref="/urunler"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
