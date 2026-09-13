"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  split = "words",
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const text = typeof children === "string" ? children : null;

  if (!text || prefersReducedMotion || split === "none") {
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  const parts = split === "lines" ? text.split("\n") : text.split(" ");

  return (
    <Tag ref={ref} className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1", className)} aria-label={text}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={
              inView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 30, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.65,
              delay: delay + i * (split === "lines" ? 0.12 : 0.06),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {part}
            {split === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
