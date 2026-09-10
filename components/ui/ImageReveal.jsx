"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  fill = false,
  width,
  height,
  sizes,
}) {
  const prefersReducedMotion = useReducedMotion();

  const imageProps = fill
    ? { fill: true, sizes: sizes || "(max-width: 768px) 100vw, 50vw" }
    : { width, height };

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          className={cn("object-cover", imageClassName)}
          priority={priority}
          {...imageProps}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          className={cn("object-cover w-full h-full", imageClassName)}
          priority={priority}
          {...imageProps}
        />
      </motion.div>
    </div>
  );
}
