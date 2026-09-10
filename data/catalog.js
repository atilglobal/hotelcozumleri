export const demoBrands = [
  { id: 1, name: "Hotel Çözümleri", slug: "hotel-cozumleri", status: "active" },
  { id: 2, name: "ProClean", slug: "proclean", status: "active" },
  { id: 3, name: "SoftLine", slug: "softline", status: "active" },
];

export const demoCategories = [
  { id: 1, parent_id: null, name: "Otel Tekstili", slug: "otel-tekstili", description: "Havlu, bornoz, nevresim ve otel tekstil ürünleri.", sort_order: 1, status: "active" },
  { id: 2, parent_id: 1, name: "Havlu", slug: "havlu", description: null, sort_order: 1, status: "active" },
  { id: 3, parent_id: 1, name: "Bornoz", slug: "bornoz", description: null, sort_order: 2, status: "active" },
  { id: 4, parent_id: 1, name: "Nevresim", slug: "nevresim", description: null, sort_order: 3, status: "active" },
  { id: 5, parent_id: null, name: "Sarf & Temizlik", slug: "sarf-temizlik", description: "Oda içi ve endüstriyel temizlik ürünleri.", sort_order: 2, status: "active" },
  { id: 6, parent_id: 5, name: "Oda İçi Ürünler", slug: "oda-ici-urunler", description: null, sort_order: 1, status: "active" },
  { id: 7, parent_id: 5, name: "Endüstriyel Temizlik", slug: "endustriyel-temizlik", description: null, sort_order: 2, status: "active" },
  { id: 8, parent_id: null, name: "Kapı Sistemleri", slug: "kapi-sistemleri", description: "Mifare kartlar ve kapı aksesuarları.", sort_order: 3, status: "active" },
  { id: 9, parent_id: 8, name: "Mifare Kartlar", slug: "mifare-kartlar", description: null, sort_order: 1, status: "active" },
  { id: 10, parent_id: null, name: "SPA", slug: "spa-urunleri", description: "SPA sarf ve wellness ürünleri.", sort_order: 4, status: "active" },
];

function makeProduct(base) {
  return {
    status: "active",
    stock_type: "stocked",
    featured: false,
    is_quote_only: false,
    min_order_quantity: 1,
    unit: "adet",
    vat_rate: 20,
    allows_logo: false,
    images: [],
    optionGroups: [],
    variants: [],
    ...base,
  };
}

export const demoProducts = [
  makeProduct({
    id: 1, name: "Premium Otel Havlusu", slug: "premium-otel-havlusu", sku: "HC-HV-001",
    short_description: "Yüksek emicilik ve dayanıklılık sunan premium otel havlusu.",
    description: "500 gsm pamuklu otel havlusu. Yüksek emicilik, yumuşak doku ve uzun kullanım ömrü.",
    category_id: 2, brand_id: 3, price: 189, sale_price: null, stock: 500,
    main_image: "/images/products/havlu.svg", featured: 1, allows_logo: 1,
    images: [{ image: "/images/products/havlu.svg", alt_text: "Premium Otel Havlusu", is_main: 1 }],
    optionGroups: [
      { id: 1, name: "Ölçü", options: [{ id: 1, value: "50x90 cm" }, { id: 2, value: "70x140 cm" }] },
      { id: 2, name: "Logo", options: [{ id: 3, value: "Nakışsız" }, { id: 4, value: "Logo Nakışlı" }] },
    ],
    variants: [
      { id: 1, sku: "HC-HV-001-S", price: 189, stock: 300, is_default: 1, options: [1, 3] },
      { id: 2, sku: "HC-HV-001-L", price: 249, stock: 200, is_default: 0, options: [2, 3] },
      { id: 3, sku: "HC-HV-001-LOGO", price: 219, stock: 150, is_default: 0, options: [1, 4] },
    ],
  }),
  makeProduct({
    id: 2, name: "Otel Bornozu", slug: "otel-bornozu", sku: "HC-BR-001",
    short_description: "Konforlu ve dayanıklı otel bornozu.",
    category_id: 3, brand_id: 3, price: 349, stock: 200,
    main_image: "/images/products/bornoz.svg", allows_logo: 1,
    images: [{ image: "/images/products/bornoz.svg", alt_text: "Otel Bornozu", is_main: 1 }],
    optionGroups: [{ id: 3, name: "Beden", options: [{ id: 5, value: "M/L" }, { id: 6, value: "XL/XXL" }] }],
    variants: [
      { id: 4, sku: "HC-BR-001-ML", price: 349, stock: 120, is_default: 1, options: [5] },
      { id: 5, sku: "HC-BR-001-XL", price: 379, stock: 80, is_default: 0, options: [6] },
    ],
  }),
  makeProduct({
    id: 3, name: "Otel Nevresim Takımı", slug: "otel-nevresim-takimi", sku: "HC-NV-001",
    short_description: "Çift kişilik otel nevresim takımı.",
    category_id: 4, brand_id: 3, price: 429, stock: 150,
    main_image: "/images/products/nevresim.svg",
    images: [{ image: "/images/products/nevresim.svg", alt_text: "Otel Nevresim Takımı", is_main: 1 }],
  }),
  makeProduct({
    id: 4, name: "Otel Tipi Şampuan 30ml", slug: "otel-tipi-sampuan", sku: "HC-SH-030",
    short_description: "Oda amenity şampuan, 30ml.",
    category_id: 6, brand_id: 1, price: 8.5, stock: 5000, min_order_quantity: 100,
    main_image: "/images/products/sampuan.svg",
    images: [{ image: "/images/products/sampuan.svg", alt_text: "Otel Tipi Şampuan", is_main: 1 }],
    optionGroups: [{ id: 4, name: "Ambalaj", options: [{ id: 7, value: "30ml" }, { id: 8, value: "50ml" }] }],
    variants: [
      { id: 6, sku: "HC-SH-030", price: 8.5, stock: 5000, is_default: 1, options: [7] },
      { id: 7, sku: "HC-SH-050", price: 11.5, stock: 3000, is_default: 0, options: [8] },
    ],
  }),
  makeProduct({
    id: 5, name: "Otel Tipi Duş Jeli 30ml", slug: "otel-tipi-dus-jeli", sku: "HC-DJ-030",
    short_description: "Oda amenity duş jeli, 30ml.",
    category_id: 6, brand_id: 1, price: 8.5, stock: 4000, min_order_quantity: 100,
    main_image: "/images/products/dus-jeli.svg",
    images: [{ image: "/images/products/dus-jeli.svg", alt_text: "Duş Jeli", is_main: 1 }],
  }),
  makeProduct({
    id: 6, name: "Profesyonel Yüzey Temizleyici 5L", slug: "profesyonel-yuzey-temizleyici", sku: "HC-PC-5L",
    short_description: "Endüstriyel yüzey temizlik kimyasalı, 5 litre.",
    category_id: 7, brand_id: 2, price: 285, stock: 120,
    main_image: "/images/products/temizlik.svg",
    images: [{ image: "/images/products/temizlik.svg", alt_text: "Yüzey Temizleyici", is_main: 1 }],
    optionGroups: [{ id: 5, name: "Hacim", options: [{ id: 9, value: "5L" }, { id: 10, value: "20L" }] }],
    variants: [
      { id: 8, sku: "HC-PC-5L", price: 285, stock: 120, is_default: 1, options: [9] },
      { id: 9, sku: "HC-PC-20L", price: 890, stock: 40, is_default: 0, options: [10] },
    ],
  }),
  makeProduct({
    id: 7, name: "Mifare Otel Kartı", slug: "mifare-otel-karti", sku: "HC-MF-001",
    short_description: "13.56 MHz Mifare otel erişim kartı.",
    category_id: 9, brand_id: 1, price: 12, stock: 10000, min_order_quantity: 50,
    main_image: "/images/products/mifare.svg",
    images: [{ image: "/images/products/mifare.svg", alt_text: "Mifare Kart", is_main: 1 }],
    optionGroups: [{ id: 6, name: "Kart Tipi", options: [{ id: 11, value: "Standart" }, { id: 12, value: "Premium Baskılı" }] }],
    variants: [
      { id: 10, sku: "HC-MF-001-S", price: 12, stock: 10000, is_default: 1, options: [11] },
      { id: 11, sku: "HC-MF-001-P", price: 18, stock: 5000, is_default: 0, options: [12] },
    ],
  }),
  makeProduct({
    id: 8, name: "SPA Masaj Yağı 500ml", slug: "spa-masaj-yagi", sku: "HC-SPA-001",
    short_description: "Profesyonel SPA masaj yağı.",
    category_id: 10, brand_id: 1, price: 195, stock: 80,
    main_image: "/images/products/spa.svg",
    images: [{ image: "/images/products/spa.svg", alt_text: "SPA Masaj Yağı", is_main: 1 }],
  }),
  makeProduct({
    id: 9, name: "Endüstriyel Otel Çamaşır Deterjanı", slug: "otel-camasir-deterjani", sku: "HC-CD-20L",
    short_description: "Çamaşırhane için endüstriyel deterjan, 20L.",
    category_id: 7, brand_id: 2, price: 1250, stock: 30, is_quote_only: 1, stock_type: "quote",
    main_image: "/images/products/deterjan.svg",
    images: [{ image: "/images/products/deterjan.svg", alt_text: "Çamaşır Deterjanı", is_main: 1 }],
  }),
  makeProduct({
    id: 10, name: "Otel Terliği", slug: "otel-terligi", sku: "HC-TR-001",
    short_description: "Tek kullanımlık veya çok kullanımlık otel terliği.",
    category_id: 1, brand_id: 3, price: 15, stock: 8000, min_order_quantity: 200,
    main_image: "/images/products/terlik.svg",
    images: [{ image: "/images/products/terlik.svg", alt_text: "Otel Terliği", is_main: 1 }],
  }),
];

export function getDemoCategoryBySlug(slug) {
  return demoCategories.find((c) => c.slug === slug) || null;
}

export function getDemoProductBySlug(slug) {
  return demoProducts.find((p) => p.slug === slug) || null;
}

export function getDemoProducts(filters = {}) {
  let list = demoProducts.filter((p) => p.status === "active");
  if (filters.categorySlug) {
    const cat = getDemoCategoryBySlug(filters.categorySlug);
    if (cat) {
      const childIds = demoCategories.filter((c) => c.parent_id === cat.id || c.id === cat.id).map((c) => c.id);
      list = list.filter((p) => childIds.includes(p.category_id));
    }
  }
  if (filters.categoryId) {
    const childIds = demoCategories.filter((c) => c.parent_id === filters.categoryId || c.id === filters.categoryId).map((c) => c.id);
    list = list.filter((p) => childIds.includes(p.category_id));
  }
  if (filters.brandId) list = list.filter((p) => p.brand_id === filters.brandId);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }
  if (filters.featured) list = list.filter((p) => p.featured);
  if (filters.sort === "price_asc") list.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
  else if (filters.sort === "price_desc") list.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
  else if (filters.sort === "newest") list.sort((a, b) => b.id - a.id);
  return list;
}
