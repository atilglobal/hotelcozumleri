"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "./DataTable";
import { formatPrice, orderStatusLabels, paymentStatusLabels } from "@/lib/pricing";

export default function OrdersAdmin() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    queueMicrotask(() => setLoading(true));
    fetch(`/api/admin/orders?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="space-y-4">
      <input type="search" placeholder="Sipariş no, müşteri ara..." value={q} onChange={(e) => setQ(e.target.value)} className="border rounded-lg px-4 py-2 text-sm w-full max-w-md" />
      <DataTable
        loading={loading}
        columns={[
          { key: "order_number", label: "Sipariş No" },
          { key: "name", label: "Müşteri", render: (r) => `${r.name || ""} ${r.surname || ""}`.trim() || "—" },
          { key: "hotel_name", label: "Otel/Firma", render: (r) => r.hotel_name || r.company_name || "—" },
          { key: "created_at", label: "Tarih", render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR") },
          { key: "grand_total", label: "Tutar", render: (r) => formatPrice(Number(r.grand_total)) },
          { key: "payment_method", label: "Ödeme" },
          { key: "payment_status", label: "Ödeme Durumu", render: (r) => paymentStatusLabels[r.payment_status] || r.payment_status },
          { key: "status", label: "Durum", render: (r) => orderStatusLabels[r.status] },
        ]}
        rows={orders}
        emptyMessage="Henüz sipariş bulunmuyor."
        onRowClick={(r) => router.push(`/admin/siparisler/${r.id}`)}
      />
    </div>
  );
}
