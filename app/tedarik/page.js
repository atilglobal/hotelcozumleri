import TedarikPage from "@/components/tedarik/TedarikPage";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tedarik & Teklif | Otel Satın Alma Merkezi",
  description:
    "Otelinizin tekstil, temizlik, SPA, kapı sistemleri ve ekipman ihtiyaçlarını tek noktadan iletin. Hotel Çözümleri talebinizi değerlendirir ve size özel teklif sunar.",
  path: "/tedarik",
});

export default function Page() {
  return <TedarikPage />;
}
