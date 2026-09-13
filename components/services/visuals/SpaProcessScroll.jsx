"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SpaProcessScroll({ steps }) {
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10 md:grid md:grid-cols-7 md:overflow-visible md:pb-0"
      >
        {steps.map((step, index) => {
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.06 },
              };

          return (
            <Wrapper
              key={step.step}
              className="min-w-[220px] md:min-w-0 snap-start p-5 rounded-2xl glass-card-dark border border-white/5 relative"
              {...props}
            >
              <span className="text-gold-light text-xs font-bold tracking-[0.3em]">{step.step}</span>
              <h3 className="font-display text-base heading-on-dark mt-2 mb-2">{step.title}</h3>
              <p className="text-xs text-body-on-dark leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <span className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-gold/40" aria-hidden="true">→</span>
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
