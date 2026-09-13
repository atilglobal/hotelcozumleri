"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function FlowDiagram({ steps, highlight, note, layout = "horizontal" }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={cn(
          "flex gap-2",
          layout === "horizontal" ? "flex-col md:flex-row items-stretch md:items-center" : "flex-col items-center"
        )}
      >
        {steps.map((step, index) => {
          const isHighlight = step === highlight || step.label === highlight;
          const label = typeof step === "string" ? step : step.label;
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1 },
              };

          return (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center",
                layout === "horizontal" ? "md:flex-row flex-1" : "w-full max-w-sm"
              )}
            >
              <Wrapper
                className={cn(
                  "w-full px-4 py-4 md:py-5 rounded-xl text-center border text-sm font-medium tracking-wide",
                  isHighlight
                    ? "bg-navy/80 border-gold/40 text-gold shadow-[0_0_30px_rgba(212,175,55,0.08)]"
                    : "glass-card-dark border-white/10 text-body-on-dark"
                )}
                {...props}
              >
                {label}
              </Wrapper>
              {index < steps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center px-2 text-gold shrink-0" aria-hidden="true">
                    →
                  </div>
                  <div className="md:hidden text-gold py-2" aria-hidden="true">
                    ↓
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {note && <p className="text-center text-sm text-body-on-dark mt-8 max-w-2xl mx-auto">{note}</p>}
    </div>
  );
}
