"use client";

import { motion, useReducedMotion } from "framer-motion";
import { decorProcess } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function DecorProcess() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding section-dark-c relative overflow-hidden">
      <SectionBackdrop variant="c" />
      <Container className="relative z-10">
        <AnimatedText className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Süreç</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
            Profesyonel Tasarım ve Uygulama Süreci
          </h2>
          <p className="text-body-on-dark">
            Alan keşfinden montaja kadar her adım otelinizin konseptine göre yönetilir.
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {decorProcess.map((step, index) => {
            const Wrapper = prefersReducedMotion ? "div" : motion.div;
            const props = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { delay: index * 0.08 },
                };

            return (
              <Wrapper
                key={step.step}
                className="relative p-5 md:p-6 rounded-2xl glass-card-dark border border-white/5 hover:border-emerald-400/20 transition-colors"
                {...props}
              >
                <span className="text-emerald-300/90 text-xs font-bold tracking-[0.3em]">{step.step}</span>
                <h3 className="font-display text-lg heading-on-dark mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-body-on-dark leading-relaxed">{step.description}</p>
                {index < decorProcess.length - 1 && (
                  <span className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-emerald-400/40" aria-hidden="true">
                    →
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
