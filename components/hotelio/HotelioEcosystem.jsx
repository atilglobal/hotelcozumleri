"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import { hotelioEcosystemLinks } from "@/config/hotelio";

export default function HotelioEcosystem() {
  return (
    <section className="section-padding bg-navy">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-4">
            Yazılımın Ötesinde Tek Çözüm Ortağı.
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Hotelio dijital operasyonu yönetirken Hotel Çözümleri fiziksel ve dijital diğer ihtiyaçlarda da yanınızda.
          </p>
        </AnimatedText>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          <span className="px-5 py-3 bg-gold/15 border border-gold/30 text-gold font-bold tracking-wider text-sm rounded-sm">
            HOTELIO
          </span>
          {hotelioEcosystemLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-3 bg-white/[0.04] border border-white/10 text-white/80 text-sm rounded-sm hover:border-blue/30 hover:text-white transition-colors"
            >
              + {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
