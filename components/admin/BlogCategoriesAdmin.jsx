"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";
import DataTable from "./DataTable";

export default function BlogCategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", slug: "", description: "", status: "active" });
  const [editId, setEditId] = useState(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/blog/categories").then((r) => r.json()).then((d) => {
      setCategories(d.categories || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { queueMicrotask(() => load()); }, []);

  const save = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;
    await fetch("/api/admin/blog/categories", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ name: "", slug: "", description: "", status: "active" });
    setEditId(null);
    load();
  };

  const columns = [
    { key: "name", label: "Ad" },
    { key: "slug", label: "Slug" },
    { key: "status", label: "Durum" },
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="bg-white rounded-lg border p-6 space-y-4 max-w-xl">
        <h2 className="font-display text-lg text-navy">{editId ? "Kategori Düzenle" : "Yeni Kategori"}</h2>
        <FormInput label="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: form.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} />
        <FormInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <FormInput label="Açıklama" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Button type="submit" variant="primary" size="sm">{editId ? "Güncelle" : "Ekle"}</Button>
        {editId && <Button type="button" variant="outline" size="sm" onClick={() => { setEditId(null); setForm({ name: "", slug: "", description: "", status: "active" }); }}>İptal</Button>}
      </form>
      <DataTable
        loading={loading}
        columns={columns}
        rows={categories}
        onRowClick={(row) => { setEditId(row.id); setForm({ name: row.name, slug: row.slug, description: row.description || "", status: row.status }); }}
      />
      <Button href="/admin/blog" variant="outline" size="sm">← Blog Yazıları</Button>
    </div>
  );
}
