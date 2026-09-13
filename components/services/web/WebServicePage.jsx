import { getRelatedServices } from "@/config/services";
import { webPage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import ScopeGrid from "@/components/services/shared/ScopeGrid";
import BenefitsGrid from "@/components/services/shared/BenefitsGrid";
import ProcessGrid from "@/components/services/shared/ProcessGrid";
import FlowDiagram from "@/components/services/shared/FlowDiagram";
import StrongCTA from "@/components/services/shared/StrongCTA";
import CrossSellSplit from "@/components/services/shared/CrossSellSplit";
import RelatedServices from "@/components/services/RelatedServices";
import WebHeroVisual from "@/components/services/visuals/WebHeroVisual";
import WebDeviceMockups from "@/components/services/visuals/WebDeviceMockups";
import WebFeatureShowcase from "@/components/services/web/WebFeatureShowcase";
import WebBeforeAfter from "@/components/services/web/WebBeforeAfter";
import { ReservationPreview } from "@/components/hotelio/mockups/PreviewMockups";

export default function WebServicePage({ service }) {
  const breadcrumbs = serviceBreadcrumbs(service);
  const related = getRelatedServices(service.related);

  return (
    <>
      <ServiceSchema service={service} breadcrumbs={breadcrumbs} />

      <PremiumHero
        breadcrumbs={breadcrumbs}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        titleAccent={service.hero.titleAccent}
        description={service.hero.description}
        image={webPage.hero.image}
        variant="split"
        accent="blue"
        badges={["Mobil uyum", "Çoklu dil", "SEO", "Hotelio"]}
        cta={{ label: "Oteliniz İçin Web Projesi Başlatalım", href: service.cta.href }}
        visual={<WebHeroVisual />}
      />

      <IntroSection text={service.intro.text} highlights={webPage.highlights} accent="blue" />

      <ServiceSection eyebrow="Hizmet Kapsamı" title="Dijital Vitrininizin Temel Taşları" variant="b" sectionClass="section-dark-b">
        <ScopeGrid items={service.features} columns={3} accent="blue" />
      </ServiceSection>

      <ServiceSection
        eyebrow="Responsive Showcase"
        title="Aynı Otel Sitesi, Her Cihazda"
        description="Desktop, tablet ve mobile — aynı Grand Otel markası, cihaza özel düzen."
        variant="c"
        sectionClass="section-dark-c"
      >
        <WebDeviceMockups />
      </ServiceSection>

      <ServiceSection
        eyebrow="Özellik Görselleri"
        title="Web Altyapınızın Her Katmanı"
        description="Mobil uyumdan Hotelio entegrasyonuna — her görsel ilgili özelliği doğrudan temsil eder."
        variant="a"
        sectionClass="section-dark-a"
      >
        <WebFeatureShowcase features={webPage.features} />
      </ServiceSection>

      <ServiceSection eyebrow="Rezervasyon Akışı" title="Ziyaretçiden Rezervasyona" variant="a" sectionClass="section-dark-a">
        <FlowDiagram steps={webPage.visitorFlow} highlight="CRM / HOTELIO" note={service.techNote} />
      </ServiceSection>

      <WebBeforeAfter data={webPage.beforeAfter} />

      <ServiceSection eyebrow="Faydalar" title="Web Sitenizin İşletmenize Katkısı" variant="d" sectionClass="section-dark-d">
        <BenefitsGrid benefits={service.benefits} accent="blue" />
      </ServiceSection>

      <ServiceSection eyebrow="Süreç" title="Web Projesi Nasıl İlerler?" variant="c" sectionClass="section-dark-c">
        <ProcessGrid steps={webPage.process} accent="blue" />
      </ServiceSection>

      <CrossSellSplit
        title="Web Sitenizi Kurun. Operasyonu Hotelio ile Yönetin."
        description="Rezervasyon vitrini ile otel yönetim platformunu birlikte değerlendirin."
        left={{
          eyebrow: "Hotel Çözümleri",
          title: "Otel Web Sitesi",
          description: "Rezervasyon odaklı, SEO altyapılı ve mobil uyumlu dijital vitrin.",
          href: "/cozumler/otel-web-sitesi",
        }}
        right={{
          eyebrow: "HOTELIO",
          title: "Rezervasyon & Operasyon",
          description: "Rezervasyon, ön büro ve misafir yönetimini tek platformda birleştirin.",
          href: "/hotelio",
        }}
        rightVisual={<ReservationPreview />}
      />

      <StrongCTA
        title="Oteliniz İçin Web Projesi Başlatalım"
        buttonLabel="Proje Teklifi Al"
        href={service.cta.href}
      />

      <RelatedServices services={related} />
    </>
  );
}
