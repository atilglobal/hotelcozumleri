"use client";

import GenericCrudPage from "./GenericCrudPage";

export default function HotelioDemoAdmin() {
  return (
    <GenericCrudPage
      apiPath="/api/admin/hotelio-demo"
      emptyMessage="Hotelio demo talebi bulunmuyor."
      columns={[
        { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR") },
        { key: "hotel_name", label: "Otel" },
        { key: "full_name", label: "Yetkili" },
        { key: "email", label: "E-posta" },
        { key: "city", label: "Şehir" },
        { key: "status", label: "Durum" },
      ]}
    />
  );
}
