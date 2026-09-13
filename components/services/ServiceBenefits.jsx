"use client";

import Container from "@/components/ui/Container";
import FeatureItem from "@/components/ui/FeatureItem";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function ServiceBenefits({ title = "Size Ne Kazandırır?", benefits, theme = "dark" }) {
  return (
    <section className="py-16 md:py-20 section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" />
      <Container className="relative z-10">
        <h2 className="font-display text-3xl md:text-4xl heading-on-dark mb-10">{title}</h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {benefits.map((item, index) => (
            <FeatureItem
              key={item.title}
              title={item.title}
              description={item.description}
              index={index}
              theme={theme}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
