"use client";

import Image from "next/image";
import Button from "./Button";
import Container from "./Container";
import AnimatedText from "./AnimatedText";
import { cn } from "@/utils/cn";

export default function CTASection({ data }) {
  const hasImage = Boolean(data.image);

  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32 bg-navy">
      <div className="absolute inset-0 bg-premium-dark" />
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.05]" style={{ backgroundSize: "56px 56px" }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/15 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue/15 blur-[120px] rounded-full" />

      {hasImage && (
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] hidden md:block">
          <Image
            src={data.image}
            alt=""
            fill
            sizes="55vw"
            className="object-cover opacity-[0.18]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07101C] via-[#07101C]/85 to-transparent" />
        </div>
      )}

      <Container className="relative z-10">
        <div
          className={cn(
            hasImage
              ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto"
              : "max-w-4xl mx-auto text-center"
          )}
        >
          <div className={cn(hasImage && "text-center lg:text-left")}>
            <AnimatedText>
              <h2 className="heading-on-dark text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold leading-tight mb-6 tracking-tight">
                {data.title}
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <p
                className={cn(
                  "text-body-on-dark text-base md:text-lg lg:text-xl leading-relaxed mb-10",
                  hasImage ? "max-w-xl lg:mx-0 mx-auto" : "max-w-2xl mx-auto"
                )}
              >
                {data.description}
              </p>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-3",
                  hasImage ? "justify-center lg:justify-start" : "items-center justify-center"
                )}
              >
                <Button href={data.primaryCta.href} variant="gold" size="lg">
                  {data.primaryCta.label}
                </Button>
                <Button href={data.secondaryCta.href} variant="hero-secondary" size="lg">
                  {data.secondaryCta.label}
                </Button>
              </div>
            </AnimatedText>
          </div>

          {hasImage && (
            <AnimatedText delay={0.15} className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/12 shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
                <Image
                  src={data.image}
                  alt={data.imageAlt || data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/75 via-[#07101C]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold-light">
                    Hotel Çözümleri
                  </p>
                  <p className="text-sm md:text-base text-white/90 mt-1 font-medium">
                    Teknoloji · Tedarik · Operasyon · Wellness
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-3 hidden md:flex px-3 py-2 rounded-xl bg-navy/90 border border-gold/30 text-[10px] text-gold-light tracking-wider uppercase shadow-lg backdrop-blur-sm">
                Uçtan uca
              </div>
            </AnimatedText>
          )}
        </div>
      </Container>
    </section>
  );
}
