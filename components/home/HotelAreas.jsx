"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotelAreas } from "@/config/home";
import HotelEcosystemMap from "@/components/home/HotelEcosystemMap";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function HotelAreas() {
  const [activeArea, setActiveArea] = useState(null);
  const selected = hotelAreas.areas.find((a) => a.id === activeArea);

  return (
    <section className="section-padding section-dark-a relative overflow-hidden">
      <SectionBackdrop variant="a" />
      <Container className="relative z-10">
        <SectionTitle
          title={hotelAreas.title}
          subtitle={hotelAreas.subtitle}
          align="center"
          className="mb-12 md:mb-16 mx-auto"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] ring-1 ring-navy/8 bg-navy">
            <HotelEcosystemMap
              className="absolute inset-0 w-full h-full"
              areas={hotelAreas.areas}
              activeId={activeArea}
              onAreaChange={setActiveArea}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Otel Ekosistemi</span>
              <span className="text-[10px] text-white/50 font-mono">HC-MAP v1</span>
            </div>
          </div>

          <div className="min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-blue-deep text-xs font-bold tracking-[0.2em] uppercase">{selected.name}</span>
                  <h3 className="text-2xl md:text-3xl font-bold heading-on-dark mt-2 mb-6">Bu Alandaki Çözümlerimiz</h3>
                  <ul className="space-y-3">
                    {selected.solutions.map((solution) => (
                      <li key={solution} className="flex items-center gap-3 py-2 border-b border-white/10">
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        <span className="text-body-on-dark font-medium">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-blue-deep mb-3">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    İnteraktif Harita
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold heading-on-dark mb-4">Bir alan seçin</h3>
                  <p className="text-body-on-dark leading-relaxed max-w-md">
                    Haritadaki noktaların üzerine gelin veya dokunun. Resepsiyondan SPA&apos;ya kadar her bölüm için
                    çözümlerimizi keşfedin.
                  </p>
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {hotelAreas.areas.map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setActiveArea(area.id)}
                        className={cn(
                          "text-left p-3 rounded-xl border text-sm font-medium transition-colors",
                          activeArea === area.id
                            ? "bg-blue/20 text-white border-blue/40"
                            : "glass-card-dark border-white/10 text-body-on-dark hover:border-gold/40"
                        )}
                      >
                        {area.name}
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
