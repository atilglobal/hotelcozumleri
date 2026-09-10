"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";

export default function ServiceIntro({ text, children }) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <Container>
        <AnimatedText>
          <p className="text-lg md:text-xl text-gray leading-relaxed max-w-3xl">
            {text}
          </p>
        </AnimatedText>
        {children}
      </Container>
    </section>
  );
}
