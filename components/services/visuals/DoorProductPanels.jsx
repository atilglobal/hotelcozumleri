"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
export default function DoorProductPanels({ products }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product, index) => {
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
            key={product.title}
            className="group rounded-2xl overflow-hidden glass-card-dark border border-white/5 hover:border-gold/20 transition-colors"
            {...props}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0f1a2e]">
              <ServiceImage
                src={product.image}
                alt={product.alt}
                objectPosition={product.objectPosition}
                sizes="(max-width:768px) 100vw, 33vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101C] via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg heading-on-dark">{product.title}</h3>
              <p className="text-sm text-body-on-dark mt-2">{product.description}</p>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
