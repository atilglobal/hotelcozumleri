"use client";

import AnimatedText from "@/components/ui/AnimatedText";
import ServiceSection from "./ServiceSection";

export default function IntroSection({ text, highlights = [], accent = "gold" }) {
  const accentDot = {
    gold: "bg-gold",
    blue: "bg-blue-bright",
    emerald: "bg-emerald-400",
    ice: "bg-cyan-400",
  }[accent] || "bg-gold";

  return (
    <ServiceSection variant="a" sectionClass="section-dark-a py-16 md:py-20">
      <AnimatedText>
        <p className="text-body-on-dark text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
          {text}
        </p>
      </AnimatedText>
      {highlights.length > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 glass-card-dark rounded-xl">
              <span className={`w-2 h-2 rounded-full shrink-0 ${accentDot}`} />
              <span className="text-body-on-dark font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>
      )}
    </ServiceSection>
  );
}
