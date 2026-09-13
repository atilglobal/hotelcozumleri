"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { solutionsOverview } from "@/config/home";
import { cn } from "@/utils/cn";

const hubNodes = solutionsOverview.groups.map((g, i, arr) => {
  const count = arr.length;
  const angle = ((360 / count) * i * Math.PI) / 180;
  const r = 42;
  return {
    ...g,
    x: 50 + r * Math.cos(angle - Math.PI / 2),
    y: 50 + r * Math.sin(angle - Math.PI / 2),
  };
});

export default function SolutionsHub() {
  return (
    <section className="section-padding bg-premium-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-[0.04]" style={{ backgroundSize: "48px 48px" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue/10 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Ekosistem"
          title={solutionsOverview.title}
          titleAccent={solutionsOverview.titleAccent}
          subtitle="Tek firma. Birbiriyle konuşan çözümler."
          theme="dark"
          align="center"
          className="mb-12 md:mb-16 mx-auto"
        />

        <div className="relative max-w-3xl mx-auto aspect-square md:aspect-[16/10]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
            {hubNodes.map((node) => (
              <motion.line
                key={`line-${node.id}`}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="rgba(212,168,83,0.35)"
                strokeWidth="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-blue to-blue-deep flex flex-col items-center justify-center text-center shadow-[var(--shadow-glow-blue)] ring-2 ring-gold/30 px-3">
              <span className="text-[10px] text-white/70 uppercase tracking-wider">Merkez</span>
              <span className="text-white font-bold text-sm md:text-base leading-tight mt-1">Hotel<br />Çözümleri</span>
            </div>
          </div>

          {hubNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <Link
                href={node.href}
                className={cn(
                  "block px-3 py-2 md:px-4 md:py-3 rounded-xl text-center min-w-[100px] md:min-w-[120px]",
                  "bg-white/8 backdrop-blur-md border border-white/12 hover:border-gold/40 hover:bg-white/12 transition-all duration-300",
                  node.accent === "gold" && "ring-1 ring-gold/25"
                )}
              >
                <span className="text-[10px] md:text-xs font-bold text-white leading-tight max-w-[130px] md:max-w-[150px]">
                  {node.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-body-on-dark text-sm md:text-base max-w-xl mx-auto mt-10">
          {solutionsOverview.description}
        </p>
      </Container>
    </section>
  );
}
