"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

export default function ServiceCTA({ title, href, secondary }) {
  return (
    <section className="py-16 md:py-20 bg-premium-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue/30 rounded-full blur-[100px]" />
      </div>
      <Container className="relative z-10">
        <AnimatedText>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h2 className="font-display text-2xl md:text-3xl text-white max-w-xl">{title}</h2>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button href={href} variant="gold" size="lg">
                Teklif Al
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
