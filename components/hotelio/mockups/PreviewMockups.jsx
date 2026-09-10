"use client";

import MockShell from "./MockShell";
import MiniChart from "./MiniChart";
import { cn } from "@/utils/cn";

export function DashboardPreview() {
  return (
    <MockShell path="/yonetici-paneli" theme="light">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
        {[
          { l: "Doluluk Oranı", v: "%31" },
          { l: "Günlük Gelir", v: "₺104K" },
          { l: "Konaklayan", v: "5" },
          { l: "Bekleyen Görev", v: "4" },
        ].map((s) => (
          <div key={s.l} className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
            <p className="text-[9px] text-slate-500">{s.l}</p>
            <p className="text-sm font-bold text-slate-800">{s.v}</p>
          </div>
        ))}
      </div>
      <MiniChart data={[65, 72, 78, 84, 80, 88, 84]} color="#3b6cf4" height={50} />
    </MockShell>
  );
}

export function ReservationPreview() {
  const rooms = [
    { n: "101", g: "Ahmet Yılmaz", s: "dolu" },
    { n: "102", g: "—", s: "bos" },
    { n: "103", g: "Ayşe Demir", s: "dolu" },
    { n: "104", g: "Grup Rez.", s: "grup" },
  ];
  return (
    <MockShell path="/rezervasyon-takvimi">
      <p className="text-[9px] text-white/50 mb-2 uppercase tracking-wider">Planlama Takvimi</p>
      <div className="space-y-1.5">
        {rooms.map((r) => (
          <div key={r.n} className="flex items-center gap-2 p-2 bg-white/[0.03] border border-white/[0.06] rounded-sm text-[10px] md:text-xs">
            <span className="text-gold font-mono w-8">{r.n}</span>
            <span className="text-white/80 flex-1 truncate">{r.g}</span>
            <span className={cn(
              "px-1.5 py-0.5 rounded-sm text-[8px] uppercase",
              r.s === "dolu" && "bg-emerald-500/20 text-emerald-300",
              r.s === "bos" && "bg-blue/20 text-blue-bright",
              r.s === "grup" && "bg-gold/20 text-gold"
            )}>{r.s}</span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

export function FrontOfficePreview() {
  const steps = ["Rezervasyon", "Check-in", "Konaklama", "Folyo", "Tahsilat", "Fatura", "Check-out"];
  return (
    <MockShell path="/on-buro">
      <div className="flex flex-wrap gap-1 mb-3">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-1 text-[8px] md:text-[9px] text-white/60">
            <span className={cn("px-1.5 py-0.5 rounded-sm", i <= 2 ? "bg-blue/30 text-white" : "bg-white/5")}>{s}</span>
            {i < steps.length - 1 && <span className="text-gold">→</span>}
          </span>
        ))}
      </div>
      <div className="p-2 bg-white/[0.03] border border-white/[0.06] rounded-sm">
        <p className="text-[9px] text-white/50">Konaklayan Misafir</p>
        <p className="text-sm text-white">Oda 205 — Mehmet Kaya</p>
        <p className="text-[10px] text-gold mt-1">VIP · Yastık tercihi: Yumuşak</p>
      </div>
    </MockShell>
  );
}

export function HousekeepingPreview() {
  const rooms = [
    { n: "101", s: "TEMİZ", c: "emerald" },
    { n: "102", s: "KİRLİ", c: "red" },
    { n: "103", s: "KONTROL", c: "gold" },
    { n: "104", s: "DOLU", c: "blue" },
  ];
  return (
    <MockShell path="/housekeeping">
      <div className="grid grid-cols-2 gap-2 mb-3">
        {rooms.map((r) => (
          <div key={r.n} className="p-2 border border-white/[0.08] rounded-sm text-center">
            <p className="text-white font-mono text-sm">{r.n}</p>
            <p className={cn("text-[9px] mt-1 font-medium",
              r.c === "emerald" && "text-emerald-400",
              r.c === "red" && "text-red-400",
              r.c === "gold" && "text-gold",
              r.c === "blue" && "text-blue-bright"
            )}>{r.s}</p>
          </div>
        ))}
      </div>
      <div className="text-[9px] text-white/50 space-y-1">
        <p>Kat Görevlisi A → 101, 102, 105</p>
        <p>Kat Görevlisi B → 201, 202</p>
      </div>
    </MockShell>
  );
}

export function CrmPreview() {
  return (
    <MockShell path="/misafir-profili">
      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/[0.08]">
        <div className="w-10 h-10 rounded-sm bg-gold/20 flex items-center justify-center text-gold font-display text-lg">A</div>
        <div>
          <p className="text-white text-sm font-medium">Ayşe Demir</p>
          <p className="text-gold text-[9px]">VIP Misafir</p>
        </div>
      </div>
      {[
        ["Son Konaklama", "Ağustos 2026"],
        ["Oda Tercihi", "Deniz manzaralı"],
        ["Yastık Tercihi", "Orta sertlik"],
        ["Özel Not", "Erken check-in tercih eder"],
      ].map(([k, v]) => (
        <div key={k} className="flex justify-between text-[10px] py-1 border-b border-white/[0.04]">
          <span className="text-white/50">{k}</span>
          <span className="text-white/80">{v}</span>
        </div>
      ))}
    </MockShell>
  );
}

export function SpaPreview() {
  const slots = ["09:00 Masaj · Oda 1", "10:30 Masaj · Oda 2", "14:00 SPA · Oda 1"];
  return (
    <MockShell path="/spa-takvim">
      <p className="text-[9px] text-white/50 mb-2">Terapist Takvimi — Bugün</p>
      {slots.map((s) => (
        <div key={s} className="p-2 mb-1.5 bg-white/[0.03] border border-white/[0.06] rounded-sm text-[10px] text-white/80">{s}</div>
      ))}
    </MockShell>
  );
}

export function FinancePreview() {
  return (
    <MockShell path="/finans">
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="p-2 bg-white/[0.03] rounded-sm">
          <p className="text-[9px] text-white/50">Hedef Ciro</p>
          <p className="text-white text-sm">₺2.4M</p>
        </div>
        <div className="p-2 bg-white/[0.03] rounded-sm">
          <p className="text-[9px] text-white/50">Gerçekleşen</p>
          <p className="text-emerald-400 text-sm">₺2.1M</p>
        </div>
      </div>
      <MiniChart data={[40, 55, 48, 62, 58, 70, 65]} color="#1E5BA8" height={45} />
    </MockShell>
  );
}

export function SalesPreview() {
  return (
    <MockShell path="/satis-teklif">
      <p className="text-[9px] text-white/50 mb-2">Kurumsal Teklif</p>
      <p className="text-white text-sm mb-2">Grup Konaklama — 45 Oda</p>
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-blue/20 text-blue-bright text-[9px] rounded-sm">PDF Oluştur</span>
        <span className="px-2 py-1 bg-gold/20 text-gold text-[9px] rounded-sm">Gönder</span>
      </div>
    </MockShell>
  );
}

export function AiPreview() {
  return (
    <MockShell path="/ai-strategy-hub">
      <div className="p-3 bg-gold/10 border border-gold/25 rounded-sm mb-2">
        <p className="text-gold text-[9px] font-bold tracking-wider uppercase mb-1">AI Önerisi</p>
        <p className="text-white/80 text-[10px] md:text-xs mb-2">Talep artışı tespit edildi.</p>
        <p className="text-white/60 text-[10px]">Öneri: Deluxe oda fiyat stratejisini inceleyin.</p>
        <div className="flex gap-2 mt-2">
          <span className="text-[9px] text-gold">Detayı Gör</span>
          <span className="text-[9px] text-white/40">|</span>
          <span className="text-[9px] text-blue-bright">Uygula</span>
        </div>
      </div>
      <MiniChart data={[55, 62, 58, 72, 68, 80, 76]} color="#C9A962" height={40} />
    </MockShell>
  );
}

const previewMap = {
  dashboard: DashboardPreview,
  reservation: ReservationPreview,
  frontoffice: FrontOfficePreview,
  housekeeping: HousekeepingPreview,
  crm: CrmPreview,
  spa: SpaPreview,
  finance: FinancePreview,
  sales: SalesPreview,
  ai: AiPreview,
};

export default function PreviewMockup({ type = "dashboard", className }) {
  const Component = previewMap[type] || DashboardPreview;
  return <Component className={className} />;
}
