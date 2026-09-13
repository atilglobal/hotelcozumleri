"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function ServiceIntro({ text, children }) {
  return (
    <section className="py-16 md:py-20 section-dark-a relative overflow-hidden">
      <SectionBackdrop variant="a" />
      <Container className="relative z-10">
        <AnimatedText>
          <p className="text-lg md:text-xl text-body-on-dark leading-relaxed max-w-3xl">
            {text}
          </p>
        </AnimatedText>
        {children}
      </Container>
    </section>
  );
}
