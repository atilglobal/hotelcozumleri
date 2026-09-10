export const hotelioPositioning = {
  eyebrow: "HOTELIO",
  subtitle: "Akıllı Otel Yönetim Platformu",
  heroTitle: "OTELİNİZİN",
  heroTitleAccent: "YENİ YÖNETİM ZEKÂSI.",
  heroDescription:
    "Rezervasyon, ön büro, misafir deneyimi, finans, operasyon ve yönetim süreçlerini tek merkezde birleştiren otel odaklı yönetim platformu.",
  mainMessage: "Otelinizin Tüm Operasyonu. Tek Akıllı Platform.",
  subMessage:
    "Rezervasyondan ön büroya, misafir deneyiminden finansal analize kadar otelinizin kritik süreçlerini tek merkezden yönetin.",
};

export const hotelioCategories = [
  {
    id: "yonetim",
    label: "Yönetici & Strateji",
    shortLabel: "Yönetim",
    mockupType: "dashboard",
    description: "Yönetici dashboard, finansal takip, doluluk analizi ve AI destekli karar araçları.",
    features: [
      "Yönetici Dashboard",
      "Finansal takip",
      "Doluluk analizi",
      "Grafik ve trend analizi",
      "Canlı kat görünümü",
      "AI Strategy Hub",
      "Yapay zekâ fiyat önerileri",
      "Akıllı kampanya önerileri",
      "Kişiselleştirilebilir dashboard",
      "Executive Vision",
      "ADR / RevPAR",
      "Yönetici raporları",
      "PDF raporlama",
      "Hedef / gerçekleşen ciro analizi",
    ],
  },
  {
    id: "rezervasyon",
    label: "Rezervasyon & Satış",
    shortLabel: "Rezervasyon",
    mockupType: "reservation",
    description: "Rezervasyon planlama, kanal yönetimi, acente kontratları ve satış operasyonları.",
    features: [
      "Rezervasyon planlama takvimi",
      "Oda bloklama",
      "Sürükle bırak oda değişimi",
      "Yeni rezervasyon akışı",
      "Oda tipi ve fiyat sorgulama",
      "Yetkili indirim sistemi",
      "Misafir bilgileri",
      "Rezervasyon onay süreçleri",
      "Kanal yönetimi",
      "Stop-Sale",
      "Acente kontratları",
      "Komisyon yönetimi",
      "Allotman",
      "Sanal kart tahsilat süreçleri",
      "Rezervasyon arama",
      "Waitlist",
      "Kanal entegrasyon kontrolleri",
    ],
  },
  {
    id: "onburo",
    label: "Ön Büro & Resepsiyon",
    shortLabel: "Ön Büro",
    mockupType: "frontoffice",
    description: "Check-in/out, folyo, tahsilat, fatura ve KBS süreçlerini merkezi yönetim.",
    features: [
      "Check-in",
      "Check-out",
      "Konaklayan misafirler",
      "Oda değişimi",
      "Misafir tercihleri",
      "VIP kodları",
      "Eşlikçi / Sharer",
      "Grup rezervasyonları",
      "Toplu giriş",
      "Master hesap",
      "Zincir otel / CRS",
      "Folyo",
      "Borç / alacak",
      "Tahsilat",
      "Hesap bölme",
      "Fatura yönlendirme",
      "E-Fatura süreçleri",
      "KBS / kimlik bildirim süreçleri",
      "Erken giriş",
      "Geç çıkış",
      "Kasa mutabakatı",
    ],
  },
  {
    id: "oda-tesis",
    label: "Oda & Tesis Operasyonu",
    shortLabel: "Oda & Tesis",
    mockupType: "housekeeping",
    description: "Housekeeping, oda durumları ve kat operasyonlarını anlık takip.",
    features: [
      "Housekeeping",
      "Otomatik görev dağıtımı",
      "Oda durumları",
      "Kat operasyonları",
      "Canlı oda / kat görünümü",
    ],
  },
  {
    id: "finans",
    label: "Finans & Muhasebe",
    shortLabel: "Finans",
    mockupType: "finance",
    description: "Finansal dashboard, bütçe planlama ve muhasebe süreçleri.",
    features: [
      "Finansal dashboard",
      "Ciro takibi",
      "Bütçe planlama",
      "Departman gider limitleri",
      "Genel muhasebe",
      "Hesap planı",
      "Mizan",
      "Maliyet kontrol",
      "E-Fatura",
      "Kasa ve tahsilat süreçleri",
    ],
  },
  {
    id: "crm",
    label: "CRM & Misafir Deneyimi",
    shortLabel: "CRM",
    mockupType: "crm",
    description: "Misafir tercihleri, VIP yönetimi, sadakat ve iletişim kampanyaları.",
    features: [
      "Misafir tercih kartları",
      "VIP yönetimi",
      "Geçmiş misafir tercihleri",
      "SMS bilgilendirme",
      "E-posta bilgilendirme",
      "Kampanya iletişimi",
      "Sadakat sistemi",
      "Hediye puan kampanyaları",
      "Memnuniyet anketleri",
      "Misafir deneyimi takibi",
    ],
  },
  {
    id: "spa",
    label: "SPA & Wellness",
    shortLabel: "SPA",
    mockupType: "spa",
    description: "Terapist takvimi, randevu planlama ve oda hesabına aktarım.",
    features: [
      "Terapist randevu takvimi",
      "Terapist çalışma saatleri",
      "Masaj odası planlaması",
      "SPA randevuları",
      "SPA hizmet bedelini oda hesabına aktarma",
    ],
  },
  {
    id: "satis",
    label: "Satış & Pazarlama",
    shortLabel: "Satış",
    mockupType: "sales",
    description: "Kurumsal teklif, CRM kampanyaları ve misafir segmentasyonu.",
    features: [
      "Kurumsal B2B teklif hazırlama",
      "Teklif PDF oluşturma",
      "CRM kampanyaları",
      "Misafir segmentleri",
      "Satış operasyonları",
    ],
  },
];

export const hotelioEcosystemNodes = [
  "Yönetim",
  "Rezervasyon",
  "Ön Büro",
  "Oda & Tesis",
  "Finans",
  "CRM",
  "SPA",
  "Satış",
];

export const hotelioBenefits = [
  {
    title: "Daha Fazla Kontrol",
    description: "Operasyonun kritik noktalarını merkezi olarak takip edin.",
  },
  {
    title: "Daha Hızlı Operasyon",
    description: "Departmanlar arasındaki süreçleri kolaylaştırın.",
  },
  {
    title: "Daha İyi Misafir Deneyimi",
    description: "Misafir tercihlerini ve geçmiş etkileşimleri değerlendirin.",
  },
  {
    title: "Daha Güçlü Yönetim",
    description: "Finansal ve operasyonel göstergeleri tek noktadan inceleyin.",
  },
  {
    title: "Daha Doğru Kararlar",
    description: "Analiz ve yapay zekâ destekli önerilerden yararlanın.",
  },
];

export const hotelioAudience = [
  "Şehir Otelleri",
  "Resort Oteller",
  "Butik Oteller",
  "Termal Oteller",
  "Apart / Konaklama İşletmeleri",
  "Zincir Oteller",
];

export const hotelioDepartments = [
  {
    id: "yonetim",
    label: "Yönetim",
    description: "Doluluk, ciro, ADR, RevPAR ve hedef takibini tek dashboard üzerinden izleyin.",
  },
  {
    id: "resepsiyon",
    label: "Resepsiyon",
    description: "Check-in/out, folyo, tahsilat ve misafir tercihlerini merkezi yönetin.",
  },
  {
    id: "rezervasyon",
    label: "Rezervasyon",
    description: "Takvim tabanlı planlama, kanal yönetimi ve oda bloklama süreçlerini kontrol edin.",
  },
  {
    id: "housekeeping",
    label: "Housekeeping",
    description: "Oda durumlarını ve görev dağıtımını anlık takip edin.",
  },
  {
    id: "muhasebe",
    label: "Muhasebe",
    description: "Ciro, bütçe, muhasebe ve e-fatura süreçlerini entegre yönetin.",
  },
  {
    id: "satis",
    label: "Satış",
    description: "Kurumsal teklifler, kampanyalar ve misafir segmentlerini yönetin.",
  },
  {
    id: "crm",
    label: "CRM",
    description: "Misafir profilleri, VIP yönetimi ve sadakat programlarını takip edin.",
  },
  {
    id: "spa",
    label: "SPA",
    description: "Terapist takvimi, randevu planlama ve oda hesabına aktarım.",
  },
];

export const hotelioDemoInterests = [
  "Yönetim",
  "Rezervasyon",
  "Ön Büro",
  "CRM",
  "Finans",
  "Housekeeping",
  "SPA",
  "Tüm Sistem",
];

export const hotelioFAQ = [
  {
    question: "Hotelio nedir?",
    answer:
      "Hotelio, otel işletmelerinin rezervasyon, ön büro, misafir ilişkileri, finans, housekeeping, SPA ve yönetim süreçlerini tek platformda birleştiren otel odaklı yönetim sistemidir.",
  },
  {
    question: "Hotelio sadece CRM midir?",
    answer:
      "Hayır. Hotelio yalnızca bir CRM değildir. Rezervasyon, ön büro, finans, raporlama, housekeeping, SPA ve yönetim süreçlerini kapsayan kapsamlı bir otel yönetim platformudur.",
  },
  {
    question: "Hotelio hangi otel süreçlerini kapsar?",
    answer:
      "Rezervasyon ve satış, ön büro operasyonları, misafir deneyimi, finans ve muhasebe, oda ve tesis operasyonları, SPA yönetimi, raporlama ve yönetici karar desteği süreçlerini kapsar.",
  },
  {
    question: "Demo talep edebilir miyim?",
    answer:
      "Evet. Otelinizin yapısına göre Hotelio'nun size nasıl yardımcı olabileceğini birlikte incelemek için demo talep formunu doldurabilirsiniz.",
  },
  {
    question: "Hotelio misafir tercihlerini yönetebilir mi?",
    answer:
      "Evet. Misafir tercih kartları, VIP yönetimi ve geçmiş konaklama bilgileri resepsiyon ekranında değerlendirilebilir.",
  },
  {
    question: "Rezervasyon süreçleri yönetilebilir mi?",
    answer:
      "Evet. Rezervasyon planlama takvimi, oda bloklama, kanal yönetimi, acente kontratları ve waitlist gibi süreçler desteklenir.",
  },
  {
    question: "Yönetici raporları bulunuyor mu?",
    answer:
      "Evet. Doluluk, ciro, ADR, RevPAR, hedef/gerçekleşen analizleri ve PDF raporlama seçenekleri mevcuttur.",
  },
  {
    question: "SPA operasyonları yönetilebilir mi?",
    answer:
      "Evet. Terapist randevu takvimi, masaj odası planlaması ve SPA hizmet bedelinin oda hesabına aktarımı desteklenir.",
  },
];

export const hotelioEcosystemLinks = [
  { label: "Web Sitesi", href: "/cozumler/otel-web-sitesi" },
  { label: "Kapı Sistemleri", href: "/cozumler/kapi-sistemleri" },
  { label: "SPA Kurulumu", href: "/cozumler/spa-kurulumu" },
  { label: "Otel Tekstili", href: "/cozumler/otel-tekstili" },
  { label: "Sarf & Temizlik", href: "/cozumler/sarf-temizlik" },
];

export const hotelioModules = [
  { slug: "yonetici-dashboard", title: "Yönetici Dashboard", category: "yonetim", categoryLabel: "Yönetici & Strateji", shortDescription: "Doluluk, ciro ve operasyonel göstergeleri tek ekranda izleyin.", benefits: ["Anlık operasyon görünürlüğü", "Karar destek metrikleri"], features: ["Doluluk analizi", "Gelir trendi", "ADR / RevPAR"], mockupType: "dashboard" },
  { slug: "ai-strategy-hub", title: "AI Strategy Hub", category: "yonetim", categoryLabel: "Yönetici & Strateji", shortDescription: "Yapay zekâ destekli fiyat ve kampanya önerileri.", benefits: ["Veriye dayalı öneriler", "Yönetici karar desteği"], features: ["Fiyat önerileri", "Kampanya önerileri", "Doluluk eğilimi"], mockupType: "ai" },
  { slug: "executive-vision", title: "Executive Vision", category: "yonetim", categoryLabel: "Yönetici & Strateji", shortDescription: "Hedef ve gerçekleşen ciro analizi ile yönetici raporları.", benefits: ["Stratejik görünürlük", "PDF raporlama"], features: ["Hedef / gerçekleşen", "Yönetici raporları"], mockupType: "dashboard" },
  { slug: "rezervasyon-takvimi", title: "Rezervasyon Planlama Takvimi", category: "rezervasyon", categoryLabel: "Rezervasyon & Satış", shortDescription: "Oda bloklama ve sürükle-bırak oda değişimi ile takvim yönetimi.", benefits: ["Merkezi takvim kontrolü", "Hızlı oda değişimi"], features: ["Oda bloklama", "Sürükle bırak", "Waitlist"], mockupType: "reservation" },
  { slug: "kanal-yonetimi", title: "Kanal Yönetimi", category: "rezervasyon", categoryLabel: "Rezervasyon & Satış", shortDescription: "Stop-Sale, acente kontratları ve allotman yönetimi.", benefits: ["Kanal kontrolü", "Komisyon takibi"], features: ["Stop-Sale", "Acente kontratları", "Allotman"], mockupType: "reservation" },
  { slug: "check-in-out", title: "Check-in / Check-out", category: "onburo", categoryLabel: "Ön Büro & Resepsiyon", shortDescription: "Resepsiyon operasyonlarını kontrollü ve hızlı yönetin.", benefits: ["Hızlı giriş-çıkış", "Grup işlemleri"], features: ["Check-in", "Check-out", "Toplu giriş"], mockupType: "frontoffice" },
  { slug: "folyo-tahsilat", title: "Folyo & Tahsilat", category: "onburo", categoryLabel: "Ön Büro & Resepsiyon", shortDescription: "Borç/alacak, hesap bölme ve fatura yönlendirme.", benefits: ["Finansal kontrol", "E-Fatura entegrasyonu"], features: ["Folyo", "Tahsilat", "E-Fatura"], mockupType: "frontoffice" },
  { slug: "housekeeping", title: "Housekeeping", category: "oda-tesis", categoryLabel: "Oda & Tesis Operasyonu", shortDescription: "Oda durumları ve otomatik görev dağıtımı.", benefits: ["Anlık kat görünümü", "Operasyonel verimlilik"], features: ["Oda durumları", "Görev dağıtımı"], mockupType: "housekeeping" },
  { slug: "finansal-dashboard", title: "Finansal Dashboard", category: "finans", categoryLabel: "Finans & Muhasebe", shortDescription: "Ciro takibi, bütçe planlama ve maliyet kontrol.", benefits: ["Finansal şeffaflık", "Departman limitleri"], features: ["Ciro takibi", "Bütçe planlama", "Mizan"], mockupType: "finance" },
  { slug: "misafir-tercihleri", title: "Misafir Tercih Kartları", category: "crm", categoryLabel: "CRM & Misafir Deneyimi", shortDescription: "VIP yönetimi ve geçmiş tercihlerin resepsiyonda görünürlüğü.", benefits: ["Kişiselleştirilmiş deneyim", "Sadakat yönetimi"], features: ["VIP yönetimi", "Tercih kartları", "Kampanya iletişimi"], mockupType: "crm" },
  { slug: "spa-randevu", title: "SPA Randevu Yönetimi", category: "spa", categoryLabel: "SPA & Wellness", shortDescription: "Terapist takvimi ve oda hesabına aktarım.", benefits: ["Wellness operasyonu", "Entegre faturalama"], features: ["Terapist takvimi", "Masaj odası planlama"], mockupType: "spa" },
  { slug: "kurumsal-teklif", title: "Kurumsal B2B Teklif", category: "satis", categoryLabel: "Satış & Pazarlama", shortDescription: "Teklif hazırlama ve PDF oluşturma.", benefits: ["Profesyonel teklifler", "Misafir segmentasyonu"], features: ["B2B teklif", "CRM kampanyaları"], mockupType: "sales" },
];

export function getHotelioModule(slug) {
  return hotelioModules.find((m) => m.slug === slug) || null;
}

export function getModulesByCategory(categoryId) {
  if (!categoryId || categoryId === "tumu") return hotelioModules;
  return hotelioModules.filter((m) => m.category === categoryId);
}

export const hotelioModuleFilters = [
  { id: "tumu", label: "Tümü" },
  ...hotelioCategories.map((c) => ({ id: c.id, label: c.shortLabel })),
];

export const hotelioCtaIds = {
  heroDemo: "hotelio_hero_demo",
  aiDemo: "hotelio_ai_demo",
  modulesDemo: "hotelio_modules_demo",
  bottomDemo: "hotelio_bottom_demo",
  stickyDemo: "hotelio_sticky_demo",
  whatsapp: "hotelio_whatsapp",
};
