"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
import { socialImages } from "@/config/serviceImages";

const gridItems = [
  { label: "Suite", ...socialImages.posts.post },
  { label: "SPA", ...socialImages.posts.story },
  { label: "Pool", ...socialImages.posts.reels },
  { label: "Lobby", ...socialImages.calendar.sunday },
  { label: "Gastro", ...socialImages.calendar.friday },
  { label: "Room", ...socialImages.calendar.monday },
];

export default function SocialHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;

  return (
    <Wrapper
      className="relative mx-auto max-w-sm"
      {...(prefersReducedMotion ? {} : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.35 } })}
    >
      <div className="rounded-[2rem] p-3 bg-gradient-to-b from-[#1a1a2e] to-[#071018] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        <div className="rounded-[1.5rem] overflow-hidden bg-black">
          <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
            <span className="text-xs font-semibold text-white">@oteliniz</span>
            <span className="text-[10px] text-white/50">Instagram</span>
          </div>
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {gridItems.map((item) => (
              <div key={item.label} className="relative aspect-square overflow-hidden">
                <ServiceImage src={item.image} alt={item.alt} sizes="120px" objectPosition={item.objectPosition || "center"} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-1 left-1.5 text-[8px] text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-[9px] text-purple-200">Reels</span>
              <span className="px-2 py-0.5 rounded-full bg-blue/30 text-[9px] text-blue-bright">Campaign</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue to-gold rounded-full" />
            </div>
            <p className="text-[9px] text-white/40 mt-2">İçerik takvimi — haftalık plan</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
