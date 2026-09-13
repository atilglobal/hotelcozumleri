"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { hotelioAudience } from "@/config/hotelio";

export default function HotelioAudience() {
  return (
    <section className="py-16 section-dark-c relative overflow-hidden">
      <SectionBackdrop variant="c" />
      <Container className="relative z-10">
        <AnimatedText>
          <h2 className="font-display text-3xl heading-on-dark text-center mb-8">Hotelio Kimler İçin?</h2>
        </AnimatedText>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {hotelioAudience.map((item, i) => (
            <AnimatedText key={item} delay={i * 0.05}>
              <span className="px-5 py-2.5 glass-card-dark heading-on-dark text-sm font-medium rounded-sm">
                {item}
              </span>
            </AnimatedText>
          ))}
        </div>
        <p className="text-center text-body-on-dark text-sm mt-8 max-w-xl mx-auto">
          Özellik kapsamı tesis tipine göre değişiklik gösterebilir. Demo sırasında ihtiyaçlarınıza göre birlikte değerlendiririz.
        </p>
      </Container>
    </section>
  );
}
