"use client";

import { cn } from "@/utils/cn";

const themes = [
  {
    accent: "from-blue/10 to-transparent",
    iconBg: "bg-blue/10 text-blue-deep group-hover:bg-blue group-hover:text-white",
    ring: "ring-blue/15",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M6 21V9l6-3 6 3v12M9 21v-4h6v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    accent: "from-gold/12 to-transparent",
    iconBg: "bg-gold/10 text-gold-dark group-hover:bg-gold group-hover:text-white",
    ring: "ring-gold/20",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M14 17h7M17.5 14v7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    accent: "from-accent/10 to-transparent",
    iconBg: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white",
    ring: "ring-accent/15",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v4M12 17v4M4.5 7.5l3 3M16.5 13.5l3 3M3 12h4M17 12h4M4.5 16.5l3-3M16.5 10.5l3-3" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    accent: "from-blue-deep/10 to-transparent",
    iconBg: "bg-ice text-blue-deep group-hover:bg-blue-deep group-hover:text-white",
    ring: "ring-blue-deep/15",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 18V6M8 18V10M12 18V8M16 18V12M20 18V4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    accent: "from-gold/10 to-transparent",
    iconBg: "bg-gold/10 text-gold-dark group-hover:bg-gold-dark group-hover:text-white",
    ring: "ring-gold/15",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 14a4 4 0 018 0v2H4v-2zM14 14a4 4 0 018 0v2h-8v-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 14v3M16 14v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    accent: "from-blue-bright/10 to-transparent",
    iconBg: "bg-blue/10 text-blue group-hover:bg-blue-bright group-hover:text-white",
    ring: "ring-blue-bright/15",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhyUsFeatureCard({ index, title, description }) {
  const theme = themes[index % themes.length];
  const number = String(index + 2).padStart(2, "0");

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl bg-white border border-navy/6 p-6 md:p-7",
        "shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)]",
        "hover:-translate-y-1 transition-all duration-300 ring-1",
        theme.ring
      )}
    >
      <div
        className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br opacity-80 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          theme.accent
        )}
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-navy) 1px, transparent 1px), linear-gradient(90deg, var(--color-navy) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4 mb-5">
        <span
          className={cn(
            "inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0 transition-colors duration-300",
            theme.iconBg
          )}
        >
          {theme.icon}
        </span>
        <span className="text-[11px] font-bold tracking-widest text-gray-light/80 tabular-nums">{number}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-bold text-navy mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-gray leading-relaxed">{description}</p>
      </div>

      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-navy/8 to-transparent" />
    </article>
  );
}
