import { siteImages } from "./images.js";

export const decorServiceOptions = [
  { id: "dikey-bahce", label: "Dikey Bahçe" },
  { id: "yapay-agac", label: "Yapay Ağaç" },
  { id: "yapay-palmiye", label: "Yapay Palmiye" },
  { id: "merdiven-alti", label: "Merdiven Altı" },
  { id: "bar-ustu", label: "Bar Üstü Çiçeklendirme" },
  { id: "lobi-karsilama", label: "Lobi Karşılama Ağacı" },
  { id: "tavan-dekorasyonu", label: "Tavan Dekorasyonu" },
  { id: "restoran-lounge", label: "Restoran / Lounge" },
  { id: "diger", label: "Diğer" },
];

export const decorServiceTypes = [
  {
    id: "dikey-bahce",
    title: "Dikey Bahçe",
    description:
      "Otel lobisi, koridor ve merdiven altı alanlarına entegre yapay dikey bahçe duvarları; fern, tropikal yaprak ve renkli bitki katmanlarıyla premium kompozisyon; konsept görsel.",
    image: siteImages.decor.verticalGarden,
  },
  {
    id: "yapay-agac",
    title: "Yapay Zeytin Ağacı",
    description:
      "Otel lobisi, restoran ve atrium alanlarına yerleştirilen büyük ölçekli yapay zeytin ağacı uygulamaları; konsept görsel.",
    image: siteImages.decor.tree,
  },
  {
    id: "yapay-palmiye",
    title: "Yapay Palmiye",
    description:
      "Otel girişi, resort lobisi, havuz ve SPA geçiş alanlarına yerleştirilen yapay palmiye uygulamaları; ahşap saksı ve doğal gövdeli premium kompozisyon; konsept görsel.",
    image: siteImages.decor.palm,
  },
  {
    id: "merdiven-alti",
    title: "Merdiven Altı Dekorasyonu",
    description:
      "Boş kalan merdiven altlarını palmiye, kaktüs, süs otu ve yapay bitki kompozisyonlarıyla otel lobisine entegre estetik alanlara dönüştürme; konsept görsel.",
    image: siteImages.decor.staircase,
  },
  {
    id: "bar-ustu",
    title: "Bar Üstü Yapay Çiçeklendirme",
    description:
      "Bar, restoran ve lounge alanlarında tavandan veya bar üstünden uygulanan dekoratif sarkıt çiçek ve bitki tasarımları.",
    image: siteImages.decor.bar,
  },
  {
    id: "lobi-karsilama",
    title: "Lobi Bonsai Karşılama",
    description:
      "Resepsiyon ve karşılama alanlarına yerleştirilen yapay bonsai ağaç kompozisyonları; otel girişinde premium bir ilk izlenim; konsept görsel.",
    image: siteImages.decor.lobby,
  },
  {
    id: "tavan-dekorasyonu",
    title: "Tavan Dekorasyonu",
    description:
      "Otel koridoru ve geçiş alanlarında tavan boyunca uzanan yapay begonvil sarmaşıkların son duvara taşarak oluşturduğu dramatik tavan-duvar dekorasyonu; konsept görsel.",
    image: siteImages.decor.ceiling,
  },
];

export const decorApplicationAreas = [
  "Lobi dekorasyonu",
  "Resepsiyon arkası",
  "Giriş alanı",
  "Restoran",
  "Bar",
  "Lounge",
  "SPA",
  "Havuz çevresi",
  "Koridor",
  "Asansör önü",
  "Toplantı salonu",
  "Merdiven boşluğu",
  "Duvar dekorasyonu",
  "Tavan dekorasyonu",
  "Photo corner",
  "Özel konsept alanlar",
];

export const decorProcess = [
  {
    step: "01",
    title: "Alan Keşfi",
    description: "Otelinizin uygulama yapılacak alanı değerlendirilir.",
  },
  {
    step: "02",
    title: "Konsept",
    description: "Mimari yapı ve otel kimliğine uygun dekorasyon yaklaşımı belirlenir.",
  },
  {
    step: "03",
    title: "Tasarım",
    description: "Bitki türleri, renkler, yoğunluk ve yerleşim planlanır.",
  },
  {
    step: "04",
    title: "Üretim / Hazırlık",
    description: "Uygulamada kullanılacak yapay çiçek ve bitkiler hazırlanır.",
  },
  {
    step: "05",
    title: "Montaj",
    description: "Dekorasyon sahada uygulanır ve son düzenlemeler tamamlanır.",
  },
];

export const decorBeforeAfter = [
  {
    id: "lobi-duvar",
    title: "Lobi Duvarı",
    beforeLabel: "Uygulama Öncesi",
    afterLabel: "Hotel Çözümleri Uygulaması Sonrası",
    beforeCaption: "Boş lobi duvarı — konsept görsel",
    afterCaption: "Dikey bahçe uygulaması — konsept görsel",
    beforeImage: siteImages.decor.beforeLobby,
    afterImage: siteImages.decor.afterLobby,
  },
  {
    id: "merdiven-alti",
    title: "Merdiven Altı",
    beforeLabel: "Uygulama Öncesi",
    afterLabel: "Hotel Çözümleri Uygulaması Sonrası",
    beforeCaption: "Sade merdiven altı — konsept görsel",
    afterCaption: "Bitki dekorasyonu — konsept görsel",
    beforeImage: siteImages.decor.beforeStair,
    afterImage: siteImages.decor.afterStair,
  },
  {
    id: "bar-ustu",
    title: "Bar Üstü",
    beforeLabel: "Uygulama Öncesi",
    afterLabel: "Hotel Çözümleri Uygulaması Sonrası",
    beforeCaption: "Boş bar üstü — konsept görsel",
    afterCaption: "Sarkıt çiçek uygulaması — konsept görsel",
    beforeImage: siteImages.decor.beforeBar,
    afterImage: siteImages.decor.afterBar,
  },
  {
    id: "lobi-karsilama",
    title: "Lobi Karşılama",
    beforeLabel: "Uygulama Öncesi",
    afterLabel: "Hotel Çözümleri Uygulaması Sonrası",
    beforeCaption: "Sade lobi — konsept görsel",
    afterCaption: "Karşılama ağacı — konsept görsel",
    beforeImage: siteImages.decor.beforeReception,
    afterImage: siteImages.decor.afterReception,
  },
];

export const decorGalleryFilters = [
  { id: "all", label: "Tümü" },
  { id: "dikey-bahce", label: "Dikey Bahçe" },
  { id: "agac", label: "Ağaç" },
  { id: "palmiye", label: "Palmiye" },
  { id: "lobi", label: "Lobi" },
  { id: "bar-restoran", label: "Bar & Restoran" },
  { id: "merdiven", label: "Merdiven" },
  { id: "tavan", label: "Tavan" },
  { id: "ozel", label: "Özel Tasarım" },
];

export const decorGalleryItems = [
  { id: "g1", title: "Lobi Dikey Bahçe — Konsept", category: "dikey-bahce", image: siteImages.decor.gallery1, tags: ["lobi", "dikey-bahce"] },
  { id: "g2", title: "Lobi Zeytin Ağacı — Konsept", category: "agac", image: siteImages.decor.gallery2, tags: ["lobi", "agac"] },
  { id: "g3", title: "Otel Girişi Palmiye — Konsept", category: "palmiye", image: siteImages.decor.gallery3, tags: ["palmiye", "ozel"] },
  { id: "g4", title: "Bar Sarkıt Çiçek", category: "bar-restoran", image: siteImages.decor.gallery4, tags: ["bar-restoran"] },
  { id: "g5", title: "Merdiven Altı Bitki Kompozisyonu — Konsept", category: "merdiven", image: siteImages.decor.gallery5, tags: ["merdiven"] },
  { id: "g6", title: "Restoran Duvar Bitkisi", category: "dikey-bahce", image: siteImages.decor.gallery6, tags: ["bar-restoran", "dikey-bahce"] },
  { id: "g7", title: "Resort Giriş Palmiyeleri — Konsept", category: "palmiye", image: siteImages.decor.gallery7, tags: ["palmiye", "ozel"] },
  { id: "g8", title: "Lobi Bonsai Karşılama — Konsept", category: "agac", image: siteImages.decor.gallery8, tags: ["lobi", "agac", "bar-restoran"] },
  { id: "g9", title: "Tavan Begonvil Dekoru — Konsept", category: "tavan", image: siteImages.decor.gallery9, tags: ["tavan", "bar-restoran", "ozel"] },
];

export const decorBenefits = [
  { title: "Bakım gerektirmeyen dekoratif çözüm", description: "Operasyonel yükü azaltan, sürekli bakım planı gerektirmeyen uygulamalar." },
  { title: "Sürekli estetik görünüm", description: "Misafir deneyiminde tutarlı, premium bir atmosfer sunar." },
  { title: "Mevsimden bağımsız kullanım", description: "Yıl boyunca aynı konsept diliyle dekorasyonunuzu koruyun." },
  { title: "Otel konseptine özel tasarım", description: "Marka kimliğinize ve mimari dilinize uygun kompozisyonlar." },
  { title: "Büyük alanlarda uygulanabilirlik", description: "Lobi, koridor ve ortak alanlarda ölçeklenebilir çözümler." },
  { title: "İç mekânda güçlü atmosfer", description: "Sıcak, organik ve mimari bir deneyim oluşturur." },
];

export const decorHotelTypes = {
  "sehir-oteli": {
    label: "Şehir Oteli",
    ideas: ["Lobi bonsai karşılama ağacı", "Resepsiyon arkası bitki kompozisyonu", "Merdiven altı dekorasyonu", "Koridor dikey bahçe"],
  },
  resort: {
    label: "Resort",
    ideas: ["Yapay palmiye uygulamaları", "Havuz çevresi bitkilendirme", "Dikey bahçe duvarları", "Lounge sarkıt çiçek"],
  },
  "butik-otel": {
    label: "Butik Otel",
    ideas: ["Bonsai karşılama ağacı", "Duvar çiçek kompozisyonları", "Özel konsept photo corner", "Bar üstü çiçeklendirme"],
  },
  "termal-otel": {
    label: "Termal Otel",
    ideas: ["SPA palmiye köşeleri", "Dinlenme alanı bitkileri", "Merdiven altı yeşil kompozisyon", "Lobi dikey bahçe"],
  },
  "spa-oteli": {
    label: "SPA Oteli",
    ideas: ["Wellness alanı palmiye", "SPA giriş dikey bahçe", "Dinlenme lounge bitkileri", "Koridor organik dekor"],
  },
  "restoran-lounge": {
    label: "Restoran & Lounge",
    ideas: ["Bar üstü sarkıt çiçek", "Tavan bitki dekorasyonu", "Duvar çiçek paneli", "Lounge karşılama ağacı"],
  },
};

export const decorCustomDesignPoints = [
  "Alan ölçüsüne",
  "Mimariye",
  "Dekorasyon diline",
  "Otel markasına",
  "Renk tercihine",
];
