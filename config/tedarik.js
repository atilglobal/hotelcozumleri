import { siteImages } from "./images.js";

export const tedarikHero = {
  eyebrow: "TEDARİK & TEKLİF",
  title: "İhtiyacınızı Bildirin,",
  titleAccent: "En Uygun Çözümü Biz Bulalım.",
  description:
    "Otelinizin ihtiyaç duyduğu ürün ve ekipmanları tek tek tedarikçi aramadan bize iletin. Talebinizi değerlendirir, uygun tedarikçilerden fiyatlandırır ve size özel teklif sunarız.",
  primaryCta: { label: "Tedarik Talebi Oluştur", href: "#talep-formu" },
  secondaryCta: { label: "Süreci İncele", href: "#surec" },
};

export const tedarikCategories = [
  {
    id: "tekstil",
    title: "Otel Tekstili",
    description: "Nevresim, havlu, bornoz ve markalı tekstil ihtiyaçları",
    image: siteImages.solutions.textile,
    anchor: "tekstil",
  },
  {
    id: "oda-ici",
    title: "Oda İçi Ürünler",
    description: "Amenity, terlik, sehpa setleri ve oda donanımları",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&fit=crop",
    anchor: "oda-ici",
  },
  {
    id: "temizlik",
    title: "Temizlik & Hijyen",
    description: "Housekeeping ve profesyonel hijyen ürünleri",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=900&q=80&fit=crop",
    anchor: "temizlik",
  },
  {
    id: "spa",
    title: "SPA & Wellness",
    description: "SPA sarf malzemeleri ve wellness ekipmanları",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80&fit=crop",
    anchor: "spa",
  },
  {
    id: "kapi",
    title: "Kapı Sistemleri",
    description: "Kartlı geçiş, Mifare ve erişim altyapısı",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop",
    anchor: "kapi",
  },
  {
    id: "ekipman",
    title: "Otel Ekipmanları",
    description: "Operasyonel ekipman ve donanım tedariki",
    image: "https://images.unsplash.com/photo-1564501049412-61c781a8e591?w=900&q=80&fit=crop",
    anchor: "ekipman",
  },
  {
    id: "sarf",
    title: "Sarf Malzemeleri",
    description: "Günlük operasyon için sarf ve tüketim ürünleri",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69bb?w=900&q=80&fit=crop",
    anchor: "sarf",
  },
  {
    id: "ozel",
    title: "Özel Üretim",
    description: "Logolu, ölçüye özel ve proje bazlı üretim talepleri",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop",
    anchor: "ozel",
  },
];

export const tedarikProcess = [
  { step: "01", title: "İhtiyacınızı İletin", description: "Ürün, miktar ve spesifikasyonları paylaşın." },
  { step: "02", title: "Talebinizi Analiz Edelim", description: "Operasyonel ihtiyacınızı ve teslimat beklentinizi değerlendiririz." },
  { step: "03", title: "Tedarikçilerden Fiyatlandıralım", description: "Uygun tedarik ağımızdan rekabetçi teklif toplarız." },
  { step: "04", title: "Size Özel Teklifi Sunalım", description: "Net, karşılaştırılabilir ve otelinize özel teklif iletiriz." },
  { step: "05", title: "Süreci Birlikte Tamamlayalım", description: "Onay, tedarik ve teslimat sürecinde yanınızdayız." },
];
