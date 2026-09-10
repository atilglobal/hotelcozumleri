"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function BrandsAdmin() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", status: "active" });
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/admin/brands").then((r) => r.json()).then((d) => setBrands(d.brands || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/brands", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", slug: "", status: "active" });
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="bg-white rounded-lg border p-6 space-y-3 h-fit">
        <h2 className="font-display text-lg text-navy">Marka Ekle</h2>
        <FormInput label="Marka Adı" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FormInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <Button type="submit" variant="primary" size="sm">Ekle</Button>
      </form>
      <div className="lg:col-span-2">
        <DataTable loading={loading} columns={[{ key: "name", label: "Marka" }, { key: "slug", label: "Slug" }, { key: "product_count", label: "Ürün" }, { key: "status", label: "Durum" }]} rows={brands} emptyMessage="Marka yok." />
      </div>
    </div>
  );
}
