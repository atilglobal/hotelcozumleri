import Hero from "@/components/home/Hero";
import SolutionsHub from "@/components/home/SolutionsHub";
import HotelioShowcase from "@/components/home/HotelioShowcase";
import HotelioAIShowcase from "@/components/home/HotelioAIShowcase";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import HotelAreas from "@/components/home/HotelAreas";
import WhyUs from "@/components/home/WhyUs";
import Projects from "@/components/home/Projects";
import CTASection from "@/components/ui/CTASection";
import { finalCta } from "@/config/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SolutionsHub />
      <HotelioShowcase />
      <HotelioAIShowcase />
      <ServicesShowcase />
      <HotelAreas />
      <WhyUs />
      <Projects />
      <CTASection data={finalCta} />
    </>
  );
}
