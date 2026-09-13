import { getRelatedServices } from "@/config/services";
import { cleaningPage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import ScopeGrid from "@/components/services/shared/ScopeGrid";
import StrongCTA from "@/components/services/shared/StrongCTA";
import RelatedServices from "@/components/services/RelatedServices";
import CleaningAreaTabs from "@/components/services/visuals/CleaningAreaTabs";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import Container from "@/components/ui/Container";

export default function CleaningServicePage({ service }) {
  const breadcrumbs = serviceBreadcrumbs(service);
  const related = getRelatedServices(service.related);

  return (
    <>
      <ServiceSchema service={service} breadcrumbs={breadcrumbs} />

      <PremiumHero
        breadcrumbs={breadcrumbs}
        eyebrow={service.hero.eyebrow}
        title="Hijyen,"
        titleAccent="Misafir Deneyiminin Görünmeyen Parçasıdır."
        description={service.hero.description}
        image={cleaningPage.hero.image}
        variant="fullscreen"
        accent="ice"
        badges={["Endüstriyel temizlik", "Oda hijyeni", "Havuz kimyasalları", "Toplu tedarik"]}
        cta={{ label: "Toplu Tedarik Teklifi Al", href: service.cta.href }}
        secondaryCta={service.cta.secondary}
      />

      <IntroSection text={service.intro.text} highlights={cleaningPage.highlights} accent="ice" />

      <ServiceSection eyebrow="Ürün Grupları" title="Operasyonel Hijyen Portföyü" variant="b" sectionClass="section-dark-b">
        <ScopeGrid items={service.productGroups} columns={3} accent="ice" />
      </ServiceSection>

      <ServiceSection eyebrow="Alan Haritası" title="Otelinizin Her Köşesi İçin Doğru Ürün" description="Her alan görseli ilgili ürün grubunu doğrudan temsil eder." variant="a" sectionClass="section-dark-a">
        <CleaningAreaTabs areas={cleaningPage.areas} />
      </ServiceSection>

      <section className="section-padding section-dark-c relative overflow-hidden">
        <SectionBackdrop variant="c" />
        <Container className="relative z-10 max-w-3xl mx-auto text-center">
          <AnimatedText>
            <span className="text-cyan-300/90 text-xs font-bold tracking-[0.2em] uppercase">Tedarik Modeli</span>
            <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-6">Ürün Satışı Değil, Tedarik Danışmanlığı</h2>
            <p className="text-body-on-dark text-base md:text-lg leading-relaxed">{cleaningPage.supplyMessage}</p>
          </AnimatedText>
        </Container>
      </section>

      <ServiceSection eyebrow="Hizmet Kapsamı" title="Sarf & Temizlik Çözümleri" variant="d" sectionClass="section-dark-d">
        <ScopeGrid items={service.features} columns={2} accent="ice" />
      </ServiceSection>

      <StrongCTA
        title="Toplu Tedarik Teklifi Alın"
        buttonLabel="Tedarik Talebinizi İletin"
        href={service.cta.href}
        secondary={service.cta.secondary}
      />

      <RelatedServices services={related} />
    </>
  );
}
