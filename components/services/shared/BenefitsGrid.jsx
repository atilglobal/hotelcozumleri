"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BenefitsGrid({ benefits, accent = "gold" }) {
  const prefersReducedMotion = useReducedMotion();
  const accentBorder = {
    gold: "hover:border-gold/30",
    blue: "hover:border-blue/30",
    emerald: "hover:border-emerald-400/30",
    ice: "hover:border-cyan-400/30",
  }[accent] || "hover:border-gold/30";

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {benefits.map((benefit, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.08 },
            };

        return (
          <Wrapper
            key={benefit.title}
            className={`p-6 rounded-2xl glass-card-dark border border-white/5 transition-colors ${accentBorder}`}
            {...props}
          >
            <h3 className="font-display text-xl heading-on-dark mb-2">{benefit.title}</h3>
            <p className="text-sm text-body-on-dark leading-relaxed">{benefit.description}</p>
          </Wrapper>
        );
      })}
    </div>
  );
}
