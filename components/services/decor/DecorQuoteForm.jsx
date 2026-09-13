"use client";

import { useState } from "react";
import Link from "next/link";
import { decorServiceOptions } from "@/config/decor";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function DecorQuoteForm() {
  const [services, setServices] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    applicationArea: "",
    estimatedSize: "",
    projectDescription: "",
    kvkkAccepted: false,
    website: "",
  });

  const toggleService = (id) => {
    setServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const payload = { ...form, services, service: "yapay-cicek-dekorasyon" };
      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      files.forEach((file) => body.append("files", file));

      const res = await fetch("/api/forms/decor", { method: "POST", body });
      const json = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: json.message || "Gönderim başarısız." });
        return;
      }

      setStatus({ type: "success", message: json.message });
      setServices([]);
      setFiles([]);
      setForm({
        companyName: "",
        contactName: "",
        phone: "",
        email: "",
        city: "",
        applicationArea: "",
        estimatedSize: "",
        projectDescription: "",
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
    <form id="teklif-formu" onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-bold heading-on-dark mb-4">Hizmet: Yapay Çiçek & Dekorasyon</h3>
        <p className="text-sm text-body-on-dark mb-4">İlgilendiğiniz uygulama türlerini seçin:</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {decorServiceOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                services.includes(option.id)
                  ? "border-emerald-400/40 bg-emerald-500/10"
                  : "glass-card-dark border-white/10 hover:border-emerald-400/20"
              )}
            >
              <input
                type="checkbox"
                checked={services.includes(option.id)}
                onChange={() => toggleService(option.id)}
                className="rounded border-white/20 text-emerald-500 focus:ring-emerald-400/50"
              />
              <span className="text-sm text-body-on-dark">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Otel / Firma Adı *</span>
          <input required value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="input-dark" />
        </label>
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Yetkili *</span>
          <input required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className="input-dark" />
        </label>
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Telefon *</span>
          <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-dark" />
        </label>
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">E-posta *</span>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-dark" />
        </label>
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Şehir *</span>
          <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-dark" />
        </label>
        <label className="block">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Uygulama Alanı</span>
          <input value={form.applicationArea} onChange={(e) => setForm({ ...form, applicationArea: e.target.value })} placeholder="Örn. Lobi, bar, SPA girişi" className="input-dark" />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Tahmini Ölçü</span>
          <input value={form.estimatedSize} onChange={(e) => setForm({ ...form, estimatedSize: e.target.value })} placeholder="Örn. 4m x 3m duvar, 2 adet ağaç" className="input-dark" />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium heading-on-dark mb-1.5 block">Proje Açıklaması</span>
          <textarea rows={4} value={form.projectDescription} onChange={(e) => setForm({ ...form, projectDescription: e.target.value })} className="input-dark resize-y min-h-[100px]" placeholder="Konsept, renk tercihi ve uygulama detaylarını paylaşın." />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium heading-on-dark mb-1.5 block">Alan Fotoğrafları</span>
        <p className="text-xs text-muted-on-dark mb-2">Uygulama yapılacak alanın fotoğrafını yükleyin. Birden fazla görsel desteklenir.</p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="block w-full text-sm text-body-on-dark file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500/20 file:text-emerald-200 hover:file:bg-emerald-500/30"
        />
        {files.length > 0 && (
          <p className="text-xs text-emerald-300/80 mt-2">{files.length} dosya seçildi</p>
        )}
      </label>

      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.kvkkAccepted}
          onChange={(e) => setForm({ ...form, kvkkAccepted: e.target.checked })}
          className="mt-1 rounded border-white/20"
        />
        <span className="text-sm text-body-on-dark">
          <Link href="/kvkk" className="text-gold-light hover:text-gold underline">KVKK</Link> metnini okudum ve onaylıyorum.
        </span>
      </label>

      {status.message && (
        <p className={cn("text-sm p-4 rounded-xl", status.type === "success" ? "bg-emerald-500/15 text-emerald-200" : "bg-red-500/15 text-red-200")}>
          {status.message}
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" disabled={loading}>
        {loading ? "Gönderiliyor..." : "Dekorasyon Teklifi Al"}
      </Button>
    </form>
  );
}
