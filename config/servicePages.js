import {
  webImages,
  socialImages,
  doorImages,
  textileImages,
  cleaningImages,
  spaImages,
} from "./serviceImages.js";

export const webPage = {
  highlights: ["Özel tasarım", "Mobil uyum", "Rezervasyon altyapısı", "Hotelio entegrasyonu"],
  process: [
    { step: "01", title: "Keşif & Brief", description: "Marka, hedef kitle ve teknik ihtiyaç analizi" },
    { step: "02", title: "Tasarım", description: "Wireframe ve görsel arayüz onayı" },
    { step: "03", title: "Geliştirme", description: "Rezervasyon, dil ve ödeme altyapısı" },
    { step: "04", title: "Entegrasyon", description: "Hotelio ve üçüncü parti bağlantılar" },
    { step: "05", title: "Test & SEO", description: "Performans, mobil ve arama optimizasyonu" },
    { step: "06", title: "Yayın", description: "Canlıya alma ve eğitim" },
  ],
  visitorFlow: ["Ziyaretçi", "Otel Web Sitesi", "Doğrudan Rezervasyon", "CRM / HOTELIO"],
  beforeAfter: {
    before: {
      image: "/images/services/web/web-before.jpg",
      caption: "Eski tip otel web sitesi — küçük görseller, eski navigasyon — konsept görsel",
    },
    after: {
      image: "/images/services/web/web-after.jpg",
      caption: "Aynı Grand Otel konseptinin modern tasarımı — rezervasyon widget — konsept görsel",
    },
  },
  features: webImages.features,
  hero: webImages.hero,
};

export const socialPage = {
  highlights: ["Marka analizi", "İçerik stratejisi", "Tasarım & üretim", "Raporlama"],
  contentFlow: [
    { label: "Content Strategy", description: "Marka dili ve içerik planı" },
    { label: "Design", description: "Görsel kimlik ve şablonlar" },
    { label: "Reels", description: "Video içerik üretimi" },
    { label: "Ads", description: "Reklam kampanyaları" },
    { label: "Reporting", description: "Performans değerlendirmesi" },
  ],
  calendar: [
    { day: "Pazartesi", ...socialImages.calendar.monday, color: "from-blue/30 to-navy" },
    { day: "Çarşamba", ...socialImages.calendar.wednesday, color: "from-gold/25 to-navy" },
    { day: "Cuma", ...socialImages.calendar.friday, color: "from-emerald-500/20 to-navy" },
    { day: "Pazar", ...socialImages.calendar.sunday, color: "from-ice/30 to-blue/20" },
  ],
  process: [
    { step: "01", title: "Marka Analizi", description: "Konum, hedef kitle ve rakip incelemesi" },
    { step: "02", title: "İçerik Stratejisi", description: "Aylık plan ve kanal stratejisi" },
    { step: "03", title: "Tasarım & Üretim", description: "Post, story ve reels üretimi" },
    { step: "04", title: "Yayınlama", description: "Takvim bazlı planlı paylaşım" },
    { step: "05", title: "Reklam & Optimizasyon", description: "Hedef kitle ve bütçe yönetimi" },
    { step: "06", title: "Raporlama", description: "Aylık performans özeti" },
  ],
  mockups: socialImages.posts,
  hero: socialImages.hero,
};

export const doorPage = {
  highlights: ["Yangın güvenliği", "Mifare erişim", "Oda konforu", "Hotelio uyumu"],
  integrationFlow: Object.values(doorImages.flow),
  integrationNote:
    "Mifare kart sistemlerinin Hotelio ile entegrasyon potansiyeli, resepsiyondan oda erişimine kesintisiz operasyon akışı sağlar.",
  products: [
    { title: "Yangın Kapıları", ...doorImages.products.fireDoor, description: "Yönetmeliklere uygun yangın güvenliği" },
    { title: "Elektronik Oda Kilitleri", ...doorImages.products.electronicLock, description: "Kartlı ve şifreli erişim seçenekleri" },
    { title: "Mifare Kartlar", ...doorImages.products.mifareCard, description: "Misafir ve personel kart sistemleri" },
    { title: "Erişim Kontrol", ...doorImages.products.accessControl, description: "Ortak alan ve kat bazlı yetkilendirme" },
    { title: "Otel Oda Kapıları", ...doorImages.products.roomDoor, description: "Premium kapı ve kasa çözümleri" },
    { title: "Entegrasyon Çözümleri", ...doorImages.products.integration, description: "Hotelio ile uyumlu altyapı planlaması" },
  ],
  hero: doorImages.hero,
};

export const textilePage = {
  highlights: ["Premium kumaş", "Logo nakış", "Toplu tedarik", "Marka uyumu"],
  products: [
    { title: "Havlu", ...textileImages.products.towel },
    { title: "Bornoz", ...textileImages.products.robe },
    { title: "Nevresim", ...textileImages.products.bedding },
    { title: "Terlik", ...textileImages.products.slippers },
  ],
  logoFlow: [
    { ...textileImages.logoFlow.plain },
    { ...textileImages.logoFlow.process },
    { ...textileImages.logoFlow.branded },
  ],
  embroidery: textileImages.embroidery,
  beforeAfter: textileImages.beforeAfter,
  process: [
    { step: "01", title: "İhtiyaç", description: "Ürün ve miktar belirleme" },
    { step: "02", title: "Ölçü / Gramaj", description: "Kumaş ve teknik özellik seçimi" },
    { step: "03", title: "Logo / Kişiselleştirme", description: "Nakış ve renk onayı" },
    { step: "04", title: "Tedarik", description: "Üretim ve kalite kontrol" },
    { step: "05", title: "Teklif", description: "Size özel fiyatlandırma" },
    { step: "06", title: "Teslim", description: "Toplu teslimat planlaması" },
  ],
  hero: textileImages.hero,
};

export const cleaningPage = {
  highlights: ["Alan bazlı plan", "Endüstriyel kimyasal", "Oda hijyeni", "Toplu tedarik"],
  supplyMessage:
    "İhtiyacınızı ve miktarı iletin, uygun tedarik alternatiflerini değerlendirelim ve size özel teklif hazırlayalım.",
  areas: {
    odalar: { label: "Odalar", products: ["Oda içi hijyen ürünleri", "Sabun & şampuan", "Sarf malzemeleri"], ...cleaningImages.areas.odalar },
    spa: { label: "SPA & Havuz", products: ["Havuz bakım ürünleri", "Havuz kloru", "Wellness hijyen ürünleri"], ...cleaningImages.areas.spa },
    mutfak: { label: "Mutfak", products: ["Mutfak kimyasalları", "Endüstriyel temizlik", "Yüzey temizliği"], ...cleaningImages.areas.mutfak },
    camasirhane: { label: "Çamaşırhane", products: ["Çamaşırhane kimyasalları", "Leke çıkarıcılar", "Endüstriyel deterjanlar"], ...cleaningImages.areas.camasirhane },
    ortak: { label: "Ortak Alanlar", products: ["Zemin temizliği", "Cam temizliği", "Dezenfektanlar"], ...cleaningImages.areas.ortak },
  },
  hero: cleaningImages.hero,
};

export const spaPage = {
  highlights: ["Keşif & planlama", "Mimari konsept", "Premium ekipman", "Anahtar teslim"],
  process: [
    { step: "01", title: "Keşif", description: "Alan analizi ve ihtiyaç belirleme" },
    { step: "02", title: "Mimari Planlama", description: "Teknik ve mekânsal planlama" },
    { step: "03", title: "Konsept", description: "Wellness konsept ve malzeme seçimi" },
    { step: "04", title: "Teknik Altyapı", description: "Tesisat ve altyapı hazırlığı" },
    { step: "05", title: "Ekipman", description: "Sauna, buhar ve masaj ekipmanları" },
    { step: "06", title: "Montaj", description: "Profesyonel kurulum" },
    { step: "07", title: "Teslim", description: "Devreye alma ve eğitim" },
  ],
  solutionAreas: [
    { title: "Sauna", ...spaImages.areas.sauna, description: "Finlandiya tipi ve infrared sauna çözümleri" },
    { title: "Buhar Odası", ...spaImages.areas.steam, description: "Hamam ve buhar odası sistemleri" },
    { title: "Masaj Odası", ...spaImages.areas.massage, description: "Terapi odası tasarım ve ekipman" },
    { title: "Duş Sistemleri", ...spaImages.areas.shower, description: "Experience shower ve duş alanları" },
    { title: "Dinlenme Alanları", ...spaImages.areas.relax, description: "Sakinlik ve dinlenme zonları" },
    { title: "Wellness", ...spaImages.areas.wellness, description: "Bütüncül wellness deneyimi" },
  ],
  gallery: spaImages.gallery.map((g) => ({ src: g.image, title: g.title, alt: g.alt })),
  benefits: [
    { title: "Misafir deneyimi", description: "Premium wellness ile fark yaratan konaklama." },
    { title: "Gelir artışı", description: "SPA hizmetleri ek gelir kanalı oluşturur." },
    { title: "Marka değeri", description: "Lüks segmentte rekabet avantajı sağlar." },
    { title: "Anahtar teslim", description: "Keşiften teslime tek muhatap proje yönetimi." },
  ],
  hero: spaImages.hero,
  crossSell: spaImages.crossSell,
};
