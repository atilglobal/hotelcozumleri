"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function DoorIntegrationFlow({ steps }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0">
        {steps.map((step, index) => {
          const isHotelio = step === "HOTELIO";
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.12 },
              };

          return (
            <div key={step} className="flex flex-col md:flex-row items-center flex-1">
              <Wrapper
                className={cn(
                  "w-full md:w-auto flex-1 px-4 py-4 rounded-sm text-center border text-sm font-medium tracking-wide",
                  isHotelio
                    ? "bg-navy border-gold/40 text-gold"
                    : "bg-white border-navy/10 text-navy"
                )}
                {...props}
              >
                {step}
              </Wrapper>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center px-2 text-gold" aria-hidden="true">
                  →
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="md:hidden text-gold py-1" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-sm text-gray-light mt-6 max-w-lg mx-auto">
        Mifare kart sistemlerinin Hotelio ile entegrasyon potansiyeli, resepsiyondan oda erişimine kesintisiz operasyon akışı sağlar.
      </p>
    </div>
  );
}
