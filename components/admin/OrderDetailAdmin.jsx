"use client";

import { useEffect, useState } from "react";
import { formatPrice, orderStatusLabels, paymentStatusLabels } from "@/lib/pricing";
import Button from "@/components/ui/Button";

const STATUS_OPTIONS = [
  { value: "pending", label: "Bekliyor" },
  { value: "confirmed", label: "Onaylandı" },
  { value: "preparing", label: "Hazırlanıyor" },
  { value: "shipped", label: "Kargoya Verildi" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal Edildi" },
];

export default function OrderDetailAdmin({ orderId }) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [message, setMessage] = useState("");

  const load = () => fetch(`/api/admin/orders/${orderId}`).then((r) => r.json()).then((d) => { setOrder(d.order); setStatus(d.order?.status); });

  useEffect(() => { load(); }, [orderId]);

  const updateStatus = async () => {
    await fetch(`/api/admin/orders/${orderId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNote }) });
    setAdminNote("");
    setMessage("Güncellendi.");
    load();
  };

  const confirmBank = async () => {
    if (!confirm("Havale ödemesini onaylamak istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/orders/${orderId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "confirm_bank_transfer" }) });
    setMessage("Havale ödemesi onaylandı.");
    load();
  };

  if (!order) return <p className="text-gray-light">Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-xl text-navy mb-4">{order.order_number}</h2>
          <p className="text-sm"><strong>Müşteri:</strong> {order.name} {order.surname}</p>
          <p className="text-sm"><strong>E-posta:</strong> {order.email}</p>
          <p className="text-sm"><strong>Telefon:</strong> {order.phone || "—"}</p>
          <p className="text-sm"><strong>Otel/Firma:</strong> {order.hotel_name || order.company_name || "—"}</p>
        </div>
        <div>
          <p className="text-sm"><strong>Sipariş Durumu:</strong> {orderStatusLabels[order.status]}</p>
          <p className="text-sm"><strong>Ödeme:</strong> {order.payment_method} — {paymentStatusLabels[order.payment_status]}</p>
          <p className="text-sm"><strong>Tarih:</strong> {new Date(order.created_at).toLocaleString("tr-TR")}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-medium text-navy mb-4">Ürünler</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="text-left py-2">Ürün</th><th>SKU</th><th>Adet</th><th>Birim</th><th>Toplam</th></tr></thead>
          <tbody>
            {order.items?.map((i) => (
              <tr key={i.id} className="border-b"><td className="py-2">{i.product_name}</td><td>{i.sku}</td><td>{i.quantity}</td><td>{formatPrice(Number(i.unit_price))}</td><td>{formatPrice(Number(i.line_total))}</td></tr>
            ))}
          </tbody>
        </table>
        <dl className="mt-4 space-y-1 text-sm max-w-xs ml-auto">
          <div className="flex justify-between"><dt>Ara Toplam</dt><dd>{formatPrice(Number(order.subtotal))}</dd></div>
          <div className="flex justify-between"><dt>KDV</dt><dd>{formatPrice(Number(order.vat_total))}</dd></div>
          <div className="flex justify-between font-semibold"><dt>Toplam</dt><dd>{formatPrice(Number(order.grand_total))}</dd></div>
        </dl>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h3 className="font-medium text-navy">Durum Güncelle</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2 text-sm">
          {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} placeholder="Admin notu..." className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" />
        <div className="flex gap-3">
          <Button onClick={updateStatus} variant="primary" size="sm">Kaydet</Button>
          {order.payment_method === "bank_transfer" && order.payment_status !== "paid" && (
            <Button onClick={confirmBank} variant="gold" size="sm">Havale Ödemesini Onayla</Button>
          )}
        </div>
        {message && <p className="text-sm text-blue">{message}</p>}
      </div>

      {order.notes?.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="font-medium text-navy mb-3">Admin Notları</h3>
          {order.notes.map((n) => (
            <div key={n.id} className="text-sm border-b py-2"><p>{n.note}</p><p className="text-xs text-gray-light">{n.name} {n.surname} — {new Date(n.created_at).toLocaleString("tr-TR")}</p></div>
          ))}
        </div>
      )}
    </div>
  );
}
