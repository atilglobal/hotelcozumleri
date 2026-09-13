"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContactForm from "@/components/forms/ContactForm";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionBackdrop from "@/components/ui/SectionBackdrop";
import { siteConfig } from "@/config/site";
import { formatPhone } from "@/utils/format";

const contactOptions = [
  {
    title: "Satış Ekibiyle Görüş",
    description: "Oteliniz için çözüm danışmanlığı alın.",
    href: "/iletisim#iletisim-formu",
    label: "Form Doldur",
    variant: "primary",
  },
  {
    title: "Teklif İste",
    description: "Adım adım teklif formu ile talebinizi iletin.",
    href: "/teklif-al",
    label: "Teklif Al",
    variant: "gold",
  },
  {
    title: "Hotelio Demo Talep Et",
    description: "Otel yönetim sistemini canlı deneyimleyin.",
    href: "/hotelio-demo",
    label: "Demo Talep Et",
    variant: "outline",
  },
  {
    title: "WhatsApp",
    description: "Hızlı iletişim için WhatsApp hattımız.",
    href: siteConfig.social.whatsapp,
    label: "WhatsApp'tan Yaz",
    variant: "outline",
    external: true,
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "İletişim", href: null },
  ];

  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+2rem)] pb-12 section-dark-a overflow-hidden">
        <SectionBackdrop variant="a" />
        <Container className="relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-8 [&_span]:text-white/90 [&_a]:text-white/60" />
          <AnimatedText>
            <h1 className="font-display text-3xl md:text-5xl heading-on-dark mb-4">İletişim</h1>
            <p className="text-body-on-dark text-lg max-w-2xl">
              Oteliniz için doğru çözümü birlikte belirleyelim. Size en uygun kanaldan bize ulaşın.
            </p>
          </AnimatedText>
        </Container>
      </section>

      <section className="pb-16 section-dark-b relative overflow-hidden">
        <SectionBackdrop variant="b" />
        <Container className="relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactOptions.map((option, index) => (
              <AnimatedText key={option.title} delay={index * 0.08}>
                <div className="p-6 glass-card-dark rounded-2xl h-full flex flex-col">
                  <h2 className="font-display text-xl heading-on-dark mb-2">{option.title}</h2>
                  <p className="text-sm text-body-on-dark mb-6 flex-1">{option.description}</p>
                  <Button
                    href={option.href}
                    variant={option.variant}
                    size="sm"
                    external={option.external}
                  >
                    {option.label}
                  </Button>
                </div>
              </AnimatedText>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              <AnimatedText>
                <h2 className="font-display text-2xl heading-on-dark mb-6">İletişim Bilgileri</h2>
              </AnimatedText>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">Telefon</span>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="block text-lg heading-on-dark mt-1 hover:text-gold-light transition-colors"
                  >
                    {formatPhone(siteConfig.contact.phone)}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">E-posta</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block text-lg heading-on-dark mt-1 hover:text-gold-light transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">Konum</span>
                  <p className="text-lg text-body-on-dark mt-1">{siteConfig.contact.address}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">Web</span>
                  <Link
                    href="/"
                    className="block text-lg heading-on-dark mt-1 hover:text-gold-light transition-colors"
                  >
                    {siteConfig.domain}
                  </Link>
                </div>
              </div>
            </div>

            <div id="iletisim-formu" className="lg:col-span-3">
              <AnimatedText>
                <div className="p-6 md:p-8 glass-card-dark rounded-2xl">
                  <h2 className="font-display text-2xl heading-on-dark mb-2">Bize Yazın</h2>
                  <p className="text-body-on-dark text-sm mb-8">
                    Formu doldurun, en kısa sürede size dönüş yapalım.
                  </p>
                  <ContactForm formType="contact" />
                </div>
              </AnimatedText>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
