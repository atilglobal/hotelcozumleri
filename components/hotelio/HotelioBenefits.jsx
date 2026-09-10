"use client";

import Container from "@/components/ui/Container";
import FeatureItem from "@/components/ui/FeatureItem";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioBenefits } from "@/config/hotelio";

export default function HotelioBenefits() {
  return (
    <section className="section-padding bg-off-white">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl text-navy text-center mb-4">
            Teknoloji Değil. Daha Kontrollü Bir Otel Operasyonu.
          </h2>
        </AnimatedText>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {hotelioBenefits.map((item, i) => (
            <FeatureItem key={item.title} {...item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
