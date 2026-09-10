"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioFAQ } from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-padding bg-off-white">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl text-navy text-center mb-10">Sık Sorulan Sorular</h2>
        </AnimatedText>
        <div className="max-w-3xl mx-auto space-y-2">
          {hotelioFAQ.map((item, i) => (
            <div key={item.question} className="border border-navy/10 rounded-sm bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-navy pr-4">{item.question}</span>
                <span className={cn("text-blue transition-transform shrink-0", open === i && "rotate-45")}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-light text-sm leading-relaxed border-t border-navy/5 pt-4">
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
