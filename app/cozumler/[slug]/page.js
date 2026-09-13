import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import DecorServicePage from "@/components/services/decor/DecorServicePage";
import { getService, serviceSlugs } from "@/config/services";
import { createMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/cozumler/${slug}`,
  });
}

export default async function CozumDetayPage({ params }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  if (service.customPage) {
    return <DecorServicePage service={service} />;
  }

  return <ServicePage service={service} />;
}
