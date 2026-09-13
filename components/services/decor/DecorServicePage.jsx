import { getRelatedServices } from "@/config/services";
import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import RelatedServices from "@/components/services/RelatedServices";
import DecorHero from "./DecorHero";
import DecorServiceTypes from "./DecorServiceTypes";
import DecorApplicationAreas from "./DecorApplicationAreas";
import DecorProcess from "./DecorProcess";
import DecorBeforeAfter from "./DecorBeforeAfter";
import DecorGallery from "./DecorGallery";
import DecorBenefits from "./DecorBenefits";
import DecorHotelTypes from "./DecorHotelTypes";
import DecorCustomDesign from "./DecorCustomDesign";
import DecorQuoteForm from "./DecorQuoteForm";

const defaultBreadcrumbs = (service) => [
  { label: "Ana Sayfa", href: "/" },
  { label: "Çözümler", href: "/cozumler" },
  { label: service.hero.eyebrow, href: null },
];

export default function DecorServicePage({ service }) {
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

      <DecorHero
        breadcrumbs={breadcrumbs}
        cta={{ label: "Projeniz İçin Teklif Al", href: service.cta.href }}
        secondaryCta={service.cta.secondary}
      />

      <section className="py-16 md:py-20 section-dark-a relative overflow-hidden">
        <SectionBackdrop variant="a" />
        <Container className="relative z-10 max-w-3xl">
          <AnimatedText>
            <p className="text-body-on-dark text-base md:text-lg leading-relaxed">{service.intro.text}</p>
          </AnimatedText>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {["Alan değerlendirme", "Konsept tasarım", "Bitki seçimi", "Montaj & dekorasyon"].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 glass-card-dark rounded-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-body-on-dark font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <DecorServiceTypes />
      <DecorApplicationAreas />
      <DecorProcess />
      <DecorBeforeAfter />
      <DecorGallery />
      <DecorBenefits />
      <DecorHotelTypes />
      <DecorCustomDesign />

      <section className="section-padding section-dark-d relative overflow-hidden">
        <SectionBackdrop variant="d" />
        <Container className="relative z-10">
          <AnimatedText className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold-light text-xs font-bold tracking-[0.2em] uppercase">Teklif Formu</span>
            <h2 className="font-display text-3xl md:text-4xl heading-on-dark mt-3 mb-4">
              Dekorasyon Projeniz İçin Teklif Alın
            </h2>
            <p className="text-body-on-dark">
              Uygulama alanınızı ve ihtiyaçlarınızı paylaşın; size özel dekorasyon teklifini hazırlayalım.
            </p>
          </AnimatedText>
          <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl glass-card-dark border border-white/10">
            <DecorQuoteForm />
          </div>
        </Container>
      </section>

      <RelatedServices services={related} />
    </>
  );
}
