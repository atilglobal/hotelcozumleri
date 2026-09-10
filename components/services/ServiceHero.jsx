"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { cn } from "@/utils/cn";

const themeStyles = {
  digital: "from-navy/95 via-navy/85 to-blue/40",
  creative: "from-navy/95 via-navy/80 to-blue-bright/30",
  security: "from-navy via-navy-light/90 to-navy/70",
  comfort: "from-navy/90 via-navy/75 to-gold/20",
  hygiene: "from-navy/90 via-blue/30 to-ice/40",
  luxury: "from-navy via-navy-light to-gold/10",
};

export default function ServiceHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  theme = "digital",
  breadcrumbs,
  cta,
  secondaryCta,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-[var(--header-height)]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-br", themeStyles[theme] || themeStyles.digital)} />
      </div>

      <Container className="relative z-10 pb-16 md:pb-20 pt-8">
        {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60 [&_a:hover]:text-white" />}

        {eyebrow && (
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
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
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mt-6"
        >
          {description}
        </motion.p>

        {(cta || secondaryCta) && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
        )}
      </Container>
    </section>
  );
}
