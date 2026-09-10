"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { solutionsOverview } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/utils/cn";

export default function SolutionsOverview() {
  const [activeId, setActiveId] = useState(solutionsOverview.groups[0].id);
  const activeGroup = solutionsOverview.groups.find((g) => g.id === activeId);

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
          <div className="lg:col-span-5 flex flex-col gap-2">
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

          <div className="lg:col-span-7 relative min-h-[380px] md:min-h-[480px]">
            <AnimatePresence mode="wait">
              {activeGroup && (
                <motion.div
                  key={activeGroup.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden shadow-[var(--shadow-card)] group">
                    <Image src={activeGroup.image} alt={activeGroup.name} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/25 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{activeGroup.name}</h3>
                      <p className="text-white/60 mb-6 max-w-md text-sm md:text-base">{activeGroup.description}</p>
                      <Link
                        href={activeGroup.href}
                        className={cn(
                          "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                          activeGroup.accent === "gold"
                            ? "bg-gold/20 text-gold-light hover:bg-gold/30"
                            : "bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm"
                        )}
                      >
                        Detayları İncele →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
