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
  size = "medium",
  index = 0,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2 min-h-[420px]",
    medium: "min-h-[300px]",
    small: "min-h-[260px]",
  };

  const content = (
    <>
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes={size === "large" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10 transition-opacity duration-500 group-hover:via-navy/60" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
      </div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-8">
        <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
          İncele →
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-md">{description}</p>
      </div>
    </>
  );

  const cardClasses = cn(
    "group relative overflow-hidden rounded-2xl block shadow-[var(--shadow-card)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.2)] transition-shadow duration-500",
    sizeClasses[size],
    className
  );

  if (prefersReducedMotion) {
    return <Link href={href} className={cardClasses}>{content}</Link>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className={cardClasses}>{content}</Link>
    </motion.div>
  );
}
