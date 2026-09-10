import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import QuoteFormWrapper from "@/components/forms/QuoteFormWrapper";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Teklif Al",
  description:
    "Hotel Çözümleri teklif formu. Hotelio, web sitesi, kapı sistemleri, tekstil, sarf malzemeleri ve SPA kurulumu için teklif talep edin.",
  path: "/teklif-al",
});

function QuoteFormFallback() {
  return (
    <div className="py-12 text-center text-gray-light">
      Form yükleniyor...
    </div>
  );
}

export default function TeklifAlPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Teklif Al", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="pt-[calc(var(--header-height)+2rem)] pb-20 bg-off-white min-h-[80vh]">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-8" />
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-blue text-xs font-semibold tracking-[0.2em] uppercase">Teklif Formu</span>
            <h1 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              Oteliniz İçin Teklif Alın
            </h1>
            <p className="text-gray-light leading-relaxed">
              Birkaç adımda ihtiyacınızı bize iletin. Ekibimiz size özel bir teklif hazırlayacaktır.
            </p>
          </div>
          <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white border border-navy/8 rounded-sm relative">
            <Suspense fallback={<QuoteFormFallback />}>
              <QuoteFormWrapper />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
