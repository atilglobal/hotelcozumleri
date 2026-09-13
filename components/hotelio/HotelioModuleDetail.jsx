import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import PreviewMockup from "./mockups/PreviewMockups";
import { hotelioCtaIds } from "@/config/hotelio";

export default function HotelioModuleDetail({ module }) {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: "/hotelio" },
    { label: "Modüller", href: "/hotelio/moduller" },
    { label: module.title, href: null },
  ];

  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+2rem)] pb-12 section-dark-a overflow-hidden">
        <SectionBackdrop variant="a" />
        <Container className="relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-6 [&_span]:text-white/90 [&_a]:text-white/60" />
          <span className="text-gold-light text-xs font-semibold tracking-wider uppercase">{module.categoryLabel}</span>
          <h1 className="font-display text-3xl md:text-4xl heading-on-dark mt-2 mb-4">{module.title}</h1>
          <p className="text-body-on-dark max-w-2xl leading-relaxed">{module.shortDescription}</p>
        </Container>
      </section>

      <section className="pb-16 section-dark-b relative overflow-hidden">
        <SectionBackdrop variant="b" />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <PreviewMockup type={module.mockupType} />
            <div>
              <h2 className="font-display text-2xl heading-on-dark mb-4">İşletme Faydası</h2>
              <ul className="space-y-3 mb-8">
                {module.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-body-on-dark">
                    <span className="text-gold">→</span> {b}
                  </li>
                ))}
              </ul>
              <h2 className="font-display text-2xl heading-on-dark mb-4">Özellikler</h2>
              <ul className="space-y-2 mb-8">
                {module.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-body-on-dark">
                    <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button href="/hotelio#hotelio-demo" variant="gold" size="lg" data-cta={hotelioCtaIds.modulesDemo}>
                  Demo Talep Et
                </Button>
                <Button href="/hotelio/moduller" variant="secondary-glass" size="lg">
                  Tüm Modüller
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
