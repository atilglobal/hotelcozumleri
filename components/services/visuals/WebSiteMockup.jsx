"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { webImages } from "@/config/serviceImages";

export default function WebSiteMockup() {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;
  const props = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
      };
  const preview = webImages.heroMockup.desktop;

  return (
    <Wrapper
      className="relative mx-auto max-w-4xl rounded-sm overflow-hidden border border-navy/10 shadow-[0_30px_60px_rgba(10,22,40,0.12)]"
      {...props}
    >
      <div className="bg-[#071018] px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white/10 rounded-sm px-6 py-1 text-[10px] text-white/50">www.grandotel.com</div>
        </div>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={preview.image}
          alt={preview.alt}
          fill
          sizes="(max-width:768px) 100vw, 896px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/90 via-[#07101C]/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="w-16 h-1 bg-gold mb-4" />
          <div className="font-display text-2xl md:text-4xl text-white mb-2">Grand Otel Deneyimi</div>
          <div className="text-white/70 text-sm mb-6 max-w-md">Konfor, prestij ve unutulmaz anılar bir arada.</div>
          <div className="inline-flex w-fit px-6 py-2.5 bg-gold text-navy text-sm font-medium rounded-sm">Rezervasyon Yap</div>
        </div>
      </div>
    </Wrapper>
  );
}
