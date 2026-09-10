"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/pricing";
import { demoBrands, demoCategories } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { useQuoteCart } from "@/context/QuoteCartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { addItem: addQuoteItem } = useQuoteCart();

  const category = product.category || demoCategories.find((c) => c.id === product.category_id);
  const brand = product.brand || demoBrands.find((b) => b.id === product.brand_id);
  const price = product.sale_price ?? product.price;
  const defaultVariant = product.variants?.find((v) => v.is_default) || product.variants?.[0];

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.is_quote_only) return;
    addItem({ productId: product.id, variantId: defaultVariant?.id || null, quantity: product.min_order_quantity || 1 });
  };

  const handleQuote = (e) => {
    e.preventDefault();
    addQuoteItem({ productId: product.id, variantId: defaultVariant?.id || null, quantity: product.min_order_quantity || 1 });
  };

  return (
    <article className="group modern-card overflow-hidden hover:-translate-y-1">
      <Link href={`/urunler/${product.slug}`} className="block relative aspect-[4/5] bg-ice overflow-hidden">
        <Image
          src={product.main_image || "/images/products/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width:768px) 50vw, 25vw"
        />
        {category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-blue-deep rounded-full">
            {category.name}
          </span>
        )}
      </Link>
      <div className="p-5">
        <Link href={`/urunler/${product.slug}`}>
          <h3 className="text-base font-bold text-navy mb-1 group-hover:text-blue transition-colors line-clamp-2 tracking-tight">
            {product.name}
          </h3>
        </Link>
        {brand && <p className="text-xs text-gray-light mb-3">{brand.name}</p>}
        <div className="flex items-end justify-between gap-3 mt-auto">
          <div>
            {product.is_quote_only ? (
              <span className="text-sm font-bold text-navy">Teklif Al</span>
            ) : (
              <span className="text-lg font-bold text-navy">{formatPrice(price)}</span>
            )}
            {product.min_order_quantity > 1 && (
              <p className="text-xs text-gray-light mt-0.5">Min. {product.min_order_quantity} adet</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            {!product.is_quote_only && (
              <button
                type="button"
                onClick={handleAddToCart}
                className="text-xs font-semibold px-3 py-2 bg-gradient-to-r from-blue to-blue-deep text-white rounded-xl hover:shadow-md transition-all"
              >
                Sepete Ekle
              </button>
            )}
            <button
              type="button"
              onClick={handleQuote}
              className="text-xs font-semibold px-3 py-2 border border-navy/10 text-navy rounded-xl hover:border-blue/30 hover:text-blue transition-colors"
            >
              Teklif Al
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
