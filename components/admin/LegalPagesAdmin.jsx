"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function LegalPagesAdmin() {
  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/legal").then((r) => r.json()).then((d) => {
      setPages(d.pages || []);
      if (d.pages?.length) {
        setSelected(d.pages[0].slug);
        setForm({ title: d.pages[0].title, content: d.pages[0].content || "" });
      }
    });
  }, []);

  const selectPage = (slug) => {
    const page = pages.find((p) => p.slug === slug);
    setSelected(slug);
    setForm({ title: page.title, content: page.content || "" });
    setMessage("");
  };

  const save = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/legal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: selected, title: form.title, content: form.content }),
    });
    setMessage("Kaydedildi.");
  };

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900 lg:col-span-2">
        <strong>Önemli:</strong> Bu metinler production ortamında hukuk danışmanınız tarafından onaylanmalıdır. Yayınlamadan önce içerikleri kontrol edin.
      </div>
      <aside className="bg-white rounded-lg border p-4 space-y-1 h-fit">
        {pages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => selectPage(p.slug)}
            className={`block w-full text-left px-3 py-2 rounded text-sm ${selected === p.slug ? "bg-navy/10 text-navy font-medium" : "text-gray-light hover:bg-navy/5"}`}
          >
            {p.title}
          </button>
        ))}
      </aside>
      <form onSubmit={save} className="bg-white rounded-lg border p-6 space-y-4">
        <FormInput label="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-navy mb-1">İçerik (HTML)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={18}
            className="w-full border border-navy/15 rounded px-3 py-2 text-sm font-mono"
          />
        </div>
        <Button type="submit" variant="primary">Kaydet</Button>
        {message && <p className="text-sm text-blue">{message}</p>}
      </form>
    </div>
  );
}
