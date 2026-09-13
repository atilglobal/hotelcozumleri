"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function SpaSolutionEditorial({ areas }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8 md:space-y-12">
      {areas.map((area, index) => {
        const isReverse = index % 2 === 1;
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-60px" },
              transition: { duration: 0.6 },
            };

        return (
          <Wrapper
            key={area.title}
            className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${isReverse ? "md:[direction:rtl]" : ""}`}
            {...props}
          >
            <div className={`relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1a2e] ${isReverse ? "md:[direction:ltr]" : ""}`}>
              <ServiceImage src={area.image} alt={area.alt} objectPosition={area.objectPosition} sizes="(max-width:768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/60 to-transparent" />
            </div>
            <div className={isReverse ? "md:[direction:ltr]" : ""}>
              <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Wellness</span>
              <h3 className="font-display text-2xl md:text-3xl heading-on-dark mt-2 mb-3">{area.title}</h3>
              <p className="text-body-on-dark leading-relaxed">{area.description}</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
