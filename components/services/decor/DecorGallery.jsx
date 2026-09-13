"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { decorGalleryFilters, decorGalleryItems } from "@/config/decor";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { cn } from "@/utils/cn";

export default function DecorGallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "all") return decorGalleryItems;
    return decorGalleryItems.filter(
      (item) => item.category === filter || item.tags?.includes(filter)
    );
  }, [filter]);

  return (
    <section className="section-padding section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" watermark="GALLERY" />
      <Container className="relative z-10">
        <AnimatedText className="mb-8 md:mb-10">
          <span className="text-emerald-300/80 text-xs font-bold tracking-[0.2em] uppercase">Galeri</span>
          <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
            Dekoratif Uygulama Galerisi
          </h2>
          <p className="text-body-on-dark max-w-2xl">
            Dikey bahçeden lobi ağaçlarına, bar çiçeklendirmesinden özel konsept alanlara kadar ilham veren kompozisyonlar.
          </p>
        </AnimatedText>

        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Galeri filtreleri">
          {decorGalleryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl border whitespace-nowrap transition-all",
                filter === f.id
                  ? "bg-blue/30 text-white border-blue/40"
                  : "glass-card-dark text-body-on-dark border-white/10 hover:border-blue/30"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, index) => {
            const Wrapper = prefersReducedMotion ? "div" : motion.div;
            const props = prefersReducedMotion
              ? {}
              : {
                  layout: true,
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: index * 0.04 },
                };

            return (
              <Wrapper key={item.id} className="break-inside-avoid" {...props}>
                <button
                  type="button"
                  onClick={() => setLightbox(item)}
                  className="group relative w-full rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-emerald-400/30 transition-all text-left"
                >
                  <div className={cn("relative w-full", index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[3/4]" : "aspect-square")}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07101C]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold heading-on-dark">{item.title}</p>
                      <p className="text-xs text-emerald-300/80 mt-1">Konsept görsel · Büyüt</p>
                    </div>
                  </div>
                </button>
              </Wrapper>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#07101C]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm"
              >
                Kapat ✕
              </button>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/15">
                <Image src={lightbox.image} alt={lightbox.title} fill sizes="90vw" className="object-cover" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl heading-on-dark">{lightbox.title}</h3>
                <p className="text-sm text-muted-on-dark mt-1">Konsept görsel — Hotel Çözümleri dekorasyon yaklaşımı</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
