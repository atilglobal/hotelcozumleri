import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Logo({ variant = "dark", className }) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Hotel Çözümleri Ana Sayfa">
      <div
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg",
          isLight
            ? "bg-white/12 border border-white/15"
            : "bg-gradient-to-br from-navy to-navy-light border border-navy/20 shadow-md"
        )}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18V10L12 5L20 10V18H16V13H8V18H4Z"
            stroke={isLight ? "#fff" : "#5b8aff"}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M8 13H16" stroke="#d4a853" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="9.5" r="1.5" fill="#d4a853" />
        </svg>
      </div>
      <span className={cn("text-base font-bold tracking-tight leading-tight", isLight ? "text-white" : "text-navy")}>
        Hotel Çözümleri
      </span>
    </Link>
  );
}
