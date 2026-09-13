"use client";

import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import ServiceSection from "./ServiceSection";

export default function CrossSellSplit({ title, description, left, right, rightVisual }) {
  return (
    <ServiceSection
      variant="gradient"
      sectionClass="section-dark-gradient"
      title={title}
      description={description}
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <AnimatedText delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl glass-card-dark h-full">
            <span className="text-blue-bright text-xs font-semibold tracking-wider uppercase">{left.eyebrow}</span>
            <h3 className="font-display text-xl md:text-2xl heading-on-dark mt-2 mb-3">{left.title}</h3>
            <p className="text-body-on-dark text-sm leading-relaxed">{left.description}</p>
            {left.href && (
              <Link href={left.href} className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-gold-light hover:text-gold transition-colors">
                İncele <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </AnimatedText>
        <AnimatedText delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl glass-card-dark border border-gold/20 h-full">
            <span className="text-gold text-xs font-bold tracking-wider uppercase">{right.eyebrow}</span>
            <h3 className="font-display text-xl md:text-2xl heading-on-dark mt-2 mb-4">{right.title}</h3>
            {rightVisual || <p className="text-body-on-dark text-sm leading-relaxed">{right.description}</p>}
            {right.href && (
              <Link href={right.href} className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-gold hover:text-gold-light transition-colors">
                Hotelio&apos;yu Keşfet <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </AnimatedText>
      </div>
    </ServiceSection>
  );
}
