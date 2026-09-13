"use client";

import { decorCustomDesignPoints } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import Button from "@/components/ui/Button";

export default function DecorCustomDesign() {
  return (
    <section className="section-padding section-dark-gradient relative overflow-hidden">
      <SectionBackdrop variant="gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedText>
            <span className="text-emerald-300/80 text-xs font-bold tracking-[0.2em] uppercase">Özel Tasarım</span>
            <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4 leading-tight">
              Hazır Ürün Değil.
              <br />
              <span className="text-gradient-gold">Mekânınıza Özel Bir Kompozisyon.</span>
            </h2>
            <p className="text-body-on-dark text-base md:text-lg leading-relaxed mb-6">
              Her uygulama; alanınızın ölçüsüne, mimarisine, dekorasyon diline, otel markanıza ve renk
              tercihlerinize göre şekillendirilir. Katalog ürünü değil, proje bazlı dekorasyon sunuyoruz.
            </p>
            <Button href="#teklif-formu" variant="gold" size="lg">
              Özel Proje Teklifi Al
            </Button>
          </AnimatedText>

          <div className="p-6 md:p-8 rounded-2xl glass-card-dark border border-emerald-400/15">
            <p className="text-sm text-muted-on-dark mb-4 uppercase tracking-wider">Her kompozisyon şuna göre tasarlanır:</p>
            <ul className="space-y-4">
              {decorCustomDesignPoints.map((point) => (
                <li key={point} className="flex items-center gap-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-300">
                    ✦
                  </span>
                  <span className="text-body-on-dark font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
