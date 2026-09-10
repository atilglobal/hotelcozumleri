"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Error({ reset }) {
  return (
    <section className="pt-[calc(var(--header-height)+4rem)] pb-24 min-h-[60vh] flex items-center">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-4xl text-navy mb-4">Bir Sorun Oluştu.</h1>
          <p className="text-gray-light mb-10">
            Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button type="button" variant="primary" size="lg" onClick={() => reset()}>Tekrar Dene</Button>
            <Button href="/" variant="outline" size="lg">Ana Sayfaya Dön</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
