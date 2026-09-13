"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function RelatedServices({ services }) {
  const prefersReducedMotion = useReducedMotion();

  if (!services?.length) return null;

  return (
    <section className="py-16 md:py-20 section-dark-d relative overflow-hidden border-t border-white/10">
      <SectionBackdrop variant="d" />
      <Container className="relative z-10">
        <AnimatedText>
          <h2 className="font-display text-2xl md:text-3xl heading-on-dark mb-2">
            Bu Çözümü Tamamlayan Hizmetler
          </h2>
          <p className="text-body-on-dark mb-10 max-w-xl">
            Otelinizin ihtiyaçlarını bütüncül düşünerek birlikte değer üreten çözümler.
          </p>
        </AnimatedText>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const content = (
              <Link
                href={service.href}
                className={cn(
                  "group block p-6 rounded-xl transition-all duration-300 h-full",
                  service.premium
                    ? "border border-gold/30 bg-navy/60 hover:border-gold/50"
                    : "glass-card-dark glass-card-dark-hover"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold tracking-[0.2em] uppercase",
                    service.premium ? "text-gold" : "text-gold-light"
                  )}
                >
                  {service.premium ? "HOTELIO" : "Çözüm"}
                </span>
                <h3
                  className={cn(
                    "font-display text-xl mt-2 mb-2 transition-colors",
                    service.premium ? "heading-on-dark group-hover:text-gold-light" : "heading-on-dark group-hover:text-gold-light"
                  )}
                >
                  {service.label}
                </h3>
                <p className={cn("text-sm", service.premium ? "text-body-on-dark" : "text-body-on-dark")}>
                  {service.description}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 mt-4 text-sm font-medium transition-all group-hover:gap-2",
                    service.premium ? "text-gold" : "text-gold-light"
                  )}
                >
                  İncele <span aria-hidden="true">→</span>
                </span>
              </Link>
            );

            if (prefersReducedMotion) {
              return <div key={service.slug}>{content}</div>;
            }

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
