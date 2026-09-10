"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import FeatureItem from "@/components/ui/FeatureItem";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const approach = [
  {
    title: "Tek Muhatap Yaklaşımı",
    description:
      "Bir otelin farklı ihtiyaçları için farklı firmalarla uğraşmak yerine, tüm çözümleri tek çatı altında sunuyoruz.",
  },
  {
    title: "Sektöre Özel Uzmanlık",
    description:
      "Otel işletmeciliğinin dinamiklerini bilen ekip ile sektöre özel çözüm yaklaşımı.",
  },
  {
    title: "Uçtan Uca Hizmet",
    description:
      "Keşiften kuruluma, devreye almadan operasyonel desteğe kadar yanınızdayız.",
  },
];

const solutionAreas = [
  { label: "Teknoloji", desc: "Hotelio otel yönetim sistemi ve dijital altyapı" },
  { label: "Donanım", desc: "Kapı sistemleri ve erişim kontrolü" },
  { label: "Tekstil", desc: "Logolu otel tekstil ürünleri" },
  { label: "Temizlik", desc: "Profesyonel hijyen ve sarf malzemeleri" },
  { label: "Tasarım", desc: "Web sitesi ve dijital marka deneyimi" },
  { label: "Operasyon", desc: "SPA kurulumu ve wellness çözümleri" },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: null },
  ];

  return (
    <>
      <section className="pt-[calc(var(--header-height)+2rem)] pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue/30 rounded-full blur-[120px]" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-8 [&_span]:text-white/90 [&_a]:text-white/60" />
          <AnimatedText>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
              Oteller İçin Ürün Değil,
              <br />
              <span className="text-gradient-gold">Çözüm Üretiyoruz.</span>
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.15}>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mt-6">
              Hotel Çözümleri; teknoloji, donanım, tekstil, temizlik, tasarım ve operasyon
              alanlarını tek yapı altında birleştirerek otel işletmelerine bütüncül çözümler sunar.
            </p>
          </AnimatedText>
        </Container>
      </section>

      <section className="section-padding bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <AnimatedText>
              <span className="text-blue text-xs font-semibold tracking-[0.2em] uppercase">Biz Kimiz</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">
                Otel Sektörünü Bilen Çözüm Ortağınız
              </h2>
              <p className="text-gray leading-relaxed mb-4">
                Hotel Çözümleri, otel sahiplerinin ve yöneticilerinin teknolojiden tedarige,
                dijitalden operasyona kadar ihtiyaç duyduğu tüm çözümleri tek noktadan
                sunmayı hedefleyen bir platformdur.
              </p>
              <p className="text-gray leading-relaxed">
                HOTELIO otel yönetim yazılımından otel tekstiline, kapı sistemlerinden
                SPA kurulumuna kadar geniş bir yelpazede hizmet veriyoruz.
              </p>
            </AnimatedText>
            <div className="space-y-8">
              {approach.map((item, index) => (
                <FeatureItem key={item.title} {...item} index={index} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-off-white">
        <Container>
          <AnimatedText>
            <h2 className="font-display text-3xl md:text-4xl text-navy mb-4 text-center">
              Çözüm Alanlarımız
            </h2>
            <p className="text-gray-light text-center max-w-xl mx-auto mb-12">
              Teknolojiden fiziksel tedarike, otelinizin ihtiyaç haritasını birlikte çiziyoruz.
            </p>
          </AnimatedText>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {solutionAreas.map((area, index) => (
              <AnimatedText key={area.label} delay={index * 0.06}>
                <div className="p-6 bg-white border border-navy/8 rounded-sm h-full hover:border-blue/20 transition-colors">
                  <h3 className="font-display text-xl text-navy mb-2">{area.label}</h3>
                  <p className="text-sm text-gray-light">{area.desc}</p>
                </div>
              </AnimatedText>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding bg-navy">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedText>
              <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase">HOTELIO</span>
              <h2 className="font-display text-3xl md:text-4xl text-white mt-3 mb-4">
                Teknoloji Gücümüz
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                HOTELIO, otel operasyonlarını tek merkezden yönetmek için geliştirilmiş
                otel odaklı yönetim sistemidir. Rezervasyon, misafir yönetimi, finansal
                takip ve raporlama tek platformda birleşir.
              </p>
              <Button href="/hotelio" variant="gold" size="lg">
                Hotelio&apos;yu Keşfet
              </Button>
            </AnimatedText>
            <AnimatedText delay={0.15}>
              <div className="p-8 border border-gold/20 rounded-sm bg-white/[0.03]">
                <p className="text-white/50 text-sm leading-relaxed">
                  {siteConfig.company.parent}
                </p>
                <p className="text-white/70 mt-4 text-sm">
                  Teknoloji altyapımız ASK Bilişim güvencesiyle desteklenmektedir.
                </p>
              </div>
            </AnimatedText>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl text-navy mb-4">Birlikte Çalışalım</h2>
            <p className="text-gray-light mb-8">
              Oteliniz için doğru çözümü birlikte belirleyelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/teklif-al" variant="primary" size="lg">
                Teklif Al
              </Button>
              <Button href="/iletisim" variant="outline" size="lg">
                İletişime Geç
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
