import { NextResponse } from "next/server";
import { withAdmin, parsePagination } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { logAudit } from "@/lib/audit";

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9ğüşıöç]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c");
}

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const { page, limit, offset } = parsePagination(searchParams);
  const q = searchParams.get("q");
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");

  let where = "1=1";
  const params = [];
  if (q) { where += " AND (p.name LIKE ? OR p.sku LIKE ?)"; params.push(`%${q}%`, `%${q}%`); }
  if (status) { where += " AND p.status = ?"; params.push(status); }
  if (categoryId) { where += " AND p.category_id = ?"; params.push(categoryId); }

  const countRows = await query(`SELECT COUNT(*) as cnt FROM products p WHERE ${where}`, params);
  const rows = await query(
    `SELECT p.*, c.name as category_name, b.name as brand_name FROM products p
     LEFT JOIN categories c ON p.category_id = c.id LEFT JOIN brands b ON p.brand_id = b.id
     WHERE ${where} ORDER BY p.updated_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return NextResponse.json({ products: rows, total: countRows[0]?.cnt || 0, page, limit });
});

export const POST = withAdmin(async (request, _ctx, session) => {
  const data = await request.json();
  const slug = data.slug || slugify(data.name);
  const result = await query(
    `INSERT INTO products (name, slug, sku, short_description, description, category_id, brand_id, price, sale_price, cost_price, vat_rate, stock, stock_type, status, featured, is_quote_only, min_order_quantity, unit, main_image, seo_title, seo_description, allows_logo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.name, slug, data.sku || null, data.short_description || null, data.description || null, data.category_id || null, data.brand_id || null,
      data.price || 0, data.sale_price || null, data.cost_price || null, data.vat_rate || 20, data.stock || 0, data.stock_type || "stocked",
      data.status || "draft", data.featured ? 1 : 0, data.is_quote_only ? 1 : 0, data.min_order_quantity || 1, data.unit || "adet",
      data.main_image || null, data.seo_title || null, data.seo_description || null, data.allows_logo ? 1 : 0]
  );
  await logAudit({ adminUserId: session.adminId, action: "product_created", entityType: "product", entityId: result.insertId });
  return NextResponse.json({ success: true, id: result.insertId });
});

export const PATCH = withAdmin(async (request, _ctx, session) => {
  const { ids, action } = await request.json();
  if (!ids?.length || !["active", "passive"].includes(action)) {
    return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
  }
  const placeholders = ids.map(() => "?").join(",");
  await query(`UPDATE products SET status = ? WHERE id IN (${placeholders})`, [action === "active" ? "active" : "passive", ...ids]);
  await logAudit({ adminUserId: session.adminId, action: "products_bulk_update", metadata: { ids, action } });
  return NextResponse.json({ success: true });
});
