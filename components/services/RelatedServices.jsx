"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { cn } from "@/utils/cn";

export default function RelatedServices({ services }) {
  const prefersReducedMotion = useReducedMotion();

  if (!services?.length) return null;

  return (
    <section className="py-16 md:py-20 bg-off-white border-t border-navy/5">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-2xl md:text-3xl text-navy mb-2">
            Bu Çözümü Tamamlayan Hizmetler
          </h2>
          <p className="text-gray-light mb-10 max-w-xl">
            Otelinizin ihtiyaçlarını bütüncül düşünerek birlikte değer üreten çözümler.
          </p>
        </AnimatedText>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const content = (
              <Link
                href={service.href}
                className={cn(
                  "group block p-6 rounded-sm border transition-all duration-300 h-full",
                  service.premium
                    ? "border-gold/30 bg-navy hover:border-gold/50"
                    : "border-navy/10 bg-white hover:border-blue/30 hover:shadow-sm"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold tracking-[0.2em] uppercase",
                    service.premium ? "text-gold" : "text-blue"
                  )}
                >
                  {service.premium ? "HOTELIO" : "Çözüm"}
                </span>
                <h3
                  className={cn(
                    "font-display text-xl mt-2 mb-2 transition-colors",
                    service.premium ? "text-white group-hover:text-gold-light" : "text-navy group-hover:text-blue"
                  )}
                >
                  {service.label}
                </h3>
                <p className={cn("text-sm", service.premium ? "text-white/60" : "text-gray-light")}>
                  {service.description}
                </p>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 mt-4 text-sm font-medium transition-all group-hover:gap-2",
                    service.premium ? "text-gold" : "text-blue"
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
