"use client";

import { motion, useReducedMotion } from "framer-motion";
import ServiceImage from "@/components/services/shared/ServiceImage";
const mockupTypes = [
  { key: "post", label: "Post Mockup", ratio: "aspect-square" },
  { key: "story", label: "Story Mockup", ratio: "aspect-[9/16]" },
  { key: "reels", label: "Reels Cover", ratio: "aspect-[9/16]" },
];

export default function SocialMockupGrid({ mockups }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {mockupTypes.map((type, index) => {
        const item = mockups[type.key];
        const Wrapper = prefersReducedMotion ? "div" : motion.div;
        const props = prefersReducedMotion
          ? {}
          : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: index * 0.1 },
            };

        return (
          <Wrapper key={type.key} className="text-center" {...props}>
            <div className="relative mx-auto max-w-[200px]">
              <div className={`relative ${type.ratio} rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1a2e]`}>
                <ServiceImage src={item.image} alt={item.alt} objectPosition={item.objectPosition} sizes="200px" />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] text-white/80 bg-black/50 px-2 py-0.5 rounded-full">@grandotel</span>
                </div>
              </div>
            </div>
            <p className="text-sm font-medium heading-on-dark mt-3">{type.label}</p>
            <p className="text-xs text-body-on-dark mt-1">{item.alt}</p>
          </Wrapper>
        );
      })}

      <div className="md:col-span-3 mt-2">
        <div className="p-5 rounded-2xl glass-card-dark border border-white/10 max-w-sm mx-auto text-center">
          <p className="text-xs font-bold tracking-wider uppercase text-gold-light mb-2">Ad Performance Card</p>
          <p className="text-sm text-body-on-dark">Kampanya özeti ve optimizasyon notları — gerçek performans rakamı gösterilmez.</p>
        </div>
      </div>
    </div>
  );
}
