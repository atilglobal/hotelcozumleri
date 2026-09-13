"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import PreviewMockup from "./mockups/PreviewMockups";
import { hotelioCategories } from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioModuleNavigator() {
  const [active, setActive] = useState(hotelioCategories[0].id);
  const current = hotelioCategories.find((c) => c.id === active);

  return (
    <section className="section-padding section-dark-b relative overflow-hidden" id="moduller">
      <SectionBackdrop variant="b" />
      <Container className="relative z-10">
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mb-4">Modül Mimarisi</h2>
          <p className="text-body-on-dark max-w-2xl mb-12">
            Otel operasyonunuzun her katmanı için tasarlanmış modüler yapı.
          </p>
        </AnimatedText>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <nav className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-1" aria-label="Modül kategorileri">
            {hotelioCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-sm border-l-2 transition-all text-sm",
                  active === cat.id
                    ? "border-gold glass-card-dark heading-on-dark"
                    : "border-transparent text-body-on-dark hover:text-white hover:bg-white/5"
                )}
                aria-current={active === cat.id ? "true" : undefined}
              >
                <span className="font-medium block">{cat.label}</span>
                <span className="text-xs opacity-70 mt-0.5 block">{cat.features.length} özellik</span>
              </button>
            ))}
          </nav>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <PreviewMockup type={current.mockupType} className="mb-6" />
                  <h3 className="font-display text-2xl heading-on-dark mb-2">{current.label}</h3>
                  <p className="text-body-on-dark mb-6">{current.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {current.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-body-on-dark">
                        <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
