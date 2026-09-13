"use client";

import { motion, useReducedMotion } from "framer-motion";
import { decorApplicationAreas } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function DecorApplicationAreas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding section-dark-a relative overflow-hidden">
      <SectionBackdrop variant="a" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedText>
            <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Uygulama Alanları</span>
            <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
              Yapay Çiçekte Sınır Yok.
            </h2>
            <p className="text-body-on-dark text-base md:text-lg leading-relaxed">
              Yapay bitki ve çiçek kullanılabilecek her alan için otele özel uygulama geliştirilebilir.
              Mimari yapınızı, marka dilinizi ve misafir yolculuğunuzu dikkate alarak kompozisyon planlarız.
            </p>
          </AnimatedText>

          <div className="flex flex-wrap gap-2.5">
            {decorApplicationAreas.map((area, index) => {
              const Tag = prefersReducedMotion ? "span" : motion.span;
              const props = prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.95 },
                    whileInView: { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { delay: index * 0.03 },
                  };

              return (
                <Tag
                  key={area}
                  className="px-4 py-2.5 rounded-xl glass-card-dark text-sm text-body-on-dark border border-white/5 hover:border-emerald-400/25 transition-colors"
                  {...props}
                >
                  {area}
                </Tag>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
