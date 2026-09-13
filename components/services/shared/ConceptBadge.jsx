import { cn } from "@/utils/cn";

export default function ConceptBadge({ className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase",
        "bg-black/50 backdrop-blur-sm text-white/80 border border-white/15",
        className
      )}
    >
      Konsept Görsel
    </span>
  );
}
