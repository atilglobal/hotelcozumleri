"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import {
  hotelioModules,
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
      <section className="pt-[calc(var(--header-height)+2rem)] pb-12 bg-navy">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60" />
          <h1 className="font-display text-3xl md:text-5xl text-white mb-4">Hotelio Modülleri</h1>
          <p className="text-white/65 max-w-2xl leading-relaxed">
            Otelinizin operasyonunu oluşturan süreçleri tek platform altında keşfedin.
          </p>
        </Container>
      </section>

      <section className="section-padding bg-off-white">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="search"
              placeholder="Modül ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 border border-navy/15 rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue/30"
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
                    filter === f.id ? "bg-blue text-white border-blue" : "bg-white border-navy/10 text-navy hover:border-blue/30"
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
                  className="group block p-5 bg-white border border-navy/10 rounded-sm h-full hover:border-blue/30 hover:shadow-sm transition-all"
                >
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-blue">{mod.categoryLabel}</span>
                  <h2 className="font-display text-xl text-navy mt-2 mb-2 group-hover:text-blue transition-colors">{mod.title}</h2>
                  <p className="text-sm text-gray-light mb-4">{mod.shortDescription}</p>
                  <span className="text-sm text-blue font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detay <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </AnimatedText>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-light py-12">Aramanızla eşleşen modül bulunamadı.</p>
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
