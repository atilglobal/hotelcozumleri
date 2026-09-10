"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import Button from "@/components/ui/Button";

export default function ProductForm({ productId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    name: "", slug: "", sku: "", short_description: "", description: "", category_id: "", brand_id: "",
    price: 0, sale_price: "", cost_price: "", vat_rate: 20, stock: 0, stock_type: "stocked", status: "draft",
    featured: false, is_quote_only: false, min_order_quantity: 1, unit: "adet", main_image: "",
    seo_title: "", seo_description: "", allows_logo: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/brands").then((r) => r.json()),
    ]).then(([c, b]) => { setCategories(c.categories || []); setBrands(b.brands || []); });
    if (productId) {
      fetch(`/api/admin/products/${productId}`).then((r) => r.json()).then((d) => {
        const p = d.product;
        setForm({ ...p, category_id: p.category_id || "", brand_id: p.brand_id || "", featured: Boolean(p.featured), is_quote_only: Boolean(p.is_quote_only), allows_logo: Boolean(p.allows_logo) });
      });
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = productId ? `/api/admin/products/${productId}` : "/api/admin/products";
    const method = productId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/admin/urunler");
    setSaving(false);
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">Genel</h2>
        <FormInput label="Ürün Adı" value={form.name} onChange={(e) => set("name", e.target.value)} required />
        <FormInput label="Slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
        <FormInput label="SKU" value={form.sku} onChange={(e) => set("sku", e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm">Kategori<select value={form.category_id} onChange={(e) => set("category_id", e.target.value)} className="block w-full mt-1 border rounded px-3 py-2"><option value="">—</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label className="text-sm">Marka<select value={form.brand_id} onChange={(e) => set("brand_id", e.target.value)} className="block w-full mt-1 border rounded px-3 py-2"><option value="">—</option>{brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></label>
        </div>
        <FormTextarea label="Kısa Açıklama" value={form.short_description} onChange={(e) => set("short_description", e.target.value)} rows={2} />
        <FormTextarea label="Detaylı Açıklama" value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} />
      </section>
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">Fiyat & Stok</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Normal Fiyat" type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} />
          <FormInput label="İndirimli Fiyat" type="number" step="0.01" value={form.sale_price || ""} onChange={(e) => set("sale_price", e.target.value)} />
          <FormInput label="Maliyet (gizli)" type="number" step="0.01" value={form.cost_price || ""} onChange={(e) => set("cost_price", e.target.value)} />
          <FormInput label="KDV %" type="number" value={form.vat_rate} onChange={(e) => set("vat_rate", e.target.value)} />
          <FormInput label="Stok" type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} />
          <label className="text-sm">Stok Türü<select value={form.stock_type} onChange={(e) => set("stock_type", e.target.value)} className="block w-full mt-1 border rounded px-3 py-2"><option value="stocked">Stoklu</option><option value="unlimited">Sınırsız</option><option value="quote">Teklif</option></select></label>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_quote_only} onChange={(e) => set("is_quote_only", e.target.checked)} /> Sadece Teklif</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.allows_logo} onChange={(e) => set("allows_logo", e.target.checked)} /> Logo Nakış Desteği</label>
      </section>
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">SEO & Durum</h2>
        <FormInput label="Ana Görsel URL" value={form.main_image || ""} onChange={(e) => set("main_image", e.target.value)} />
        <FormInput label="SEO Başlık" value={form.seo_title || ""} onChange={(e) => set("seo_title", e.target.value)} />
        <FormTextarea label="SEO Açıklama" value={form.seo_description || ""} onChange={(e) => set("seo_description", e.target.value)} rows={2} />
        <label className="text-sm">Durum<select value={form.status} onChange={(e) => set("status", e.target.value)} className="block w-full mt-1 border rounded px-3 py-2"><option value="draft">Taslak</option><option value="active">Aktif</option><option value="passive">Pasif</option></select></label>
      </section>
      <Button type="submit" variant="primary" disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
    </form>
  );
}
