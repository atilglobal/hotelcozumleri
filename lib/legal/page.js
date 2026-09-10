import { createMetadata } from "@/lib/metadata";
import { getLegalPage, LEGAL_SLUGS } from "@/lib/legal";
import LegalPageView from "@/components/legal/LegalPageView";

export function createLegalPage(slug) {
  const meta = LEGAL_SLUGS[slug];
  if (!meta) throw new Error(`Unknown legal slug: ${slug}`);

  async function Page() {
    const page = await getLegalPage(slug);
    return <LegalPageView page={page} path={meta.path} />;
  }

  async function generateMetadata() {
    const page = await getLegalPage(slug);
    return createMetadata({
      title: page.title,
      description: `${page.title} — Hotel Çözümleri`,
      path: meta.path,
    });
  }

  return { Page, generateMetadata };
}
