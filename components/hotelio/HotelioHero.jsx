"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HotelioHeroDashboard from "./HotelioHeroDashboard";
import { hotelioPositioning, hotelioCtaIds } from "@/config/hotelio";

export default function HotelioHero() {
  const prefersReducedMotion = useReducedMotion();
  const p = hotelioPositioning;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[var(--header-height)] bg-navy">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative z-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="block text-gold text-xs font-bold tracking-[0.35em] uppercase mb-2"
            >
              {p.eyebrow}
            </motion.span>
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="block text-white/50 text-xs tracking-[0.2em] uppercase mb-6"
            >
              {p.subtitle}
            </motion.span>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white leading-[1.05]"
            >
              {p.heroTitle}
              <br />
              <span className="text-gradient-gold">{p.heroTitleAccent}</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/65 text-base md:text-lg leading-relaxed mt-6 max-w-xl"
            >
              {p.heroDescription}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8"
            >
              <Button href="#hotelio-demo" variant="gold" size="lg" data-cta={hotelioCtaIds.heroDemo}>
                Ücretsiz Demo Talep Et
              </Button>
              <Button href="/hotelio/moduller" variant="secondary" size="lg">
                Modülleri Keşfet
              </Button>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-6 py-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                Satış Ekibiyle Görüş
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 to-blue/10 rounded-sm blur-2xl opacity-40" />
            <HotelioHeroDashboard className="relative" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
