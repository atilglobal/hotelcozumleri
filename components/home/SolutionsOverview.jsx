"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { solutionsOverview } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/utils/cn";

export default function SolutionsOverview() {
  const [activeId, setActiveId] = useState(solutionsOverview.groups[0].id);

  return (
    <section className="section-padding bg-mesh-light bg-grid-subtle overflow-hidden">
      <Container>
        <SectionTitle
          eyebrow="Çözümler"
          title={solutionsOverview.title}
          titleAccent={solutionsOverview.titleAccent}
          subtitle={solutionsOverview.description}
          className="mb-12 md:mb-16"
        />

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5 flex flex-col gap-2 order-2 lg:order-1">
            {solutionsOverview.groups.map((group, index) => (
              <button
                key={group.id}
                type="button"
                onMouseEnter={() => setActiveId(group.id)}
                onFocus={() => setActiveId(group.id)}
                onClick={() => setActiveId(group.id)}
                className={cn(
                  "group text-left px-5 py-4 md:py-5 rounded-2xl transition-all duration-300 border",
                  activeId === group.id
                    ? "bg-white border-blue/15 shadow-[var(--shadow-soft)]"
                    : "bg-transparent border-transparent hover:bg-white/60 hover:border-navy/5"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold mb-2",
                    activeId === group.id
                      ? group.accent === "gold" ? "bg-gold/15 text-gold-dark" : "bg-ice text-blue-deep"
                      : "bg-navy/5 text-gray-light"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={cn("text-lg md:text-xl font-bold tracking-tight transition-colors", activeId === group.id ? "text-navy" : "text-navy/55 group-hover:text-navy")}>
                  {group.name}
                </h3>
                <p className={cn("text-sm mt-1 leading-relaxed", activeId === group.id ? "text-gray-light" : "text-gray-light/60")}>
                  {group.description}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] bg-navy order-1 lg:order-2">
            {solutionsOverview.groups.map((group) => (
              <motion.div
                key={group.id}
                initial={false}
                animate={{ opacity: group.id === activeId ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "absolute inset-0",
                  group.id === activeId ? "z-10" : "z-0 pointer-events-none"
                )}
              >
                <Image
                  src={group.image}
                  alt={group.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority={group.id === solutionsOverview.groups[0].id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="heading-on-dark text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                    {group.name}
                  </h3>
                  <p className="text-white/80 mb-6 max-w-md text-sm md:text-base">{group.description}</p>
                  <Link
                    href={group.href}
                    className={cn(
                      "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                      group.accent === "gold"
                        ? "bg-gold/20 text-gold-light hover:bg-gold/30"
                        : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
                    )}
                  >
                    Detayları İncele →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
