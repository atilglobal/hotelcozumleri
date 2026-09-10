import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async () => {
  const rows = await query("SELECT b.*, (SELECT COUNT(*) FROM products p WHERE p.brand_id = b.id) as product_count FROM brands b ORDER BY name");
  return NextResponse.json({ brands: rows });
});

export const POST = withAdmin(async (request) => {
  const data = await request.json();
  const result = await query("INSERT INTO brands (name, slug, logo, description, status) VALUES (?, ?, ?, ?, ?)", [data.name, data.slug, data.logo, data.description, data.status || "active"]);
  return NextResponse.json({ success: true, id: result.insertId });
});

export const PUT = withAdmin(async (request) => {
  const data = await request.json();
  await query("UPDATE brands SET name=?, slug=?, logo=?, description=?, status=? WHERE id=?", [data.name, data.slug, data.logo, data.description, data.status, data.id]);
  return NextResponse.json({ success: true });
});

export const DELETE = withAdmin(async (request) => {
  const { id } = await request.json();
  const products = await query("SELECT COUNT(*) as cnt FROM products WHERE brand_id = ?", [id]);
  if (products[0]?.cnt > 0) {
    return NextResponse.json({ message: "Bu markaya bağlı ürünler bulunmaktadır." }, { status: 400 });
  }
  await query("DELETE FROM brands WHERE id = ?", [id]);
  return NextResponse.json({ success: true });
});
