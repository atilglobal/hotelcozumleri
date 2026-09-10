import { siteConfig } from "@/config/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gölcük",
      addressRegion: "Kocaeli",
      addressCountry: "TR",
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteConfig.url}${item.href}` : undefined,
    })),
  };
}

export function serviceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Hotelio",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Otel odaklı yönetim platformu. Rezervasyon, ön büro, misafir ilişkileri, finans, raporlama, housekeeping ve SPA süreçlerini tek merkezde birleştirir.",
    provider: {
      "@type": "Organization",
      name: "Hotel Çözümleri",
      url: siteConfig.url,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/urunler?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.seo_description,
    image: post.featured_image ? `${siteConfig.url}${post.featured_image.startsWith("/") ? "" : "/"}${post.featured_image}` : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: post.author_name
      ? { "@type": "Person", name: post.author_name }
      : { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function productSchema(product) {
  const price = product.sale_price ?? product.price;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short_description || product.description,
    sku: product.sku,
    image: product.main_image ? `${siteConfig.url}${product.main_image}` : undefined,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
  };
  if (!product.is_quote_only && price) {
    schema.offers = {
      "@type": "Offer",
      price: String(price),
      priceCurrency: "TRY",
      availability:
        product.stock_type === "quote"
          ? "https://schema.org/PreOrder"
          : product.stock > 0 || product.stock_type === "unlimited"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
    };
  }
  return schema;
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
