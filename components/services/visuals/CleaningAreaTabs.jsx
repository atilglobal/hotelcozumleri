"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function CleaningAreaTabs({ areas }) {
  const areaKeys = Object.keys(areas);
  const [active, setActive] = useState(areaKeys[0]);
  const current = areas[active];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Otel alanları">
        {areaKeys.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium rounded-xl border transition-all",
              active === key
                ? "bg-blue text-white border-blue shadow-[0_0_20px_rgba(59,108,244,0.25)]"
                : "glass-card-dark text-body-on-dark border-white/10 hover:border-blue/30"
            )}
          >
            {areas[key].label}
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
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6 items-center"
        >
          {current.image && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1a2e]">
              <ServiceImage src={current.image} alt={current.alt} objectPosition={current.objectPosition} sizes="(max-width:768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="font-display text-xl text-white">{current.label}</span>
              </div>
            </div>
          )}

          <div className="glass-card-dark rounded-2xl p-6 md:p-8 border border-white/10">
            <h3 className="font-display text-2xl heading-on-dark mb-4">{current.label}</h3>
            <p className="text-sm text-body-on-dark mb-5">{current.alt}</p>
            <ul className="space-y-3">
              {current.products.map((product) => (
                <li key={product} className="flex items-center gap-3 text-body-on-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  {product}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
