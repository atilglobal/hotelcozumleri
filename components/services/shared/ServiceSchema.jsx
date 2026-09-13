import { breadcrumbSchema, serviceSchema, JsonLd } from "@/lib/schema";

export function serviceBreadcrumbs(service) {
  return [
    { label: "Ana Sayfa", href: "/" },
    { label: "Çözümler", href: "/cozumler" },
    { label: service.hero.eyebrow, href: null },
  ];
}

export default function ServiceSchema({ service, breadcrumbs }) {
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
    </>
  );
}
