"use client";

import GenericCrudPage from "./GenericCrudPage";

export default function CustomersAdmin() {
  return (
    <GenericCrudPage
      apiPath="/api/admin/customers"
      emptyMessage="Müşteri bulunamadı."
      columns={[
        { key: "name", label: "Ad Soyad", render: (r) => `${r.name} ${r.surname}` },
        { key: "hotel_name", label: "Otel/Firma", render: (r) => r.hotel_name || r.company_name || "—" },
        { key: "email", label: "E-posta" },
        { key: "order_count", label: "Sipariş" },
        { key: "created_at", label: "Kayıt", render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR") },
      ]}
    />
  );
}
