"use client";

import BeforeAfterComparison from "@/components/ui/BeforeAfterComparison";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import Container from "@/components/ui/Container";

export default function TextileBeforeAfter({ data }) {
  return (
    <section className="section-padding section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" />
      <Container className="relative z-10 max-w-4xl">
        <AnimatedText className="text-center mb-10">
          <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Konsept Karşılaştırması</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">Standart Tekstilden Markalı Ürüne</h2>
          <p className="text-body-on-dark text-sm md:text-base">
            Aynı ürün ailesi — logosuz standart tekstil ile logo nakışlı premium sunum karşılaştırması.
          </p>
        </AnimatedText>
        <BeforeAfterComparison
          beforeImage={data.before.image}
          afterImage={data.after.image}
          beforeLabel="Standart Ürün"
          afterLabel="Logo Uygulamalı"
          beforeCaption={data.before.caption}
          afterCaption={data.after.caption}
        />
      </Container>
    </section>
  );
}
