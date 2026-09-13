"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ProcessGrid({ steps, accent = "gold" }) {
  const prefersReducedMotion = useReducedMotion();
  const accentText = {
    gold: "text-gold-light",
    blue: "text-blue-bright",
    emerald: "text-emerald-300/90",
    ice: "text-cyan-300/90",
  }[accent] || "text-gold-light";

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
      {steps.map((step, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.07 },
            };

        return (
          <Wrapper
            key={step.step}
            className="relative p-5 md:p-6 rounded-2xl glass-card-dark border border-white/5"
            {...props}
          >
            <span className={`text-xs font-bold tracking-[0.3em] ${accentText}`}>{step.step}</span>
            <h3 className="font-display text-lg heading-on-dark mt-2 mb-2">{step.title}</h3>
            <p className="text-sm text-body-on-dark leading-relaxed">{step.description}</p>
          </Wrapper>
        );
      })}
    </div>
  );
}
