"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroData } from "@/config/home";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage}
          alt="Beş yıldızlı otel lobisi ve resepsiyon alanı"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/94 via-navy/78 to-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(59,108,244,0.12),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-blue/20 blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 -left-24 w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10 pt-[calc(var(--header-height)+2rem)] pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {heroData.trustTags.map((tag) => (
              <Badge key={tag} variant="light">
                {tag}
              </Badge>
            ))}
          </motion.div>

          <div className="mb-6">
            {heroData.title.map((line, index) => (
              <motion.h1
                key={line}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.02] tracking-tight"
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-white/65 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-medium"
          >
            {heroData.subtitle}
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button href={heroData.primaryCta.href} variant="gold" size="lg">
              {heroData.primaryCta.label}
            </Button>
            <Button href={heroData.secondaryCta.href} variant="secondary" size="lg">
              {heroData.secondaryCta.label}
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Keşfet</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}
