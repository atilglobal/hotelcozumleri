"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

const orbitNodes = [
  { label: "Yazılım", angle: -90, tone: "bg-blue/90" },
  { label: "Tedarik", angle: -30, tone: "bg-gold/90" },
  { label: "Dijital", angle: 30, tone: "bg-accent/90" },
  { label: "Operasyon", angle: 90, tone: "bg-blue-deep/90" },
  { label: "Wellness", angle: 150, tone: "bg-gold-dark/90" },
  { label: "Güvenlik", angle: 210, tone: "bg-navy-muted/90" },
];

const RADIUS = 132;

function polarToXY(angleDeg, r = RADIUS) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export default function WhyUsHubGraphic({ title, description, className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl h-full min-h-[440px] lg:min-h-[540px]",
        "bg-gradient-to-br from-navy via-navy-light to-[#0a1628]",
        "border border-white/10 shadow-[0_24px_80px_rgba(12,18,34,0.35)]",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
        <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center text-sm font-bold mb-4 bg-gold/20 text-gold-light ring-1 ring-gold/30">
          01
        </span>

        <div className="relative flex-1 w-full min-h-[280px] md:min-h-[300px]">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 320"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="200" cy="155" r={RADIUS} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="200" cy="155" r="96" stroke="rgba(212,168,83,0.18)" strokeWidth="1" />
            {orbitNodes.map((node) => {
              const { x, y } = polarToXY(node.angle);
              return (
                <line
                  key={node.label}
                  x1="200"
                  y1="155"
                  x2={200 + x}
                  y2={155 + y}
                  stroke="url(#hubLine)"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
              );
            })}
            <defs>
              <linearGradient id="hubLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a853" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#5b8aff" stopOpacity="0.65" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-[108px] h-[108px] md:w-[120px] md:h-[120px] rounded-full bg-gradient-to-br from-gold/30 to-blue/25 border border-white/20 shadow-[0_0_48px_rgba(212,168,83,0.28)] backdrop-blur-sm"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-1">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/90 text-center leading-tight px-1">
                  Tek Muhatap
                </span>
              </motion.div>
            </div>

            {orbitNodes.map((node, i) => {
              const { x, y } = polarToXY(node.angle);
              return (
                <div
                  key={node.label}
                  className="absolute left-1/2 top-[48%] z-10"
                  style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                >
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.4 }}
                  >
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] md:text-[11px] font-semibold text-white",
                        "shadow-md border border-white/15 backdrop-blur-sm whitespace-nowrap",
                        node.tone
                      )}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-5 border-t border-white/10">
          <h3 className="heading-on-dark text-xl md:text-2xl font-bold mb-2 tracking-tight">{title}</h3>
          <p className="text-body-on-dark text-sm md:text-base leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
