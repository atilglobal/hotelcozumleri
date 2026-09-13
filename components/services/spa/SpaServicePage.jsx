import { getRelatedServices } from "@/config/services";
import { spaPage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import BenefitsGrid from "@/components/services/shared/BenefitsGrid";
import StrongCTA from "@/components/services/shared/StrongCTA";
import CrossSellSplit from "@/components/services/shared/CrossSellSplit";
import RelatedServices from "@/components/services/RelatedServices";
import SpaProcessScroll from "@/components/services/visuals/SpaProcessScroll";
import SpaSolutionEditorial from "@/components/services/visuals/SpaSolutionEditorial";
import ServiceGallery from "@/components/services/visuals/ServiceGallery";
import ServiceImage from "@/components/services/shared/ServiceImage";
import { SpaPreview } from "@/components/hotelio/mockups/PreviewMockups";

export default function SpaServicePage({ service }) {
  const breadcrumbs = serviceBreadcrumbs(service);
  const related = getRelatedServices(service.related);

  return (
    <>
      <ServiceSchema service={service} breadcrumbs={breadcrumbs} />

      <PremiumHero
        breadcrumbs={breadcrumbs}
        eyebrow={service.hero.eyebrow}
        title="Wellness,"
        titleAccent="Otelinizin En Lüks Deneyim Katmanı."
        description="Sauna, buhar odası, masaj odası ve dinlenme alanları — tutarlı premium wellness konsepti."
        image={spaPage.hero.image}
        variant="fullscreen"
        accent="gold"
        badges={["Sauna", "Buhar odası", "Masaj", "Wellness"]}
        cta={{ label: "SPA Projenizi Konuşalım", href: service.cta.href }}
      />

      <IntroSection text={service.intro.text} highlights={spaPage.highlights} accent="gold" />

      <ServiceSection eyebrow="Süreç" title="Keşiften Teslime 7 Adım" variant="c" sectionClass="section-dark-c">
        <SpaProcessScroll steps={spaPage.process} />
      </ServiceSection>

      <ServiceSection eyebrow="Çözüm Alanları" title="Wellness Mimarisi" description="Her alan görseli kategoriyi doğrudan temsil eder — aynı premium art direction." variant="gradient" sectionClass="section-dark-gradient">
        <SpaSolutionEditorial areas={spaPage.solutionAreas} />
      </ServiceSection>

      <ServiceSection eyebrow="Konsept Galeri" title="Wellness Atmosferi" variant="b" sectionClass="section-dark-b">
        <ServiceGallery items={spaPage.gallery} columns={3} />
      </ServiceSection>

      <ServiceSection eyebrow="Faydalar" title="SPA Yatırımının Getirisi" variant="a" sectionClass="section-dark-a">
        <BenefitsGrid benefits={spaPage.benefits} accent="gold" />
      </ServiceSection>

      <CrossSellSplit
        title="SPA'nızı Kurun. Operasyonunu Hotelio ile Yönetin."
        description="Wellness alanı kurulumu ile randevu ve SPA operasyon yönetimini birlikte planlayın."
        left={{
          eyebrow: "Hotel Çözümleri",
          title: "Anahtar Teslim SPA Kurulumu",
          description: "Keşif, mimari planlama, ekipman ve montaj — uçtan uca proje yönetimi.",
          href: "/cozumler/spa-kurulumu",
        }}
        right={{
          eyebrow: "HOTELIO",
          title: "SPA Takvimi & Randevu",
          description: "SPA randevularını, terapist planını ve misafir akışını dijitalde yönetin.",
          href: "/hotelio",
        }}
        rightVisual={
          <div className="space-y-4">
            <SpaPreview />
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-white/10">
              <ServiceImage src={spaPage.crossSell.spa.image} alt={spaPage.crossSell.spa.alt} sizes="400px" />
            </div>
          </div>
        }
      />

      <StrongCTA
        title="SPA Projenizi Konuşalım"
        buttonLabel="Proje Görüşmesi Planla"
        href={service.cta.href}
      />

      <RelatedServices services={related} />
    </>
  );
}
