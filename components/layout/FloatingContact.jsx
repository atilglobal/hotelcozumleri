"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);
  const whatsappUrl = siteConfig.social.whatsapp;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {expanded && (
        <div className="flex flex-col gap-2 mb-1 animate-[fade-up_0.3s_ease]">
          <Link
            href="/teklif-al"
            className="px-4 py-2.5 glass-card-dark rounded-xl text-sm font-semibold heading-on-dark shadow-[var(--shadow-card)] hover:border-gold/30 transition-all"
          >
            Teklif Al
          </Link>
          <Link
            href="/hotelio-demo"
            className="px-4 py-2.5 glass-card-dark border-gold/25 rounded-xl text-sm font-semibold text-gold shadow-[var(--shadow-card)] hover:border-gold/40 transition-all"
          >
            Hotelio Demo
          </Link>
        </div>
      )}

      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.35)]",
            "hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          )}
          aria-label="WhatsApp'tan görüş"
        >
          <span className="hidden md:inline-block pl-5 pr-1 py-3.5 text-sm font-semibold text-white whitespace-nowrap">
            WhatsApp
          </span>
          <span className="flex items-center justify-center w-12 h-12 md:w-11 md:h-11 md:mr-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="md:hidden w-11 h-11 flex items-center justify-center glass-card-dark rounded-full shadow-[var(--shadow-card)] heading-on-dark"
          aria-label={expanded ? "Menüyü kapat" : "Hızlı iletişim"}
          aria-expanded={expanded}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {expanded ? <path d="M6 6L18 18M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
    </div>
  );
}
