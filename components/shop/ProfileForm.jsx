"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function ProfileForm() {
  const [form, setForm] = useState({ name: "", surname: "", phone: "", companyName: "", hotelName: "", city: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/account").then((r) => r.json()).then((d) => {
      if (d.user) {
        const parts = (d.user.name || "").split(" ");
        setForm({
          name: d.user.name?.split(" ")[0] || "",
          surname: parts.slice(1).join(" ") || d.user.surname || "",
          phone: d.user.phone || "",
          companyName: d.user.companyName || "",
          hotelName: d.user.hotelName || "",
          city: d.user.city || "",
        });
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMessage(res.ok ? "Profiliniz güncellendi." : "Güncelleme başarısız.");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-navy/8 rounded-sm p-6 space-y-4 max-w-lg">
      <h1 className="font-display text-2xl text-navy mb-2">Profil</h1>
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <FormInput label="Soyad" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} />
      </div>
      <FormInput label="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <FormInput label="Otel / Firma" value={form.hotelName || form.companyName} onChange={(e) => setForm({ ...form, hotelName: e.target.value, companyName: e.target.value })} />
      <FormInput label="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      {message && <p className="text-sm text-blue">{message}</p>}
      <Button type="submit" variant="primary" disabled={loading}>Kaydet</Button>
    </form>
  );
}
