"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotelAreas } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/utils/cn";

export default function HotelAreas() {
  const [activeArea, setActiveArea] = useState(null);
  const selected = hotelAreas.areas.find((a) => a.id === activeArea);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <Container>
        <SectionTitle
          title={hotelAreas.title}
          subtitle={hotelAreas.subtitle}
          align="center"
          className="mb-12 md:mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Interactive floor plan */}
          <div className="relative aspect-[4/3] bg-navy rounded-2xl overflow-hidden shadow-[var(--shadow-card)] ring-1 ring-navy/10">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Floor plan zones */}
            <div className="absolute inset-6 md:inset-10 border border-white/10 rounded-xl">
              <div className="absolute top-0 left-0 w-1/3 h-1/4 border-r border-b border-white/10 bg-white/[0.02]" />
              <div className="absolute top-0 left-1/3 w-1/3 h-1/4 border-r border-b border-white/10 bg-white/[0.03]" />
              <div className="absolute top-0 right-0 w-1/3 h-1/3 border-b border-white/10 bg-white/[0.02]" />
              <div className="absolute top-1/4 left-0 w-2/3 h-1/3 border-r border-b border-white/10" />
              <div className="absolute top-1/4 right-0 w-1/3 h-1/3 border-b border-white/10 bg-white/[0.02]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-[42%] border-r border-white/10" />
              <div className="absolute bottom-0 right-0 w-1/2 h-[42%] bg-white/[0.02]" />
            </div>

            {/* Area markers */}
            {hotelAreas.areas.map((area) => (
              <button
                key={area.id}
                type="button"
                className="absolute z-10 group"
                style={{ top: area.position.top, left: area.position.left, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setActiveArea(area.id)}
                onFocus={() => setActiveArea(area.id)}
                onMouseLeave={() => setActiveArea(null)}
                onBlur={() => setActiveArea(null)}
                aria-label={`${area.name} alanı çözümleri`}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-300",
                    activeArea === area.id
                      ? "border-gold bg-gold/20 scale-125"
                      : "border-white/30 bg-navy/80 group-hover:border-gold/60 group-hover:scale-110"
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </span>
                <span
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-[10px] md:text-xs font-medium tracking-wide transition-opacity",
                    activeArea === area.id ? "text-gold opacity-100" : "text-white/50 opacity-0 group-hover:opacity-100"
                  )}
                >
                  {area.name}
                </span>
              </button>
            ))}

            {/* Center label */}
            <div className="absolute bottom-4 left-4 text-white/30 text-xs tracking-widest uppercase">
              Otel Planı
            </div>
          </div>

          {/* Info panel */}
          <div className="min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-blue text-xs font-semibold tracking-[0.2em] uppercase">
                    {selected.name}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl text-navy mt-2 mb-6">
                    Bu Alanda Sunduğumuz Çözümler
                  </h3>
                  <ul className="space-y-4">
                    {selected.solutions.map((solution) => (
                      <li
                        key={solution}
                        className="flex items-center gap-4 py-3 border-b border-navy/10"
                      >
                        <span className="w-8 h-px bg-gold" />
                        <span className="text-lg text-navy font-medium">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center lg:text-left"
                >
                  <h3 className="font-display text-2xl md:text-3xl text-navy/40 mb-4">
                    Bir alanın üzerine gelin
                  </h3>
                  <p className="text-gray-light leading-relaxed max-w-md">
                    Otelinizin her bölgesi için düşünülmüş çözümlerimizi keşfedin.
                    Resepsiyondan SPA&apos;ya, yönetimden güvenliğe kadar her noktada yanınızdayız.
                  </p>

                  {/* Mobile area list */}
                  <div className="mt-8 grid grid-cols-2 gap-2 lg:hidden">
                    {hotelAreas.areas.map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setActiveArea(area.id)}
                        className="text-left p-3 bg-off-white rounded-sm border border-navy/5 hover:border-blue/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-navy">{area.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
