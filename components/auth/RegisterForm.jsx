"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import FormInput from "@/components/forms/FormInput";
import FormCheckbox from "@/components/forms/FormCheckbox";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", surname: "", email: "", phone: "", password: "", passwordConfirm: "",
    companyName: "", hotelName: "", kvkkAccepted: false, website: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      router.push("/hesabim");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="grid grid-cols-2 gap-4">
        <FormInput label="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FormInput label="Soyad" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} required />
      </div>
      <FormInput label="E-posta" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <FormInput label="Telefon" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <FormInput label="Şifre" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <FormInput label="Şifre Tekrar" type="password" value={form.passwordConfirm} onChange={(e) => setForm({ ...form, passwordConfirm: e.target.value })} required />
      <FormInput label="Otel / Firma Adı (Opsiyonel)" value={form.hotelName || form.companyName} onChange={(e) => setForm({ ...form, hotelName: e.target.value, companyName: e.target.value })} />
      <FormCheckbox label={<>KVKK ve <Link href="/kvkk" className="text-blue underline">kullanım koşullarını</Link> onaylıyorum.</>} checked={form.kvkkAccepted} onChange={(e) => setForm({ ...form, kvkkAccepted: e.target.checked })} />
      <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Kaydediliyor..." : "Kayıt Ol"}
      </Button>
      <p className="text-sm text-gray-light">
        Zaten hesabınız var mı? <Link href="/giris" className="text-blue hover:underline">Giriş Yap</Link>
      </p>
    </form>
  );
}
