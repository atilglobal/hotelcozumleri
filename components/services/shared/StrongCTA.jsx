"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function StrongCTA({ title, description, buttonLabel, href, secondary }) {
  return (
    <section className="py-16 md:py-24 section-dark-gradient relative overflow-hidden">
      <SectionBackdrop variant="gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-[100px]" />
      </div>
      <Container className="relative z-10">
        <AnimatedText>
          <div className="max-w-3xl mx-auto text-center">
            {description && (
              <p className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase mb-4">{description}</p>
            )}
            <h2 className="font-display text-2xl md:text-4xl heading-on-dark mb-8">{title}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={href} variant="gold" size="lg">
                {buttonLabel || "Teklif Al"}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </AnimatedText>
      </Container>
    </section>
  );
}
