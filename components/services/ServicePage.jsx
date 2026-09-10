import { getRelatedServices } from "@/config/services";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";
import ServiceHero from "./ServiceHero";
import ServiceIntro from "./ServiceIntro";
import ServiceFeatures from "./ServiceFeatures";
import ServiceBenefits from "./ServiceBenefits";
import ServiceCTA from "./ServiceCTA";
import RelatedServices from "./RelatedServices";
import WebSiteMockup from "./visuals/WebSiteMockup";
import SocialFeedMockup from "./visuals/SocialFeedMockup";
import DoorIntegrationFlow from "./visuals/DoorIntegrationFlow";
import TextileLogoFlow from "./visuals/TextileLogoFlow";
import CleaningAreaTabs from "./visuals/CleaningAreaTabs";
import SpaProcessTimeline from "./visuals/SpaProcessTimeline";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";

const defaultBreadcrumbs = (service) => [
  { label: "Ana Sayfa", href: "/" },
  { label: "Çözümler", href: "/cozumler" },
  { label: service.hero.eyebrow, href: null },
];

export default function ServicePage({ service }) {
  const breadcrumbs = defaultBreadcrumbs(service);
  const related = getRelatedServices(service.related);

  const schemaData = [
    breadcrumbSchema(breadcrumbs),
    serviceSchema({
      name: service.seo.title,
      description: service.seo.description,
      url: `/cozumler/${service.slug}`,
    }),
  ];

  return (
    <>
      {schemaData.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      <ServiceHero
        {...service.hero}
        theme={service.theme}
        breadcrumbs={breadcrumbs}
        cta={{ label: "Teklif Al", href: service.cta.href }}
      />

      <ServiceIntro text={service.intro.text}>
        {service.goals && (
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {service.goals.map((goal) => (
              <div key={goal} className="flex items-center gap-3 p-4 bg-off-white rounded-sm">
                <span className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-navy font-medium">{goal}</span>
              </div>
            ))}
          </div>
        )}
      </ServiceIntro>

      {service.slug === "otel-web-sitesi" && (
        <section className="py-16 md:py-20 bg-off-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl text-navy text-center mb-10">
                Otel Web Siteniz Böyle Görünebilir
              </h2>
            </AnimatedText>
            <WebSiteMockup />
            {service.techNote && (
              <p className="text-center text-sm text-gray-light mt-8 max-w-2xl mx-auto">
                {service.techNote}
              </p>
            )}
          </Container>
        </section>
      )}

      {service.benefits && (
        <ServiceBenefits benefits={service.benefits} />
      )}

      {(service.features || service.featureGroups) && (
        <ServiceFeatures
          features={service.features || service.featureGroups}
          title={service.slug === "kapi-sistemleri" ? "Hizmet Kapsamı" : "Öne Çıkan Özellikler"}
          columns={(service.features || service.featureGroups)?.length > 6 ? 3 : 2}
          theme={service.slug === "spa-kurulumu" ? "dark" : "light"}
        />
      )}

      {service.slug === "sosyal-medya" && (
        <section className="py-16 md:py-20 bg-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl text-navy text-center mb-10">
                İçerik ve Etkileşim Odaklı Yaklaşım
              </h2>
            </AnimatedText>
            <SocialFeedMockup />
          </Container>
        </section>
      )}

      {service.integrationFlow && (
        <section className="py-16 md:py-20 bg-off-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl text-navy text-center mb-10">
                Entegrasyon Akışı
              </h2>
            </AnimatedText>
            <DoorIntegrationFlow steps={service.integrationFlow} />
          </Container>
        </section>
      )}

      {service.logoFlow && (
        <section className="py-16 md:py-20 bg-off-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl text-navy text-center mb-4">
                Logonuz, Misafirinizin Her Dokunuşunda
              </h2>
              <p className="text-gray-light text-center mb-10 max-w-xl mx-auto">
                Otel logosuna özel nakış uygulaması ile kurumsal bütünlüğünüzü güçlendirin.
              </p>
            </AnimatedText>
            <TextileLogoFlow steps={service.logoFlow} />
            {service.highlights && (
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                {service.highlights.map((h) => (
                  <span key={h} className="px-4 py-2 bg-white border border-navy/10 rounded-sm text-sm text-navy">
                    {h}
                  </span>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      {service.productGroups && service.slug === "otel-tekstili" && (
        <section className="py-12 bg-white">
          <Container>
            <div className="flex flex-wrap justify-center gap-3">
              {service.productGroups.map((group) => (
                <span key={group} className="px-5 py-2.5 bg-ice text-blue text-sm font-medium rounded-sm">
                  {group}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      {service.areas && (
        <section className="py-16 md:py-20 bg-off-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl text-navy text-center mb-10">
                Alan Bazlı Ürün Grupları
              </h2>
            </AnimatedText>
            <CleaningAreaTabs areas={service.areas} />
          </Container>
        </section>
      )}

      {service.process && (
        <section className="py-16 md:py-24 bg-white">
          <Container>
            <AnimatedText>
              <h2 className="font-display text-3xl md:text-4xl text-navy text-center mb-4">
                Anahtar Teslim Süreç
              </h2>
              <p className="text-gray-light text-center mb-12 max-w-xl mx-auto">
                Keşiften teslime, otelinize özel SPA projesi yönetimi.
              </p>
            </AnimatedText>
            <SpaProcessTimeline steps={service.process} />
          </Container>
        </section>
      )}

      {service.solutionAreas && (
        <section className="py-12 bg-navy">
          <Container>
            <div className="flex flex-wrap justify-center gap-4">
              {service.solutionAreas.map((area) => (
                <span key={area} className="px-5 py-2.5 border border-gold/30 text-gold text-sm rounded-sm">
                  {area}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ServiceCTA
        title={service.cta.title}
        href={service.cta.href}
        secondary={service.cta.secondary}
      />

      <RelatedServices services={related} />
    </>
  );
}
