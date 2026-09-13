"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function ScopeGrid({ items, columns = 3, accent = "gold" }) {
  const prefersReducedMotion = useReducedMotion();
  const accentDot = {
    gold: "bg-gold",
    blue: "bg-blue-bright",
    emerald: "bg-emerald-400",
    ice: "bg-cyan-400",
  }[accent] || "bg-gold";

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns] || "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-4 md:gap-5", gridCols)}>
      {items.map((item, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.06 },
            };

        const label = typeof item === "string" ? item : item.title;
        const description = typeof item === "string" ? null : item.description;

        return (
          <Wrapper
            key={label}
            className="p-5 md:p-6 rounded-2xl glass-card-dark border border-white/5 hover:border-white/15 transition-colors"
            {...props}
          >
            <span className={cn("w-2 h-2 rounded-full inline-block mb-3", accentDot)} />
            <h3 className="font-display text-lg heading-on-dark">{label}</h3>
            {description && <p className="text-sm text-body-on-dark mt-2 leading-relaxed">{description}</p>}
          </Wrapper>
        );
      })}
    </div>
  );
}
