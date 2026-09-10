import { cn } from "@/utils/cn";

export default function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-ice text-blue-deep border border-ice-dark/60",
    gold: "bg-gold/10 text-gold-dark border border-gold/25",
    dark: "bg-navy/5 text-navy border border-navy/8",
    light: "bg-white/12 text-white border border-white/20 backdrop-blur-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
