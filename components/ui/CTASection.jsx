"use client";

import Button from "./Button";
import Container from "./Container";
import AnimatedText from "./AnimatedText";

export default function CTASection({ data }) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 bg-navy">
      <div className="absolute inset-0 bg-premium-dark" />
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.05]" style={{ backgroundSize: "56px 56px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/15 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue/15 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText>
            <h2 className="heading-on-dark text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold leading-tight mb-6 tracking-tight">
              {data.title}
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <p className="text-body-on-dark text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {data.description}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href={data.primaryCta.href} variant="gold" size="lg">
                {data.primaryCta.label}
              </Button>
              <Button href={data.secondaryCta.href} variant="hero-secondary" size="lg">
                {data.secondaryCta.label}
              </Button>
            </div>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
