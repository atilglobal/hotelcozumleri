"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "./DataTable";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/pricing";

export default function ProductsAdmin() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState([]);

  const load = () => {
    setLoading(true);
    fetch(`/api/admin/products?q=${encodeURIComponent(q)}`).then((r) => r.json()).then((d) => setProducts(d.products || [])).finally(() => setLoading(false));
  };
  useEffect(() => { queueMicrotask(() => load()); }, [q]);

  const bulkAction = async (action) => {
    if (!selected.length) return;
    await fetch("/api/admin/products", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: selected, action }) });
    setSelected([]);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-between">
        <input type="search" placeholder="Ürün ara..." value={q} onChange={(e) => setQ(e.target.value)} className="border rounded-lg px-4 py-2 text-sm max-w-md" />
        <div className="flex gap-2">
          <Button href="/admin/urunler/yeni" variant="primary" size="sm">Yeni Ürün</Button>
          <button type="button" onClick={() => bulkAction("active")} className="text-sm px-3 py-1.5 border rounded">Aktif Yap</button>
          <button type="button" onClick={() => bulkAction("passive")} className="text-sm px-3 py-1.5 border rounded">Pasif Yap</button>
        </div>
      </div>
      <DataTable
        loading={loading}
        columns={[
          { key: "select", label: "", render: (r) => <input type="checkbox" checked={selected.includes(r.id)} onChange={(e) => setSelected(e.target.checked ? [...selected, r.id] : selected.filter((id) => id !== r.id))} onClick={(e) => e.stopPropagation()} /> },
          { key: "name", label: "Ürün" },
          { key: "sku", label: "SKU" },
          { key: "category_name", label: "Kategori" },
          { key: "brand_name", label: "Marka" },
          { key: "price", label: "Fiyat", render: (r) => formatPrice(Number(r.sale_price || r.price)) },
          { key: "stock", label: "Stok" },
          { key: "status", label: "Durum" },
        ]}
        rows={products}
        emptyMessage="Ürün bulunamadı."
        onRowClick={(r) => router.push(`/admin/urunler/${r.id}`)}
      />
    </div>
  );
}
