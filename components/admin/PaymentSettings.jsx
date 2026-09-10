"use client";

import { useEffect, useState } from "react";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function PaymentSettings() {
  const [settings, setSettings] = useState({});
  const [callbacks, setCallbacks] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings?group=payment").then((r) => r.json()).then((d) => {
      setSettings(d.settings || {});
      setCallbacks(d.callbacks || {});
    });
  }, []);

  const save = async () => {
    const payload = {};
    for (const [k, v] of Object.entries(settings)) {
      payload[k] = { value: v.value ?? v, type: v.type || "string" };
    }
    await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ group: "payment", settings: payload }) });
    setMessage("Kaydedildi.");
  };

  const val = (key, def = "") => settings[key]?.value ?? settings[key] ?? def;
  const setVal = (key, value, type = "string") => setSettings((s) => ({ ...s, [key]: { value, type } }));

  return (
    <div className="space-y-6 max-w-2xl">
      {settings.paytr_test_mode?.value && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-lg">PayTR Test Modu Aktif</div>
      )}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">PayTR</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(val("paytr_enabled"))} onChange={(e) => setVal("paytr_enabled", e.target.checked, "boolean")} /> Aktif</label>
        <FormInput label="Merchant ID" value={val("paytr_merchant_id")} onChange={(e) => setVal("paytr_merchant_id", e.target.value)} />
        <FormInput label="Merchant Key" type="password" value={val("paytr_merchant_key") ? "••••••••" : ""} onChange={(e) => { if (e.target.value !== "••••••••") setVal("paytr_merchant_key", e.target.value, "secret"); }} placeholder="••••••••" />
        <FormInput label="Merchant Salt" type="password" value={val("paytr_merchant_salt") ? "••••••••" : ""} onChange={(e) => { if (e.target.value !== "••••••••") setVal("paytr_merchant_salt", e.target.value, "secret"); }} placeholder="••••••••" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(val("paytr_test_mode"))} onChange={(e) => setVal("paytr_test_mode", e.target.checked, "boolean")} /> Test Modu</label>
        <p className="text-xs text-gray-light">Callback: <code className="bg-gray-100 px-1">{callbacks.paytr}</code></p>
      </div>
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">iyzico</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(val("iyzico_enabled"))} onChange={(e) => setVal("iyzico_enabled", e.target.checked, "boolean")} /> Aktif</label>
        <FormInput label="API Key" type="password" value={val("iyzico_api_key") ? "••••••••" : ""} onChange={(e) => { if (e.target.value !== "••••••••") setVal("iyzico_api_key", e.target.value, "secret"); }} />
        <FormInput label="Secret Key" type="password" value={val("iyzico_secret_key") ? "••••••••" : ""} onChange={(e) => { if (e.target.value !== "••••••••") setVal("iyzico_secret_key", e.target.value, "secret"); }} />
        <FormInput label="Base URL" value={val("iyzico_base_url", "https://sandbox-api.iyzipay.com")} onChange={(e) => setVal("iyzico_base_url", e.target.value)} />
        <p className="text-xs text-gray-light">Callback: <code className="bg-gray-100 px-1">{callbacks.iyzico}</code></p>
      </div>
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="font-display text-lg text-navy">Havale / EFT</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={val("bank_transfer_enabled", true) !== false} onChange={(e) => setVal("bank_transfer_enabled", e.target.checked, "boolean")} /> Aktif</label>
      </div>
      <Button onClick={save} variant="primary">Kaydet</Button>
      {message && <p className="text-sm text-blue">{message}</p>}
    </div>
  );
}
