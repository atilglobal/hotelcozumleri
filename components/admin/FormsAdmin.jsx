"use client";

import GenericCrudPage from "./GenericCrudPage";

export default function FormsAdmin() {
  return (
    <GenericCrudPage
      apiPath="/api/admin/forms"
      emptyMessage="Form talebi bulunmuyor."
      columns={[
        { key: "form_type", label: "Tür" },
        { key: "full_name", label: "Ad Soyad" },
        { key: "email", label: "E-posta" },
        { key: "status", label: "Durum" },
        { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR") },
      ]}
    />
  );
}
