"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import HotelioDemoForm from "./HotelioDemoForm";

export default function HotelioCTA() {
  return (
    <section className="section-padding bg-white" id="hotelio-demo">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          <AnimatedText>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-4">
              Hotelio&apos;yu Anlatmayalım. Size Gösterelim.
            </h2>
            <p className="text-gray-light leading-relaxed">
              Otelinizin yapısına göre Hotelio&apos;nun size nasıl yardımcı olabileceğini birlikte inceleyelim.
            </p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <div className="p-6 md:p-8 border border-navy/10 rounded-sm bg-off-white">
              <HotelioDemoForm />
            </div>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
