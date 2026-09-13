"use client";

import { servicesShowcase } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import ServiceCard from "@/components/ui/ServiceCard";

const serviceLayout = {
  web: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  social: "lg:row-span-1",
  access: "lg:row-span-1",
  textile: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  supplies: "lg:row-span-1",
  spa: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  decor: "md:col-span-2 lg:col-span-1 lg:row-span-2",
};

export default function ServicesShowcase() {
  return (
    <section className="section-padding section-dark-b relative overflow-hidden">
      <SectionBackdrop variant="b" watermark="SOLUTIONS" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Hizmetler"
          index={1}
          title={servicesShowcase.title}
          subtitle={servicesShowcase.subtitle}
          className="mb-12 md:mb-16 max-w-4xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(220px,1fr)] items-stretch">
          {servicesShowcase.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              image={service.image}
              ctaLabel={service.ctaLabel}
              size={service.size}
              index={index}
              className={serviceLayout[service.id] ?? ""}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
