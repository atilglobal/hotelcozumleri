import { getRelatedServices } from "@/config/services";
import { textilePage } from "@/config/servicePages";
import ServiceSchema, { serviceBreadcrumbs } from "@/components/services/shared/ServiceSchema";
import PremiumHero from "@/components/services/shared/PremiumHero";
import IntroSection from "@/components/services/shared/IntroSection";
import ServiceSection from "@/components/services/shared/ServiceSection";
import ScopeGrid from "@/components/services/shared/ScopeGrid";
import ProcessGrid from "@/components/services/shared/ProcessGrid";
import StrongCTA from "@/components/services/shared/StrongCTA";
import RelatedServices from "@/components/services/RelatedServices";
import TextileProductShowcase from "@/components/services/visuals/TextileProductShowcase";
import TextileLogoShowcase from "@/components/services/visuals/TextileLogoShowcase";
import TextileBeforeAfter from "@/components/services/textile/TextileBeforeAfter";

export default function TextileServicePage({ service }) {
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
        image={textilePage.hero.image}
        variant="fullscreen"
        accent="gold"
        badges={["Havlu", "Bornoz", "Nevresim", "Logo nakış"]}
        cta={{ label: "Tekstil Teklifi Alın", href: service.cta.href }}
        secondaryCta={service.cta.secondary}
      />

      <IntroSection text={service.intro.text} highlights={textilePage.highlights} accent="gold" />

      <ServiceSection eyebrow="Ürün Grubu" title="Misafir Odasında Dokunsal Kalite" description="Her kategori görseli doğrudan ilgili ürünü gösterir — konsept görsel." variant="b" sectionClass="section-dark-b">
        <TextileProductShowcase products={textilePage.products} />
      </ServiceSection>

      <ServiceSection eyebrow="Logo Nakış" title="Üründen Markaya" description="Logosuz üründen nakış uygulamasına, markalı otel tekstiline — tek görsel hikâye." variant="gradient" sectionClass="section-dark-gradient">
        <TextileLogoShowcase steps={textilePage.logoFlow} embroidery={textilePage.embroidery} />
      </ServiceSection>

      <TextileBeforeAfter data={textilePage.beforeAfter} />

      <ServiceSection eyebrow="Hizmet Kapsamı" title="Tekstil Tedarik ve Kişiselleştirme" variant="a" sectionClass="section-dark-a">
        <ScopeGrid items={service.features} columns={2} accent="gold" />
        {service.highlights && (
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {service.highlights.map((h) => (
              <span key={h} className="px-4 py-2 glass-card-dark text-sm text-gold-light rounded-xl border border-gold/20">
                {h}
              </span>
            ))}
          </div>
        )}
      </ServiceSection>

      <ServiceSection eyebrow="Süreç" title="Tekstil Tedarik Süreci" variant="c" sectionClass="section-dark-c">
        <ProcessGrid steps={textilePage.process} accent="gold" />
      </ServiceSection>

      <StrongCTA
        title="Markanızı Misafir Odasına Taşıyın"
        buttonLabel="Tekstil Teklifi Alın"
        href={service.cta.href}
        secondary={service.cta.secondary}
      />

      <RelatedServices services={related} />
    </>
  );
}
