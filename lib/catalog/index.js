import { getPool, query } from "@/lib/db";
import {
  demoProducts,
  demoCategories,
  demoBrands,
  getDemoProductBySlug,
  getDemoCategoryBySlug,
  getDemoProducts,
} from "@/data/catalog";

function enrichProduct(product) {
  const category = demoCategories.find((c) => c.id === product.category_id);
  const brand = demoBrands.find((b) => b.id === product.brand_id);
  return {
    ...product,
    category,
    brand,
    effectivePrice: product.sale_price ?? product.price,
  };
}

export async function getProducts(filters = {}) {
  if (!getPool()) {
    return getDemoProducts(filters).map(enrichProduct);
  }
  // DB path — simplified; falls back to demo if query fails
  try {
    let sql = `SELECT p.*, c.name as category_name, c.slug as category_slug, b.name as brand_name, b.slug as brand_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.status = 'active'`;
    const params = [];
    if (filters.categoryId) {
      sql += " AND p.category_id = ?";
      params.push(filters.categoryId);
    }
    if (filters.brandId) {
      sql += " AND p.brand_id = ?";
      params.push(filters.brandId);
    }
    if (filters.search) {
      sql += " AND (p.name LIKE ? OR p.sku LIKE ?)";
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.sort === "price_asc") sql += " ORDER BY COALESCE(p.sale_price, p.price) ASC";
    else if (filters.sort === "price_desc") sql += " ORDER BY COALESCE(p.sale_price, p.price) DESC";
    else if (filters.sort === "newest") sql += " ORDER BY p.created_at DESC";
    else sql += " ORDER BY p.featured DESC, p.name ASC";
    const rows = await query(sql, params);
    if (!rows.length) return getDemoProducts(filters).map(enrichProduct);
    return rows.map((r) => enrichProduct({
      ...r,
      featured: Boolean(r.featured),
      is_quote_only: Boolean(r.is_quote_only),
      allows_logo: Boolean(r.allows_logo),
      category: r.category_slug ? { name: r.category_name, slug: r.category_slug } : null,
      brand: r.brand_slug ? { name: r.brand_name, slug: r.brand_slug } : null,
      images: r.main_image ? [{ image: r.main_image, is_main: 1 }] : [],
      optionGroups: [],
      variants: [],
    }));
  } catch {
    return getDemoProducts(filters).map(enrichProduct);
  }
}

export async function getProductBySlug(slug) {
  if (!getPool()) {
    const p = getDemoProductBySlug(slug);
    return p ? enrichProduct(p) : null;
  }
  try {
    const rows = await query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug, b.name as brand_name, b.slug as brand_slug
       FROM products p LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN brands b ON p.brand_id = b.id
       WHERE p.slug = ? AND p.status = 'active' LIMIT 1`,
      [slug]
    );
    if (!rows.length) {
      const demo = getDemoProductBySlug(slug);
      return demo ? enrichProduct(demo) : null;
    }
    const r = rows[0];
    return enrichProduct({
      ...r,
      featured: Boolean(r.featured),
      is_quote_only: Boolean(r.is_quote_only),
      allows_logo: Boolean(r.allows_logo),
      category: { name: r.category_name, slug: r.category_slug },
      brand: { name: r.brand_name, slug: r.brand_slug },
      images: r.main_image ? [{ image: r.main_image, is_main: 1 }] : [],
      optionGroups: [],
      variants: [],
    });
  } catch {
    const demo = getDemoProductBySlug(slug);
    return demo ? enrichProduct(demo) : null;
  }
}

export async function getAllProductSlugs() {
  if (!getPool()) return demoProducts.filter((p) => p.status === "active").map((p) => p.slug);
  try {
    const rows = await query("SELECT slug FROM products WHERE status = 'active'");
    if (!rows.length) return demoProducts.map((p) => p.slug);
    return rows.map((r) => r.slug);
  } catch {
    return demoProducts.map((p) => p.slug);
  }
}

export async function getCategories() {
  if (!getPool()) return demoCategories.filter((c) => c.status === "active");
  try {
    const rows = await query("SELECT * FROM categories WHERE status = 'active' ORDER BY sort_order");
    return rows.length ? rows : demoCategories;
  } catch {
    return demoCategories;
  }
}

export async function getCategoryBySlug(slug) {
  if (!getPool()) return getDemoCategoryBySlug(slug);
  try {
    const rows = await query("SELECT * FROM categories WHERE slug = ? AND status = 'active' LIMIT 1", [slug]);
    if (!rows.length) return getDemoCategoryBySlug(slug);
    return rows[0];
  } catch {
    return getDemoCategoryBySlug(slug);
  }
}

export async function getBrands() {
  if (!getPool()) return demoBrands;
  try {
    const rows = await query("SELECT * FROM brands WHERE status = 'active'");
    return rows.length ? rows : demoBrands;
  } catch {
    return demoBrands;
  }
}

export async function resolveCartItem(productId, variantId) {
  const product = demoProducts.find((p) => p.id === Number(productId));
  if (!product) return null;
  let variant = null;
  if (variantId) {
    variant = product.variants?.find((v) => v.id === Number(variantId));
    if (!variant) return null;
  } else if (product.variants?.length) {
    variant = product.variants.find((v) => v.is_default) || product.variants[0];
  }
  const unitPrice = variant?.sale_price ?? variant?.price ?? product.sale_price ?? product.price;
  const stock = variant?.stock ?? product.stock;
  const sku = variant?.sku ?? product.sku;
  return {
    productId: product.id,
    variantId: variant?.id || null,
    productName: product.name,
    slug: product.slug,
    sku,
    unitPrice: Number(unitPrice),
    vatRate: Number(product.vat_rate),
    stock,
    stockType: product.stock_type,
    isQuoteOnly: Boolean(product.is_quote_only),
    minOrderQuantity: product.min_order_quantity,
    mainImage: product.main_image,
    allowsLogo: Boolean(product.allows_logo),
  };
}

export async function validateCartItems(items) {
  const validated = [];
  const errors = [];
  for (const item of items) {
    const resolved = await resolveCartItem(item.productId, item.variantId);
    if (!resolved) {
      errors.push({ productId: item.productId, message: "Ürün bulunamadı." });
      continue;
    }
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    if (qty < resolved.minOrderQuantity) {
      errors.push({ productId: item.productId, message: `Minimum sipariş: ${resolved.minOrderQuantity} adet.` });
      continue;
    }
    if (resolved.stockType === "stocked" && qty > resolved.stock) {
      errors.push({ productId: item.productId, message: "Yetersiz stok." });
      continue;
    }
    if (resolved.isQuoteOnly) {
      errors.push({ productId: item.productId, message: "Bu ürün yalnızca teklif ile satılır." });
      continue;
    }
    const lineSubtotal = resolved.unitPrice * qty;
    const vatAmount = lineSubtotal * (resolved.vatRate / 100);
    validated.push({
      ...resolved,
      quantity: qty,
      logoOption: item.logoOption || null,
      lineSubtotal,
      vatAmount,
      lineTotal: lineSubtotal + vatAmount,
    });
  }
  return { items: validated, errors };
}

export function getRelatedProducts(product, limit = 4) {
  return demoProducts
    .filter((p) => p.id !== product.id && p.status === "active" && (p.category_id === product.category_id || p.brand_id === product.brand_id))
    .slice(0, limit)
    .map(enrichProduct);
}
