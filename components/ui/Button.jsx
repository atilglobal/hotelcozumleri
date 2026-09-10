import Link from "next/link";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-blue to-blue-deep text-white hover:from-blue-bright hover:to-blue border border-transparent shadow-[var(--shadow-glow-blue)] hover:shadow-[0_12px_40px_rgba(59,108,244,0.35)] hover:-translate-y-0.5",
  secondary:
    "bg-white/10 text-white border border-white/25 hover:bg-white/15 hover:border-white/40 backdrop-blur-sm",
  outline:
    "bg-white text-navy border border-navy/10 hover:border-blue/30 hover:text-blue shadow-sm hover:shadow-md",
  gold:
    "bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:from-gold-light hover:to-gold border border-transparent shadow-[var(--shadow-glow-gold)] hover:-translate-y-0.5",
  ghost: "bg-transparent text-navy hover:bg-navy/5 border border-transparent",
  "ghost-light": "bg-transparent text-white/90 hover:text-white hover:bg-white/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external = false,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
      return (
        <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
