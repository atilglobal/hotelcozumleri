import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import HotelioDemoForm from "@/components/hotelio/HotelioDemoForm";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Hotelio Demo Talep",
  description: "Hotelio otel yönetim platformu için ücretsiz demo talep edin.",
  path: "/hotelio-demo",
});

export default function HotelioDemoPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: "/hotelio" },
    { label: "Demo Talep", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="pt-[calc(var(--header-height)+2rem)] pb-20 bg-off-white min-h-[70vh]">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-8" />
          <div className="max-w-xl mx-auto mb-10 text-center">
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">HOTELIO</span>
            <h1 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">Demo Talep Et</h1>
            <p className="text-gray-light">
              Otelinizin yapısına göre Hotelio&apos;yu birlikte inceleyelim.
            </p>
          </div>
          <div className="max-w-xl mx-auto p-6 md:p-8 bg-white border border-navy/8 rounded-sm">
            <HotelioDemoForm />
          </div>
        </Container>
      </section>
    </>
  );
}
