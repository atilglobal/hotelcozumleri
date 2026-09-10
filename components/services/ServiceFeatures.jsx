"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedText from "@/components/ui/AnimatedText";
import { cn } from "@/utils/cn";

export default function ServiceFeatures({
  title = "Öne Çıkan Özellikler",
  features,
  columns = 2,
  theme = "light",
}) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className={cn("py-16 md:py-20", theme === "dark" ? "bg-navy" : "bg-off-white")}>
      <Container>
        <SectionTitle title={title} theme={theme} className="mb-10" />
        <ul className={cn("grid gap-4", gridCols[columns] || gridCols[2])}>
          {features.map((feature, index) => (
            <AnimatedText key={feature} delay={index * 0.05}>
              <li
                className={cn(
                  "flex items-start gap-3 p-4 rounded-sm border transition-colors",
                  theme === "dark"
                    ? "border-white/10 bg-white/[0.03] text-white/80"
                    : "border-navy/8 bg-white text-gray"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                    theme === "dark" ? "bg-gold" : "bg-blue"
                  )}
                />
                {feature}
              </li>
            </AnimatedText>
          ))}
        </ul>
      </Container>
    </section>
  );
}
