"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, orderStatusLabels } from "@/lib/pricing";
import EmptyState from "./EmptyState";

export default function OrdersList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(d.orders || []));
  }, []);

  if (orders === null) return <p className="text-gray-light">Yükleniyor...</p>;

  if (!orders.length) {
    return (
      <EmptyState
        title="Henüz bir siparişiniz bulunmuyor."
        description="İlk siparişinizi vermek için ürünlerimizi inceleyin."
        actionHref="/urunler"
      />
    );
  }

  return (
    <div className="bg-white border border-navy/8 rounded-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-cream/50 border-b border-navy/8">
          <tr>
            <th className="text-left p-4 font-medium text-navy">Sipariş No</th>
            <th className="text-left p-4 font-medium text-navy hidden md:table-cell">Tarih</th>
            <th className="text-left p-4 font-medium text-navy">Tutar</th>
            <th className="text-left p-4 font-medium text-navy">Durum</th>
            <th className="p-4" />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-navy/5">
              <td className="p-4 font-medium">{order.order_number}</td>
              <td className="p-4 text-gray-light hidden md:table-cell">{new Date(order.created_at).toLocaleDateString("tr-TR")}</td>
              <td className="p-4">{formatPrice(Number(order.grand_total))}</td>
              <td className="p-4">{orderStatusLabels[order.status]}</td>
              <td className="p-4 text-right">
                <Link href={`/hesabim/siparisler/${order.id}`} className="text-blue hover:underline">Detay</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
