"use client";

import Container from "@/components/ui/Container";
import FeatureItem from "@/components/ui/FeatureItem";

export default function ServiceBenefits({ title = "Size Ne Kazandırır?", benefits, theme = "light" }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <h2 className="font-display text-3xl md:text-4xl text-navy mb-10">{title}</h2>
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
