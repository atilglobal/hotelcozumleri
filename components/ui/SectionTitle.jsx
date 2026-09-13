"use client";

import { cn } from "@/utils/cn";
import RevealText from "./RevealText";

export default function SectionTitle({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "left",
  theme = "dark",
  className,
  index,
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  const eyebrowLabel = index ? `${String(index).padStart(2, "0")} / ${eyebrow}` : eyebrow;

  return (
    <div className={cn("flex flex-col gap-5 max-w-3xl", alignClasses[align], className)}>
      {eyebrow && (
        <span className="pill-eyebrow pill-eyebrow-dark animate-[fade-up_0.5s_var(--transition-premium)_both]">
          {eyebrowLabel}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight heading-on-dark",
          align === "center" && "text-center"
        )}
      >
        <RevealText as="span" className="inline" delay={0.08} split="words">
          {title}
        </RevealText>
        {titleAccent && (
          <>
            {" "}
            <span className="text-gradient-gold inline-block">
              <RevealText as="span" className="inline" delay={0.2} split="words">
                {titleAccent}
              </RevealText>
            </span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={cn("text-base md:text-lg leading-relaxed max-w-2xl font-medium text-body-on-dark animate-[fade-up_0.6s_var(--transition-premium)_0.15s_both]")}>
          {subtitle}
        </p>
      )}
      <div className={cn("line-accent mt-0", align === "center" && "mx-auto")} />
    </div>
  );
}
