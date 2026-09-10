import CozumlerHub from "@/components/cozumler/CozumlerHub";
import CTASection from "@/components/ui/CTASection";
import { finalCta } from "@/config/home";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Otel Çözümleri ve Hizmetler",
  description:
    "Otel web sitesi, sosyal medya, kapı sistemleri, tekstil, sarf malzemeleri ve SPA kurulumu. Oteller için uçtan uca profesyonel çözümler.",
  path: "/cozumler",
});

export default function CozumlerPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Çözümler", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <CozumlerHub />
      <CTASection data={finalCta} />
    </>
  );
}
