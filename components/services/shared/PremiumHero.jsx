"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { cn } from "@/utils/cn";

export default function PremiumHero({
  breadcrumbs,
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  cta,
  secondaryCta,
  variant = "fullscreen",
  accent = "gold",
  badges = [],
  visual,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const accentGlow = {
    gold: "bg-gold/10",
    blue: "bg-blue/15",
    emerald: "bg-emerald-500/10",
    ice: "bg-cyan-400/10",
  }[accent] || "bg-gold/10";

  const accentText = {
    gold: "text-gold-light",
    blue: "text-blue-bright",
    emerald: "text-emerald-300/90",
    ice: "text-cyan-300/90",
  }[accent] || "text-gold-light";

  const isSplit = variant === "split";

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden pt-[var(--header-height)]",
        isSplit ? "min-h-[auto] md:min-h-[85vh] flex items-center" : "min-h-[88vh] flex items-end",
        className
      )}
    >
      {image && (
        <motion.div className="absolute inset-0" style={{ y, opacity }}>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover scale-105" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#07101C]/95 via-[#0B1424]/88 to-[#07101C]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07101C] via-transparent to-transparent" />
        </motion.div>
      )}

      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#07101C] via-[#0B1424] to-[#071828]" aria-hidden="true" />
      )}

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className={cn("absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full blur-[100px]", accentGlow)} />
        <div className="absolute bottom-1/4 -left-16 w-[320px] h-[320px] rounded-full bg-blue/10 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container className={cn("relative z-10 w-full", isSplit ? "py-16 md:py-24" : "pb-16 md:pb-24 pt-8")}>
        <div className={cn(isSplit && "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center")}>
          <div>
            {breadcrumbs && (
              <Breadcrumb
                items={breadcrumbs}
                className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60 [&_a:hover]:text-white"
              />
            )}

            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4", accentText)}
            >
              {eyebrow}
            </motion.span>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] max-w-4xl"
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span className="text-gradient-gold">{titleAccent}</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mt-6"
            >
              {description}
            </motion.p>

            {badges.length > 0 && (
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="flex flex-wrap gap-2 mt-6"
              >
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/70"
                  >
                    {badge}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              {cta && (
                <Button href={cta.href} variant="gold" size="lg">
                  {cta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </motion.div>
          </div>

          {isSplit && visual && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="relative"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
