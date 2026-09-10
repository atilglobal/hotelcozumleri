"use client";

import Container from "@/components/ui/Container";
import AnimatedText from "@/components/ui/AnimatedText";
import PreviewMockup from "./mockups/PreviewMockups";

function FeatureBlock({ title, subtitle, type, reverse = false, children }) {
  return (
    <section className="section-padding bg-white even:bg-off-white">
      <Container>
        <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""}`}>
          <AnimatedText>
            <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-4">{title}</h2>
            {subtitle && <p className="text-gray-light leading-relaxed mb-4">{subtitle}</p>}
            {children}
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <PreviewMockup type={type} />
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}

export function HotelioExecutiveSection() {
  return (
    <FeatureBlock
      title="Otelinizde Ne Olduğunu Tek Bakışta Görün."
      subtitle="Günlük ciro, doluluk, ADR, RevPAR, gelir trendi ve hedef/gerçekleşen analizleri. Otel sahibi, genel müdür ve finans yöneticisi için Executive Vision."
      type="dashboard"
    >
      <ul className="space-y-2 text-sm text-navy/80">
        <li>• Günlük ciro ve doluluk takibi</li>
        <li>• ADR / RevPAR metrikleri</li>
        <li>• Hedef / gerçekleşen analizi</li>
        <li>• Departman görünümü</li>
      </ul>
    </FeatureBlock>
  );
}

export function HotelioReservationSection() {
  return (
    <FeatureBlock
      title="Rezervasyon Operasyonunu Takvimden Yönetin."
      subtitle="Oda bloklama, sürükle-bırak oda değişimi, kanal yönetimi, acente yönetimi, waitlist ve stop-sale süreçlerini merkezi takvim üzerinden kontrol edin."
      type="reservation"
      reverse
    />
  );
}

export function HotelioFrontOfficeSection() {
  return (
    <FeatureBlock
      title="Resepsiyondaki Her İşlem. Daha Kontrollü."
      subtitle="Check-in/out, folyo, tahsilat, fatura, KBS süreçleri ve VIP tercihleri — resepsiyon operasyonunuz tek akışta."
      type="frontoffice"
    />
  );
}

export function HotelioGuestSection() {
  return (
    <FeatureBlock
      title="Misafiriniz Geri Geldiğinde Onu Yeniden Tanımayın. Hatırlayın."
      subtitle="Misafir tercih kartları, VIP yönetimi ve geçmiş konaklama bilgileri resepsiyon ekranında değerlendirilebilir."
      type="crm"
      reverse
    />
  );
}

export function HotelioHousekeepingSection() {
  return (
    <FeatureBlock
      title="Kat Operasyonu Anlık Görünür Olsun."
      subtitle="Oda durumları, otomatik görev dağıtımı ve canlı kat görünümü ile housekeeping verimliliğini artırın."
      type="housekeeping"
    />
  );
}

export function HotelioReportsSection() {
  return (
    <FeatureBlock
      title="Rakamları Toplamayın. Karar Verin."
      subtitle="Yönetici raporları, trend analizleri, doluluk, ciro, ADR, RevPAR ve PDF raporlama — premium business intelligence deneyimi."
      type="finance"
      reverse
    />
  );
}

export function HotelioSpaCrossSection() {
  return (
    <section className="section-padding bg-navy">
      <Container>
        <AnimatedText>
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-4">
            SPA&apos;nızı Kurmakla Kalmayın. Operasyonunu da Yönetin.
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-12">
            Hotel Çözümleri SPA kurulum hizmeti ile Hotelio SPA yönetimini birlikte değerlendirin.
          </p>
        </AnimatedText>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatedText delay={0.1}>
            <div className="p-6 border border-white/10 rounded-sm bg-white/[0.03]">
              <span className="text-blue-bright text-xs font-semibold tracking-wider uppercase">Hotel Çözümleri</span>
              <h3 className="font-display text-xl text-white mt-2 mb-2">SPA Kurulumu</h3>
              <p className="text-white/60 text-sm">Anahtar teslim wellness alanı tasarım ve kurulum.</p>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <div className="p-6 border border-gold/20 rounded-sm bg-gold/5">
              <span className="text-gold text-xs font-bold tracking-wider uppercase">HOTELIO</span>
              <h3 className="font-display text-xl text-white mt-2 mb-4">SPA Yönetimi</h3>
              <PreviewMockup type="spa" />
            </div>
          </AnimatedText>
        </div>
      </Container>
    </section>
  );
}
