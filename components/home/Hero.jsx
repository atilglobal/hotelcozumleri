"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { heroData } from "@/config/home";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import HeroTechComposition from "./HeroTechComposition";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src={heroData.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-light/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,108,244,0.15),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(212,168,83,0.08),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Container className="relative z-10 pt-[calc(var(--header-height)+2rem)] pb-20 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {heroData.trustTags.map((tag) => (
                <Badge key={tag} variant="light">
                  {tag}
                </Badge>
              ))}
            </motion.div>

            <div className="mb-6">
              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="heading-on-dark text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.05] tracking-tight"
              >
                {heroData.titleLine1}
                <br />
                {heroData.titleLine2Prefix}{" "}
                <span className="text-gradient-gold">{heroData.titleLine2Accent}</span>
              </motion.h1>
            </div>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-body-on-dark text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mb-10"
            >
              {heroData.subtitle}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button href={heroData.primaryCta.href} variant="gold" size="lg">
                {heroData.primaryCta.label}
              </Button>
              <Button href={heroData.secondaryCta.href} variant="hero-secondary" size="lg">
                {heroData.secondaryCta.label}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden md:block"
          >
            <HeroTechComposition />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
