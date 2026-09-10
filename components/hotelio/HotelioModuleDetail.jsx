import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Button from "@/components/ui/Button";
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
      <section className="pt-[calc(var(--header-height)+2rem)] pb-12 bg-off-white">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <span className="text-blue text-xs font-semibold tracking-wider uppercase">{module.categoryLabel}</span>
          <h1 className="font-display text-3xl md:text-4xl text-navy mt-2 mb-4">{module.title}</h1>
          <p className="text-gray-light max-w-2xl leading-relaxed">{module.shortDescription}</p>
        </Container>
      </section>

      <section className="pb-16 bg-off-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <PreviewMockup type={module.mockupType} />
            <div>
              <h2 className="font-display text-2xl text-navy mb-4">İşletme Faydası</h2>
              <ul className="space-y-3 mb-8">
                {module.benefits.map((b) => (
                  <li key={b} className="flex gap-2 text-gray">
                    <span className="text-gold">→</span> {b}
                  </li>
                ))}
              </ul>
              <h2 className="font-display text-2xl text-navy mb-4">Özellikler</h2>
              <ul className="space-y-2 mb-8">
                {module.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-navy/80">
                    <span className="w-1 h-1 rounded-full bg-blue mt-2 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button href="/hotelio#hotelio-demo" variant="gold" size="lg" data-cta={hotelioCtaIds.modulesDemo}>
                  Demo Talep Et
                </Button>
                <Button href="/hotelio/moduller" variant="outline" size="lg">
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
