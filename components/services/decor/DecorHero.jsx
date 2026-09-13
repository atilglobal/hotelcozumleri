"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { siteImages } from "@/config/images";

export default function DecorHero({ breadcrumbs, cta, secondaryCta }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={ref} className="relative min-h-[88vh] flex items-end overflow-hidden pt-[var(--header-height)]">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <Image
          src={siteImages.decor.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#07101C]/95 via-[#0B1424]/88 to-emerald-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101C] via-transparent to-transparent" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-16 w-[320px] h-[320px] rounded-full bg-blue/15 blur-[90px]" />
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 right-[12%] w-24 h-24 border border-emerald-400/20 rounded-[40%_60%_50%_40%]"
            />
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/3 left-[8%] w-32 h-32 border border-gold/15 rounded-[60%_40%_45%_55%]"
            />
          </>
        )}
      </div>

      <Container className="relative z-10 pb-16 md:pb-24 pt-8">
        {breadcrumbs && (
          <Breadcrumb items={breadcrumbs} className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60 [&_a:hover]:text-white" />
        )}

        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-emerald-300/90 mb-4"
        >
          Yapay Çiçek & Dekorasyon
        </motion.span>

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.08] max-w-4xl"
        >
          Doğanın Estetiğini,
          <br />
          <span className="text-gradient-gold">Bakım Gerektirmeden Otelinize Taşıyın.</span>
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mt-6"
        >
          Lobiden restorana, bar alanlarından merdiven boşluklarına kadar otelinizin mimarisine ve konseptine özel
          yapay bitki ve çiçek dekorasyonları tasarlıyor ve uyguluyoruz.
        </motion.p>

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
      </Container>
    </section>
  );
}
