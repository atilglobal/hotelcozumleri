"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatCard from "./StatCard";
import DataTable from "./DataTable";
import { formatPrice, orderStatusLabels } from "@/lib/pricing";

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) return <p className="text-gray-light">Yükleniyor...</p>;

  const { cards, recentOrders, recentQuotes, recentHotelio, lowStockProducts } = data;
  const hasData = cards.totalOrders > 0 || cards.newQuotes > 0 || cards.hotelioDemos > 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Bugünkü Sipariş" value={cards.todayOrders} />
        <StatCard label="Bekleyen Sipariş" value={cards.pendingOrders} accent="gold" />
        <StatCard label="Bugünkü Ciro" value={formatPrice(cards.todayRevenue)} accent="green" />
        <StatCard label="Bu Ay Ciro" value={formatPrice(cards.monthRevenue)} accent="green" />
        <StatCard label="Toplam Sipariş" value={cards.totalOrders} />
        <StatCard label="Yeni Teklif" value={cards.newQuotes} accent="gold" />
        <StatCard label="Hotelio Demo" value={cards.hotelioDemos} />
        <StatCard label="Düşük Stok" value={cards.lowStock} accent="red" />
      </div>

      {!hasData && (
        <div className="bg-white rounded-lg border p-12 text-center">
          <p className="font-display text-xl text-navy mb-2">Henüz veri bulunmuyor</p>
          <p className="text-gray-light text-sm">Sipariş, teklif veya demo talebi geldiğinde burada görünecektir.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg text-navy">Son Siparişler</h2>
            <Link href="/admin/siparisler" className="text-sm text-blue">Tümü →</Link>
          </div>
          <DataTable
            columns={[
              { key: "order_number", label: "Sipariş No" },
              { key: "grand_total", label: "Tutar", render: (r) => formatPrice(Number(r.grand_total)) },
              { key: "status", label: "Durum", render: (r) => orderStatusLabels[r.status] },
            ]}
            rows={recentOrders}
            emptyMessage="Henüz sipariş bulunmuyor."
            onRowClick={(r) => router.push(`/admin/siparisler/${r.id}`)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg text-navy">Son Teklifler</h2>
            <Link href="/admin/teklifler" className="text-sm text-blue">Tümü →</Link>
          </div>
          <DataTable
            columns={[
              { key: "hotel_name", label: "Otel" },
              { key: "contact_name", label: "Yetkili" },
              { key: "status", label: "Durum" },
            ]}
            rows={recentQuotes}
            emptyMessage="Henüz teklif talebi bulunmuyor."
            onRowClick={(r) => router.push(`/admin/teklifler/${r.id}`)}
          />
        </div>
      </div>

      {lowStockProducts?.length > 0 && (
        <div>
          <h2 className="font-display text-lg text-navy mb-4">Düşük Stoklu Ürünler</h2>
          <DataTable
            columns={[
              { key: "name", label: "Ürün" },
              { key: "sku", label: "SKU" },
              { key: "stock", label: "Stok", render: (r) => <span className="text-red-600 font-medium">{r.stock}</span> },
            ]}
            rows={lowStockProducts}
          />
        </div>
      )}
    </div>
  );
}
