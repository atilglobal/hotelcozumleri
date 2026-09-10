import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async () => {
  const rows = await query("SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as product_count FROM categories c ORDER BY sort_order, name");
  return NextResponse.json({ categories: rows });
});

export const POST = withAdmin(async (request) => {
  const data = await request.json();
  const result = await query(
    "INSERT INTO categories (parent_id, name, slug, description, image, seo_title, seo_description, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [data.parent_id || null, data.name, data.slug, data.description, data.image, data.seo_title, data.seo_description, data.sort_order || 0, data.status || "active"]
  );
  return NextResponse.json({ success: true, id: result.insertId });
});

export const PUT = withAdmin(async (request) => {
  const data = await request.json();
  await query(
    "UPDATE categories SET parent_id=?, name=?, slug=?, description=?, image=?, seo_title=?, seo_description=?, sort_order=?, status=? WHERE id=?",
    [data.parent_id || null, data.name, data.slug, data.description, data.image, data.seo_title, data.seo_description, data.sort_order, data.status, data.id]
  );
  return NextResponse.json({ success: true });
});

export const DELETE = withAdmin(async (request) => {
  const { id } = await request.json();
  const products = await query("SELECT COUNT(*) as cnt FROM products WHERE category_id = ?", [id]);
  if (products[0]?.cnt > 0) {
    return NextResponse.json({ message: "Bu kategoriye bağlı ürünler bulunmaktadır." }, { status: 400 });
  }
  await query("DELETE FROM categories WHERE id = ?", [id]);
  return NextResponse.json({ success: true });
});
