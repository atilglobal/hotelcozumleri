import HotelioLandingPage from "@/components/hotelio/HotelioLandingPage";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, softwareApplicationSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Hotelio | Akıllı Otel Yönetim Yazılımı",
  description:
    "Hotelio; rezervasyon, ön büro, misafir ilişkileri, finans, raporlama, housekeeping, SPA ve yönetim süreçlerini tek platformda birleştiren otel odaklı yönetim sistemidir.",
  path: "/hotelio",
});

export default function HotelioPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={softwareApplicationSchema()} />
      <HotelioLandingPage />
    </>
  );
}
