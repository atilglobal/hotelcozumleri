import WebServicePage from "@/components/services/web/WebServicePage";
import SocialServicePage from "@/components/services/social/SocialServicePage";
import DoorServicePage from "@/components/services/doors/DoorServicePage";
import TextileServicePage from "@/components/services/textile/TextileServicePage";
import CleaningServicePage from "@/components/services/cleaning/CleaningServicePage";
import SpaServicePage from "@/components/services/spa/SpaServicePage";
import DecorServicePage from "@/components/services/decor/DecorServicePage";

export const servicePageRegistry = {
  "otel-web-sitesi": WebServicePage,
  "sosyal-medya": SocialServicePage,
  "kapi-sistemleri": DoorServicePage,
  "otel-tekstili": TextileServicePage,
  "sarf-temizlik": CleaningServicePage,
  "spa-kurulumu": SpaServicePage,
  "yapay-cicek-dekorasyon": DecorServicePage,
};

export function getServicePageComponent(slug) {
  return servicePageRegistry[slug] || null;
}
