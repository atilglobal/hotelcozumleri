import { getRelatedServices } from "@/config/services";
import { socialPage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import ScopeGrid from "@/components/services/shared/ScopeGrid";
import ProcessGrid from "@/components/services/shared/ProcessGrid";
import StrongCTA from "@/components/services/shared/StrongCTA";
import RelatedServices from "@/components/services/RelatedServices";
import SocialHeroVisual from "@/components/services/visuals/SocialHeroVisual";
import SocialContentFlow from "@/components/services/visuals/SocialContentFlow";
import SocialContentCalendar from "@/components/services/visuals/SocialContentCalendar";
import SocialMockupGrid from "@/components/services/visuals/SocialMockupGrid";

export default function SocialServicePage({ service }) {
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
        image={socialPage.hero.image}
        variant="split"
        accent="blue"
        badges={["Instagram", "Reels", "İçerik takvimi", "Reklam yönetimi"]}
        cta={{ label: "Otelinizin Dijital Görünürlüğünü Güçlendirelim", href: service.cta.href }}
        visual={<SocialHeroVisual />}
      />

      <IntroSection text={service.intro.text} highlights={service.goals || socialPage.highlights} accent="blue" />

      <ServiceSection eyebrow="İçerik Akışı" title="Stratejiden Raporlamaya" description="Grand Otel örnek markasıyla tutarlı içerik operasyonu." variant="b" sectionClass="section-dark-b">
        <SocialContentFlow steps={socialPage.contentFlow} />
      </ServiceSection>

      <ServiceSection eyebrow="Hizmet Kapsamı" title="Sosyal Medya Yönetiminde Neler Sunuyoruz?" variant="c" sectionClass="section-dark-c">
        <ScopeGrid items={service.features} columns={2} accent="blue" />
      </ServiceSection>

      <ServiceSection eyebrow="İçerik Takvimi" title="Haftalık Plan Örneği" description="Aynı otel kimliğiyle planlanmış örnek içerikler — konsept görsel." variant="a" sectionClass="section-dark-a">
        <SocialContentCalendar items={socialPage.calendar} />
      </ServiceSection>

      <ServiceSection eyebrow="Görsel Üretim" title="Post, Story ve Reels Mockup'ları" variant="d" sectionClass="section-dark-d">
        <SocialMockupGrid mockups={socialPage.mockups} />
      </ServiceSection>

      <ServiceSection eyebrow="Süreç" title="Çalışma Modelimiz" variant="c" sectionClass="section-dark-c">
        <ProcessGrid steps={socialPage.process} accent="blue" />
      </ServiceSection>

      <StrongCTA
        title="Otelinizin Dijital Görünürlüğünü Güçlendirelim"
        buttonLabel="Sosyal Medya Teklifi Al"
        href={service.cta.href}
      />

      <RelatedServices services={related} />
    </>
  );
}
