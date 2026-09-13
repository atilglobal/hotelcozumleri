"use client";

import { useEffect, useState } from "react";
import DataTable from "./DataTable";

const FORM_TYPE_LABELS = {
  contact: "İletişim",
  service_quote: "Teklif Formu",
  general: "Genel",
  procurement_request: "Tedarik Talebi",
  decor_quote: "Yapay Çiçek & Dekorasyon",
};

const FORM_TYPE_FILTERS = [
  { value: "", label: "Tümü" },
  { value: "decor_quote", label: "Yapay Çiçek & Dekorasyon" },
  { value: "service_quote", label: "Teklif Formu" },
  { value: "procurement_request", label: "Tedarik Talebi" },
  { value: "contact", label: "İletişim" },
  { value: "general", label: "Genel" },
];

function parsePayload(raw) {
  if (!raw) return null;
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function FormsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    const url = filter ? `/api/admin/forms?type=${filter}` : "/api/admin/forms";
    fetch(url)
      .then((r) => r.json())
      .then((d) => setRows(d.forms || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    queueMicrotask(() => load());
  }, [filter]);

  const selectedPayload = selected ? parsePayload(selected.payload) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-gray-600">
          Filtre:
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setSelected(null);
            }}
            className="ml-2 border rounded-lg px-3 py-1.5 text-sm"
          >
            {FORM_TYPE_FILTERS.map((f) => (
              <option key={f.value || "all"} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <DataTable
        loading={loading}
        columns={[
          {
            key: "form_type",
            label: "Tür",
            render: (r) => FORM_TYPE_LABELS[r.form_type] || r.form_type,
          },
          { key: "full_name", label: "Ad Soyad" },
          { key: "hotel_name", label: "Otel / Firma" },
          { key: "email", label: "E-posta" },
          { key: "status", label: "Durum" },
          {
            key: "created_at",
            label: "Tarih",
            render: (r) => new Date(r.created_at).toLocaleDateString("tr-TR"),
          },
        ]}
        rows={rows}
        emptyMessage="Form talebi bulunmuyor."
        onRowClick={(row) => setSelected(row)}
      />

      {selected && (
        <div className="rounded-xl border bg-white p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Talep Detayı</h3>
              <p className="text-sm text-gray-500">
                {FORM_TYPE_LABELS[selected.form_type] || selected.form_type} ·{" "}
                {new Date(selected.created_at).toLocaleString("tr-TR")}
              </p>
            </div>
            <button type="button" onClick={() => setSelected(null)} className="text-sm text-gray-500 hover:text-gray-800">
              Kapat
            </button>
          </div>

          <dl className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><dt className="text-gray-500">Ad Soyad</dt><dd>{selected.full_name || "—"}</dd></div>
            <div><dt className="text-gray-500">E-posta</dt><dd>{selected.email || "—"}</dd></div>
            <div><dt className="text-gray-500">Telefon</dt><dd>{selected.phone || "—"}</dd></div>
            <div><dt className="text-gray-500">Otel / Firma</dt><dd>{selected.hotel_name || "—"}</dd></div>
            <div><dt className="text-gray-500">Şehir</dt><dd>{selected.city || "—"}</dd></div>
            <div className="sm:col-span-2"><dt className="text-gray-500">Mesaj</dt><dd>{selected.message || "—"}</dd></div>
          </dl>

          {selectedPayload && (
            <div className="space-y-3">
              {selectedPayload.services?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Seçilen Hizmetler</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPayload.services.map((s) => (
                      <span key={s} className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedPayload.applicationArea && (
                <p className="text-sm"><span className="text-gray-500">Uygulama Alanı:</span> {selectedPayload.applicationArea}</p>
              )}
              {selectedPayload.estimatedSize && (
                <p className="text-sm"><span className="text-gray-500">Tahmini Ölçü:</span> {selectedPayload.estimatedSize}</p>
              )}
              {selectedPayload.files?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Yüklenen Fotoğraflar</p>
                  <div className="flex flex-wrap gap-3">
                    {selectedPayload.files.map((file) => (
                      <a
                        key={file.stored}
                        href={`/api/admin/uploads/decor/${file.stored}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-24 h-24 rounded-lg overflow-hidden border hover:border-emerald-400"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/api/admin/uploads/decor/${file.stored}`}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <details className="text-xs">
                <summary className="cursor-pointer text-gray-500">Ham payload</summary>
                <pre className="mt-2 p-3 bg-gray-50 rounded overflow-auto">{JSON.stringify(selectedPayload, null, 2)}</pre>
              </details>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
