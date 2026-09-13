import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  footerSolutions,
  footerTedarik,
  footerCorporate,
  footerLegal,
  ctaLinks,
} from "@/config/navigation";
import { formatPhone } from "@/utils/format";

export default function Footer() {
  return (
    <footer className="relative section-dark-a text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,108,244,0.12),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <Container className="relative pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-white/8">
          <div className="lg:col-span-2">
            <Logo variant="light" className="mb-5" />
            <p className="text-body-on-dark text-sm leading-relaxed max-w-sm mb-6">
              Premium otel teknolojisi ve uçtan uca çözüm ortağınız. Hotelio yazılımı,
              dijital hizmetler ve profesyonel tedarik ağı tek çatı altında.
            </p>
            <Button href={ctaLinks.hotelioDemo} variant="gold" size="sm">
              Hotelio Demo
            </Button>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-gold/90 mb-5">Hotelio</h3>
            <ul className="space-y-2.5">
              <li><Link href="/hotelio" className="text-sm text-body-on-dark hover:text-white transition-colors">Platform</Link></li>
              <li><Link href="/hotelio/moduller" className="text-sm text-body-on-dark hover:text-white transition-colors">Modüller</Link></li>
              <li><Link href="/hotelio-demo" className="text-sm text-body-on-dark hover:text-white transition-colors">Demo Talep</Link></li>
            </ul>
          </div>

          {[
            { title: "Çözümler", items: footerSolutions },
            { title: "Tedarik", items: footerTedarik },
            { title: "Kurumsal", items: footerCorporate },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold tracking-wider uppercase text-gold/90 mb-5">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-body-on-dark hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-gold/90 mb-5">İletişim</h3>
            <ul className="space-y-2.5 text-sm text-body-on-dark">
              <li>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="hover:text-white transition-colors">
                  {formatPhone(siteConfig.contact.phone)}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>{siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-white/40">
            <p>© {new Date().getFullYear()} Hotel Çözümleri</p>
            <p className="mt-1">{siteConfig.company.parent}</p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
