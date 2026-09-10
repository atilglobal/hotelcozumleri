"use client";

import { servicesShowcase } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesShowcase() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionTitle
          eyebrow="Hizmetler"
          title={servicesShowcase.title}
          subtitle={servicesShowcase.subtitle}
          className="mb-12 md:mb-16 max-w-4xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr">
          {servicesShowcase.services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
              image={service.image}
              size={service.size}
              index={index}
              className={service.size === "large" ? "lg:col-span-2" : ""}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
