"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SocialContentFlow({ steps }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-3 max-w-5xl mx-auto">
      {steps.map((step, index) => {
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
          <div key={step.label} className="flex flex-col lg:flex-row items-center flex-1">
            <Wrapper
              className="w-full flex-1 p-5 rounded-2xl glass-card-dark border border-white/10 hover:border-blue/30 transition-colors text-center lg:text-left"
              {...props}
            >
              <span className="text-blue-bright text-[10px] font-bold tracking-[0.2em] uppercase">{step.label}</span>
              <p className="text-sm text-body-on-dark mt-2">{step.description}</p>
            </Wrapper>
            {index < steps.length - 1 && (
              <>
                <span className="hidden lg:inline text-gold px-2 shrink-0" aria-hidden="true">→</span>
                <span className="lg:hidden text-gold py-1" aria-hidden="true">↓</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
