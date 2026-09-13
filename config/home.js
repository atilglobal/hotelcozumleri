import { siteImages } from "./images.js";

export const heroData = {
  titleLine1: "OTELİNİZ İÇİN",
  titleLine2Prefix: "TEK TEKNOLOJİ VE",
  titleLine2Accent: "ÇÖZÜM PARTNERİ.",
  subtitle:
    "Kendi geliştirdiğimiz Hotelio platformu, dijital çözümler ve otel tedarik ağımızla uçtan uca hizmet sunuyoruz.",
  primaryCta: { label: "Çözümleri Keşfet", href: "/cozumler" },
  secondaryCta: { label: "Hotelio'yu İncele", href: "/hotelio" },
  trustTags: ["Teknoloji", "Yazılım", "Tedarik", "Operasyon", "Spa", "Dijital"],
  backgroundImage:
    "https://images.unsplash.com/photo-1542314831-068ccd1c72ab?w=1920&q=85&fit=crop",
};

export const solutionsOverview = {
  title: "Bir Otelin İhtiyaç Duyduğu Her Şey.",
  titleAccent: "Tek Noktada.",
  description:
    "Hotel Çözümleri, otel işletmelerinin teknoloji, operasyon, dijital, güvenlik, tekstil, hijyen ve wellness ihtiyaçlarını tek bir çözüm ağı altında toplar.",
  groups: [
    {
      id: "hotelio",
      name: "HOTELIO",
      description: "Otel yönetim zekâsı ve operasyon merkezi",
      href: "/hotelio",
      accent: "gold",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      id: "web",
      name: "Web Sitesi",
      description: "Dönüşüm odaklı otel web deneyimi",
      href: "/cozumler/otel-web-sitesi",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      id: "social",
      name: "Sosyal Medya",
      description: "Marka görünürlüğü ve misafir etkileşimi",
      href: "/cozumler/sosyal-medya",
      image:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
    },
    {
      id: "access",
      name: "Kapı Sistemleri",
      description: "Kartlı geçiş ve güvenlik altyapısı",
      href: "/cozumler/kapi-sistemleri",
      image:
        "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    },
    {
      id: "textile",
      name: "Otel Tekstili",
      description: "Konfor ve prestij odaklı tekstil çözümleri",
      href: "/cozumler/otel-tekstili",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    },
    {
      id: "supplies",
      name: "Sarf ve Temizlik",
      description: "Operasyonel süreklilik için tedarik",
      href: "/cozumler/sarf-temizlik",
      image:
        "https://images.unsplash.com/photo-1585421514284-efb74c2b69bb?w=800&q=80",
    },
    {
      id: "spa",
      name: "SPA Kurulumu",
      description: "Wellness alanı tasarım ve kurulum",
      href: "/cozumler/spa-kurulumu",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbbe30?w=800&q=80",
    },
    {
      id: "decor",
      name: "Yapay Çiçek & Dekorasyon",
      description: "Lobi, bar ve ortak alan dekorasyonu",
      href: "/cozumler/yapay-cicek-dekorasyon",
      image: siteImages.solutions.decor,
    },
  ],
};

export const hotelioShowcase = {
  eyebrow: "HOTELIO",
  title: "OTELİNİZİN YENİ YÖNETİM ZEKÂSI",
  description:
    "Otel operasyonlarını tek merkezden yönetmek, analiz etmek ve daha doğru kararlar almak için geliştirilen otel odaklı yönetim sistemi.",
  features: [
    "Rezervasyon yönetimi",
    "Misafir yönetimi",
    "Finansal takip",
    "Doluluk ve gelir analizi",
    "Yapay zekâ önerileri",
    "Departman yönetimi",
    "Raporlama",
    "SPA ve operasyon yönetimi",
  ],
  primaryCta: { label: "Hotelio'yu Keşfet", href: "/hotelio" },
  secondaryCta: { label: "Demo Talep Et", href: "/hotelio-demo" },
};

export const servicesShowcase = {
  title: "Operasyonun Her Katmanına Uzanan Hizmetler",
  subtitle:
    "Teknolojiden fiziksel tedarike, dijital vitrinden wellness alanına — otelinizin ihtiyaç haritasını birlikte çiziyoruz.",
  services: [
    {
      id: "web",
      title: "Otel Web Sitesi",
      description:
        "Rezervasyon odaklı, hızlı ve SEO uyumlu web deneyimleri. Markanızı dijitalde prestijle temsil edin.",
      href: "/cozumler/otel-web-sitesi",
      ctaLabel: "Detayları İncele",
      image: siteImages.solutions.web,
      size: "large",
    },
    {
      id: "social",
      title: "Sosyal Medya Yönetimi",
      description:
        "Marka dili, içerik stratejisi ve misafir etkileşimi ile otelinizin dijital görünürlüğünü güçlendirin.",
      href: "/cozumler/sosyal-medya",
      ctaLabel: "Detayları İncele",
      image: siteImages.solutions.social,
      size: "medium",
    },
    {
      id: "access",
      title: "Kapı ve Mifare Sistemleri",
      description:
        "Güvenli geçiş, oda erişimi ve operasyonel kontrol için kurumsal kapı sistemi çözümleri.",
      href: "/cozumler/kapi-sistemleri",
      ctaLabel: "Teklif İste",
      image: siteImages.solutions.doors,
      size: "medium",
    },
    {
      id: "textile",
      title: "Otel Tekstili / Tedarik",
      description:
        "Nevresim, havlu, bornoz ve tekstil tedarikinde kalite, dayanıklılık ve marka uyumu.",
      href: "/tedarik",
      ctaLabel: "Talep Oluştur",
      image: siteImages.solutions.textile,
      size: "large",
    },
    {
      id: "supplies",
      title: "Sarf ve Temizlik Tedariki",
      description:
        "Housekeeping ve günlük operasyon için sürdürülebilir, maliyet-etkin tedarik çözümleri.",
      href: "/tedarik",
      ctaLabel: "Talep Oluştur",
      image: siteImages.solutions.cleaning,
      size: "medium",
    },
    {
      id: "spa",
      title: "SPA Kurulum ve Danışmanlık",
      description:
        "Wellness alanı planlaması, ekipman seçimi ve devreye alma sürecinde uçtan uca destek.",
      href: "/cozumler/spa-kurulumu",
      ctaLabel: "Teklif İste",
      image: siteImages.solutions.spa,
      size: "large",
    },
    {
      id: "decor",
      title: "Yapay Çiçek & Dekorasyon",
      description:
        "Lobi, restoran, bar ve ortak alanlara özel yapay bitki ve dekoratif çiçek uygulamaları.",
      href: "/cozumler/yapay-cicek-dekorasyon",
      ctaLabel: "Detayları İncele",
      image: siteImages.solutions.decor,
      size: "medium",
    },
  ],
};

export const hotelAreas = {
  title: "Otelinizin Her Noktasında",
  subtitle:
    "Resepsiyondan SPA'ya, yönetim katından dijital vitrine — her alan için düşünülmüş çözümler.",
  areas: [
    {
      id: "reception",
      name: "Resepsiyon",
      solutions: ["Hotelio", "Kartlı Kapı Sistemi"],
    },
    {
      id: "rooms",
      name: "Odalar",
      solutions: ["Tekstil", "Sarf Ürünleri"],
    },
    {
      id: "housekeeping",
      name: "Housekeeping",
      solutions: ["Sarf Malzemeleri", "Temizlik Ürünleri"],
    },
    {
      id: "restaurant",
      name: "Restoran",
      solutions: ["Operasyon Yönetimi", "Tedarik"],
    },
    {
      id: "spa",
      name: "SPA",
      solutions: ["SPA Kurulumu", "Yapay Çiçek & Dekorasyon", "Hotelio SPA Yönetimi"],
    },
    {
      id: "lobby",
      name: "Lobi & Ortak Alan",
      solutions: ["Yapay Çiçek & Dekorasyon", "Dikey Bahçe"],
    },
    {
      id: "management",
      name: "Yönetim",
      solutions: ["Hotelio", "Raporlama"],
    },
    {
      id: "digital",
      name: "Dijital",
      solutions: ["Web Sitesi", "Sosyal Medya"],
    },
    {
      id: "procurement",
      name: "Satın Alma",
      solutions: ["Tedarik Talebi", "Teklif Yönetimi"],
    },
    {
      id: "security",
      name: "Güvenlik",
      solutions: ["Kapı Sistemleri", "Erişim Kontrolü"],
    },
  ],
};

export const whyUs = {
  title: "Neden Hotel Çözümleri?",
  subtitle:
    "Otel sektörünü bilen, teknoloji ve tedariki aynı masada sunan tek muhatap yaklaşımı.",
  items: [
    {
      title: "Tek Muhatap",
      description:
        "Yazılımdan tekstile, dijitalden operasyona — tüm ihtiyaçlarınız için tek iletişim noktası.",
    },
    {
      title: "Sektöre Özel Uzmanlık",
      description:
        "Otel işletmeciliğinin dinamiklerini bilen ekip ve sektöre özel çözüm yaklaşımı.",
    },
    {
      title: "Teknoloji + Tedarik",
      description:
        "Hotelio yazılım altyapısı ile fiziksel ürün ve hizmetleri entegre sunuyoruz.",
    },
    {
      title: "Kurulumdan Desteğe",
      description:
        "Proje başlangıcından devreye almaya, operasyonel desteğe kadar yanınızdayız.",
    },
    {
      title: "Ölçeklenebilir Çözümler",
      description:
        "Butik otelden zincir yapılara kadar büyüyen ihtiyaçlara uyum sağlayan altyapı.",
    },
    {
      title: "Profesyonel Destek",
      description:
        "Teknik ve operasyonel konularda hızlı, çözüm odaklı profesyonel destek.",
    },
    {
      title: "Otel Odaklı Yazılım",
      description:
        "Hotelio; rezervasyon, finans, raporlama ve departman yönetimini tek merkezde toplar.",
    },
  ],
};

export const projects = {
  enabled: false,
  title: "Referans Projelerimiz",
  subtitle: "Otel projelerinde uyguladığımız çözümler.",
  items: [],
};

export const finalCta = {
  title: "Oteliniz İçin Doğru Çözümü Birlikte Belirleyelim.",
  description:
    "Teknolojiden tedarike, dijital çözümlerden operasyonel ihtiyaçlara kadar oteliniz için doğru modeli birlikte oluşturalım.",
  primaryCta: { label: "Teklif Al", href: "/teklif-al" },
  secondaryCta: { label: "Hotelio Demo Talep Et", href: "/hotelio-demo" },
};
