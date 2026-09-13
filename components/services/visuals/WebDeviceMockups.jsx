"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { webImages } from "@/config/serviceImages";

function SiteFrame({ variant = "desktop", showcase }) {
  const isMobile = variant === "mobile";
  const isTablet = variant === "tablet";
  const frame = showcase[variant];

  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/10 bg-[#071018] shadow-xl ${
        isMobile ? "max-w-[200px] mx-auto" : isTablet ? "max-w-[280px] mx-auto" : "w-full"
      }`}
    >
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
          <div className="w-2 h-2 rounded-full bg-green-400/50" />
        </div>
        <div className="flex-1 text-center text-[9px] text-white/40">grandotel.com</div>
      </div>
      <div
        className={`relative overflow-hidden ${
          isMobile ? "aspect-[9/16]" : isTablet ? "aspect-[3/4]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={frame.image}
          alt={frame.alt}
          fill
          sizes={isMobile ? "200px" : isTablet ? "280px" : "(max-width:768px) 100vw, 33vw"}
          className="object-cover"
          style={{ objectPosition: frame.objectPosition || "center top" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/85 via-[#07101C]/15 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1 z-10">
          <span className="px-1.5 py-0.5 rounded text-[8px] bg-black/45 backdrop-blur-sm text-white/70 border border-white/10">TR / EN</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="w-8 h-0.5 bg-gold mb-2" />
          <div className={`text-white font-display ${isMobile ? "text-sm" : "text-lg"} mb-1`}>Grand Otel</div>
          {!isMobile && <div className="text-white/60 text-[10px] mb-3">Rezervasyon · SPA · Gastronomi</div>}
          <div className={`inline-flex w-fit px-3 py-1.5 bg-gold text-navy font-semibold rounded ${isMobile ? "text-[9px]" : "text-xs"}`}>
            Rezervasyon
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebDeviceMockups() {
  const prefersReducedMotion = useReducedMotion();
  const showcase = webImages.responsiveShowcase;

  const devices = [
    { tag: "Desktop", variant: "desktop" },
    { tag: "Tablet", variant: "tablet" },
    { tag: "Mobile", variant: "mobile" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
      {devices.map((device, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.12 },
            };

        return (
          <Wrapper key={device.tag} className="relative" {...props}>
            <div className="mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-gold-light">{device.tag}</span>
            </div>
            <SiteFrame variant={device.variant} showcase={showcase} />
            <p className="text-sm text-body-on-dark mt-3 text-center">Aynı otel sitesi — {device.tag.toLowerCase()} düzen</p>
          </Wrapper>
        );
      })}
    </div>
  );
}
