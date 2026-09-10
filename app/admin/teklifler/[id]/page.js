"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/pricing";

export default function QuoteDetailPage() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const load = () => fetch(`/api/admin/quotes/${id}`).then((r) => r.json()).then((d) => { setQuote(d.quote); setStatus(d.quote?.status); });
  useEffect(() => { load(); }, [id]);

  const save = async () => {
    await fetch(`/api/admin/quotes/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNote: note }) });
    setNote("");
    load();
  };

  if (!quote) return <p className="text-gray-light">Yükleniyor...</p>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="font-display text-xl text-navy mb-4">{quote.quote_number || `Teklif #${quote.id}`}</h2>
        <p className="text-sm"><strong>Otel:</strong> {quote.hotel_name}</p>
        <p className="text-sm"><strong>Yetkili:</strong> {quote.contact_name} — {quote.phone} — {quote.email}</p>
        <p className="text-sm"><strong>Şehir:</strong> {quote.city} | <strong>Oda:</strong> {quote.room_count}</p>
      </div>
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-medium mb-3">Ürünler</h3>
        {quote.items?.map((i) => <div key={i.id} className="text-sm border-b py-2">{i.product_name} × {i.quantity}</div>)}
      </div>
      <div className="bg-white rounded-lg border p-6 space-y-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded px-3 py-2 text-sm">
          {["new","reviewing","quoted","approved","rejected","closed"].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Admin notu" className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" />
        <Button onClick={save} variant="primary" size="sm">Kaydet</Button>
      </div>
    </div>
  );
}
