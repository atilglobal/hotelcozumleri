"use client";

import AnimatedText from "./AnimatedText";
import { cn } from "@/utils/cn";

export default function FeatureItem({ title, description, index = 0, theme = "light", className }) {
  return (
    <AnimatedText delay={index * 0.08} className={className}>
      <div
        className={cn(
          "modern-card p-6 md:p-7 h-full group",
          theme === "dark" && "bg-white/5 border-white/10 hover:border-gold/20"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-bold transition-colors",
            theme === "dark"
              ? "bg-gold/15 text-gold group-hover:bg-gold/25"
              : "bg-ice text-blue-deep group-hover:bg-blue group-hover:text-white"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className={cn("text-lg font-bold mb-2 tracking-tight", theme === "dark" ? "text-white" : "text-navy")}>
          {title}
        </h3>
        <p className={cn("text-sm leading-relaxed", theme === "dark" ? "text-white/55" : "text-gray-light")}>
          {description}
        </p>
      </div>
    </AnimatedText>
  );
}
