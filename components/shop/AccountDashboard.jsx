"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice, orderStatusLabels, quoteStatusLabels } from "@/lib/pricing";
import Button from "@/components/ui/Button";

export default function AccountDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/account").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <p className="text-gray-light">Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white border border-navy/8 rounded-sm p-6">
        <h1 className="font-display text-2xl text-navy mb-2">Hoş Geldiniz, {data.user?.name}</h1>
        <p className="text-sm text-gray-light">Hesap özetiniz aşağıdadır.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-navy/8 rounded-sm p-5">
          <h2 className="text-xs uppercase tracking-wide text-gray-light mb-2">Son Sipariş</h2>
          {data.lastOrder ? (
            <>
              <p className="font-medium text-navy">{data.lastOrder.order_number}</p>
              <p className="text-sm text-gray-light">{formatPrice(Number(data.lastOrder.grand_total))}</p>
              <p className="text-xs text-blue mt-1">{orderStatusLabels[data.lastOrder.status]}</p>
            </>
          ) : (
            <p className="text-sm text-gray-light">Henüz bir siparişiniz bulunmuyor.</p>
          )}
          <Button href="/hesabim/siparisler" variant="ghost" size="sm" className="mt-3">Tüm Siparişler</Button>
        </div>
        <div className="bg-white border border-navy/8 rounded-sm p-5">
          <h2 className="text-xs uppercase tracking-wide text-gray-light mb-2">Aktif Teklifler</h2>
          {data.activeQuotes?.length ? (
            data.activeQuotes.map((q) => (
              <p key={q.id} className="text-sm text-navy">{q.hotel_name} — {quoteStatusLabels[q.status]}</p>
            ))
          ) : (
            <p className="text-sm text-gray-light">Henüz bir teklif talebiniz bulunmuyor.</p>
          )}
          <Button href="/teklif-sepeti" variant="ghost" size="sm" className="mt-3">Teklif Sepeti</Button>
        </div>
        <div className="bg-white border border-navy/8 rounded-sm p-5">
          <h2 className="text-xs uppercase tracking-wide text-gray-light mb-2">Kayıtlı Adresler</h2>
          <p className="text-2xl font-display text-navy">{data.addressCount || 0}</p>
          <Button href="/hesabim/adresler" variant="ghost" size="sm" className="mt-3">Adresleri Yönet</Button>
        </div>
      </div>
      <div className="bg-white border border-navy/8 rounded-sm p-6">
        <h2 className="font-display text-lg text-navy mb-4">Hızlı Erişim</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/urunler" className="text-sm text-blue hover:underline">Ürünler</Link>
          <Link href="/sepet" className="text-sm text-blue hover:underline">Sepet</Link>
          <Link href="/hesabim/profil" className="text-sm text-blue hover:underline">Profil</Link>
          <Link href="/hesabim/favoriler" className="text-sm text-blue hover:underline">Favoriler</Link>
        </div>
      </div>
    </div>
  );
}
