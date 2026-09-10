import ContactPage from "@/components/contact/ContactPage";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export const metadata = createMetadata({
  title: "İletişim",
  description:
    "Hotel Çözümleri ile iletişime geçin. Telefon, e-posta, WhatsApp veya teklif formu ile bize ulaşın.",
  path: "/iletisim",
});

export default function IletisimPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "İletişim", href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <ContactPage />
    </>
  );
}
