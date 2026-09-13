"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import {
  hotelioModuleFilters,
  getModulesByCategory,
  hotelioCtaIds,
} from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioModulesPage() {
  const [filter, setFilter] = useState("tumu");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = getModulesByCategory(filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.shortDescription.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: "/hotelio" },
    { label: "Modüller", href: null },
  ];

  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+2rem)] pb-12 bg-premium-dark overflow-hidden">
        <SectionBackdrop variant="gradient" />
        <Container className="relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60" />
          <h1 className="font-display text-3xl md:text-5xl heading-on-dark mb-4">Hotelio Modülleri</h1>
          <p className="text-body-on-dark max-w-2xl leading-relaxed">
            Otelinizin operasyonunu oluşturan süreçleri tek platform altında keşfedin.
          </p>
        </Container>
      </section>

      <section className="section-padding section-dark-b relative overflow-hidden">
        <SectionBackdrop variant="b" />
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="search"
              placeholder="Modül ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark flex-1"
              aria-label="Modül ara"
            />
            <div className="flex flex-wrap gap-2">
              {hotelioModuleFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "px-3 py-2 text-sm rounded-sm border transition-all",
                    filter === f.id ? "bg-blue text-white border-blue" : "glass-card-dark text-body-on-dark hover:border-gold/30"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((mod, i) => (
              <AnimatedText key={mod.slug} delay={i * 0.03}>
                <Link
                  href={`/hotelio/moduller/${mod.slug}`}
                  className="group block p-5 glass-card-dark glass-card-dark-hover rounded-xl h-full transition-all"
                >
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-gold-light">{mod.categoryLabel}</span>
                  <h2 className="font-display text-xl heading-on-dark mt-2 mb-2 group-hover:text-gold-light transition-colors">{mod.title}</h2>
                  <p className="text-sm text-body-on-dark mb-4">{mod.shortDescription}</p>
                  <span className="text-sm text-gold-light font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detay <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimatedText>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-body-on-dark py-12">Aramanızla eşleşen modül bulunamadı.</p>
          )}

          <div className="text-center mt-12">
            <Button href="/hotelio#hotelio-demo" variant="gold" size="lg" data-cta={hotelioCtaIds.modulesDemo}>
              Ücretsiz Demo Talep Et
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
