"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function TextileLogoFlow({ steps }) {
  const prefersReducedMotion = useReducedMotion();
  const Wrapper = prefersReducedMotion ? "div" : motion.div;

  return (
    <Wrapper
      className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
          })}
    >
      {steps.map((step, index) => (
        <div key={step} className="relative text-center">
          <div
            className={`aspect-[4/3] rounded-sm mb-4 flex items-center justify-center border ${
              index === 2
                ? "bg-navy border-gold/30"
                : index === 1
                  ? "bg-blue/10 border-blue/25"
                  : "bg-white/5 border-white/10"
            }`}
          >
            {index === 2 && (
              <span className="text-gold font-display text-xl tracking-widest">LOGO</span>
            )}
            {index === 0 && (
              <span className="text-muted-on-dark text-sm">Standart ürün</span>
            )}
            {index === 1 && (
              <span className="text-blue text-sm font-medium">Nakış uygulaması</span>
            )}
          </div>
          <p className="font-medium text-navy text-sm">{step}</p>
          {index < steps.length - 1 && (
            <span className="hidden md:block absolute top-1/3 -right-3 text-gold" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </Wrapper>
  );
}
