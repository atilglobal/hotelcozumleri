"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
export default function WebResponsiveShowcase({ items }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
      {items.map((item, index) => {
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.12 },
            };

        const aspect = item.tag === "Mobile" ? "aspect-[9/16]" : item.tag === "Tablet" ? "aspect-[3/4]" : "aspect-[16/10]";
        const scale = item.tag === "Desktop" ? "md:scale-100" : item.tag === "Tablet" ? "md:scale-95" : "md:scale-90 max-w-[220px] mx-auto";

        return (
          <Wrapper key={item.title} className={`relative ${scale}`} {...props}>
            <div className="mb-3">
              <span className="text-xs font-semibold tracking-wider uppercase text-gold-light">{item.tag}</span>
            </div>
            <div className={`relative ${aspect} rounded-2xl overflow-hidden ring-1 ring-white/10`}>
              <Image src={item.src} alt={item.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
