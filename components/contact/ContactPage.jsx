"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContactForm from "@/components/forms/ContactForm";
import AnimatedText from "@/components/ui/AnimatedText";
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
      <section className="pt-[calc(var(--header-height)+2rem)] pb-12 bg-off-white">
        <Container>
          <Breadcrumb items={breadcrumbs} className="mb-8" />
          <AnimatedText>
            <h1 className="font-display text-3xl md:text-5xl text-navy mb-4">İletişim</h1>
            <p className="text-gray-light text-lg max-w-2xl">
              Oteliniz için doğru çözümü birlikte belirleyelim. Size en uygun kanaldan bize ulaşın.
            </p>
          </AnimatedText>
        </Container>
      </section>

      <section className="pb-16 bg-off-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactOptions.map((option, index) => (
              <AnimatedText key={option.title} delay={index * 0.08}>
                <div className="p-6 bg-white border border-navy/8 rounded-sm h-full flex flex-col">
                  <h2 className="font-display text-xl text-navy mb-2">{option.title}</h2>
                  <p className="text-sm text-gray-light mb-6 flex-1">{option.description}</p>
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
                <h2 className="font-display text-2xl text-navy mb-6">İletişim Bilgileri</h2>
              </AnimatedText>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue">Telefon</span>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="block text-lg text-navy mt-1 hover:text-blue transition-colors"
                  >
                    {formatPhone(siteConfig.contact.phone)}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue">E-posta</span>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block text-lg text-navy mt-1 hover:text-blue transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue">Konum</span>
                  <p className="text-lg text-navy mt-1">{siteConfig.contact.address}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue">Web</span>
                  <Link
                    href="/"
                    className="block text-lg text-navy mt-1 hover:text-blue transition-colors"
                  >
                    {siteConfig.domain}
                  </Link>
                </div>
              </div>
            </div>

            <div id="iletisim-formu" className="lg:col-span-3">
              <AnimatedText>
                <div className="p-6 md:p-8 bg-white border border-navy/8 rounded-sm">
                  <h2 className="font-display text-2xl text-navy mb-2">Bize Yazın</h2>
                  <p className="text-gray-light text-sm mb-8">
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
