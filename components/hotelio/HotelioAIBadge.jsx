import { cn } from "@/utils/cn";

export default function HotelioAIBadge({
  tagline = "Otelcilik Odaklı Yapay Zekâ",
  quote,
  size = "md",
  className,
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-col gap-0.5 rounded-xl border border-gold/25 bg-gold/10 backdrop-blur-sm",
        size === "sm" ? "px-3 py-2" : "px-4 py-2.5",
        className
      )}
    >
      <span className={cn("font-bold tracking-wider text-gold-light uppercase", size === "sm" ? "text-[10px]" : "text-xs")}>
        ✦ HOTELIO AI
      </span>
      <span className={cn("text-white/75", size === "sm" ? "text-[10px]" : "text-xs")}>{tagline}</span>
      {quote && (
        <span className={cn("text-white/55 italic", size === "sm" ? "text-[10px]" : "text-[11px]")}>
          &ldquo;{quote}&rdquo;
        </span>
      )}
    </div>
  );
}
