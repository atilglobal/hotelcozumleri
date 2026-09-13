import Link from "next/link";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-blue to-blue-deep text-white hover:from-blue-bright hover:to-blue border border-transparent shadow-[var(--shadow-glow-blue)] hover:shadow-[0_12px_40px_rgba(59,108,244,0.35)] hover:-translate-y-0.5 active:scale-[0.98]",
  secondary:
    "bg-white/8 text-white border border-white/15 hover:bg-white/12 hover:border-white/25 backdrop-blur-sm hover:-translate-y-0.5 active:scale-[0.98]",
  "secondary-glass":
    "bg-white/6 text-white/90 border border-white/12 hover:bg-white/10 hover:border-white/22 backdrop-blur-sm hover:-translate-y-0.5 active:scale-[0.98]",
  "hero-secondary":
    "bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 backdrop-blur-sm hover:-translate-y-0.5 active:scale-[0.98]",
  outline:
    "bg-transparent text-white/90 border border-white/15 hover:border-blue/40 hover:text-white hover:shadow-[0_0_24px_rgba(59,108,244,0.15)] active:scale-[0.98]",
  gold:
    "bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:from-gold-light hover:to-gold border border-transparent shadow-[var(--shadow-glow-gold)] hover:-translate-y-0.5 active:scale-[0.98]",
  ghost: "bg-transparent text-white/80 hover:text-white hover:bg-white/8 border border-transparent active:scale-[0.98]",
  "ghost-light": "bg-transparent text-white/90 hover:text-white hover:bg-white/10 active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
};

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
      →
    </span>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external = false,
  showArrow = false,
  ...props
}) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && <Arrow />}
    </>
  );

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
      return (
        <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
