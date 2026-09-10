import { notFound } from "next/navigation";
import HotelioModuleDetail from "@/components/hotelio/HotelioModuleDetail";
import { getHotelioModule, hotelioModules } from "@/config/hotelio";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/schema";

export async function generateStaticParams() {
  return hotelioModules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const mod = getHotelioModule(slug);
  if (!mod) return {};
  return createMetadata({
    title: `${mod.title} | Hotelio Modülü`,
    description: mod.shortDescription,
    path: `/hotelio/moduller/${slug}`,
  });
}

export default async function HotelioModulePage({ params }) {
  const { slug } = await params;
  const mod = getHotelioModule(slug);
  if (!mod) notFound();

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hotelio", href: "/hotelio" },
    { label: "Modüller", href: "/hotelio/moduller" },
    { label: mod.title, href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <HotelioModuleDetail module={mod} />
    </>
  );
}
