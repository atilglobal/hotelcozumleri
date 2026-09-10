"use client";

import { useEffect, useState } from "react";
import { useQuoteCart } from "@/context/QuoteCartContext";
import { demoProducts } from "@/data/catalog";
import Button from "@/components/ui/Button";
import EmptyState from "./EmptyState";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";

export default function QuoteCartPageClient() {
  const { items, updateItem, removeItem, clearCart, hydrated } = useQuoteCart();
  const [form, setForm] = useState({
    hotelName: "", contactName: "", phone: "", email: "", city: "", roomCount: "", position: "", note: "", kvkkAccepted: false, website: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const resolvedItems = items.map((item) => {
    const product = demoProducts.find((p) => p.id === item.productId);
    const variant = product?.variants?.find((v) => v.id === item.variantId);
    return { ...item, product, variantLabel: variant ? product.optionGroups?.map((g) => g.options.find((o) => variant.options.includes(o.id))?.value).filter(Boolean).join(", ") : null };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      clearCart();
      setStatus({ type: "success", message: "Teklif talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "İşleminiz tamamlanamadı." });
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) return null;

  if (!items.length && status?.type !== "success") {
    return (
      <EmptyState
        title="Teklif sepetiniz boş."
        description="Teklif almak istediğiniz ürünleri ürün sayfalarından ekleyebilirsiniz."
        actionHref="/urunler"
        actionLabel="Ürünleri İncele"
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-10">
      <div>
        {status?.type === "success" ? (
          <div className="p-6 bg-green-50 border border-green-200 rounded-sm text-green-800">{status.message}</div>
        ) : (
          <div className="space-y-4">
            {resolvedItems.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="p-4 bg-white border border-navy/8 rounded-sm">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-navy">{item.product?.name}</p>
                    {item.variantLabel && <p className="text-xs text-gray-light mt-1">{item.variantLabel}</p>}
                  </div>
                  <button type="button" onClick={() => removeItem(item.productId, item.variantId)} className="text-xs text-red-600">Kaldır</button>
                </div>
                <div className="flex gap-4 mt-3">
                  <label className="text-sm">
                    Adet
                    <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(item.productId, item.variantId, { quantity: Number(e.target.value) })} className="block mt-1 border border-navy/15 rounded-sm px-2 py-1 w-20 text-sm" />
                  </label>
                  <label className="text-sm flex-1">
                    Not
                    <input type="text" value={item.note || ""} onChange={(e) => updateItem(item.productId, item.variantId, { note: e.target.value })} className="block mt-1 border border-navy/15 rounded-sm px-2 py-1 w-full text-sm" placeholder="Ürün notu" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {status?.type !== "success" && items.length > 0 && (
        <form onSubmit={handleSubmit} className="bg-white border border-navy/8 rounded-sm p-6 h-fit space-y-4">
          <h2 className="font-display text-xl text-navy mb-2">Teklif Bilgileri</h2>
          <FormInput label="Otel Adı" value={form.hotelName} onChange={(e) => setForm({ ...form, hotelName: e.target.value })} required />
          <FormInput label="Yetkili Ad Soyad" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} required />
          <FormInput label="Telefon" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <FormInput label="E-posta" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <FormInput label="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
          <FormInput label="Oda Sayısı" value={form.roomCount} onChange={(e) => setForm({ ...form, roomCount: e.target.value })} />
          <FormInput label="Pozisyon" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          <FormTextarea label="Not" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} />
          <FormCheckbox label="KVKK metnini okudum ve onaylıyorum." checked={form.kvkkAccepted} onChange={(e) => setForm({ ...form, kvkkAccepted: e.target.checked })} />
          <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
          {status?.type === "error" && <p className="text-sm text-red-600">{status.message}</p>}
          <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
            {submitting ? "Gönderiliyor..." : "Teklif Talebimi Gönder"}
          </Button>
        </form>
      )}
    </div>
  );
}
