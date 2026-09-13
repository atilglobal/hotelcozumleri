"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cozumlerHub, services, serviceSlugs } from "@/config/services";
import { hubImages } from "@/config/serviceImages";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function CozumlerHub() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <section className="relative min-h-[60vh] flex items-end overflow-hidden pt-[var(--header-height)] bg-premium-dark">
        <SectionBackdrop variant="gradient" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/20 rounded-full blur-[150px]" />
        </div>
        <Container className="relative z-10 pb-16 pt-12">
          <AnimatedText>
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              {cozumlerHub.eyebrow}
            </span>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-on-dark leading-tight mt-4 max-w-4xl">
              {cozumlerHub.title}
              <br />
              <span className="text-gradient-gold">{cozumlerHub.titleAccent}</span>
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-body-on-dark text-base md:text-lg leading-relaxed max-w-2xl mt-6">
              {cozumlerHub.description}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button href={cozumlerHub.primaryCta.href} variant="gold" size="lg">
                {cozumlerHub.primaryCta.label}
              </Button>
              <Button href={cozumlerHub.secondaryCta.href} variant="secondary-glass" size="lg">
                {cozumlerHub.secondaryCta.label}
              </Button>
            </div>
          </AnimatedText>
        </Container>
      </section>

      <section id="cozumler-listesi" className="section-padding section-dark-b relative overflow-hidden">
        <SectionBackdrop variant="b" watermark="ÇÖZÜMLER" />
        <Container className="relative z-10">
          <div className="space-y-24 md:space-y-32">
            {serviceSlugs.map((slug, index) => {
              const service = services[slug];
              const visual = hubImages[slug];
              const isReversed = index % 2 === 1;
              const Wrapper = prefersReducedMotion ? "div" : motion.div;
              const props = prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 40 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, margin: "-80px" },
                    transition: { duration: 0.7 },
                  };

              return (
                <Wrapper
                  key={slug}
                  className={cn(
                    "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                    isReversed && "lg:[direction:rtl] lg:*:[direction:ltr]"
                  )}
                  {...props}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0a1420]">
                    <Image
                      src={visual.image}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      style={{ objectPosition: visual.objectPosition || "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/30 to-transparent pointer-events-none" />
                  </div>
                  <div>
                    <span className="text-gold-light text-xs font-semibold tracking-[0.2em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-2 mb-4">
                      {service.hero.eyebrow}
                    </h2>
                    <p className="text-body-on-dark leading-relaxed mb-6">
                      {service.intro.text}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                      {service.hubBenefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-body-on-dark">
                          <span className="w-1 h-1 rounded-full bg-gold" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/cozumler/${slug}`}
                      className="inline-flex items-center gap-2 text-gold-light font-medium hover:gap-3 transition-all"
                    >
                      Detayları İncele <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
