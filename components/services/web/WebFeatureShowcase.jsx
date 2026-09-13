"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function WebFeatureShowcase({ features }) {
  const prefersReducedMotion = useReducedMotion();
  const items = Object.values(features);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, index) => {
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
            key={item.category}
            className="rounded-2xl overflow-hidden glass-card-dark border border-white/10 hover:border-blue/30 transition-colors"
            {...props}
          >
            <div className="relative aspect-[16/10] bg-[#071018]">
              <ServiceImage src={item.image} alt={item.alt} objectPosition={item.objectPosition} sizes="(max-width:768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/80 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <span className="text-blue-bright text-[10px] font-bold tracking-wider uppercase">{item.category.replace(/-/g, " ")}</span>
              <p className="text-sm text-body-on-dark mt-2 leading-relaxed">{item.alt}</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
