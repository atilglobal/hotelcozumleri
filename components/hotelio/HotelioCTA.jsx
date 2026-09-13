"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import HotelioDemoForm from "./HotelioDemoForm";

export default function HotelioCTA() {
  return (
    <section className="section-padding section-dark-c relative overflow-hidden" id="hotelio-demo">
      <SectionBackdrop variant="c" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          <AnimatedText>
            <h2 className="font-display text-3xl md:text-4xl heading-on-dark leading-tight mb-4">
              Hotelio&apos;yu Anlatmayalım. Size Gösterelim.
            </h2>
            <p className="text-body-on-dark leading-relaxed">
              Otelinizin yapısına göre Hotelio&apos;nun size nasıl yardımcı olabileceğini birlikte inceleyelim.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <div className="p-6 md:p-8 glass-card-dark rounded-2xl">
              <HotelioDemoForm />
            </div>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
