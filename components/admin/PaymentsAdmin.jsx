"use client";

import GenericCrudPage from "./GenericCrudPage";

export default function PaymentsAdmin() {
  return (
    <div>
      <p className="text-sm text-gray-light mb-4">Ödeme işlemleri sipariş detaylarından yönetilir.</p>
      <GenericCrudPage
        apiPath="/api/admin/orders"
        emptyMessage="Sipariş bulunamadı."
        detailPath="/admin/siparisler/{id}"
        columns={[
          { key: "order_number", label: "Sipariş" },
          { key: "payment_method", label: "Yöntem" },
          { key: "payment_status", label: "Durum" },
          { key: "grand_total", label: "Tutar" },
        ]}
      />
    </div>
  );
}
