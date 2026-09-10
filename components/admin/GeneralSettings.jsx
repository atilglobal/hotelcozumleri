"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";
import Button from "@/components/ui/Button";

export default function GeneralSettings() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings?group=general").then((r) => r.json()).then((d) => {
      const s = {};
      for (const [k, v] of Object.entries(d.settings || {})) s[k] = v.value ?? v;
      setForm(s);
    });
  }, []);

  const save = async () => {
    const settings = {};
    for (const [k, v] of Object.entries(form)) settings[k] = { value: v, isPublic: true };
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ group: "general", settings }) });
    setMessage("Kaydedildi.");
  };

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(); }} className="max-w-2xl bg-white rounded-lg border p-6 space-y-4">
      <FormInput label="Site Adı" value={form.site_name || ""} onChange={(e) => set("site_name", e.target.value)} />
      <FormInput label="Telefon" value={form.contact_phone || ""} onChange={(e) => set("contact_phone", e.target.value)} />
      <FormInput label="WhatsApp" value={form.whatsapp_number || ""} onChange={(e) => set("whatsapp_number", e.target.value)} />
      <FormInput label="E-posta" value={form.contact_email || ""} onChange={(e) => set("contact_email", e.target.value)} />
      <FormTextarea label="Adres" value={form.address || ""} onChange={(e) => set("address", e.target.value)} rows={2} />
      <FormInput label="Firma Adı" value={form.company_name || ""} onChange={(e) => set("company_name", e.target.value)} />
      <Button type="submit" variant="primary">Kaydet</Button>
      {message && <p className="text-sm text-blue">{message}</p>}
    </form>
  );
}
