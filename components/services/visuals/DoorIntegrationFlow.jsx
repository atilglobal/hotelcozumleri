"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
import { cn } from "@/utils/cn";

export default function DoorIntegrationFlow({ steps, note }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-2">
        {steps.map((step, index) => {
          const label = typeof step === "string" ? step : step.label;
          const isHotelio = label === "Resepsiyon" || label?.includes("HOTELIO");
          const Wrapper = prefersReducedMotion ? "div" : motion.div;
          const props = prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.1 },
              };

          return (
            <div key={label} className="flex flex-col lg:flex-row items-center flex-1 min-w-0">
              <Wrapper className="w-full flex-1" {...props}>
                <div
                  className={cn(
                    "rounded-xl overflow-hidden border",
                    isHotelio ? "border-gold/30 ring-1 ring-gold/15" : "border-white/10"
                  )}
                >
                  {step.image && (
                    <div className="relative aspect-[16/10] bg-[#0f1a2e]">
                      <ServiceImage src={step.image} alt={step.alt || label} sizes="(max-width:768px) 100vw, 20vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/80 to-transparent" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-3 py-3 text-center text-sm font-medium",
                      isHotelio ? "bg-navy/80 text-gold" : "glass-card-dark text-body-on-dark"
                    )}
                  >
                    {label}
                    {isHotelio && (
                      <span className="block text-[10px] text-gold/70 mt-1 font-normal">Hotelio entegrasyon noktası</span>
                    )}
                  </div>
                </div>
              </Wrapper>
              {index < steps.length - 1 && (
                <>
                  <div className="hidden lg:flex items-center px-1 text-gold shrink-0" aria-hidden="true">→</div>
                  <div className="lg:hidden text-gold py-1 text-center" aria-hidden="true">↓</div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {note && <p className="text-center text-sm text-body-on-dark mt-8 max-w-2xl mx-auto">{note}</p>}
    </div>
  );
}
