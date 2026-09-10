export const siteConfig = {
  name: "Hotel Çözümleri",
  domain: "hotelcozumleri.com",
  url: process.env.SITE_URL || "https://hotelcozumleri.com",
  description:
    "Hotel Çözümleri; Hotelio otel yönetim yazılımı, otel tekstili, kapı sistemleri, temizlik ürünleri, web sitesi, sosyal medya ve SPA çözümlerini tek çatı altında sunar.",
  tagline: "Otellerin teknoloji, yazılım, dijital hizmet, güvenlik, tekstil, hijyen, sarf malzemeleri, spa ve operasyonel ihtiyaçlarını tek çatı altında çözmek.",
  contact: {
    phone: process.env.CONTACT_PHONE || "+90 554 104 62 91",
    phoneRaw: process.env.WHATSAPP_NUMBER || "905541046291",
    email: process.env.CONTACT_EMAIL || "info@hotelcozumleri.com",
    address: "Gölcük / Kocaeli",
  },
  social: {
    whatsapp: `https://wa.me/${process.env.WHATSAPP_NUMBER || "905541046291"}`,
  },
  company: {
    parent: "ASK Bilişim iştirakidir.",
  },
};
