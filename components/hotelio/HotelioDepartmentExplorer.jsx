"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioDepartments } from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioDepartmentExplorer() {
  const [active, setActive] = useState(hotelioDepartments[0].id);
  const current = hotelioDepartments.find((d) => d.id === active);

  return (
    <section className="section-padding bg-navy">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-10">
            Hotelio Otelinizin Her Departmanında
          </h2>
        </AnimatedText>
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
          {hotelioDepartments.map((dept) => (
            <button
              key={dept.id}
              type="button"
              role="tab"
              aria-selected={active === dept.id}
              onClick={() => setActive(dept.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-sm border transition-all",
                active === dept.id
                  ? "bg-gold/20 border-gold/40 text-gold"
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/20"
              )}
            >
              {dept.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto text-center p-8 border border-white/10 rounded-sm bg-white/[0.03]"
            >
              <h3 className="font-display text-2xl text-white mb-3">{current.label}</h3>
              <p className="text-white/65 leading-relaxed">{current.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
