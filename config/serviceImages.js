/** Hizmet sayfası görselleri — image, alt, category, objectPosition */
const u = (id, w = 1200, extra = "") =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop${extra}`;

const local = (folder, file) => `/images/services/${folder}/${file}`;

export const webImages = {
  hero: {
    image: u("photo-1566073771259-6a8506099945", 1920),
    alt: "Lüks otel lobisi — web sitesi hero arka planı",
    category: "hero",
  },
  heroMockup: {
    desktop: {
      image: local("web", "web-after.jpg"),
      alt: "Grand Otel modern web sitesi — desktop önizleme",
    },
    tablet: {
      image: local("web", "hero-tablet-mockup.jpg"),
      alt: "Grand Otel web sitesi — tablet responsive önizleme",
      objectPosition: "center top",
    },
    mobile: {
      image: local("web", "hero-mobile-mockup.jpg"),
      alt: "Grand Otel web sitesi — mobil responsive önizleme",
      objectPosition: "center top",
    },
  },
  responsiveShowcase: {
    desktop: {
      image: local("web", "web-after.jpg"),
      alt: "Grand Otel web sitesi desktop düzeni",
    },
    tablet: {
      image: local("web", "hero-tablet-mockup.jpg"),
      alt: "Grand Otel web sitesi tablet düzeni",
      objectPosition: "center top",
    },
    mobile: {
      image: local("web", "hero-mobile-mockup.jpg"),
      alt: "Grand Otel web sitesi mobil düzeni",
      objectPosition: "center top",
    },
  },
  features: {
    mobile: {
      image: local("web", "hero-mobile-mockup.jpg"),
      alt: "Aynı otel web sitesinin mobil responsive görünümü",
      category: "mobil-uyum",
      objectPosition: "center top",
    },
    multilingual: {
      image: local("web", "web-after.jpg"),
      alt: "TR ve EN dil seçenekli otel web sitesi arayüzü",
      category: "coklu-dil",
      objectPosition: "center top",
    },
    seo: {
      image: local("web", "feature-seo.jpg"),
      alt: "Otel web sitesi SEO metadata ve arama önizlemesi",
      category: "seo",
    },
    hotelio: {
      image: local("web", "feature-hotelio.jpg"),
      alt: "Hotelio entegrasyonlu otel rezervasyon paneli",
      category: "hotelio",
    },
    booking: {
      image: local("web", "web-after.jpg"),
      alt: "Online rezervasyon formu — giriş çıkış tarihi ve oda seçimi",
      category: "rezervasyon",
      objectPosition: "center top",
    },
    payment: {
      image: local("web", "feature-payment.jpg"),
      alt: "Güvenli online ödeme adımı",
      category: "odeme",
    },
  },
};

export const socialImages = {
  hero: {
    image: u("photo-1611162616305-c69b3fa7fbe0", 1920),
    alt: "Otel sosyal medya içerik yönetimi — telefon ve Instagram grid",
    category: "hero",
  },
  posts: {
    post: {
      image: local("social", "post-suite.jpg"),
      alt: "Grand Otel suite odası Instagram post mockup",
      category: "post",
      objectPosition: "center",
    },
    story: {
      image: local("social", "story-spa.jpg"),
      alt: "Grand Otel SPA alanı Instagram story mockup",
      category: "story",
      objectPosition: "center",
    },
    reels: {
      image: local("social", "reels-pool.jpg"),
      alt: "Grand Otel havuz alanı Reels kapak mockup",
      category: "reels",
      objectPosition: "center",
    },
  },
  calendar: {
    monday: { image: local("social", "cal-room.jpg"), alt: "Oda konsept içerik görseli", content: "Oda / Konsept" },
    wednesday: { image: local("social", "cal-reels.jpg"), alt: "Reels video içerik görseli", content: "Reels" },
    friday: { image: local("social", "cal-gastro.jpg"), alt: "SPA ve gastronomi içerik görseli", content: "SPA / Gastronomi" },
    sunday: { image: local("social", "cal-lobby.jpg"), alt: "Misafir deneyimi lobby içerik görseli", content: "Misafir Deneyimi" },
  },
};

export const doorImages = {
  hero: {
    image: local("doors", "hero-door-lock.jpg"),
    alt: "Premium otel oda kapısı ve elektronik kartlı kilit",
    category: "hero",
  },
  products: {
    fireDoor: {
      image: local("doors", "fire-door.jpg"),
      alt: "Otel yangın kapısı ve panic bar",
      category: "yangin-kapisi",
      objectPosition: "center",
    },
    electronicLock: {
      image: local("doors", "electronic-lock.jpg"),
      alt: "Otel oda kapısında elektronik kart okuyuculu kilit",
      category: "elektronik-kilit",
      objectPosition: "center",
    },
    mifareCard: {
      image: local("doors", "mifare-card.jpg"),
      alt: "Otel Mifare erişim kartı",
      category: "mifare",
      objectPosition: "center",
    },
    accessControl: {
      image: local("doors", "access-control.jpg"),
      alt: "Kart okutarak otel erişim kontrolü",
      category: "erisim-kontrol",
      objectPosition: "center",
    },
    roomDoor: {
      image: local("doors", "room-door.jpg"),
      alt: "Premium otel oda kapısı",
      category: "oda-kapisi",
      objectPosition: "center",
    },
    integration: {
      image: local("doors", "integration-desk.jpg"),
      alt: "Resepsiyonda kart tanımlama — Hotelio entegrasyon noktası",
      category: "entegrasyon",
      objectPosition: "center",
    },
  },
  flow: {
    guest: { image: local("doors", "flow-guest.jpg"), alt: "Otel misafiri", label: "Misafir" },
    reception: { image: local("doors", "integration-desk.jpg"), alt: "Otel resepsiyonu", label: "Resepsiyon" },
    cardSetup: { image: local("doors", "mifare-card.jpg"), alt: "Kart tanımlama", label: "Kart Tanımlama" },
    mifare: { image: local("doors", "electronic-lock.jpg"), alt: "Mifare kart ve kilit", label: "MIFARE" },
    roomEntry: { image: local("doors", "room-door.jpg"), alt: "Oda kapısı girişi", label: "Oda Girişi" },
  },
};

export const textileImages = {
  hero: {
    image: local("textile", "hero-linens.jpg"),
    alt: "Premium beyaz otel tekstili — havlu ve nevresim",
    category: "hero",
  },
  products: {
    towel: {
      image: local("textile", "towel.jpg"),
      alt: "Katlanmış premium beyaz otel havlusu",
      category: "havlu",
      objectPosition: "center",
    },
    robe: {
      image: local("textile", "bathrobe.jpg"),
      alt: "Askıda premium beyaz otel bornozu",
      category: "bornoz",
      objectPosition: "center top",
    },
    bedding: {
      image: local("textile", "bedding.jpg"),
      alt: "Otel yatağında premium beyaz nevresim ve yastıklar",
      category: "nevresim",
      objectPosition: "center",
    },
    slippers: {
      image: local("textile", "slippers.jpg"),
      alt: "Otel odasında beyaz otel terlikleri — yakın çekim",
      category: "terlik",
      objectPosition: "center",
    },
  },
  logoFlow: {
    plain: {
      image: local("textile", "plain-towel.jpg"),
      alt: "Logosuz standart beyaz otel havlusu",
      label: "Normal Tekstil",
    },
    process: {
      image: local("textile", "embroidery-process.jpg"),
      alt: "Otel logosu nakış uygulaması süreci",
      label: "Logo Uygulaması",
    },
    branded: {
      image: local("textile", "branded-towel.jpg"),
      alt: "Logo nakışlı otel markasına özel havlu",
      label: "Otelinize Özel Ürün",
    },
  },
  embroidery: {
    image: local("textile", "embroidery-detail.jpg"),
    alt: "Otel logosu nakış detay yakın çekimi",
    category: "nakis",
    objectPosition: "center",
  },
  beforeAfter: {
    before: {
      image: local("textile", "plain-towel.jpg"),
      alt: "Logosuz standart beyaz otel havlusu",
      caption: "Standart logosuz ürün — konsept görsel",
    },
    after: {
      image: local("textile", "branded-towel.jpg"),
      alt: "Logo nakışlı premium otel havlusu",
      caption: "Logo uygulamalı özel ürün — konsept görsel",
    },
  },
};

export const cleaningImages = {
  hero: {
    image: local("cleaning", "hero-housekeeping.jpg"),
    alt: "Profesyonel otel housekeeping ve temizlik",
    category: "hero",
  },
  areas: {
    odalar: {
      image: local("cleaning", "room-amenities.jpg"),
      alt: "Otel oda içi şampuan, sabun ve hijyen ürünleri",
      category: "odalar",
      objectPosition: "center",
    },
    spa: {
      image: local("cleaning", "pool-chemicals.jpg"),
      alt: "Havuz bakım kimyasalları ve SPA hijyen ürünleri",
      category: "spa-havuz",
      objectPosition: "center",
    },
    mutfak: {
      image: local("cleaning", "kitchen-cleaning.jpg"),
      alt: "Profesyonel mutfak endüstriyel temizlik ürünleri",
      category: "mutfak",
      objectPosition: "center",
    },
    camasirhane: {
      image: local("cleaning", "laundry-detergent.jpg"),
      alt: "Endüstriyel çamaşırhane deterjanları",
      category: "camasirhane",
      objectPosition: "center",
    },
    ortak: {
      image: local("cleaning", "floor-cleaning.jpg"),
      alt: "Otel ortak alan zemin ve yüzey temizliği",
      category: "ortak-alanlar",
      objectPosition: "center",
    },
  },
};

export const spaImages = {
  hero: {
    image: local("spa", "hero-wellness.jpg"),
    alt: "Premium otel SPA wellness alanı",
    category: "hero",
  },
  areas: {
    sauna: {
      image: local("spa", "sauna.jpg"),
      alt: "Ahşap Finlandiya tipi otel sauna",
      category: "sauna",
      objectPosition: "center",
    },
    steam: {
      image: local("spa", "steam-room.jpg"),
      alt: "Otel buhar odası — steam room",
      category: "buhar-odasi",
      objectPosition: "center",
    },
    massage: {
      image: local("spa", "massage-room.jpg"),
      alt: "Premium otel masaj odası ve masaj yatağı",
      category: "masaj-odasi",
      objectPosition: "center",
    },
    shower: {
      image: local("spa", "experience-shower.jpg"),
      alt: "SPA experience shower duş sistemi",
      category: "dus-sistemleri",
      objectPosition: "center",
    },
    relax: {
      image: local("spa", "relax-lounge.jpg"),
      alt: "SPA dinlenme ve relaxation lounge alanı",
      category: "dinlenme",
      objectPosition: "center",
    },
    wellness: {
      image: local("spa", "wellness-pool.jpg"),
      alt: "Otel wellness havuzu ve dinlenme alanı",
      category: "wellness",
      objectPosition: "center",
    },
  },
  gallery: [
    { image: local("spa", "sauna.jpg"), alt: "Sauna alanı", title: "Sauna alanı" },
    { image: local("spa", "steam-room.jpg"), alt: "Buhar odası", title: "Buhar odası" },
    { image: local("spa", "massage-room.jpg"), alt: "Masaj odası", title: "Masaj odası" },
  ],
  crossSell: {
    spa: {
      image: local("spa", "massage-room.jpg"),
      alt: "Premium otel masaj ve SPA alanı",
    },
  },
};

/** /cozumler hub listesi — her hizmet için vitrin görseli */
export const hubImages = {
  "otel-web-sitesi": {
    image: local("web", "web-after.jpg"),
    alt: "Grand Otel modern web sitesi — rezervasyon odaklı dijital vitrin",
    objectPosition: "center top",
  },
  "sosyal-medya": {
    image: local("social", "post-suite.jpg"),
    alt: "Otel sosyal medya içerik görseli — suite odası paylaşımı",
    objectPosition: "center",
  },
  "kapi-sistemleri": {
    image: local("doors", "hero-door-lock.jpg"),
    alt: "Premium otel oda kapısı ve elektronik kartlı kilit sistemi",
    objectPosition: "center",
  },
  "otel-tekstili": {
    image: local("textile", "hero-linens.jpg"),
    alt: "Premium beyaz otel tekstili — havlu ve nevresim",
    objectPosition: "center",
  },
  "sarf-temizlik": {
    image: local("cleaning", "hero-housekeeping.jpg"),
    alt: "Profesyonel otel housekeeping ve temizlik",
    objectPosition: "center",
  },
  "spa-kurulumu": {
    image: local("spa", "hero-wellness.jpg"),
    alt: "Premium otel SPA wellness alanı",
    objectPosition: "center",
  },
  "yapay-cicek-dekorasyon": {
    image: local("decor", "dikey-bahce-otel-konsept.jpg"),
    alt: "Otel dikey bahçe yapay çiçek dekorasyon uygulaması",
    objectPosition: "center",
  },
};
