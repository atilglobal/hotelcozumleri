"use client";

import { useState } from "react";
import { submitForm } from "@/lib/forms";
import { validateContactForm } from "@/lib/validation";
import FormField from "./FormField";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormCheckbox from "./FormCheckbox";
import FormSuccess from "./FormSuccess";
import Button from "@/components/ui/Button";

export default function ContactForm({ formType = "contact" }) {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    kvkkAccepted: false,
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateContactForm(data);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      await submitForm("/api/forms/contact", { ...data, formType });
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
        title="Mesajınız Alındı"
        description="En kısa sürede size dönüş yapacağız. Acil talepleriniz için telefon veya WhatsApp hattımızı kullanabilirsiniz."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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

      <FormField label="Ad Soyad" htmlFor="contact-name" error={errors.fullName} required>
        <FormInput id="contact-name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} error={errors.fullName} />
      </FormField>
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label="E-posta" htmlFor="contact-email" error={errors.email} required>
          <FormInput id="contact-email" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} error={errors.email} />
        </FormField>
        <FormField label="Telefon" htmlFor="contact-phone">
          <FormInput id="contact-phone" type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
        </FormField>
      </div>
      <FormField label="Mesajınız" htmlFor="contact-message" error={errors.message} required>
        <FormTextarea id="contact-message" value={data.message} onChange={(e) => update("message", e.target.value)} error={errors.message} />
      </FormField>
      <FormCheckbox
        id="contact-kvkk"
        label="KVKK aydınlatma metnini okudum ve kişisel verilerimin işlenmesini kabul ediyorum."
        checked={data.kvkkAccepted}
        onChange={(e) => update("kvkkAccepted", e.target.checked)}
        error={errors.kvkkAccepted}
      />
      {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}
      <Button type="submit" variant="primary" size="lg" disabled={loading}>
        {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
      </Button>
    </form>
  );
}
