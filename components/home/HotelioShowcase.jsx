"use client";

import { hotelioShowcase } from "@/config/home";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import HotelioDashboardMockup from "@/components/hotelio/HotelioDashboardMockup";

export default function HotelioShowcase() {
  return (
    <section className="section-padding bg-premium-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue/15 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.03]" style={{ backgroundSize: "48px 48px" }} />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <AnimatedText>
              <span className="pill-eyebrow pill-eyebrow-dark mb-5">{hotelioShowcase.eyebrow}</span>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
                {hotelioShowcase.title}
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-lg font-medium">
                {hotelioShowcase.description}
              </p>
            </AnimatedText>

            <div className="grid grid-cols-2 gap-2 mb-10">
              {hotelioShowcase.features.map((feature, index) => (
                <AnimatedText key={feature} delay={0.25 + index * 0.04}>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {feature}
                  </div>
                </AnimatedText>
              ))}
            </div>

            <AnimatedText delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={hotelioShowcase.primaryCta.href} variant="gold" size="lg">
                  {hotelioShowcase.primaryCta.label}
                </Button>
                <Button href={hotelioShowcase.secondaryCta.href} variant="secondary" size="lg">
                  {hotelioShowcase.secondaryCta.label}
                </Button>
              </div>
            </AnimatedText>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue/20 via-transparent to-gold/15 rounded-3xl blur-3xl opacity-60" />
            <HotelioDashboardMockup className="relative rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
