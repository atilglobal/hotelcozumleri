"use client";

import { useState } from "react";
import { hotelioAI, hotelioCtaIds } from "@/config/hotelio";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import HotelioAIBadge from "@/components/hotelio/HotelioAIBadge";
import HotelioAIComparison from "@/components/hotelio/HotelioAIComparison";
import HotelioAIFocusAreas from "@/components/hotelio/HotelioAIFocusAreas";
import HotelioAIOrbitGraphic from "@/components/hotelio/HotelioAIOrbitGraphic";
import HotelioAIConversationDemo, { HotelioAIPromptChips } from "@/components/hotelio/HotelioAIConversationDemo";

export default function HotelioAISectionPremium({ variant = "home" }) {
  const [activePrompt, setActivePrompt] = useState(hotelioAI.conversations[0].prompt);
  const isPage = variant === "page";

  return (
    <section
      id="hotelio-ai"
      className="section-padding relative overflow-hidden bg-[#060b14] text-white"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue/15 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gold/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,108,244,0.08),transparent_65%)]" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14 lg:mb-20">
          <div>
            <AnimatedText>
              <HotelioAIBadge tagline={hotelioAI.badgeTagline} className="mb-6" />
            </AnimatedText>
            <AnimatedText delay={0.05}>
              <h2 className="heading-on-dark text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5">
                {hotelioAI.titleLine1}
                <br />
                <span className="text-gold-light">{hotelioAI.titleLine2}</span>
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <p className="text-body-on-dark text-base md:text-lg leading-relaxed max-w-xl mb-8">
                {hotelioAI.description}
              </p>
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <HotelioAIComparison className="mb-8" />
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={hotelioAI.ctas.primary.href} variant="gold" size="lg" data-cta={hotelioCtaIds.aiDemo}>
                  {hotelioAI.ctas.primary.label}
                </Button>
                <Button href={hotelioAI.ctas.secondary.href} variant="secondary-glass" size="lg">
                  {hotelioAI.ctas.secondary.label}
                </Button>
              </div>
            </AnimatedText>
          </div>

          <AnimatedText delay={0.12} className="w-full">
            <HotelioAIConversationDemo prompt={activePrompt} />
          </AnimatedText>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <HotelioAIPromptChips activePrompt={activePrompt} onSelect={setActivePrompt} />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 hidden lg:block">
            <HotelioAIOrbitGraphic />
          </div>
        </div>

        <div className="mt-14 lg:mt-20 pt-12 border-t border-white/10">
          <HotelioAIFocusAreas />
        </div>

        {isPage && (
          <div className="mt-12 text-center">
            <p className="text-white/50 text-sm mb-4">Hotelio AI&apos;ı Deneyimleyin</p>
            <Button href={hotelioAI.ctas.primary.href} variant="gold" size="lg" data-cta={hotelioCtaIds.aiDemo}>
              {hotelioAI.ctas.primary.label}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
