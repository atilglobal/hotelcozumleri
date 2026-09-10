"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export default function CleaningAreaTabs({ areas }) {
  const areaKeys = Object.keys(areas);
  const [active, setActive] = useState(areaKeys[0]);
  const current = areas[active];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Otel alanları">
        {areaKeys.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-sm border transition-all",
              active === key
                ? "bg-blue text-white border-blue"
                : "bg-white text-navy border-navy/10 hover:border-blue/30"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-navy/10 rounded-sm p-6 md:p-8"
        >
          <h3 className="font-display text-2xl text-navy mb-4">{current.label}</h3>
          <ul className="space-y-3">
            {current.products.map((product) => (
              <li key={product} className="flex items-center gap-3 text-gray">
                <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                {product}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
