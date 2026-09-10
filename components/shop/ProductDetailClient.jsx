"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/pricing";
import { demoBrands, demoCategories } from "@/data/catalog";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/CartContext";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/utils/cn";

export default function ProductDetailClient({ product, related }) {
  const { addItem } = useCart();
  const { addItem: addQuoteItem } = useQuoteCart();
  const { toggle, isWishlisted } = useWishlist();

  const category = product.category || demoCategories.find((c) => c.id === product.category_id);
  const brand = product.brand || demoBrands.find((b) => b.id === product.brand_id);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const defaults = {};
    for (const group of product.optionGroups || []) {
      defaults[group.id] = group.options[0]?.id;
    }
    return defaults;
  });
  const [quantity, setQuantity] = useState(product.min_order_quantity || 1);
  const [logoFile, setLogoFile] = useState(null);
  const [activeImage, setActiveImage] = useState(product.main_image);

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return null;
    const optionIds = Object.values(selectedOptions);
    return (
      product.variants.find((v) => v.options.every((oid) => optionIds.includes(oid))) ||
      product.variants.find((v) => v.is_default) ||
      product.variants[0]
    );
  }, [product.variants, selectedOptions]);

  const unitPrice = selectedVariant?.price ?? product.sale_price ?? product.price;
  const inStock = product.stock_type === "unlimited" || (selectedVariant?.stock ?? product.stock) > 0;
  const logoOption = product.allows_logo
    ? product.optionGroups?.find((g) => g.name === "Logo")?.options.find((o) => o.id === selectedOptions[product.optionGroups.find((g) => g.name === "Logo")?.id])
    : null;

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg", "application/pdf", "image/svg+xml"];
    if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) return;
    setLogoFile(file.name);
  };

  const handleAddToCart = () => {
    if (product.is_quote_only) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id || null,
      quantity,
      logoOption: logoOption?.value || null,
      logoFileName: logoFile,
    });
  };

  const handleQuote = () => {
    addQuoteItem({
      productId: product.id,
      variantId: selectedVariant?.id || null,
      quantity,
      note: logoFile ? `Logo dosyası: ${logoFile}` : null,
    });
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div className="relative aspect-square bg-cream rounded-sm overflow-hidden border border-navy/8">
            <Image src={activeImage || "/images/products/placeholder.svg"} alt={product.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          {(product.images?.length > 1) && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button key={i} type="button" onClick={() => setActiveImage(img.image)} className="relative w-16 h-16 border border-navy/10 rounded-sm overflow-hidden">
                  <Image src={img.image} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {category && (
            <Link href={`/kategori/${category.slug}`} className="text-xs text-blue font-medium tracking-wide uppercase">
              {category.name}
            </Link>
          )}
          <h1 className="font-display text-3xl md:text-4xl text-navy mt-2 mb-2">{product.name}</h1>
          {brand && <p className="text-gray-light mb-4">{brand.name}</p>}
          <p className="text-sm text-gray-light mb-1">SKU: {selectedVariant?.sku || product.sku}</p>
          <div className="mb-6">
            {product.is_quote_only ? (
              <span className="text-2xl font-semibold text-navy">Teklif Al</span>
            ) : (
              <>
                <span className="text-2xl font-semibold text-navy">{formatPrice(unitPrice)}</span>
                <span className="text-sm text-gray-light ml-2">+ KDV (%{product.vat_rate})</span>
              </>
            )}
          </div>
          <p className={cn("text-sm mb-6", inStock ? "text-green-700" : "text-red-600")}>
            {product.stock_type === "quote" ? "Teklif ile satılır" : inStock ? "Stokta" : "Stokta yok"}
          </p>
          {(product.optionGroups || []).map((group) => (
            <div key={group.id} className="mb-4">
              <label className="text-xs font-semibold tracking-wide uppercase text-navy mb-2 block">{group.name}</label>
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.id]: opt.id }))}
                    className={cn(
                      "px-3 py-1.5 text-sm border rounded-sm transition-colors",
                      selectedOptions[group.id] === opt.id ? "border-blue bg-blue/5 text-blue" : "border-navy/15 text-navy hover:border-blue"
                    )}
                  >
                    {opt.value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {product.allows_logo && (
            <div className="mb-6 p-4 bg-cream/50 border border-navy/8 rounded-sm">
              <p className="text-sm font-medium text-navy mb-2">Logo Nakış Uygulaması</p>
              <p className="text-xs text-gray-light mb-3">Logo dosyanızı yükleyin (PNG, JPG, PDF, SVG — max 5MB)</p>
              <input type="file" accept=".png,.jpg,.jpeg,.pdf,.svg" onChange={handleLogoChange} className="text-sm" />
              {logoFile && <p className="text-xs text-blue mt-2">{logoFile}</p>}
            </div>
          )}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-sm text-navy">Adet</label>
            <div className="flex items-center border border-navy/15 rounded-sm">
              <button type="button" onClick={() => setQuantity(Math.max(product.min_order_quantity || 1, quantity - 1))} className="px-3 py-2">−</button>
              <span className="px-4 py-2 text-sm min-w-[3rem] text-center">{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
            </div>
            {product.min_order_quantity > 1 && (
              <span className="text-xs text-gray-light">Min. {product.min_order_quantity} adet</span>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {!product.is_quote_only && (
              <Button onClick={handleAddToCart} variant="primary" disabled={!inStock}>
                Sepete Ekle
              </Button>
            )}
            <Button onClick={handleQuote} variant="outline">
              {product.is_quote_only ? "Teklif Al" : "Toplu Alım İçin Teklif Al"}
            </Button>
            <button
              type="button"
              onClick={() => toggle(product.id)}
              className="text-sm px-4 py-3 border border-navy/15 rounded-sm hover:border-blue transition-colors"
            >
              {isWishlisted(product.id) ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            </button>
          </div>
          <p className="text-sm text-gray-light mb-4">{product.short_description}</p>
          <div className="p-4 bg-blue/5 border border-blue/10 rounded-sm text-sm text-navy">
            Yüksek adetli alımlar için özel fiyat talep edin.
          </div>
        </div>
      </div>
      <div className="mt-16 border-t border-navy/10 pt-12">
        <h2 className="font-display text-2xl text-navy mb-4">Ürün Açıklaması</h2>
        <p className="text-gray-light leading-relaxed max-w-3xl">{product.description}</p>
      </div>
      {related?.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-navy mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-navy/10 p-4 z-40 flex gap-3">
        {!product.is_quote_only && (
          <Button onClick={handleAddToCart} variant="primary" className="flex-1" disabled={!inStock}>
            Sepete Ekle
          </Button>
        )}
        <Button onClick={handleQuote} variant="outline" className="flex-1">
          Teklif Al
        </Button>
      </div>
    </div>
  );
}
