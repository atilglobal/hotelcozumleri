"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hotelioAI } from "@/config/hotelio";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HotelioAIFocusAreas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      <h3 className="heading-on-dark text-xl md:text-2xl font-bold mb-2">{hotelioAI.focusTitle}</h3>
      <p className="text-body-on-dark text-sm mb-6 max-w-2xl">{hotelioAI.focusSubtitle}</p>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={containerVariants}
      >
        {hotelioAI.focusAreas.map((area) => (
          <motion.div
            key={area}
            variants={prefersReducedMotion ? undefined : pillVariants}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center transition-colors hover:border-gold/35 hover:bg-gold/[0.08] hover:shadow-[0_0_24px_rgba(212,168,83,0.15)]"
          >
            <span className="text-[11px] md:text-xs font-semibold text-white/80 tracking-wide uppercase">
              {area}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
