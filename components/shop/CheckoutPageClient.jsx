"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/pricing";
import Button from "@/components/ui/Button";
import FormInput from "@/components/forms/FormInput";
import FormTextarea from "@/components/forms/FormTextarea";

const STEPS = ["İletişim", "Teslimat", "Fatura", "Ödeme", "Onay"];

export default function CheckoutPageClient() {
  const router = useRouter();
  const { items, clearCart, hydrated } = useCart();
  const [step, setStep] = useState(0);
  const [validated, setValidated] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    contactEmail: "", contactPhone: "",
    shippingAddressId: "", billingAddressId: "", sameAsShipping: true,
    paymentProvider: "", customerNote: "",
    newAddress: { title: "Teslimat", fullName: "", phone: "", city: "", district: "", addressLine: "", postalCode: "" },
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [paytrToken, setPaytrToken] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);

  useEffect(() => {
    if (hydrated && !items.length && !orderResult) router.push("/sepet");
  }, [hydrated, items, orderResult, router]);

  useEffect(() => {
    if (!items.length) return;
    fetch("/api/cart/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    }).then((r) => r.json()).then(setValidated);
  }, [items]);

  useEffect(() => {
    fetch("/api/addresses").then((r) => r.ok ? r.json() : { addresses: [] }).then((d) => setAddresses(d.addresses || []));
    fetch("/api/payments/methods").then((r) => r.json()).then((d) => {
      const methods = d.methods || [];
      setPaymentMethods(methods);
      if (methods.length) setForm((f) => ({ ...f, paymentProvider: methods[0].provider }));
    });
  }, []);

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    try {
      let shippingAddressId = form.shippingAddressId;
      if (!shippingAddressId && form.newAddress.fullName) {
        const res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form.newAddress),
        });
        const data = await res.json();
        if (res.ok) shippingAddressId = data.id;
      }
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          paymentMethod: form.paymentProvider,
          customerNote: form.customerNote,
          shippingAddressId: shippingAddressId || null,
          billingAddressId: form.sameAsShipping ? shippingAddressId : form.billingAddressId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const payRes = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderId, provider: form.paymentProvider }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.message);

      clearCart();

      if (payData.payment?.type === "iframe") {
        setPaytrToken(payData.payment.token);
        setOrderResult(data);
        setStep(4);
      } else if (payData.payment?.type === "redirect" && payData.payment.checkoutFormContent) {
        const div = document.createElement("div");
        div.innerHTML = payData.payment.checkoutFormContent;
        document.body.appendChild(div);
        div.querySelector("form")?.submit();
      } else if (payData.payment?.type === "bank_transfer") {
        setBankInfo(payData.payment);
        setOrderResult(data);
        setStep(4);
      } else {
        setOrderResult(data);
        setStep(4);
      }
    } catch (err) {
      alert(err.message || "Sipariş oluşturulamadı.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) return null;

  if (orderResult && paytrToken) {
    return (
      <div>
        <h1 className="font-display text-2xl text-navy mb-4">Güvenli Ödeme</h1>
        <iframe src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`} className="w-full min-h-[600px] border border-navy/10 rounded-sm" title="PayTR Ödeme" />
      </div>
    );
  }

  if (orderResult && bankInfo) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="font-display text-3xl text-navy">Siparişiniz Alındı</h1>
        <p className="text-gray-light">Sipariş No: <strong>{orderResult.orderNumber}</strong></p>
        <p className="text-gray-light">Açıklama alanına sipariş numaranızı yazınız.</p>
        <div className="space-y-4">
          {bankInfo.accounts?.map((a) => (
            <div key={a.id} className="bg-white border border-navy/10 rounded-sm p-5 text-sm">
              <p className="font-medium text-navy">{a.bank_name}</p>
              <p>{a.account_holder}</p>
              <p className="font-mono mt-2">{a.iban?.replace(/(.{4})/g, "$1 ").trim()}</p>
            </div>
          ))}
        </div>
        <Button href={`/hesabim/siparisler/${orderResult.orderId}`} variant="primary">Sipariş Detayı</Button>
      </div>
    );
  }

  if (orderResult) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h1 className="font-display text-3xl text-navy mb-4">Siparişiniz Alındı</h1>
        <p className="text-gray-light mb-2">Sipariş No: <strong>{orderResult.orderNumber}</strong></p>
        <Button href={`/hesabim/siparisler/${orderResult.orderId}`} variant="primary">Sipariş Detayı</Button>
      </div>
    );
  }

  const totals = validated?.totals;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {STEPS.map((label, i) => (
          <span key={label} className={`text-xs px-3 py-1.5 rounded-full ${i <= step ? "bg-blue text-white" : "bg-navy/5 text-gray-light"}`}>
            {i + 1}. {label}
          </span>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="bg-white border border-navy/8 rounded-sm p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl text-navy">İletişim Bilgileri</h2>
              <FormInput label="E-posta" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} required />
              <FormInput label="Telefon" type="tel" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} required />
              <Button onClick={() => setStep(1)} variant="primary">Devam Et</Button>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl text-navy">Teslimat Adresi</h2>
              {addresses.length > 0 && (
                <select value={form.shippingAddressId} onChange={(e) => setForm({ ...form, shippingAddressId: e.target.value })} className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm">
                  <option value="">Kayıtlı adres seçin</option>
                  {addresses.map((a) => <option key={a.id} value={a.id}>{a.title} — {a.city}</option>)}
                </select>
              )}
              <FormInput label="Ad Soyad" value={form.newAddress.fullName} onChange={(e) => setForm({ ...form, newAddress: { ...form.newAddress, fullName: e.target.value } })} />
              <FormInput label="Telefon" value={form.newAddress.phone} onChange={(e) => setForm({ ...form, newAddress: { ...form.newAddress, phone: e.target.value } })} />
              <FormInput label="Şehir" value={form.newAddress.city} onChange={(e) => setForm({ ...form, newAddress: { ...form.newAddress, city: e.target.value } })} />
              <FormInput label="İlçe" value={form.newAddress.district} onChange={(e) => setForm({ ...form, newAddress: { ...form.newAddress, district: e.target.value } })} />
              <FormInput label="Adres" value={form.newAddress.addressLine} onChange={(e) => setForm({ ...form, newAddress: { ...form.newAddress, addressLine: e.target.value } })} />
              <div className="flex gap-3">
                <Button onClick={() => setStep(0)} variant="outline">Geri</Button>
                <Button onClick={() => setStep(2)} variant="primary">Devam Et</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl text-navy">Fatura Adresi</h2>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.sameAsShipping} onChange={(e) => setForm({ ...form, sameAsShipping: e.target.checked })} />
                Teslimat adresi ile aynı
              </label>
              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline">Geri</Button>
                <Button onClick={() => setStep(3)} variant="primary">Devam Et</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl text-navy">Ödeme Yöntemi</h2>
              {!paymentMethods.length ? (
                <p className="text-sm text-red-600">Şu anda aktif ödeme yöntemi bulunmuyor.</p>
              ) : (
                paymentMethods.map((m) => (
                  <label key={m.provider} className="flex items-center gap-3 p-4 border border-navy/15 rounded-sm cursor-pointer">
                    <input type="radio" name="payment" value={m.provider} checked={form.paymentProvider === m.provider} onChange={() => setForm({ ...form, paymentProvider: m.provider })} />
                    <span>{m.label}{m.provider === "bank_transfer" ? "" : " — Güvenli Ödeme"}</span>
                  </label>
                ))
              )}
              <FormTextarea label="Sipariş Notu" value={form.customerNote} onChange={(e) => setForm({ ...form, customerNote: e.target.value })} rows={3} />
              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline">Geri</Button>
                <Button onClick={handlePlaceOrder} variant="primary" disabled={submitting || !paymentMethods.length}>
                  {submitting ? "İşleniyor..." : "Siparişi Tamamla"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <aside className="bg-white border border-navy/8 rounded-sm p-6 h-fit">
          <h2 className="font-display text-lg text-navy mb-4">Özet</h2>
          {totals && (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt>Ara Toplam</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
              <div className="flex justify-between"><dt>KDV</dt><dd>{formatPrice(totals.vatTotal)}</dd></div>
              <div className="flex justify-between text-gray-light"><dt>Kargo</dt><dd className="text-xs">Teslimat aşamasında</dd></div>
              <div className="flex justify-between font-semibold pt-2 border-t"><dt>Toplam</dt><dd>{formatPrice(totals.grandTotal)}</dd></div>
            </dl>
          )}
        </aside>
      </div>
    </div>
  );
}
