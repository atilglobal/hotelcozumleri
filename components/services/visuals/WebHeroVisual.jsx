"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { webImages } from "@/config/serviceImages";

export default function WebHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;
  const desktop = webImages.heroMockup.desktop;
  const mobile = webImages.heroMockup.mobile;

  return (
    <Wrapper
      className="relative mx-auto max-w-lg"
      {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 } })}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.45)] bg-[#071018]">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-white/10 bg-[#071018]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 rounded-full px-5 py-1 text-[10px] text-white/50">www.grandotel.com</div>
          </div>
        </div>

        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={desktop.image}
            alt={desktop.alt}
            fill
            sizes="(max-width:768px) 100vw, 512px"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/95 via-[#07101C]/25 to-transparent" />

          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <span className="px-2 py-1 rounded-full text-[9px] bg-black/50 backdrop-blur-sm text-white/80 border border-white/15">TR / EN</span>
            <span className="px-2 py-1 rounded-full text-[9px] bg-emerald-500/25 backdrop-blur-sm text-emerald-300 border border-emerald-500/30">98 Performance</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
            <div className="w-12 h-1 bg-gold mb-3" />
            <div className="font-display text-xl md:text-2xl text-white mb-1 drop-shadow-lg">Grand Otel Deneyimi</div>
            <div className="text-white/80 text-xs mb-4 max-w-[240px] drop-shadow">Rezervasyon, SPA ve gastronomi tek vitrinde.</div>
            <div className="inline-flex w-fit px-4 py-2 bg-gold text-navy text-xs font-semibold rounded-lg shadow-lg">Rezervasyon Yap</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-4 w-[128px] rounded-xl overflow-hidden border border-white/15 shadow-xl bg-[#071018] hidden sm:block">
        <div className="px-2 py-1.5 text-[8px] text-white/40 border-b border-white/10 text-center bg-[#071018]">Mobil</div>
        <div className="relative aspect-[9/16] overflow-hidden">
          <Image
            src={mobile.image}
            alt={mobile.alt}
            fill
            sizes="128px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/95 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
            <div className="w-6 h-0.5 bg-gold mb-1" />
            <div className="text-[8px] text-white/90">Rezervasyon</div>
            <div className="mt-1 px-2 py-1 bg-gold/95 text-navy text-[7px] font-bold rounded text-center">Book Now</div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-2 px-3 py-2 rounded-xl glass-card-dark border border-white/10 text-[10px] text-white/70 hidden md:block z-20">
        <span className="text-gold font-semibold">Hotelio</span> entegrasyonu
      </div>
    </Wrapper>
  );
}
