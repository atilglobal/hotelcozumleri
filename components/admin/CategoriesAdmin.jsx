"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", parent_id: "", status: "active" });
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/admin/categories").then((r) => r.json()).then((d) => setCategories(d.categories || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, parent_id: form.parent_id || null }) });
    setForm({ name: "", slug: "", parent_id: "", status: "active" });
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="bg-white rounded-lg border p-6 space-y-3 h-fit">
        <h2 className="font-display text-lg text-navy">Kategori Ekle</h2>
        <FormInput label="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FormInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <label className="text-sm block">Üst Kategori<select value={form.parent_id} onChange={(e) => setForm({ ...form, parent_id: e.target.value })} className="block w-full mt-1 border rounded px-3 py-2"><option value="">—</option>{categories.filter((c) => !c.parent_id).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <Button type="submit" variant="primary" size="sm">Ekle</Button>
      </form>
      <div className="lg:col-span-2">
        <DataTable loading={loading} columns={[{ key: "name", label: "Kategori" }, { key: "slug", label: "Slug" }, { key: "product_count", label: "Ürün" }, { key: "status", label: "Durum" }]} rows={categories} emptyMessage="Kategori yok." />
      </div>
    </div>
  );
}
