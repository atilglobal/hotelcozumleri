"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import Button from "@/components/ui/Button";

export default function SeoSettings() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings?group=seo").then((r) => r.json()).then((d) => {
      const s = {};
      for (const [k, v] of Object.entries(d.settings || {})) s[k] = v.value ?? v;
      setForm(s);
    });
  }, []);

  const save = async () => {
    const settings = {};
    for (const [k, v] of Object.entries(form)) settings[k] = { value: v };
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ group: "seo", settings }) });
    setMessage("Kaydedildi.");
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(); }} className="max-w-2xl bg-white rounded-lg border p-6 space-y-4">
      <FormInput label="Default SEO Title" value={form.default_title || ""} onChange={(e) => setForm({ ...form, default_title: e.target.value })} />
      <FormTextarea label="Default Meta Description" value={form.default_description || ""} onChange={(e) => setForm({ ...form, default_description: e.target.value })} rows={3} />
      <FormInput label="OpenGraph Image URL" value={form.og_image || ""} onChange={(e) => setForm({ ...form, og_image: e.target.value })} />
      <FormInput label="Google Verification" value={form.google_verification || ""} onChange={(e) => setForm({ ...form, google_verification: e.target.value })} />
      <Button type="submit" variant="primary">Kaydet</Button>
      {message && <p className="text-sm text-blue">{message}</p>}
    </form>
  );
}
