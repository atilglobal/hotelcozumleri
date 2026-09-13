import { getRelatedServices } from "@/config/services";
import { doorPage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import ScopeGrid from "@/components/services/shared/ScopeGrid";
import StrongCTA from "@/components/services/shared/StrongCTA";
import CrossSellSplit from "@/components/services/shared/CrossSellSplit";
import RelatedServices from "@/components/services/RelatedServices";
import DoorHeroVisual from "@/components/services/visuals/DoorHeroVisual";
import DoorProductPanels from "@/components/services/visuals/DoorProductPanels";
import DoorIntegrationFlow from "@/components/services/visuals/DoorIntegrationFlow";
import { FrontOfficePreview } from "@/components/hotelio/mockups/PreviewMockups";

export default function DoorServicePage({ service }) {
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
        image={doorPage.hero.image}
        variant="split"
        accent="gold"
        badges={["Mifare", "Erişim kontrol", "Yangın kapısı", "Hotelio uyumu"]}
        cta={{ label: "Kapı Sisteminiz İçin Proje Teklifi Alın", href: service.cta.href }}
        visual={<DoorHeroVisual />}
      />

      <IntroSection text={service.intro.text} highlights={doorPage.highlights} accent="gold" />

      <ServiceSection eyebrow="Entegrasyon Akışı" title="Misafirden Oda Girişine" description="Her adımda ilgili görsel — resepsiyonda Hotelio entegrasyon noktası." variant="c" sectionClass="section-dark-c">
        <DoorIntegrationFlow steps={doorPage.integrationFlow} note={doorPage.integrationNote} />
      </ServiceSection>

      <ServiceSection eyebrow="Ürün & Hizmet Alanları" title="Kapı Sistemleri Portföyü" variant="b" sectionClass="section-dark-b">
        <DoorProductPanels products={doorPage.products} />
      </ServiceSection>

      <ServiceSection eyebrow="Hizmet Kapsamı" title="Güvenlik ve Erişim Çözümleri" variant="a" sectionClass="section-dark-a">
        <ScopeGrid items={service.features} columns={3} accent="gold" />
      </ServiceSection>

      <CrossSellSplit
        title="Kapı Sisteminizi Hotelio ile Konuşun"
        description="Kart tanımlama ve oda erişim süreçlerini yönetim platformuyla birlikte planlayın."
        left={{
          eyebrow: "Hotel Çözümleri",
          title: "Kapı & Mifare Sistemleri",
          description: "Yangın kapılarından elektronik oda kilitlerine kadar uçtan uca altyapı.",
          href: "/cozumler/kapi-sistemleri",
        }}
        right={{
          eyebrow: "HOTELIO",
          title: "Ön Büro & Kart Tanımlama",
          description: "Check-in sürecinde kart tanımlama ve oda atama operasyonu.",
          href: "/hotelio",
        }}
        rightVisual={<FrontOfficePreview />}
      />

      <StrongCTA
        title="Kapı Sisteminizi Birlikte Planlayalım"
        buttonLabel="Proje Teklifi Al"
        href={service.cta.href}
      />

      <RelatedServices services={related} />
    </>
  );
}
