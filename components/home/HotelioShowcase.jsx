"use client";

import { hotelioShowcase } from "@/config/home";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import HotelioDashboardMockup from "@/components/hotelio/HotelioDashboardMockup";
import HotelioAIBadge from "@/components/hotelio/HotelioAIBadge";

const modules = [
  "Rezervasyon",
  "Ön Büro",
  "CRM",
  "Finans",
  "Raporlama",
  "SPA",
  "Operasyon",
];

export default function HotelioShowcase() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.04]" style={{ backgroundSize: "48px 48px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue/20 blur-[160px] rounded-full" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <AnimatedText>
              <span className="pill-eyebrow pill-eyebrow-dark mb-5">{hotelioShowcase.eyebrow}</span>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <h2 className="heading-on-dark text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
                {hotelioShowcase.title}
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <p className="text-xs font-semibold tracking-wider text-gold-light uppercase mb-4">
                Kendi geliştirdiğimiz otel yönetim platformu
              </p>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-body-on-dark text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                {hotelioShowcase.description}
              </p>
            </AnimatedText>

            <div className="mb-5">
              <HotelioAIBadge size="sm" />
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {modules.map((mod) => (
                <span
                  key={mod}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/8 border border-white/12 text-white/90"
                >
                  {mod}
                </span>
              ))}
            </div>

            <AnimatedText delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={hotelioShowcase.primaryCta.href} variant="gold" size="lg">
                  {hotelioShowcase.primaryCta.label}
                </Button>
                <Button href={hotelioShowcase.secondaryCta.href} variant="secondary-glass" size="lg">
                  {hotelioShowcase.secondaryCta.label}
                </Button>
              </div>
            </AnimatedText>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue/25 via-transparent to-gold/20 rounded-3xl blur-3xl opacity-70" />
            <HotelioDashboardMockup className="relative rounded-2xl overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.5)] ring-1 ring-white/15 scale-[1.02] lg:scale-105 origin-center" />
          </div>
        </div>
      </Container>
    </section>
  );
}
