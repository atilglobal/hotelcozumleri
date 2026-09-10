"use client";

import { useState } from "react";
import { quoteFormSteps, solutionOptions, hotelTypes, positionOptions } from "@/config/forms";
import { submitForm } from "@/lib/forms";
import { validateQuoteForm } from "@/lib/validation";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormCheckbox from "./FormCheckbox";
import FormSuccess from "./FormSuccess";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const initialData = {
  solutions: [],
  hotelName: "",
  city: "",
  roomCount: "",
  hotelType: "",
  fullName: "",
  phone: "",
  email: "",
  position: "",
  message: "",
  whatsappConsent: false,
  kvkkAccepted: false,
  website: "",
};

export default function QuoteForm({ defaultSolutions = [] }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ ...initialData, solutions: defaultSolutions });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const toggleSolution = (id) => {
    setData((prev) => {
      const exists = prev.solutions.includes(id);
      return {
        ...prev,
        solutions: exists
          ? prev.solutions.filter((s) => s !== id)
          : [...prev.solutions, id],
      };
    });
    if (errors.solutions) setErrors((prev) => ({ ...prev, solutions: null }));
  };

  const validateStep = (currentStep) => {
    const stepErrors = {};
    if (currentStep === 1 && !data.solutions.length) {
      stepErrors.solutions = "En az bir çözüm seçmelisiniz.";
    }
    if (currentStep === 2) {
      if (!data.hotelName.trim()) stepErrors.hotelName = "Otel adı gereklidir.";
      if (!data.city.trim()) stepErrors.city = "Şehir gereklidir.";
      if (!data.roomCount.trim()) stepErrors.roomCount = "Oda sayısı gereklidir.";
      if (!data.hotelType) stepErrors.hotelType = "Otel türü seçmelisiniz.";
    }
    if (currentStep === 3) {
      if (!data.fullName.trim()) stepErrors.fullName = "Ad soyad gereklidir.";
      if (!data.phone.trim()) stepErrors.phone = "Telefon gereklidir.";
      if (!data.email.trim()) stepErrors.email = "E-posta gereklidir.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allErrors = validateQuoteForm(data);
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      if (allErrors.solutions) setStep(1);
      else if (allErrors.hotelName || allErrors.city) setStep(2);
      else if (allErrors.fullName || allErrors.phone) setStep(3);
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      await submitForm("/api/forms/quote", { ...data, formType: "quote" });
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
        title="Talebiniz Bize Ulaştı"
        description="Ekibimiz talebinizi inceleyecek ve en kısa sürede sizinle iletişime geçecektir. Acil talepleriniz için WhatsApp hattımızı da kullanabilirsiniz."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={data.website}
        onChange={(e) => update("website", e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {quoteFormSteps.map((s) => (
          <div key={s.id} className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border",
                step >= s.id
                  ? "bg-blue text-white border-blue"
                  : "bg-white text-gray-light border-navy/15"
              )}
            >
              {s.id}
            </span>
            <span
              className={cn(
                "text-sm hidden sm:inline",
                step >= s.id ? "text-navy font-medium" : "text-gray-light"
              )}
            >
              {s.label}
            </span>
            {s.id < 4 && <span className="w-8 h-px bg-navy/10 mx-1" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl text-navy mb-2">Nasıl Bir Çözüm Arıyorsunuz?</h2>
          <p className="text-gray-light mb-6">Birden fazla seçim yapabilirsiniz.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {solutionOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSolution(option.id)}
                className={cn(
                  "text-left p-4 rounded-sm border transition-all",
                  data.solutions.includes(option.id)
                    ? "border-blue bg-ice/50 text-navy"
                    : "border-navy/10 bg-white hover:border-blue/30"
                )}
                aria-pressed={data.solutions.includes(option.id)}
              >
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.solutions && (
            <p className="text-sm text-red-600 mt-3" role="alert">{errors.solutions}</p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-navy mb-4">Otel Bilgileri</h2>
          <FormField label="Otel Adı" htmlFor="hotelName" error={errors.hotelName} required>
            <FormInput id="hotelName" value={data.hotelName} onChange={(e) => update("hotelName", e.target.value)} error={errors.hotelName} />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Şehir" htmlFor="city" error={errors.city} required>
              <FormInput id="city" value={data.city} onChange={(e) => update("city", e.target.value)} error={errors.city} />
            </FormField>
            <FormField label="Oda Sayısı" htmlFor="roomCount" error={errors.roomCount} required>
              <FormInput id="roomCount" type="number" min="1" value={data.roomCount} onChange={(e) => update("roomCount", e.target.value)} error={errors.roomCount} />
            </FormField>
          </div>
          <FormField label="Otel Türü" htmlFor="hotelType" error={errors.hotelType} required>
            <FormSelect id="hotelType" value={data.hotelType} onChange={(e) => update("hotelType", e.target.value)} error={errors.hotelType}>
              <option value="">Seçiniz</option>
              {hotelTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </FormSelect>
          </FormField>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-navy mb-4">İletişim Bilgileri</h2>
          <FormField label="Ad Soyad" htmlFor="fullName" error={errors.fullName} required>
            <FormInput id="fullName" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
          </FormField>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormField label="Telefon" htmlFor="phone" error={errors.phone} required>
              <FormInput id="phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} error={errors.phone} />
            </FormField>
            <FormField label="E-posta" htmlFor="email" error={errors.email} required>
              <FormInput id="email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
            </FormField>
          </div>
          <FormField label="Pozisyon" htmlFor="position">
            <FormSelect id="position" value={data.position} onChange={(e) => update("position", e.target.value)}>
              <option value="">Seçiniz</option>
              {positionOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </FormSelect>
          </FormField>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h2 className="font-display text-2xl text-navy mb-4">Talebiniz</h2>
          <FormField label="İhtiyacınızı kısaca anlatın" htmlFor="message">
            <FormTextarea id="message" value={data.message} onChange={(e) => update("message", e.target.value)} placeholder="Projeniz, ihtiyaçlarınız veya sorularınız..." />
          </FormField>
          <FormCheckbox
            id="whatsappConsent"
            label="WhatsApp üzerinden benimle iletişime geçebilirsiniz."
            checked={data.whatsappConsent}
            onChange={(e) => update("whatsappConsent", e.target.checked)}
          />
          <FormCheckbox
            id="kvkkAccepted"
            label="KVKK aydınlatma metnini okudum ve kişisel verilerimin işlenmesini kabul ediyorum."
            checked={data.kvkkAccepted}
            onChange={(e) => update("kvkkAccepted", e.target.checked)}
            error={errors.kvkkAccepted}
          />
        </div>
      )}

      {submitError && (
        <p className="text-sm text-red-600 mt-4" role="alert">{submitError}</p>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-10">
        {step > 1 ? (
          <Button type="button" variant="outline" size="lg" onClick={back}>
            Geri
          </Button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <Button type="button" variant="primary" size="lg" onClick={next}>
            Devam Et
          </Button>
        ) : (
          <Button type="submit" variant="gold" size="lg" disabled={loading}>
            {loading ? "Gönderiliyor..." : "Teklif Talebimi Gönder"}
          </Button>
        )}
      </div>
    </form>
  );
}
