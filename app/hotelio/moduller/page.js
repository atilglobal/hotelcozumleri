import HotelioModulesPage from "@/components/hotelio/HotelioModulesPage";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Hotelio Modülleri",
  description:
    "Hotelio otel yönetim platformu modülleri. Rezervasyon, ön büro, finans, CRM, housekeeping, SPA ve yönetim modüllerini keşfedin.",
  path: "/hotelio/moduller",
});

export default function HotelioModullerPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: "/hotelio" },
    { label: "Modüller", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HotelioModulesPage />
    </>
  );
}
