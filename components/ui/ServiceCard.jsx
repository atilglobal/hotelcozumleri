"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function ServiceCard({
  title,
  description,
  href,
  image,
  ctaLabel = "İncele",
  size = "medium",
  index = 0,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    large: "min-h-[280px]",
    medium: "min-h-[280px]",
    small: "min-h-[240px]",
  };

  const content = (
    <>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes={size === "large" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-[#07101c]/55 to-[#07101c]/15 transition-opacity duration-500 group-hover:via-[#07101c]/65" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-gold/25 transition-colors duration-500" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
        <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 mb-3 text-[11px] font-semibold uppercase tracking-wider text-white bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          {ctaLabel} →
        </span>
        <h3 className="heading-on-dark text-xl md:text-2xl font-bold mb-2 tracking-tight group-hover:text-gold-light transition-colors duration-300">
          {title}
        </h3>
        <p className="text-body-on-dark text-sm md:text-base leading-relaxed max-w-md">{description}</p>
      </div>
    </>
  );

  const cardClasses = cn(
    "group relative flex overflow-hidden rounded-2xl h-full min-h-[280px]",
    "border border-white/8 bg-white/[0.02]",
    "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
    "hover:shadow-[0_20px_60px_rgba(0,0,0,0.35),0_0_40px_rgba(59,108,244,0.08)]",
    "hover:-translate-y-1.5 transition-all duration-500",
    sizeClasses[size],
    className
  );

  if (prefersReducedMotion) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    </motion.div>
  );
}
