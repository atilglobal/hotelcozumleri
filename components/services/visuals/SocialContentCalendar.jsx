"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function SocialContentCalendar({ items }) {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;

  return (
    <Wrapper
      className="max-w-3xl mx-auto rounded-2xl glass-card-dark border border-white/10 overflow-hidden"
      {...(prefersReducedMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
    >
      <div className="px-5 py-4 border-b border-white/10">
        <p className="text-xs font-bold tracking-wider uppercase text-gold-light">İçerik Takvimi — Grand Otel</p>
        <p className="text-sm text-body-on-dark mt-1">Örnek haftalık içerik planı</p>
      </div>
      <div className="p-5 grid sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.day} className="rounded-xl overflow-hidden border border-white/10">
            <div className="relative aspect-video bg-[#0f1a2e]">
              {item.image ? (
                <ServiceImage src={item.image} alt={item.alt} sizes="(max-width:768px) 50vw, 300px" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/70 to-transparent" />
              <div className="absolute inset-0 flex items-end p-3">
                <span className="text-[10px] font-semibold text-white/90 bg-black/40 px-2 py-1 rounded-full">{item.content}</span>
              </div>
            </div>
            <div className="px-3 py-2 text-sm font-medium heading-on-dark">{item.day}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
