"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import PreviewMockup from "./mockups/PreviewMockups";
import { hotelioCtaIds } from "@/config/hotelio";

export default function HotelioAISection() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]" />
      </div>
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <AnimatedText>
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">HOTELIO AI STRATEGY HUB</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-4 mb-4 leading-tight">
              Veriyi Görmek Yetmez.
              <br />
              Doğru Kararı da Görün.
            </h2>
            <p className="text-white/60 leading-relaxed mb-6">
              Yapay zekâ destekli oda fiyat önerileri, doluluk eğilimi analizi, kampanya önerileri
              ve geçmiş veriye dayalı yönetici karar desteği.
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-gold">→</span> Oda fiyat önerileri</li>
              <li className="flex gap-2"><span className="text-gold">→</span> Doluluk eğilimi analizi</li>
              <li className="flex gap-2"><span className="text-gold">→</span> Akıllı kampanya önerileri</li>
              <li className="flex gap-2"><span className="text-gold">→</span> Yönetici karar desteği</li>
            </ul>
          </AnimatedText>
          <AnimatedText delay={0.15}>
            <PreviewMockup type="ai" data-cta={hotelioCtaIds.aiDemo} />
            <p className="text-white/40 text-xs mt-3 text-center">Tanıtım mockup — karar destek arayüzü</p>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
