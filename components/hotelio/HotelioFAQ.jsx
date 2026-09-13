"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { hotelioFAQ } from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-padding section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" />
      <Container className="relative z-10">
        <AnimatedText>
          <h2 className="font-display text-3xl heading-on-dark text-center mb-10">Sık Sorulan Sorular</h2>
        </AnimatedText>
        <div className="max-w-3xl mx-auto space-y-2">
          {hotelioFAQ.map((item, i) => (
            <div key={item.question} className="glass-card-dark rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium heading-on-dark pr-4">{item.question}</span>
                <span className={cn("text-gold-light transition-transform shrink-0", open === i && "rotate-45")}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-body-on-dark text-sm leading-relaxed border-t border-white/10 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
