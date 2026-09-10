export const serviceSlugs = [
  "otel-web-sitesi",
  "sosyal-medya",
  "kapi-sistemleri",
  "otel-tekstili",
  "sarf-temizlik",
  "spa-kurulumu",
];

export const megaMenuSolutions = {
  title: "Oteliniz İçin Uçtan Uca Çözümler",
  description:
    "Teknolojiden tedariğe, işletmenizin ihtiyaç duyduğu profesyonel çözümleri tek noktadan yönetin.",
  items: [
    {
      slug: "otel-web-sitesi",
      label: "Otel Web Sitesi",
      description: "Rezervasyon odaklı dijital deneyim",
      href: "/cozumler/otel-web-sitesi",
    },
    {
      slug: "sosyal-medya",
      label: "Sosyal Medya Yönetimi",
      description: "Otelinizi doğru kitleyle buluşturun",
      href: "/cozumler/sosyal-medya",
    },
    {
      slug: "kapi-sistemleri",
      label: "Kapı Sistemleri",
      description: "Yangın kapıları ve Mifare erişim çözümleri",
      href: "/cozumler/kapi-sistemleri",
    },
    {
      slug: "otel-tekstili",
      label: "Otel Tekstili",
      description: "Otelinize özel tekstil ve logo uygulamaları",
      href: "/cozumler/otel-tekstili",
    },
    {
      slug: "sarf-temizlik",
      label: "Sarf & Temizlik",
      description: "Profesyonel hijyen ve işletme ürünleri",
      href: "/cozumler/sarf-temizlik",
    },
    {
      slug: "spa-kurulumu",
      label: "SPA Kurulumu",
      description: "Anahtar teslim wellness çözümleri",
      href: "/cozumler/spa-kurulumu",
    },
  ],
  hotelio: {
    label: "HOTELIO",
    description: "Otelinizin yeni yönetim zekâsı",
    href: "/hotelio",
    cta: "Hotelio'yu Keşfet",
  },
};

export const cozumlerHub = {
  eyebrow: "HOTEL ÇÖZÜMLERİ",
  title: "Bir Otelin İhtiyaç Duyduğu",
  titleAccent: "Her Şey Tek Çatı Altında.",
  description:
    "Dijital altyapıdan güvenliğe, tekstilden hijyene, SPA'dan otel yönetim teknolojilerine kadar işletmenizin ihtiyaç duyduğu çözümleri tek noktadan sunuyoruz.",
  primaryCta: { label: "Çözümünüzü Bulun", href: "#cozumler-listesi" },
  secondaryCta: { label: "Teklif Al", href: "/teklif-al" },
};

export const services = {
  "otel-web-sitesi": {
    slug: "otel-web-sitesi",
    theme: "digital",
    accent: "blue",
    seo: {
      title: "Otel Web Sitesi Çözümleri",
      description:
        "Rezervasyon odaklı, mobil uyumlu ve SEO altyapılı otel web siteleri. Hotelio entegrasyonu ve yönetilebilir içerik sistemi ile markanızı dijitalde güçlendirin.",
    },
    hero: {
      eyebrow: "Otel Web Sitesi",
      title: "Misafiriniz Otelinizi",
      titleAccent: "Önce İnternette Deneyimler.",
      description:
        "Markanıza özel, hızlı, mobil uyumlu ve rezervasyon odaklı otel web siteleri geliştiriyoruz.",
      image: "/images/services/web/hero.svg",
    },
    intro: {
      text: "Otel web siteniz sadece bir vitrin değil; rezervasyon, marka algısı ve misafir güveninin dijital merkezidir. Hotel Çözümleri olarak sonuç odaklı, performanslı ve yönetilebilir web deneyimleri tasarlıyoruz.",
    },
    features: [
      "Otel sektörüne özel tasarım",
      "Mobil uyum",
      "Yüksek performans",
      "Online rezervasyon",
      "Çoklu dil desteği",
      "Online ödeme altyapısı",
      "SEO altyapısı",
      "Hotelio entegrasyonu",
      "Özel yazılım seçenekleri",
      "Yönetilebilir içerik sistemi",
    ],
    benefits: [
      { title: "Daha profesyonel görünüm", description: "Markanızı dijitalde prestijle temsil edin." },
      { title: "Daha kolay rezervasyon", description: "Misafirleriniz birkaç adımda rezervasyon yapabilsin." },
      { title: "Daha güçlü marka algısı", description: "Tutarlı tasarım dili ile güven oluşturun." },
      { title: "Daha iyi mobil deneyim", description: "Tüm cihazlarda hızlı ve akıcı kullanım." },
    ],
    techNote:
      "İhtiyacınıza göre PHP tabanlı özel yazılım veya WordPress gibi yönetilebilir altyapılar kullanılabilir. Teknik detayları sizinle birlikte en doğru seçeneğe göre belirleriz.",
    cta: {
      title: "Oteliniz İçin Web Sitesi Teklifi Al",
      href: "/teklif-al?hizmet=otel-web-sitesi",
    },
    related: ["hotelio", "sosyal-medya"],
    image: "/images/services/web/hero.svg",
    hubBenefits: ["Rezervasyon odaklı yapı", "SEO altyapısı", "Hotelio entegrasyonu", "Mobil uyum"],
  },
  "sosyal-medya": {
    slug: "sosyal-medya",
    theme: "creative",
    accent: "blue-bright",
    seo: {
      title: "Otel Sosyal Medya Yönetimi",
      description:
        "Otel markanız için sosyal medya hesap yönetimi, içerik planlaması, reklam yönetimi ve performans analizi hizmetleri.",
    },
    hero: {
      eyebrow: "Sosyal Medya Yönetimi",
      title: "Otelinizi Sadece Göstermeyin.",
      titleAccent: "Tercih Edilir Hale Getirin.",
      description:
        "Dijital görünürlüğünüzü artırın, marka itibarınızı güçlendirin ve rezervasyon dönüşlerinizi destekleyin.",
      image: "/images/services/social/hero.svg",
    },
    intro: {
      text: "Sosyal medya, otelinizin hikâyesini anlattığınız, misafirle bağ kurduğunuz ve rezervasyon yolculuğunu desteklediğiniz stratejik bir kanaldır. Hotel Çözümleri bu kanalı profesyonelce yönetir.",
    },
    goals: [
      "Dijital görünürlüğü artırmak",
      "Marka itibarını güçlendirmek",
      "Doğru hedef kitleye ulaşmak",
      "Rezervasyon dönüşlerini desteklemek",
    ],
    features: [
      "Sosyal medya hesap yönetimi",
      "İçerik planlaması",
      "Grafik tasarım",
      "Profesyonel paylaşım stratejisi",
      "Reklam yönetimi",
      "Hedef kitle optimizasyonu",
      "Etkileşim stratejisi",
      "Performans analizi",
    ],
    cta: {
      title: "Sosyal Medya Teklifi Al",
      href: "/teklif-al?hizmet=sosyal-medya",
    },
    related: ["otel-web-sitesi", "hotelio"],
    image: "/images/services/social/hero.svg",
    hubBenefits: ["İçerik stratejisi", "Reklam yönetimi", "Marka dili", "Performans raporu"],
  },
  "kapi-sistemleri": {
    slug: "kapi-sistemleri",
    theme: "security",
    accent: "navy",
    seo: {
      title: "Otel Kapı ve Mifare Sistemleri",
      description:
        "Yangın kapıları, otel oda kapıları, kartlı giriş ve Mifare erişim sistemleri. Hotelio ile entegrasyon potansiyeli.",
    },
    hero: {
      eyebrow: "Kapı Sistemleri",
      title: "Güvenlik, Konfor ve Teknoloji",
      titleAccent: "Aynı Kapıda.",
      description:
        "Yangın kapılarından Mifare kart sistemlerine, otelinizin güvenlik ve erişim altyapısını profesyonelce kuruyoruz.",
      image: "/images/services/doors/hero.svg",
    },
    intro: {
      text: "Otel kapı sistemleri yalnızca geçiş kontrolü değil; misafir deneyimi, operasyonel güvenlik ve yönetim verimliliğinin kritik parçasıdır.",
    },
    featureGroups: [
      "Yangın kapıları",
      "Otel oda kapıları",
      "Kartlı giriş sistemleri",
      "Mifare kart sistemleri",
      "Erişim kontrolü",
      "Otel yönetim sistemi entegrasyonu",
    ],
    features: [
      "Yangın kapıları",
      "Otel oda kapıları",
      "Kartlı giriş sistemleri",
      "Mifare kart sistemleri",
      "Erişim kontrolü",
      "Hotelio entegrasyon potansiyeli",
    ],
    integrationFlow: ["Misafir", "Resepsiyon", "HOTELIO", "Oda Kartı", "Güvenli Erişim"],
    cta: {
      title: "Kapı Sistemi Teklifi Al",
      href: "/teklif-al?hizmet=kapi-sistemleri",
    },
    related: ["hotelio", "otel-web-sitesi"],
    image: "/images/services/doors/hero.svg",
    hubBenefits: ["Yangın kapıları", "Mifare sistemler", "Erişim kontrolü", "Hotelio uyumu"],
  },
  "otel-tekstili": {
    slug: "otel-tekstili",
    theme: "comfort",
    accent: "gold",
    seo: {
      title: "Otel Tekstili ve Logolu Otel Ürünleri",
      description:
        "Havlu, nevresim, bornoz ve otel tekstil ürünleri. Otel logosuna özel nakış uygulaması ile kurumsal bütünlük.",
    },
    hero: {
      eyebrow: "Otel Tekstili",
      title: "Markanızı",
      titleAccent: "Misafir Odasına Taşıyın.",
      description:
        "Kalite, dayanıklılık ve otel markanıza özel logo uygulamaları ile misafir odalarınızda prestij hissi yaratın.",
      image: "/images/services/textile/hero.svg",
    },
    intro: {
      text: "Otel tekstili misafirin ilk temas noktalarından biridir. Doğru kumaş, doğru doku ve markanıza özel detaylar konforu kurumsal kimliğe dönüştürür.",
    },
    productGroups: ["Havlu", "Nevresim", "Bornoz", "Terlik", "Diğer otel tekstil ürünleri"],
    highlights: ["Kalite", "Dayanıklılık", "Yumuşak doku", "Uzun kullanım ömrü", "Kurumsal bütünlük"],
    logoFlow: ["Normal Ürün", "Logo Uygulaması", "Otelinize Özel Ürün"],
    features: [
      "Otel logosuna özel nakış",
      "Premium kumaş seçenekleri",
      "Toplu tedarik",
      "Marka uyumlu renk ve doku",
      "E-ticaret entegrasyonuna hazır yapı",
    ],
    cta: {
      title: "Tekstil Teklifi Al",
      href: "/teklif-al?hizmet=otel-tekstili",
      secondary: { label: "Ürünleri İncele", href: "/urunler" },
    },
    related: ["sarf-temizlik", "spa-kurulumu"],
    image: "/images/services/textile/hero.svg",
    hubBenefits: ["Logo nakış uygulaması", "Premium kumaş", "Toplu tedarik", "Marka uyumu"],
  },
  "sarf-temizlik": {
    slug: "sarf-temizlik",
    theme: "hygiene",
    accent: "ice",
    seo: {
      title: "Otel Temizlik ve Sarf Malzemeleri",
      description:
        "Endüstriyel temizlik kimyasalları, oda hijyen ürünleri, havuz bakım ve otel sarf malzemeleri. Alan bazlı tedarik çözümleri.",
    },
    hero: {
      eyebrow: "Sarf & Temizlik",
      title: "Hijyen Standart Değil.",
      titleAccent: "Misafir Deneyiminin Bir Parçasıdır.",
      description:
        "Odadan SPA'ya, mutfaktan çamaşırhaneye — otelinizin her alanı için profesyonel hijyen ve sarf ürünleri.",
      image: "/images/services/cleaning/hero.svg",
    },
    intro: {
      text: "Temizlik operasyonunuzun görünmez omurgasıdır. Doğru ürün seçimi hem maliyet verimliliği hem de misafir memnuniyeti sağlar.",
    },
    productGroups: [
      "Endüstriyel temizlik kimyasalları",
      "Oda içi hijyen ürünleri",
      "Sabun, şampuan, duş jeli",
      "Havuz bakım ürünleri ve klor",
      "Zemin, cam ve yüzey temizliği",
      "Mutfak kimyasalları",
      "Çamaşırhane kimyasalları",
    ],
    features: [
      "Endüstriyel temizlik kimyasalları",
      "Oda içi hijyen ürünleri",
      "Sabun, şampuan ve duş jeli",
      "Havuz bakım ürünleri",
      "Zemin ve cam temizliği",
      "Mutfak kimyasalları",
      "Çamaşırhane kimyasalları",
      "Alan bazlı tedarik planlaması",
    ],
    areas: {
      odalar: {
        label: "Odalar",
        products: ["Oda içi hijyen ürünleri", "Sabun & şampuan", "Sarf malzemeleri"],
      },
      spa: {
        label: "SPA & Havuz",
        products: ["Havuz bakım ürünleri", "Havuz kloru", "Wellness hijyen ürünleri"],
      },
      mutfak: {
        label: "Mutfak",
        products: ["Mutfak kimyasalları", "Endüstriyel temizlik", "Yüzey temizliği"],
      },
      camasirhane: {
        label: "Çamaşırhane",
        products: ["Çamaşırhane kimyasalları", "Leke çıkarıcılar", "Endüstriyel deterjanlar"],
      },
      ortak: {
        label: "Ortak Alanlar",
        products: ["Zemin temizliği", "Cam temizliği", "Dezenfektanlar"],
      },
    },
    cta: {
      title: "Toplu Alım Teklifi Al",
      href: "/teklif-al?hizmet=sarf-temizlik",
      secondary: { label: "Ürünleri İncele", href: "/urunler" },
    },
    related: ["otel-tekstili", "spa-kurulumu"],
    image: "/images/services/cleaning/hero.svg",
    hubBenefits: ["Alan bazlı tedarik", "Endüstriyel kimyasallar", "Havuz bakım", "Toplu alım"],
  },
  "spa-kurulumu": {
    slug: "spa-kurulumu",
    theme: "luxury",
    accent: "gold",
    seo: {
      title: "Anahtar Teslim Otel SPA Kurulumu",
      description:
        "Sauna, buhar odası, masaj odası ve wellness alanları için anahtar teslim SPA kurulumu. Keşiften teslime uçtan uca proje yönetimi.",
    },
    hero: {
      eyebrow: "SPA Kurulumu",
      title: "Otelinizde",
      titleAccent: "Yeni Bir Deneyim Alanı Yaratın.",
      description:
        "Mimarinize, konseptinize ve markanıza özel anahtar teslim wellness alanı kurulumu.",
      image: "/images/services/spa/hero.svg",
    },
    intro: {
      text: "SPA alanı otelinizin değerini artıran, misafir deneyimini zenginleştiren premium bir yatırımdır. Her proje otelin kendine özgü ihtiyaçlarına göre tasarlanır.",
    },
    process: [
      { step: "01", title: "Keşif", description: "Alan analizi ve ihtiyaç belirleme" },
      { step: "02", title: "Planlama", description: "Konsept ve bütçe planlaması" },
      { step: "03", title: "Tasarım", description: "Mimari ve wellness tasarımı" },
      { step: "04", title: "Teknik Altyapı", description: "Tesisat ve altyapı hazırlığı" },
      { step: "05", title: "Ekipman", description: "Premium ekipman seçimi" },
      { step: "06", title: "Montaj", description: "Profesyonel kurulum" },
      { step: "07", title: "Teslim", description: "Devreye alma ve eğitim" },
    ],
    solutionAreas: [
      "Sauna",
      "Buhar odası",
      "Masaj odası",
      "Duş sistemleri",
      "Dinlenme alanları",
      "Wellness alanları",
    ],
    cta: {
      title: "SPA Projeniz İçin Görüşelim",
      href: "/teklif-al?hizmet=spa-kurulumu",
    },
    related: ["hotelio", "sarf-temizlik"],
    image: "/images/services/spa/hero.svg",
    hubBenefits: ["Anahtar teslim kurulum", "Özel proje tasarımı", "Premium ekipman", "7 adımlı süreç"],
  },
};

export const relatedServiceMap = {
  hotelio: {
    slug: "hotelio",
    label: "HOTELIO",
    description: "Otelinizin yönetim zekâsı",
    href: "/hotelio",
    premium: true,
  },
  "otel-web-sitesi": {
    slug: "otel-web-sitesi",
    label: "Otel Web Sitesi",
    description: "Rezervasyon odaklı dijital vitrin",
    href: "/cozumler/otel-web-sitesi",
  },
  "sosyal-medya": {
    slug: "sosyal-medya",
    label: "Sosyal Medya",
    description: "Marka görünürlüğü ve etkileşim",
    href: "/cozumler/sosyal-medya",
  },
  "kapi-sistemleri": {
    slug: "kapi-sistemleri",
    label: "Kapı Sistemleri",
    description: "Güvenli erişim altyapısı",
    href: "/cozumler/kapi-sistemleri",
  },
  "otel-tekstili": {
    slug: "otel-tekstili",
    label: "Otel Tekstili",
    description: "Logolu premium tekstil",
    href: "/cozumler/otel-tekstili",
  },
  "sarf-temizlik": {
    slug: "sarf-temizlik",
    label: "Sarf & Temizlik",
    description: "Profesyonel hijyen ürünleri",
    href: "/cozumler/sarf-temizlik",
  },
  "spa-kurulumu": {
    slug: "spa-kurulumu",
    label: "SPA Kurulumu",
    description: "Anahtar teslim wellness",
    href: "/cozumler/spa-kurulumu",
  },
};

export function getService(slug) {
  return services[slug] || null;
}

export function getRelatedServices(keys) {
  return keys.map((key) => relatedServiceMap[key]).filter(Boolean);
}
