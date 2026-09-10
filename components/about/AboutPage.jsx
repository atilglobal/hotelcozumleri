"use client";

import Container from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const sections = [
  {
    id: "kimiz",
    eyebrow: "Biz Kimiz",
    title: "Otel Sektörünü Bilen Teknoloji ve Çözüm Ortağı",
    body: "Hotel Çözümleri; otel işletmelerinin teknoloji, dijital, operasyon ve tedarik ihtiyaçlarını tek muhatap altında toplayan bir platformdur. Stok satışı yapmıyoruz — ihtiyacınızı analiz edip doğru çözümü birlikte kuruyoruz.",
  },
  {
    id: "sektor",
    eyebrow: "Sektör Bilgisi",
    title: "Otel Sektörünü Neden Biliyoruz?",
    body: "Resepsiyondan housekeeping'e, satın almadan dijital vitrine kadar otel operasyonunun gerçek dinamiklerini bilen ekip ile çalışırsınız. Çözümlerimiz sahada test edilmiş iş akışlarına dayanır.",
  },
  {
    id: "teknoloji",
    eyebrow: "Teknoloji",
    title: "Teknoloji Geliştirme Yaklaşımımız",
    body: "Hotelio'yu hazır bir paket olarak değil, otel operasyonları için sıfırdan geliştirdiğimiz bir platform olarak konumlandırıyoruz. Modüler yapı, entegrasyon odaklı mimari ve sürekli iyileştirme prensibiyle ilerliyoruz.",
  },
  {
    id: "tedarik",
    eyebrow: "Tedarik",
    title: "Tedarik Ağımız",
    body: "Tekstil, temizlik, SPA sarf, kapı sistemleri ve ekipman ihtiyaçlarınız için tedarikçi ağımızdan fiyat toplar, size özel teklif sunarız. Katalog satışı değil — talep bazlı profesyonel satın alma modeli.",
  },
  {
    id: "uctan-uca",
    eyebrow: "Hizmet Modeli",
    title: "Uçtan Uca Hizmet Modelimiz",
    body: "Keşif, teklif, kurulum, devreye alma ve operasyonel destek süreçlerini tek çatı altında yönetiriz. Yazılım, donanım ve tedarik aynı proje dilinde ilerler.",
  },
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımızda", href: null },
  ];

  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+2rem)] pb-20 bg-premium-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.04]" style={{ backgroundSize: "56px 56px" }} />
        <Container className="relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-8 [&_span]:text-white [&_a]:text-white/75" />
          <AnimatedText>
            <h1 className="heading-on-dark text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl leading-tight">
              Oteller İçin Ürün Değil,
              <br />
              <span className="text-gradient-gold">Çözüm Üretiyoruz.</span>
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.15}>
            <p className="text-body-on-dark text-lg max-w-2xl mt-6 leading-relaxed">
              Premium otel teknolojisi geliştiren ve uçtan uca operasyonel çözümler sunan bir ekip.
            </p>
          </AnimatedText>
        </Container>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index % 2 === 0 ? "section-padding bg-white" : "section-padding bg-off-white"}
        >
          <Container>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedText className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-blue-deep text-xs font-bold tracking-[0.2em] uppercase">{section.eyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mt-3 mb-5 leading-tight">{section.title}</h2>
                <p className="text-body-on-light text-base md:text-lg leading-relaxed">{section.body}</p>
              </AnimatedText>
              <div className={cn("relative aspect-[4/3] rounded-2xl overflow-hidden bg-ice ring-1 ring-navy/8", index % 2 === 1 ? "lg:order-1" : "")}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-gold/10" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <p className="text-5xl md:text-6xl font-extrabold text-navy/10">{String(index + 1).padStart(2, "0")}</p>
                    <p className="text-sm font-semibold text-navy mt-2">{section.eyebrow}</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="section-padding bg-navy">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-gold-light text-xs font-bold tracking-[0.3em] uppercase">HOTELIO</span>
              <h2 className="heading-on-dark text-3xl md:text-4xl font-bold mt-3 mb-4">Kendi Geliştirdiğimiz Platform</h2>
              <p className="text-body-on-dark leading-relaxed mb-6">
                Hotelio; rezervasyon, misafir yönetimi, finans, raporlama ve departman operasyonlarını
                tek merkezde birleştiren otel odaklı yönetim sistemidir.
              </p>
              <Button href="/hotelio" variant="gold" size="lg">Hotelio&apos;yu Keşfet</Button>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-muted-on-dark text-sm leading-relaxed">{siteConfig.company.parent}</p>
              <p className="text-body-on-dark mt-4 text-sm">
                Teknoloji altyapımız ASK Bilişim güvencesiyle desteklenmektedir.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-4">Birlikte Çalışalım</h2>
          <p className="text-body-on-light mb-8">Teknoloji, tedarik veya dijital dönüşüm için ekibimizle görüşün.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/teklif-al" variant="primary" size="lg">Teklif Al</Button>
            <Button href="/tedarik" variant="outline" size="lg">Tedarik Talebi</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
