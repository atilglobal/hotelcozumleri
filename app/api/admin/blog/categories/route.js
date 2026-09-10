import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";

export const GET = withAdmin(async () => {
  const categories = await query("SELECT * FROM blog_categories ORDER BY name");
  return NextResponse.json({ categories });
});

export const POST = withAdmin(async (request) => {
  const data = await request.json();
  const name = String(data.name || "").trim();
  const slug = String(data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (!name || !slug) {
    return NextResponse.json({ message: "Ad ve slug gereklidir." }, { status: 400 });
  }
  const result = await query(
    "INSERT INTO blog_categories (name, slug, description, status) VALUES (?, ?, ?, ?)",
    [name, slug, data.description || null, data.status || "active"]
  );
  return NextResponse.json({ success: true, id: result.insertId });
});

export const PUT = withAdmin(async (request) => {
  const data = await request.json();
  if (!data.id) return NextResponse.json({ message: "ID gereklidir." }, { status: 400 });
  await query(
    "UPDATE blog_categories SET name=?, slug=?, description=?, status=? WHERE id=?",
    [data.name, data.slug, data.description, data.status, data.id]
  );
  return NextResponse.json({ success: true });
});

export const DELETE = withAdmin(async (request) => {
  const { id } = await request.json();
  const posts = await query("SELECT COUNT(*) AS cnt FROM blog_posts WHERE category_id = ?", [id]);
  if (posts[0]?.cnt > 0) {
    return NextResponse.json({ message: "Bu kategoriye bağlı yazılar var." }, { status: 400 });
  }
  await query("DELETE FROM blog_categories WHERE id = ?", [id]);
  return NextResponse.json({ success: true });
});
