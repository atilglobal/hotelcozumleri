import HotelioHero from "./HotelioHero";
import HotelioWhySection from "./HotelioWhySection";
import HotelioModuleNavigator from "./HotelioModuleNavigator";
import HotelioAISection from "./HotelioAISection";
import HotelioAssistantDemo from "./HotelioAssistantDemo";
import {
  HotelioExecutiveSection,
  HotelioReservationSection,
  HotelioFrontOfficeSection,
  HotelioGuestSection,
  HotelioHousekeepingSection,
  HotelioReportsSection,
  HotelioSpaCrossSection,
} from "./HotelioFeatureSections";
import HotelioBenefits from "./HotelioBenefits";
import HotelioAudience from "./HotelioAudience";
import HotelioDepartmentExplorer from "./HotelioDepartmentExplorer";
import HotelioCTA from "./HotelioCTA";
import HotelioFAQ from "./HotelioFAQ";
import HotelioEcosystem from "./HotelioEcosystem";
import HotelioStickyDemo from "./HotelioStickyDemo";

export default function HotelioLandingPage() {
  return (
    <>
      <HotelioHero />
      <HotelioWhySection />
      <HotelioModuleNavigator />
      <HotelioAISection />
      <HotelioAssistantDemo />
      <HotelioExecutiveSection />
      <HotelioReservationSection />
      <HotelioFrontOfficeSection />
      <HotelioGuestSection />
      <HotelioHousekeepingSection />
      <HotelioSpaCrossSection />
      <HotelioReportsSection />
      <HotelioBenefits />
      <HotelioAudience />
      <HotelioDepartmentExplorer />
      <HotelioCTA />
      <HotelioFAQ />
      <HotelioEcosystem />
      <HotelioStickyDemo />
    </>
  );
}
