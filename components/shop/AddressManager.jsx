"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

const emptyForm = { title: "", fullName: "", companyName: "", phone: "", city: "", district: "", addressLine: "", postalCode: "", isDefault: false };

export default function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/addresses").then((r) => r.json()).then((d) => setAddresses(d.addresses || []));

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    await load();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/addresses/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <div key={a.id} className="bg-white border border-navy/8 rounded-sm p-5">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-navy">{a.title}{a.is_default ? " (Varsayılan)" : ""}</h3>
              <button type="button" onClick={() => handleDelete(a.id)} className="text-xs text-red-600">Sil</button>
            </div>
            <p className="text-sm text-gray-light">{a.full_name}</p>
            <p className="text-sm text-gray-light">{a.address_line}, {a.district} {a.city}</p>
            <p className="text-sm text-gray-light">{a.phone}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="bg-white border border-navy/8 rounded-sm p-6 space-y-4 max-w-lg">
        <h2 className="font-display text-lg text-navy">Yeni Adres Ekle</h2>
        <FormInput label="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <FormInput label="Ad Soyad" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        <FormInput label="Telefon" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <FormInput label="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
        <FormInput label="İlçe" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
        <FormInput label="Adres" value={form.addressLine} onChange={(e) => setForm({ ...form, addressLine: e.target.value })} required />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
          Varsayılan adres
        </label>
        <Button type="submit" variant="primary" disabled={loading}>Kaydet</Button>
      </form>
    </div>
  );
}
