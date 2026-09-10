"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/pricing";
import { paymentStatusLabels } from "@/lib/pricing";

export default function PaymentResultClient({ type }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`).then((r) => r.ok ? r.json() : null).then((d) => setOrder(d?.order));
  }, [orderId]);

  const isPaid = order?.payment_status === "paid";

  if (type === "success" && order && !isPaid) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h1 className="font-display text-2xl text-navy mb-4">Ödeme Doğrulanıyor</h1>
        <p className="text-gray-light mb-6">Ödeme durumunuz henüz onaylanmadı. Lütfen birkaç dakika sonra siparişlerinizi kontrol edin.</p>
        <Button href={`/hesabim/siparisler/${orderId}`} variant="primary">Sipariş Detayı</Button>
      </div>
    );
  }

  if (type === "success" && isPaid) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <h1 className="font-display text-2xl text-navy mb-4">Ödemeniz Alındı</h1>
        <p className="text-gray-light mb-2">Sipariş No: <strong>{order.order_number}</strong></p>
        <p className="text-gray-light mb-8">{formatPrice(Number(order.grand_total))}</p>
        <Button href={`/hesabim/siparisler/${orderId}`} variant="primary">Sipariş Detayına Git</Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <h1 className="font-display text-2xl text-navy mb-4">Ödeme Başarısız</h1>
      <p className="text-gray-light mb-2">{order ? paymentStatusLabels[order.payment_status] : "İşleminiz tamamlanamadı."}</p>
      <p className="text-gray-light mb-8">Siparişiniz silinmedi. Tekrar deneyebilirsiniz.</p>
      <div className="flex gap-3 justify-center">
        <Button href="/sepet" variant="outline">Sepete Dön</Button>
        {orderId && <Button href={`/hesabim/siparisler/${orderId}`} variant="primary">Sipariş Detayı</Button>}
      </div>
    </div>
  );
}
