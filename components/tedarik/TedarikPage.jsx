"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import TedarikRequestForm from "./TedarikRequestForm";
import { tedarikHero, tedarikCategories, tedarikProcess } from "@/config/tedarik";

export default function TedarikPage() {
  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+3rem)] pb-20 md:pb-28 bg-premium-dark overflow-hidden">
        <SectionBackdrop variant="gradient" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 blur-[140px] rounded-full" />
        <Container className="relative z-10">
          <AnimatedText>
            <span className="pill-eyebrow pill-eyebrow-dark">{tedarikHero.eyebrow}</span>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h1 className="heading-on-dark text-4xl md:text-5xl lg:text-6xl font-extrabold mt-5 max-w-4xl leading-tight">
              {tedarikHero.title}
              <br />
              <span className="text-gradient-gold">{tedarikHero.titleAccent}</span>
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-body-on-dark mt-6 max-w-2xl text-lg leading-relaxed">
              {tedarikHero.description}
            </p>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button href={tedarikHero.primaryCta.href} variant="gold" size="lg">
                {tedarikHero.primaryCta.label}
              </Button>
              <Button href={tedarikHero.secondaryCta.href} variant="secondary-glass" size="lg">
                {tedarikHero.secondaryCta.label}
              </Button>
            </div>
          </AnimatedText>
        </Container>
      </section>

      <section className="section-padding section-dark-a relative overflow-hidden">
        <SectionBackdrop variant="a" />
        <Container className="relative z-10">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold heading-on-dark mb-4">Tedarik Kategorileri</h2>
            <p className="text-body-on-dark text-lg">
              Ürün kataloğu değil — ihtiyacınızı ileteceğiniz profesyonel satın alma alanları.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {tedarikCategories.map((cat, index) => (
              <AnimatedText key={cat.id} delay={index * 0.05}>
                <Link
                  href={`#talep-formu`}
                  className="group relative block aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[var(--shadow-card)]"
                >
                  <Image src={cat.image} alt={cat.title} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="heading-on-dark text-xl font-bold mb-2">{cat.title}</h3>
                    <p className="text-white/85 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </Link>
              </AnimatedText>
            ))}
          </div>
        </Container>
      </section>

      <section id="surec" className="section-padding section-dark-b relative overflow-hidden">
        <SectionBackdrop variant="b" />
        <Container className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold heading-on-dark mb-12 text-center">Tedarik Süreci</h2>
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {tedarikProcess.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < tedarikProcess.length - 1 && (
                  <div className="absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/60 to-blue/30" />
                )}
                <div className="w-16 h-16 mx-auto rounded-2xl glass-card-dark flex items-center justify-center text-gold-light font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold heading-on-dark mb-2">{step.title}</h3>
                <p className="text-sm text-body-on-dark leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="lg:hidden space-y-6">
            {tedarikProcess.map((step) => (
              <div key={step.step} className="flex gap-4 p-5 rounded-2xl glass-card-dark">
                <div className="w-12 h-12 shrink-0 rounded-xl glass-card-dark flex items-center justify-center text-gold-light font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-bold heading-on-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-body-on-dark leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding section-dark-c relative overflow-hidden">
        <SectionBackdrop variant="c" />
        <Container className="relative z-10">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl md:text-4xl font-bold heading-on-dark mb-4">Tedarik Talebi Oluştur</h2>
            <p className="text-body-on-dark text-lg">
              Birden fazla kalem ekleyebilir, spesifikasyonları paylaşabilir ve dosya yükleyebilirsiniz.
            </p>
          </div>
          <div className="p-6 md:p-10 rounded-3xl glass-card-dark">
            <TedarikRequestForm />
          </div>
        </Container>
      </section>
    </>
  );
}
