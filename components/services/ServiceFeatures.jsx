"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function ServiceFeatures({
  title = "Öne Çıkan Özellikler",
  features,
  columns = 2,
  theme = "dark",
}) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className={cn("py-16 md:py-20 relative overflow-hidden", theme === "dark" ? "section-dark-c" : "section-dark-d")}>
      <SectionBackdrop variant={theme === "dark" ? "c" : "d"} />
      <Container className="relative z-10">
        <SectionTitle title={title} theme="dark" className="mb-10" />
        <ul className={cn("grid gap-4", gridCols[columns] || gridCols[2])}>
          {features.map((feature, index) => (
            <AnimatedText key={feature} delay={index * 0.05}>
              <li className="flex items-start gap-3 p-4 rounded-xl glass-card-dark text-body-on-dark transition-colors hover:border-gold/20">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-gold" />
                {feature}
              </li>
            </AnimatedText>
          ))}
        </ul>
      </Container>
    </section>
  );
}
