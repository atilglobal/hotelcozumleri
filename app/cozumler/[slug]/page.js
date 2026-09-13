import { notFound } from "next/navigation";
import ServicePage from "@/components/services/ServicePage";
import { getServicePageComponent } from "@/lib/servicePageRegistry";
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

  const CustomPage = getServicePageComponent(slug);
  if (service.customPage && CustomPage) {
    return <CustomPage service={service} />;
  }

  return <ServicePage service={service} />;
}
