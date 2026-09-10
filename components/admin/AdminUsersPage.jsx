"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import FormInput from "@/components/forms/FormInput";
import Button from "@/components/ui/Button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", surname: "", email: "", password: "", role: "ADMIN" });
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/admin/users").then((r) => r.json()).then((d) => setUsers(d.users || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setForm({ name: "", surname: "", email: "", password: "", role: "ADMIN" });
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={submit} className="bg-white rounded-lg border p-6 space-y-3 h-fit">
        <h2 className="font-display text-lg text-navy">Admin Ekle</h2>
        <FormInput label="Ad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FormInput label="Soyad" value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })} required />
        <FormInput label="E-posta" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <FormInput label="Şifre" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <label className="text-sm">Rol<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="block w-full mt-1 border rounded px-3 py-2"><option value="ADMIN">Admin</option><option value="SUPER_ADMIN">Süper Admin</option></select></label>
        <Button type="submit" variant="primary" size="sm">Ekle</Button>
      </form>
      <div className="lg:col-span-2">
        <DataTable loading={loading} columns={[{ key: "name", label: "Ad Soyad", render: (r) => `${r.name} ${r.surname}` }, { key: "email", label: "E-posta" }, { key: "role", label: "Rol" }, { key: "status", label: "Durum" }, { key: "last_login_at", label: "Son Giriş", render: (r) => r.last_login_at ? new Date(r.last_login_at).toLocaleString("tr-TR") : "—" }]} rows={users} emptyMessage="Admin kullanıcı yok." />
      </div>
    </div>
  );
}
