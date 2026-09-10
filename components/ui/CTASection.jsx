"use client";

import Button from "./Button";
import Container from "./Container";
import AnimatedText from "./AnimatedText";
import { siteConfig } from "@/config/site";

export default function CTASection({ data }) {
  const whatsappHref = siteConfig.social.whatsapp;

  return (
    <section className="section-padding bg-premium-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-blue/15 blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 tracking-tight">
              {data.title}
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              {data.description}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href={data.primaryCta.href} variant="gold" size="lg">
                {data.primaryCta.label}
              </Button>
              <Button
                href={data.secondaryCta.href === "whatsapp" ? whatsappHref : data.secondaryCta.href}
                variant="secondary"
                size="lg"
                external={data.secondaryCta.href === "whatsapp"}
              >
                {data.secondaryCta.label}
              </Button>
            </div>
          </AnimatedText>
          {data.hotelioCta && (
            <AnimatedText delay={0.3}>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-sm mb-4">Otel yönetim yazılımı için</p>
                <Button href={data.hotelioCta.href} variant="ghost-light" size="md">
                  <span className="text-gold font-bold tracking-wider">HOTELIO</span>
                  <span className="mx-2 text-white/25">|</span>
                  {data.hotelioCta.label}
                </Button>
              </div>
            </AnimatedText>
          )}
        </div>
      </Container>
    </section>
  );
}
