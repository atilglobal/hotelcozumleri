"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function ServiceGallery({ items, columns = 3 }) {
  const prefersReducedMotion = useReducedMotion();
  const gridClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-4 md:gap-5 ${gridClass}`}>
      {items.map((item, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, scale: 0.98 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: index * 0.08 },
            };

        const alt = item.alt || item.title;

        return (
          <Wrapper key={item.title} className="group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1a2e]" {...props}>
            <ServiceImage src={item.src} alt={alt} sizes="(max-width:768px) 100vw, 33vw" className="group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {item.tag && <span className="text-[10px] uppercase tracking-wider text-gold-light">{item.tag}</span>}
              <p className="text-white font-medium">{item.title}</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
