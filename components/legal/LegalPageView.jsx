import Container from "@/components/ui/Container";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export default function LegalPageView({ page, path }) {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: page.title, href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <section className="pt-[calc(var(--header-height)+3rem)] pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl text-navy mb-8">{page.title}</h1>
            <div
              className="prose prose-navy max-w-none prose-headings:font-display prose-a:text-blue"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
            {page.updated_at && (
              <p className="text-xs text-gray-light mt-10 pt-6 border-t border-navy/10">
                Son güncelleme: {new Date(page.updated_at).toLocaleDateString("tr-TR")}
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
