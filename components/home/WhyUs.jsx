"use client";

import { whyUs } from "@/config/home";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import AnimatedText from "@/components/ui/AnimatedText";
import WhyUsHubGraphic from "@/components/home/WhyUsHubGraphic";
import WhyUsFeatureCard from "@/components/home/WhyUsFeatureCard";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function WhyUs() {
  const [featured, ...rest] = whyUs.items;

  return (
    <section className="section-padding section-dark-c relative overflow-hidden">
      <SectionBackdrop variant="c" watermark="WHY US" />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Neden Biz"
          title={whyUs.title}
          subtitle={whyUs.subtitle}
          className="mb-12 md:mb-16 max-w-3xl"
        />

        <div className="grid lg:grid-cols-12 gap-4 md:gap-5 items-stretch">
          <AnimatedText className="lg:col-span-5 h-full">
            <WhyUsHubGraphic title={featured.title} description={featured.description} />
          </AnimatedText>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 md:gap-5">
            {rest.map((item, index) => (
              <AnimatedText key={item.title} delay={(index + 1) * 0.06} className="h-full">
                <WhyUsFeatureCard index={index} title={item.title} description={item.description} />
              </AnimatedText>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
