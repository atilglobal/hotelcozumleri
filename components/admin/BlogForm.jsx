"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import Button from "@/components/ui/Button";

function slugify(text) {
  return text.toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function BlogForm({ postId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", featured_image: "",
    category_id: "", status: "draft", featured: false,
    seo_title: "", seo_description: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/blog/categories").then((r) => r.json()).then((d) => setCategories(d.categories || []));
    if (postId) {
      fetch(`/api/admin/blog/${postId}`).then((r) => r.json()).then((d) => {
        if (d.post) {
          setForm({
            title: d.post.title || "",
            slug: d.post.slug || "",
            excerpt: d.post.excerpt || "",
            content: d.post.content || "",
            featured_image: d.post.featured_image || "",
            category_id: d.post.category_id || "",
            status: d.post.status || "draft",
            featured: !!d.post.featured,
            seo_title: d.post.seo_title || "",
            seo_description: d.post.seo_description || "",
          });
        }
      });
    }
  }, [postId]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const url = postId ? `/api/admin/blog/${postId}` : "/api/admin/blog";
    const method = postId ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setMessage(data.message || "Kaydedilemedi.");
      return;
    }
    if (!postId) router.push(`/admin/blog/${data.id}`);
    else setMessage("Kaydedildi.");
  };

  return (
    <form onSubmit={save} className="max-w-4xl bg-white rounded-lg border p-6 space-y-4">
      <FormInput label="Başlık" value={form.title} onChange={(e) => {
        set("title", e.target.value);
        if (!postId) set("slug", slugify(e.target.value));
      }} required />
      <FormInput label="Slug" value={form.slug} onChange={(e) => set("slug", e.target.value)} required />
      <FormTextarea label="Özet" value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} rows={2} />
      <div>
        <label className="block text-sm font-medium text-navy mb-1">İçerik (HTML)</label>
        <textarea
          value={form.content || ""}
          onChange={(e) => set("content", e.target.value)}
          rows={14}
          className="w-full border border-navy/15 rounded px-3 py-2 text-sm font-mono"
          placeholder="<p>Yazı içeriği...</p>"
        />
        <p className="text-xs text-gray-light mt-1">İçerik sunucu tarafında XSS için sanitize edilir.</p>
      </div>
      <FormInput label="Kapak Görseli URL" value={form.featured_image || ""} onChange={(e) => set("featured_image", e.target.value)} />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Kategori</label>
          <select value={form.category_id || ""} onChange={(e) => set("category_id", e.target.value)} className="w-full border border-navy/15 rounded px-3 py-2 text-sm">
            <option value="">Seçiniz</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Durum</label>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full border border-navy/15 rounded px-3 py-2 text-sm">
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
            <option value="archived">Arşiv</option>
          </select>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />
        Öne çıkan yazı
      </label>
      <FormInput label="SEO Title" value={form.seo_title || ""} onChange={(e) => set("seo_title", e.target.value)} />
      <FormTextarea label="SEO Description" value={form.seo_description || ""} onChange={(e) => set("seo_description", e.target.value)} rows={2} />
      <div className="flex gap-3 pt-2">
        <Button type="submit" variant="primary" disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
        <Button type="button" variant="outline" href="/admin/blog">Geri</Button>
      </div>
      {message && <p className="text-sm text-blue">{message}</p>}
    </form>
  );
}
