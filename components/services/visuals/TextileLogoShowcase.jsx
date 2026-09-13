"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function TextileLogoShowcase({ steps, embroidery }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1 },
              };

          return (
            <div key={step.label} className="relative">
              <Wrapper className="text-center" {...props}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1a2e]">
                  <ServiceImage src={step.image} alt={step.label} sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <p className="font-medium heading-on-dark mt-3">{step.label}</p>
              </Wrapper>
              {index < steps.length - 1 && (
                <span className="hidden md:block absolute top-1/3 -right-4 text-gold text-xl" aria-hidden="true">→</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden ring-1 ring-gold/20 bg-[#0f1a2e]">
        <div className="relative aspect-[16/9]">
          <ServiceImage src={embroidery.image} alt={embroidery.alt} objectPosition={embroidery.objectPosition} sizes="(max-width:768px) 100vw, 672px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="font-display text-xl text-white">{embroidery.alt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
