"use client";

import { useEffect, useState } from "react";
import { formatPrice, orderStatusLabels, paymentStatusLabels } from "@/lib/pricing";

export default function OrderDetail({ orderId }) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Sipariş bulunamadı.");
        return r.json();
      })
      .then((d) => setOrder(d.order))
      .catch((e) => setError(e.message));
  }, [orderId]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p className="text-gray-light">Yükleniyor...</p>;

  return (
    <div className="bg-white border border-navy/8 rounded-sm p-6 space-y-6">
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy">{order.order_number}</h1>
          <p className="text-sm text-gray-light">{new Date(order.created_at).toLocaleString("tr-TR")}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{orderStatusLabels[order.status]}</p>
          <p className="text-xs text-gray-light">{paymentStatusLabels[order.payment_status]}</p>
        </div>
      </div>
      <div>
        <h2 className="font-medium text-navy mb-3">Ürünler</h2>
        <ul className="space-y-2">
          {order.items?.map((item) => (
            <li key={item.id} className="flex justify-between text-sm border-b border-navy/5 pb-2">
              <span>{item.product_name} × {item.quantity}</span>
              <span>{formatPrice(Number(item.line_total))}</span>
            </li>
          ))}
        </ul>
      </div>
      <dl className="space-y-2 text-sm max-w-xs ml-auto">
        <div className="flex justify-between"><dt>Ara Toplam</dt><dd>{formatPrice(Number(order.subtotal))}</dd></div>
        <div className="flex justify-between"><dt>KDV</dt><dd>{formatPrice(Number(order.vat_total))}</dd></div>
        <div className="flex justify-between font-semibold"><dt>Toplam</dt><dd>{formatPrice(Number(order.grand_total))}</dd></div>
      </dl>
      {order.customer_note && (
        <div>
          <h2 className="font-medium text-navy mb-1">Not</h2>
          <p className="text-sm text-gray-light">{order.customer_note}</p>
        </div>
      )}
    </div>
  );
}
