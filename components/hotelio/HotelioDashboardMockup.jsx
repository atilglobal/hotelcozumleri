"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

const SIDEBAR_ITEMS = [
  { label: "Sabitlenen Modüller", badge: 13 },
  { label: "Özet & Yönetim" },
  { label: "Rezervasyon & Kanallar" },
  { label: "Ön Büro & Konaklama", badge: 9 },
  { label: "Oda & Tesis Yönetimi", badge: 4 },
  { label: "Yiyecek, İçecek & Etkinlik" },
  { label: "Muhasebe & Finans" },
  { label: "Pazarlama & Misafir Deneyimi" },
  { label: "İnsan Kaynakları" },
  { label: "Kurumsal Arka Ofis", active: true },
  { label: "Sistem & Entegrasyon" },
];

const CHANNELS = [
  { label: "Direct", pct: 36, color: "#3b6cf4" },
  { label: "Otel Web", pct: 27, color: "#06b6d4" },
  { label: "Expedia", pct: 19, color: "#8b5cf6" },
  { label: "B2B Acente", pct: 18, color: "#d4a853" },
];

function KpiCard({ label, value, sub }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200/80 px-2.5 py-2 shadow-sm min-w-0">
      <p className="text-[8px] md:text-[9px] text-slate-500 truncate">{label}</p>
      <p className="text-sm md:text-base font-bold text-slate-800 tabular-nums leading-tight">{value}</p>
      {sub && <p className="text-[8px] text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function DonutChart() {
  const r = 28;
  const c = 2 * Math.PI * r;
  const segments = CHANNELS.reduce((acc, ch) => {
    const dash = (ch.pct / 100) * c;
    const offset = acc.running;
    acc.running += dash;
    acc.items.push({ ...ch, dash, offset });
    return acc;
  }, { running: 0, items: [] }).items;

  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20 shrink-0">
      {segments.map((ch) => (
          <circle
            key={ch.label}
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={ch.color}
            strokeWidth="10"
            strokeDasharray={`${ch.dash} ${c - ch.dash}`}
            strokeDashoffset={-ch.offset}
            transform="rotate(-90 40 40)"
          />
      ))}
      <text x="40" y="42" textAnchor="middle" className="fill-slate-700 text-[10px] font-bold">Eyl</text>
    </svg>
  );
}

function RevenueLineChart() {
  const points = "4,52 18,48 32,44 46,38 60,42 74,36 88,28 102,32 116,24 130,20 144,26 158,18";
  return (
    <svg viewBox="0 0 162 60" className="w-full h-14 md:h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b6cf4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b6cf4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`4,52 ${points} 158,52`} fill="url(#revFill)" />
      <polyline points={points} fill="none" stroke="#3b6cf4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Sidebar({ compact }) {
  return (
    <aside className={cn("bg-[#1a2332] text-white flex flex-col shrink-0 border-r border-white/5", compact ? "w-[108px]" : "w-[130px] md:w-[148px]")}>
      <div className="p-2.5 border-b border-white/8">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue to-blue-deep flex items-center justify-center text-[10px] font-bold">H</div>
          {!compact && (
            <div className="min-w-0">
              <p className="text-[10px] font-bold leading-tight truncate">Hotelio</p>
              <p className="text-[8px] text-white/45">v1.0 Premium</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1 text-center">
          {[["%31", "Doluluk"], ["5", "Konak."], ["4", "Görev"]].map(([v, l]) => (
            <div key={l} className="bg-white/5 rounded-md py-1">
              <p className="text-[9px] font-bold text-gold">{v}</p>
              <p className="text-[6px] text-white/40 leading-none">{l}</p>
            </div>
          ))}
        </div>
      </div>
      {!compact && (
        <div className="px-2 py-2">
          <div className="bg-white/5 rounded-md px-2 py-1.5 text-[8px] text-white/35">Modül ara...</div>
        </div>
      )}
      <nav className="flex-1 overflow-hidden px-1.5 py-1 space-y-0.5">
        {SIDEBAR_ITEMS.slice(0, compact ? 6 : undefined).map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center justify-between gap-1 px-2 py-1.5 rounded-md text-[8px] md:text-[9px] leading-tight",
              item.active ? "bg-blue/20 text-white font-medium" : "text-white/50"
            )}
          >
            <span className="truncate">{compact ? item.label.split(" ")[0] : item.label}</span>
            {item.badge && (
              <span className="shrink-0 min-w-[14px] h-[14px] flex items-center justify-center rounded-full bg-red-500/90 text-[7px] font-bold px-0.5">
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>
      {!compact && (
        <div className="p-2 border-t border-white/8 text-[8px] text-white/40">Sistem Ayarları</div>
      )}
    </aside>
  );
}

function TopBar({ compact }) {
  return (
    <header className="flex items-center gap-2 px-2 md:px-3 py-2 bg-white border-b border-slate-200/80 shrink-0">
      <div className="min-w-0 flex-1">
        {!compact && <p className="text-[8px] text-slate-400 truncate">Ana sayfa › Yönetici Paneli</p>}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[8px] md:text-[9px] text-slate-500">
          <span><strong className="text-slate-700">%31</strong> Doluluk</span>
          <span><strong className="text-slate-700">5</strong> Konaklayan</span>
          <span><strong className="text-emerald-600">₺104.1K</strong></span>
        </div>
      </div>
      {!compact && (
        <>
          <div className="hidden sm:block flex-1 max-w-[120px] bg-slate-100 rounded-md px-2 py-1 text-[8px] text-slate-400">Ara...</div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">🔔</span>
            <div className="text-right hidden md:block">
              <p className="text-[9px] font-semibold text-slate-700">admin</p>
              <p className="text-[7px] text-slate-400">Süper Yönetici</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function DashboardBody({ compact }) {
  return (
    <div className="flex-1 min-w-0 bg-[#f1f5f9] p-2 md:p-2.5 overflow-hidden">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1.5 mb-2">
        <KpiCard label="Doluluk Oranı" value="%19" />
        <KpiCard label="Bugünkü Girişler" value="0" />
        <KpiCard label="Bugünkü Çıkışlar" value="0" />
        <KpiCard label="Günlük Gelir" value="₺0" />
        <KpiCard label="Konaklayan" value="3" />
        <KpiCard label="Bekleyen Görev" value="4" sub="HK + Teknik" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
        <div className="md:col-span-3 bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[9px] md:text-[10px] font-semibold text-slate-700">Gelir Analizi</p>
            <div className="flex gap-0.5">
              {["Haftalık", "Aylık", "Yıllık"].map((t, i) => (
                <span key={t} className={cn("text-[7px] px-1.5 py-0.5 rounded", i === 1 ? "bg-blue text-white" : "text-slate-400")}>{t}</span>
              ))}
            </div>
          </div>
          <RevenueLineChart />
        </div>

        <div className="md:col-span-2 bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-sm">
          <p className="text-[9px] md:text-[10px] font-semibold text-slate-700 mb-2">Kanal Dağılımı</p>
          <div className="flex items-center gap-3">
            <DonutChart />
            <div className="space-y-1 min-w-0 flex-1">
              {CHANNELS.map((ch) => (
                <div key={ch.label} className="flex items-center justify-between gap-1 text-[8px]">
                  <span className="flex items-center gap-1 text-slate-600 truncate">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ch.color }} />
                    {ch.label}
                  </span>
                  <span className="font-semibold text-slate-700">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-sm">
            <p className="text-[9px] font-semibold text-slate-700 mb-2">Konaklayan Misafirler</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[8px]">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100">
                    <th className="text-left py-1 font-medium">Misafir</th>
                    <th className="text-left py-1 font-medium">Oda</th>
                    <th className="text-right py-1 font-medium">Bakiye</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-slate-600">
                    <td className="py-1.5 font-medium text-slate-800">Utku Koç</td>
                    <td className="py-1.5">2830</td>
                    <td className="py-1.5 text-right tabular-nums">₺70.203</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-sm">
              <p className="text-[9px] font-semibold text-slate-700 mb-1.5">Son Bildirimler</p>
              <p className="text-[8px] text-slate-500 leading-relaxed">
                Yeni rezervasyon — CRS üzerinden <span className="text-slate-700 font-medium">Hotelio</span> otel kaydı.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-sm">
              <p className="text-[9px] font-semibold text-slate-700 mb-1.5">Oda Durumu</p>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5"><span className="text-slate-500">Dolu</span><span className="font-semibold">5</span></div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[31%] bg-blue rounded-full" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5"><span className="text-slate-500">Boş</span><span className="font-semibold">11</span></div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[69%] bg-emerald-400 rounded-full" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-[100px] xl:w-[112px] bg-white border-l border-slate-200/80 shrink-0 p-2">
      <div className="flex flex-wrap gap-0.5 mb-2">
        {["Bugün", "Dün", "7G", "30G"].map((t, i) => (
          <span key={t} className={cn("text-[7px] px-1 py-0.5 rounded", i === 0 ? "bg-blue text-white" : "bg-slate-100 text-slate-500")}>{t}</span>
        ))}
      </div>
      <div className="bg-slate-50 rounded-lg p-1.5 mb-2 border border-slate-100">
        <p className="text-[8px] font-semibold text-slate-600 text-center mb-1">Eylül 2026</p>
        <div className="grid grid-cols-7 gap-px text-[6px] text-center text-slate-400">
          {["Pt","Sa","Ça","Pe","Cu","Ct","Pz"].map((d) => <span key={d}>{d}</span>)}
          {Array.from({ length: 30 }, (_, i) => (
            <span key={i} className={cn("py-0.5 rounded", i + 1 === 9 ? "bg-blue text-white font-bold" : "")}>{i + 1}</span>
          ))}
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-[7px] text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">9 Eylül</p>
        <p>Giriş: <strong>0</strong></p>
        <p>Çıkış: <strong>0</strong></p>
        <p>Gelir: <strong>₺0</strong></p>
        <p>Konaklayan: <strong>3</strong></p>
      </div>
      <div className="mt-auto flex justify-end">
        <span className="w-7 h-7 rounded-full bg-blue text-white flex items-center justify-center text-[10px] shadow-md">💬</span>
      </div>
    </aside>
  );
}

export default function HotelioDashboardMockup({ className, variant = "full" }) {
  const prefersReducedMotion = useReducedMotion();
  const compact = variant === "hero";

  const Wrapper = prefersReducedMotion ? "div" : motion.div;
  const wrapperProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <Wrapper
      className={cn(
        "relative rounded-xl md:rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_32px_80px_rgba(0,0,0,0.35)] bg-white",
        className
      )}
      {...wrapperProps}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0f172a] border-b border-white/5">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/80" />
          <div className="w-2 h-2 rounded-full bg-amber-400/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[9px] text-white/40">app.hotelio.com.tr / yonetici-paneli</span>
        </div>
        <span className="text-[9px] font-bold text-gold tracking-wider">HOTELIO</span>
      </div>

      <div className={cn("flex", compact ? "min-h-[280px] md:min-h-[320px]" : "min-h-[380px] md:min-h-[460px]")}>
        <Sidebar compact={compact} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar compact={compact} />
          <div className="flex flex-1 min-h-0">
            <DashboardBody compact={compact} />
            {!compact && <RightPanel />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
