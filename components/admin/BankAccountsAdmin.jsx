"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function BankAccountsAdmin() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ bank_name: "", account_holder: "", iban: "", branch: "", currency: "TRY", status: "active" });
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/admin/bank-accounts").then((r) => r.json()).then((d) => setAccounts(d.accounts || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/bank-accounts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ bank_name: "", account_holder: "", iban: "", branch: "", currency: "TRY", status: "active" });
    load();
  };

  const formatIban = (iban) => iban?.replace(/(.{4})/g, "$1 ").trim();

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="bg-white rounded-lg border p-6 space-y-3 h-fit">
        <h2 className="font-display text-lg text-navy">Banka Hesabı Ekle</h2>
        <FormInput label="Banka Adı" value={form.bank_name} onChange={(e) => setForm({ ...form, bank_name: e.target.value })} required />
        <FormInput label="Hesap Sahibi" value={form.account_holder} onChange={(e) => setForm({ ...form, account_holder: e.target.value })} required />
        <FormInput label="IBAN" value={form.iban} onChange={(e) => setForm({ ...form, iban: e.target.value.replace(/\s/g, "").toUpperCase() })} required />
        <FormInput label="Şube" value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} />
        <Button type="submit" variant="primary" size="sm">Ekle</Button>
      </form>
      <div className="lg:col-span-2">
        <DataTable loading={loading} columns={[{ key: "bank_name", label: "Banka" }, { key: "account_holder", label: "Sahip" }, { key: "iban", label: "IBAN", render: (r) => formatIban(r.iban) }, { key: "status", label: "Durum" }]} rows={accounts} emptyMessage="Banka hesabı yok." />
      </div>
    </div>
  );
}
