import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { getAdminPosts, normalizePostInput } from "@/lib/blog";

export const GET = withAdmin(async (request) => {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const result = await getAdminPosts({ status, page });
  return NextResponse.json(result);
});

export const POST = withAdmin(async (request, _ctx, session) => {
  const data = await request.json();
  const post = normalizePostInput(data, session.adminId);
  if (!post.title || !post.slug) {
    return NextResponse.json({ message: "Başlık ve slug gereklidir." }, { status: 400 });
  }
  const existing = await query("SELECT id FROM blog_posts WHERE slug = ? LIMIT 1", [post.slug]);
  if (existing.length) {
    return NextResponse.json({ message: "Bu slug zaten kullanılıyor." }, { status: 400 });
  }
  const result = await query(
    `INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author_id, category_id, status, featured, published_at, seo_title, seo_description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [post.title, post.slug, post.excerpt, post.content, post.featured_image, post.author_id, post.category_id, post.status, post.featured, post.published_at, post.seo_title, post.seo_description]
  );
  return NextResponse.json({ success: true, id: result.insertId });
});
