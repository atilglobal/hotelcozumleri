"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SpaProcessTimeline({ steps }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/30 md:-translate-x-px" aria-hidden="true" />

      <div className="space-y-8">
        {steps.map((item, index) => {
          const isEven = index % 2 === 0;
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, x: isEven ? -20 : 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, margin: "-40px" },
                transition: { delay: index * 0.08 },
              };

          return (
            <Wrapper
              key={item.step}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              {...props}
            >
              <div className={`flex-1 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-gold text-xs font-bold tracking-[0.3em]">{item.step}</span>
                <h3 className="font-display text-xl text-navy mt-1 mb-1">{item.title}</h3>
                <p className="text-gray-light text-sm">{item.description}</p>
              </div>

              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-white -translate-x-1/2 mt-1.5 z-10" />

              <div className="hidden md:block flex-1" />
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
