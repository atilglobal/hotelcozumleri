"use client";

import { whyUs } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FeatureItem from "@/components/ui/FeatureItem";

export default function WhyUs() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <SectionTitle
              eyebrow="Neden Biz"
              title={whyUs.title}
              subtitle={whyUs.subtitle}
            />
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4 md:gap-5">
            {whyUs.items.map((item, index) => (
              <FeatureItem key={item.title} title={item.title} description={item.description} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
