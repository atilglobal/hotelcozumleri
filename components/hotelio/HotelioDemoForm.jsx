"use client";

import { useState } from "react";
import { submitForm } from "@/lib/forms";
import { hotelioDemoInterests, hotelioCtaIds } from "@/config/hotelio";
import { positionOptions } from "@/config/forms";
import FormField from "@/components/forms/FormField";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormTextarea from "@/components/forms/FormTextarea";
import FormCheckbox from "@/components/forms/FormCheckbox";
import FormSuccess from "@/components/forms/FormSuccess";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const initial = {
  fullName: "",
  hotelName: "",
  city: "",
  roomCount: "",
  phone: "",
  email: "",
  position: "",
  interests: [],
  note: "",
  kvkkAccepted: false,
  website: "",
};

export default function HotelioDemoForm({ id = "hotelio-demo" }) {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const toggleInterest = (item) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const validate = () => {
    const e = {};
    if (!data.fullName.trim()) e.fullName = "Ad soyad gereklidir.";
    if (!data.hotelName.trim()) e.hotelName = "Otel adı gereklidir.";
    if (!data.city.trim()) e.city = "Şehir gereklidir.";
    if (!data.roomCount.trim()) e.roomCount = "Oda sayısı gereklidir.";
    if (!data.phone.trim()) e.phone = "Telefon gereklidir.";
    if (!data.email.trim()) e.email = "E-posta gereklidir.";
    if (!data.kvkkAccepted) e.kvkkAccepted = "KVKK onayı gereklidir.";
    if (data.website) e.form = "Geçersiz gönderim.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    try {
      await submitForm("/api/forms/hotelio-demo", {
        ...data,
        modules: data.interests,
        formType: "hotelio-demo",
      });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <FormSuccess
        title="Demo Talebiniz Alındı"
        description="Ekibimiz otelinizin yapısına göre Hotelio demo planını oluşturacak ve en kısa sürede sizinle iletişime geçecektir."
      />
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="space-y-5">
      <input type="text" name="website" value={data.website} onChange={(e) => update("website", e.target.value)} className="absolute opacity-0 pointer-events-none h-0 w-0" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Ad Soyad" htmlFor="demo-name" error={errors.fullName} required>
          <FormInput id="demo-name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
        </FormField>
        <FormField label="Otel Adı" htmlFor="demo-hotel" error={errors.hotelName} required>
          <FormInput id="demo-hotel" value={data.hotelName} onChange={(e) => update("hotelName", e.target.value)} error={errors.hotelName} />
        </FormField>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Şehir" htmlFor="demo-city" error={errors.city} required>
          <FormInput id="demo-city" value={data.city} onChange={(e) => update("city", e.target.value)} error={errors.city} />
        </FormField>
        <FormField label="Oda Sayısı" htmlFor="demo-rooms" error={errors.roomCount} required>
          <FormInput id="demo-rooms" type="number" min="1" value={data.roomCount} onChange={(e) => update("roomCount", e.target.value)} error={errors.roomCount} />
        </FormField>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="Telefon" htmlFor="demo-phone" error={errors.phone} required>
          <FormInput id="demo-phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
        </FormField>
        <FormField label="E-posta" htmlFor="demo-email" error={errors.email} required>
          <FormInput id="demo-email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
        </FormField>
      </div>
      <FormField label="Pozisyon" htmlFor="demo-position">
        <FormSelect id="demo-position" value={data.position} onChange={(e) => update("position", e.target.value)}>
          <option value="">Seçiniz</option>
          {positionOptions.map((p) => <option key={p} value={p}>{p}</option>)}
        </FormSelect>
      </FormField>

      <div>
        <p className="text-sm font-medium text-navy mb-3">Özellikle Görmek İstediğiniz Alanlar</p>
        <div className="flex flex-wrap gap-2">
          {hotelioDemoInterests.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleInterest(item)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-sm border transition-all",
                data.interests.includes(item) ? "border-blue bg-ice text-navy" : "border-navy/10 text-gray-light hover:border-blue/30"
              )}
              aria-pressed={data.interests.includes(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Not" htmlFor="demo-note">
        <FormTextarea id="demo-note" value={data.note} onChange={(e) => update("note", e.target.value)} placeholder="Eklemek istediğiniz detaylar..." />
      </FormField>

      <FormCheckbox id="demo-kvkk" label="KVKK aydınlatma metnini okudum ve kişisel verilerimin işlenmesini kabul ediyorum." checked={data.kvkkAccepted} onChange={(e) => update("kvkkAccepted", e.target.checked)} error={errors.kvkkAccepted} />

      {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}

      <Button type="submit" variant="gold" size="lg" disabled={loading} data-cta={hotelioCtaIds.bottomDemo}>
        {loading ? "Gönderiliyor..." : "Demo Talebimi Gönder"}
      </Button>
    </form>
  );
}
