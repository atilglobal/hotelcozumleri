"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { decorServiceTypes } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function DecorServiceTypes() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="uygulama-alanlari" className="section-padding section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" watermark="DEKOR" />
      <div className="absolute top-0 left-0 w-[360px] h-[360px] bg-emerald-500/8 blur-[100px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <AnimatedText>
          <span className="text-emerald-300/80 text-xs font-bold tracking-[0.2em] uppercase">Hizmet Alanları</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4 max-w-2xl">
            Otel Alanlarına Özel Dekoratif Uygulamalar
          </h2>
          <p className="text-body-on-dark max-w-2xl mb-12">
            Her uygulama alanı için konsept, ölçek ve mimariye uygun yapay bitki çözümleri tasarlıyoruz.
          </p>
        </AnimatedText>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {decorServiceTypes.map((item, index) => {
            const Wrapper = prefersReducedMotion ? "div" : motion.div;
            const props = prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-40px" },
                  transition: { delay: index * 0.06 },
                };

            return (
              <Wrapper
                key={item.id}
                className="group relative rounded-2xl overflow-hidden glass-card-dark ring-1 ring-white/10 hover:ring-emerald-400/25 transition-all duration-500"
                {...props}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101C] via-[#07101C]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="font-display text-xl md:text-2xl heading-on-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-body-on-dark leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
