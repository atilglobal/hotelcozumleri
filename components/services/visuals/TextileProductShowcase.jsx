"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function TextileProductShowcase({ products }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {products.map((product, index) => {
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
          <Wrapper key={product.title} className="group relative rounded-2xl overflow-hidden" {...props}>
            <div className="relative aspect-[3/4] bg-[#0f1a2e]">
              <ServiceImage
                src={product.image}
                alt={product.alt}
                objectPosition={product.objectPosition}
                sizes="(max-width:768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/90 via-[#07101C]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg text-white">{product.title}</h3>
              </div>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
