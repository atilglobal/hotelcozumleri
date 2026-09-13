"use client";

import { useState } from "react";
import { decorBeforeAfter } from "@/config/decor";
import BeforeAfterComparison from "@/components/ui/BeforeAfterComparison";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function DecorBeforeAfter() {
  const [active, setActive] = useState(decorBeforeAfter[0].id);
  const current = decorBeforeAfter.find((item) => item.id === active) || decorBeforeAfter[0];

  return (
    <section className="section-padding section-dark-d relative overflow-hidden">
      <SectionBackdrop variant="d" />
      <Container className="relative z-10">
        <AnimatedText className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Öncesi / Sonrası</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
            Dönüşümü Konsept Olarak Görün
          </h2>
          <p className="text-body-on-dark text-sm md:text-base">
            Aşağıdaki görseller gerçek müşteri projesi değil; aynı mekânın uygulama öncesi ve sonrasını gösteren konsept mockup&apos;larıdır.
            Kaydırıcıyı sürükleyerek dönüşümü inceleyebilirsiniz.
          </p>
        </AnimatedText>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Karşılaştırma alanları">
          {decorBeforeAfter.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl border transition-all",
                active === item.id
                  ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"
                  : "glass-card-dark text-body-on-dark border-white/10 hover:border-emerald-400/20"
              )}
            >
              {item.title}
            </button>
          ))}
        </div>

        <BeforeAfterComparison
          key={current.id}
          beforeImage={current.beforeImage}
          afterImage={current.afterImage}
          beforeLabel={current.beforeLabel}
          afterLabel={current.afterLabel}
          beforeCaption={current.beforeCaption}
          afterCaption={current.afterCaption}
          className="max-w-4xl mx-auto"
        />
      </Container>
    </section>
  );
}
