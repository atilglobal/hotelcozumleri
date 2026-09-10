"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioAudience } from "@/config/hotelio";

export default function HotelioAudience() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl text-navy text-center mb-8">Hotelio Kimler İçin?</h2>
        </AnimatedText>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {hotelioAudience.map((item, i) => (
            <AnimatedText key={item} delay={i * 0.05}>
              <span className="px-5 py-2.5 bg-ice text-navy text-sm font-medium rounded-sm border border-ice-dark/50">
                {item}
              </span>
            </AnimatedText>
          ))}
        </div>
        <p className="text-center text-gray-light text-sm mt-8 max-w-xl mx-auto">
          Özellik kapsamı tesis tipine göre değişiklik gösterebilir. Demo sırasında ihtiyaçlarınıza göre birlikte değerlendiririz.
        </p>
      </Container>
    </section>
  );
}
