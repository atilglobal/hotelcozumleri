"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/pricing";
import Button from "@/components/ui/Button";
import EmptyState from "./EmptyState";

export default function CartPageClient() {
  const { items, updateQuantity, removeItem, hydrated } = useCart();
  const [validated, setValidated] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!items.length) {
      queueMicrotask(() => setValidated(null));
      return;
    }
    let cancelled = false;
    queueMicrotask(() => setLoading(true));
    fetch("/api/cart/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setValidated(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [items, hydrated]);

  if (!hydrated) return null;

  if (!items.length) {
    return (
      <EmptyState
        title="Sepetiniz şu an boş."
        description="Oteliniz için ihtiyaç duyduğunuz ürünleri keşfedin ve sepetinize ekleyin."
        actionHref="/urunler"
      />
    );
  }

  const cartItems = validated?.items || [];
  const totals = validated?.totals;

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-10">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 bg-white border border-navy/8 rounded-sm">
            <div className="relative w-20 h-20 shrink-0 bg-cream rounded-sm overflow-hidden">
              <Image src={item.mainImage || "/images/products/placeholder.svg"} alt={item.productName} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/urunler/${item.slug}`} className="font-medium text-navy hover:text-blue">{item.productName}</Link>
              <p className="text-xs text-gray-light mt-1">SKU: {item.sku}</p>
              {item.logoOption && <p className="text-xs text-gray-light">Logo: {item.logoOption}</p>}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-navy/15 rounded-sm text-sm">
                  <button type="button" onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)} className="px-2 py-1">−</button>
                  <span className="px-3">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)} className="px-2 py-1">+</button>
                </div>
                <button type="button" onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-red-600 hover:underline">
                  Kaldır
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-medium text-navy">{formatPrice(item.unitPrice)}</p>
              <p className="text-sm text-gray-light mt-1">{formatPrice(item.lineSubtotal)}</p>
            </div>
          </div>
        ))}
        {validated?.errors?.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700">
            {validated.errors.map((e, i) => <p key={i}>{e.message}</p>)}
          </div>
        )}
      </div>
      <aside className="bg-white border border-navy/8 rounded-sm p-6 h-fit sticky top-28">
        <h2 className="font-display text-xl text-navy mb-6">Sipariş Özeti</h2>
        {loading ? (
          <p className="text-sm text-gray-light">Hesaplanıyor...</p>
        ) : totals ? (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-light">Ara Toplam</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-light">KDV</dt><dd>{formatPrice(totals.vatTotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-light">Kargo</dt><dd className="text-gray-light text-xs">Teslimat aşamasında hesaplanacaktır</dd></div>
            <div className="flex justify-between pt-3 border-t border-navy/10 font-semibold text-navy">
              <dt>Genel Toplam</dt><dd>{formatPrice(totals.grandTotal)}</dd>
            </div>
          </dl>
        ) : null}
        <div className="mt-6 space-y-3">
          <Button href="/odeme" variant="primary" className="w-full" disabled={!totals || validated?.errors?.length}>
            Ödemeye Geç
          </Button>
          <Button href="/urunler" variant="outline" className="w-full">
            Alışverişe Devam Et
          </Button>
        </div>
      </aside>
    </div>
  );
}
