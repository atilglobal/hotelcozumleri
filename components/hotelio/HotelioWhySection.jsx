"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioEcosystemNodes } from "@/config/hotelio";

export default function HotelioWhySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-white">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy text-center max-w-3xl mx-auto leading-tight">
            Bir Oteli Yönetmek İçin
            <br />
            <span className="text-gradient-blue">10 Farklı Ekrana İhtiyacınız Olmamalı.</span>
          </h2>
          <p className="text-gray-light text-center max-w-2xl mx-auto mt-6 leading-relaxed">
            Hotelio, farklı departmanları ve yönetim süreçlerini ortak bir yapı altında toplar.
            Rezervasyondan finansa, CRM&apos;den housekeeping&apos;e kadar tek platform.
          </p>
        </AnimatedText>

        <div className="relative max-w-2xl mx-auto mt-16 aspect-square md:aspect-[4/3]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-sm bg-navy border border-gold/30 flex items-center justify-center shadow-[0_0_60px_rgba(201,169,98,0.15)]">
              <span className="text-gold font-bold tracking-[0.3em] text-sm md:text-base">HOTELIO</span>
            </div>
          </div>
          {hotelioEcosystemNodes.map((node, i) => {
            const angle = (i / hotelioEcosystemNodes.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 42;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const Wrapper = prefersReducedMotion ? "div" : motion.div;
            const props = prefersReducedMotion
              ? { style: { left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" } }
              : {
                  initial: { opacity: 0, scale: 0.8 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { delay: i * 0.08 },
                  style: { left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" },
                };

            return (
              <Wrapper
                key={node}
                className="absolute px-3 py-2 bg-white border border-navy/10 rounded-sm text-xs md:text-sm font-medium text-navy shadow-sm hover:border-blue/30 transition-colors"
                {...props}
              >
                {node}
              </Wrapper>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
