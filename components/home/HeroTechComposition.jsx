"use client";

import { motion, useReducedMotion } from "framer-motion";
import HotelioDashboardMockup from "@/components/hotelio/HotelioDashboardMockup";
import HotelioAIBadge from "@/components/hotelio/HotelioAIBadge";
import { hotelioAI } from "@/config/hotelio";

const floatCards = [
  { label: "Doluluk", value: "78%", top: "8%", left: "-4%", delay: 0 },
  { label: "ADR", value: "₺4.250", top: "18%", right: "-6%", delay: 0.15 },
  { label: "RevPAR", value: "₺3.315", bottom: "28%", left: "-8%", delay: 0.3 },
  { label: "Aktif Rez.", value: "124", bottom: "12%", right: "-4%", delay: 0.45 },
  { label: "Oda Durumu", value: "32 temiz", top: "42%", right: "-10%", delay: 0.2 },
];

export default function HeroTechComposition() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="absolute -inset-8 bg-gradient-to-br from-blue/25 via-transparent to-gold/20 rounded-[2rem] blur-3xl opacity-70" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <HotelioDashboardMockup
          variant="hero"
          className="rounded-2xl overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.45)] ring-1 ring-white/15"
        />
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="absolute z-20 hidden md:block top-[6%] right-[-2%] max-w-[180px]"
      >
        <HotelioAIBadge tagline={hotelioAI.badgeTagline} quote={hotelioAI.badgeQuote} size="sm" />
      </motion.div>

      {floatCards.map((card) => (
        <motion.div
          key={card.label}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + card.delay, duration: 0.5 }}
          className="absolute z-20 hidden md:block px-3 py-2 rounded-xl bg-navy/85 backdrop-blur-md border border-white/12 shadow-lg"
          style={{ top: card.top, left: card.left, right: card.right, bottom: card.bottom }}
        >
          <p className="text-[9px] uppercase tracking-wider text-white/55">{card.label}</p>
          <p className="text-sm font-bold text-white">{card.value}</p>
          <p className="text-[8px] text-white/40 mt-0.5">Demo veri</p>
        </motion.div>
      ))}

      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-navy/80 border border-gold/30 text-[10px] text-gold-light tracking-wider uppercase whitespace-nowrap">
        Kendi geliştirdiğimiz otel yönetim platformu
      </div>
    </div>
  );
}
