"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const emptyItem = () => ({ name: "", quantity: "", description: "" });

export default function TedarikRequestForm() {
  const [items, setItems] = useState([emptyItem()]);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    roomCount: "",
    deliveryExpectation: "",
    notes: "",
    kvkkAccepted: false,
    website: "",
  });

  const updateItem = (index, field, value) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const payload = { ...form, items };
      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      files.forEach((file) => body.append("files", file));

      const res = await fetch("/api/forms/tedarik", { method: "POST", body });
      const json = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: json.message || "Gönderim başarısız." });
        return;
      }

      setStatus({ type: "success", message: json.message });
      setItems([emptyItem()]);
      setFiles([]);
      setForm({
        companyName: "",
        contactName: "",
        phone: "",
        email: "",
        city: "",
        roomCount: "",
        deliveryExpectation: "",
        notes: "",
        kvkkAccepted: false,
        website: "",
      });
    } catch {
      setStatus({ type: "error", message: "Bağlantı hatası. Lütfen tekrar deneyin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="talep-formu" onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold heading-on-dark">Talep Kalemleri</h3>
          <button
            type="button"
            onClick={() => setItems((prev) => [...prev, emptyItem()])}
            className="text-sm font-semibold text-gold-light hover:text-gold transition-colors"
          >
            + Yeni Kalem Ekle
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="p-5 md:p-6 rounded-2xl glass-card-dark space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-gold-light uppercase">Kalem {index + 1}</span>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                  className="text-xs text-muted-on-dark hover:text-white"
                >
                  Kaldır
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium heading-on-dark mb-1.5 block">Ürün / İhtiyaç</span>
                <input
                  required
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  placeholder="Örn. Otel Havlusu"
                  className="input-dark"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium heading-on-dark mb-1.5 block">Miktar</span>
                <input
                  required
                  value={item.quantity}
                  onChange={(e) => updateItem(index, "quantity", e.target.value)}
                  placeholder="Örn. 300 adet"
                  className="input-dark"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium heading-on-dark mb-1.5 block">Açıklama</span>
              <textarea
                rows={2}
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                placeholder="Örn. 50x90 beyaz, logo nakışlı"
                className="input-dark resize-none"
              />
            </label>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          ["companyName", "Otel / Firma Adı", "text"],
          ["contactName", "Yetkili", "text"],
          ["phone", "Telefon", "tel"],
          ["email", "E-posta", "email"],
          ["city", "Şehir", "text"],
          ["roomCount", "Oda Sayısı", "text"],
        ].map(([key, label, type]) => (
          <label key={key} className="block">
            <span className="text-sm font-medium heading-on-dark mb-1.5 block">{label}</span>
            <input
              required={["companyName", "contactName", "phone", "email", "city"].includes(key)}
              type={type}
              value={form[key]}
              onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              className="input-dark"
            />
          </label>
        ))}
        <label className="block md:col-span-2">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Teslimat Beklentisi</span>
          <input
            value={form.deliveryExpectation}
            onChange={(e) => setForm((p) => ({ ...p, deliveryExpectation: e.target.value }))}
            placeholder="Örn. 30 gün içinde"
            className="input-dark"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Ek Açıklama</span>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            className="input-dark resize-none"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Dosya Ekle (PDF, Excel, Word, Görsel — max 8MB)</span>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="w-full text-sm text-body-on-dark"
          />
        </label>
      </div>

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label className="flex items-start gap-3 text-sm text-body-on-dark">
        <input
          type="checkbox"
          checked={form.kvkkAccepted}
          onChange={(e) => setForm((p) => ({ ...p, kvkkAccepted: e.target.checked }))}
          className="mt-1"
          required
        />
        <span>
          <Link href="/kvkk" className="text-gold-light hover:underline">KVKK Aydınlatma Metni</Link>
          &apos;ni okudum ve onaylıyorum.
        </span>
      </label>

      {status.message && (
        <p className={cn("text-sm font-medium", status.type === "success" ? "text-green-400" : "text-red-400")}>
          {status.message}
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" className="w-full md:w-auto" disabled={loading}>
        {loading ? "Gönderiliyor…" : "Talebimi Gönder"}
      </Button>
    </form>
  );
}
