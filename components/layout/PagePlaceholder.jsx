import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function PagePlaceholder({ title, description }) {
  return (
    <section className="pt-[calc(var(--header-height)+3rem)] pb-20 min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-2xl">
          <span className="text-blue text-xs font-semibold tracking-[0.25em] uppercase">
            Yakında
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-navy mt-4 mb-6">{title}</h1>
          <p className="text-gray-light text-lg leading-relaxed mb-8">
            {description ||
              "Bu sayfa çok yakında yayında olacak. Oteliniz için çözüm arayışınızda ana sayfamızdan bize ulaşabilirsiniz."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/" variant="primary" size="lg">
              Ana Sayfaya Dön
            </Button>
            <Button href="/teklif-al" variant="outline" size="lg">
              Teklif Al
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
