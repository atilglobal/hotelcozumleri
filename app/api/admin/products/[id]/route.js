import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { logAudit } from "@/lib/audit";

export const GET = withAdmin(async (_req, { params }) => {
  const { id } = await params;
  const products = await query("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
  if (!products.length) return NextResponse.json({ message: "Ürün bulunamadı." }, { status: 404 });
  const images = await query("SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order", [id]);
  const optionGroups = await query("SELECT * FROM product_option_groups WHERE product_id = ? ORDER BY sort_order", [id]);
  for (const g of optionGroups) {
    g.options = await query("SELECT * FROM product_options WHERE group_id = ? ORDER BY sort_order", [g.id]);
  }
  const variants = await query("SELECT * FROM product_variants WHERE product_id = ?", [id]);
  for (const v of variants) {
    const opts = await query("SELECT option_id FROM product_variant_options WHERE variant_id = ?", [v.id]);
    v.options = opts.map((o) => o.option_id);
  }
  return NextResponse.json({ product: { ...products[0], images, optionGroups, variants } });
});

export const PUT = withAdmin(async (request, { params }, session) => {
  const { id } = await params;
  const data = await request.json();
  await query(
    `UPDATE products SET name=?, slug=?, sku=?, short_description=?, description=?, category_id=?, brand_id=?, price=?, sale_price=?, cost_price=?, vat_rate=?, stock=?, stock_type=?, status=?, featured=?, is_quote_only=?, min_order_quantity=?, unit=?, main_image=?, seo_title=?, seo_description=?, allows_logo=? WHERE id=?`,
    [data.name, data.slug, data.sku, data.short_description, data.description, data.category_id, data.brand_id, data.price, data.sale_price, data.cost_price, data.vat_rate, data.stock, data.stock_type, data.status, data.featured ? 1 : 0, data.is_quote_only ? 1 : 0, data.min_order_quantity, data.unit, data.main_image, data.seo_title, data.seo_description, data.allows_logo ? 1 : 0, id]
  );
  await logAudit({ adminUserId: session.adminId, action: "product_updated", entityType: "product", entityId: Number(id) });
  return NextResponse.json({ success: true });
});

export const DELETE = withAdmin(async (_req, { params }, session) => {
  const { id } = await params;
  await query("UPDATE products SET status = 'passive' WHERE id = ?", [id]);
  await logAudit({ adminUserId: session.adminId, action: "product_archived", entityType: "product", entityId: Number(id) });
  return NextResponse.json({ success: true });
});
