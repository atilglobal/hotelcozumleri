import AboutPage from "@/components/about/AboutPage";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "Hakkımızda",
  description:
    "Hotel Çözümleri; oteller için teknoloji, donanım, tekstil, temizlik ve operasyon çözümlerini tek çatı altında sunan sektöre özel çözüm ortağınızdır.",
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <AboutPage />
    </>
  );
}
