import HotelioHero from "./HotelioHero";
import HotelioWhySection from "./HotelioWhySection";
import HotelioModuleNavigator from "./HotelioModuleNavigator";
import HotelioAISectionPremium from "./HotelioAISectionPremium";
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
      <HotelioExecutiveSection />
      <HotelioReservationSection />
      <HotelioFrontOfficeSection />
      <HotelioGuestSection />
      <HotelioHousekeepingSection />
      <HotelioSpaCrossSection />
      <HotelioReportsSection />
      <HotelioAISectionPremium variant="page" />
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
