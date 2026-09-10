import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 min-h-[60vh] flex items-center bg-mesh-light">
      <Container>
        <div className="max-w-xl mx-auto text-center modern-card p-10 md:p-14">
          <p className="text-6xl font-extrabold text-gradient-blue mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 tracking-tight">Aradığınız Sayfayı Bulamadık.</h1>
          <p className="text-gray-light mb-10">
            Bağlantı hatalı olabilir veya sayfa taşınmış olabilir. Ana sayfadan devam edebilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary" size="lg">Ana Sayfaya Dön</Button>
            <Button href="/cozumler" variant="outline" size="lg">Çözümleri İncele</Button>
            <Button href="/urunler" variant="outline" size="lg">Ürünleri Gör</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
