"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
import { doorImages } from "@/config/serviceImages";

export default function DoorHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;
  const lock = doorImages.products.electronicLock;
  const card = doorImages.products.mifareCard;

  return (
    <Wrapper
      className="relative mx-auto max-w-md h-[360px]"
      {...(prefersReducedMotion ? {} : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.35 } })}
    >
      <div className="absolute inset-x-8 top-8 bottom-16 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <ServiceImage src={lock.image} alt={lock.alt} objectPosition={lock.objectPosition} sizes="400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/90 via-[#07101C]/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-card-dark text-center backdrop-blur-sm">
          <p className="text-[10px] text-gold uppercase tracking-wider">Elektronik Kilit</p>
        </div>
      </div>

      <div className="absolute top-4 right-0 w-28 rounded-xl glass-card-dark border border-white/10 p-3 shadow-xl rotate-6">
        <div className="relative w-full aspect-[1.6/1] rounded-lg overflow-hidden mb-2">
          <ServiceImage src={card.image} alt={card.alt} objectPosition={card.objectPosition} sizes="112px" />
        </div>
        <p className="text-[9px] text-white/60 text-center">Mifare Kart</p>
      </div>

      <div className="absolute bottom-0 left-0 w-36 rounded-xl glass-card-dark border border-white/10 p-3 shadow-xl -rotate-3">
        <p className="text-[9px] text-gold uppercase tracking-wider mb-2">Access Control</p>
        <div className="space-y-1">
          {["Kat 3", "SPA", "Oda 412"].map((z) => (
            <div key={z} className="flex justify-between text-[9px] text-white/60">
              <span>{z}</span>
              <span className="text-emerald-400">●</span>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
