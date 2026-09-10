"use client";

import { cn } from "@/utils/cn";
import AnimatedText from "./AnimatedText";

export default function SectionTitle({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  align = "left",
  theme = "light",
  className,
}) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  };

  const themeClasses = {
    light: "text-navy",
    dark: "text-white",
  };

  const subtitleClasses = {
    light: "text-gray-light",
    dark: "text-white/60",
  };

  return (
    <div className={cn("flex flex-col gap-5 max-w-3xl", alignClasses[align], className)}>
      {eyebrow && (
        <AnimatedText delay={0}>
          <span className={cn("pill-eyebrow", theme === "dark" && "pill-eyebrow-dark")}>
            {eyebrow}
          </span>
        </AnimatedText>
      )}
      <AnimatedText delay={0.1}>
        <h2 className={cn("text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight", themeClasses[theme])}>
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className={theme === "dark" ? "text-gradient-gold" : "text-gradient-blue"}>
                {titleAccent}
              </span>
            </>
          )}
        </h2>
      </AnimatedText>
      {subtitle && (
        <AnimatedText delay={0.2}>
          <p className={cn("text-base md:text-lg leading-relaxed max-w-2xl font-medium", subtitleClasses[theme])}>
            {subtitle}
          </p>
        </AnimatedText>
      )}
      <div className={cn("line-accent mt-0", theme === "dark" ? "" : "line-accent-blue", align === "center" && "mx-auto")} />
    </div>
  );
}
