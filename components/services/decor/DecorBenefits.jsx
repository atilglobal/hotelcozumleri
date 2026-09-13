"use client";

import { motion, useReducedMotion } from "framer-motion";
import { decorBenefits } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function DecorBenefits() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding section-dark-a relative overflow-hidden">
      <SectionBackdrop variant="a" />
      <Container className="relative z-10">
        <AnimatedText className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Neden Yapay Bitki?</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
            Otel Dekorasyonunda Pratik ve Estetik Avantajlar
          </h2>
        </AnimatedText>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {decorBenefits.map((item, index) => {
            const Wrapper = prefersReducedMotion ? "div" : motion.div;
            const props = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: index * 0.06 },
                };

            return (
              <Wrapper key={item.title} className="p-5 md:p-6 rounded-2xl glass-card-dark border border-white/5" {...props}>
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 text-sm font-bold mb-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg heading-on-dark mb-2">{item.title}</h3>
                <p className="text-sm text-body-on-dark leading-relaxed">{item.description}</p>
              </Wrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
