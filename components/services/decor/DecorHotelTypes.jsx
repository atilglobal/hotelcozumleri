"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { decorHotelTypes } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

const typeKeys = Object.keys(decorHotelTypes);

export default function DecorHotelTypes() {
  const [active, setActive] = useState(typeKeys[0]);
  const current = decorHotelTypes[active];

  return (
    <section className="section-padding section-dark-c relative overflow-hidden">
      <SectionBackdrop variant="c" />
      <Container className="relative z-10">
        <AnimatedText className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Otel Tipine Göre</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
            Her Otel Konseptine Uygun Dekorasyon Fikirleri
          </h2>
          <p className="text-body-on-dark">
            Otel tipinizi seçerek size uygun uygulama alanlarını keşfedin.
          </p>
        </AnimatedText>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Otel tipleri">
          {typeKeys.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium rounded-xl border transition-all",
                active === key
                  ? "bg-gold/20 text-gold-light border-gold/40"
                  : "glass-card-dark text-body-on-dark border-white/10 hover:border-gold/25"
              )}
            >
              {decorHotelTypes[key].label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl glass-card-dark border border-gold/15"
          >
            <h3 className="font-display text-2xl heading-on-dark mb-5">{current.label} İçin Öneriler</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {current.ideas.map((idea) => (
                <li key={idea} className="flex items-center gap-3 text-body-on-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {idea}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
