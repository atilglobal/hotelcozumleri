"use client";

import GenericCrudPage from "./GenericCrudPage";

export default function QuotesAdmin() {
  return (
    <GenericCrudPage
      apiPath="/api/admin/quotes"
      emptyMessage="Teklif talebi bulunmuyor."
      detailPath="/admin/teklifler/{id}"
      columns={[
        { key: "quote_number", label: "Teklif No", render: (r) => r.quote_number || `#${r.id}` },
        { key: "hotel_name", label: "Otel" },
        { key: "contact_name", label: "Yetkili" },
        { key: "email", label: "E-posta" },
        { key: "status", label: "Durum" },
        { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR") },
      ]}
    />
  );
}
