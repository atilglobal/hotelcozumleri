import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/admin/api";
import { query } from "@/lib/db";
import { getAdminPostById, normalizePostInput } from "@/lib/blog";

export const GET = withAdmin(async (_request, { params }) => {
  const { id } = await params;
  const post = await getAdminPostById(Number(id));
  if (!post) return NextResponse.json({ message: "Yazı bulunamadı." }, { status: 404 });
  return NextResponse.json({ post });
});

export const PUT = withAdmin(async (request, { params }, session) => {
  const { id } = await params;
  const existing = await getAdminPostById(Number(id));
  if (!existing) return NextResponse.json({ message: "Yazı bulunamadı." }, { status: 404 });

  const data = await request.json();
  const post = normalizePostInput(data, session.adminId);
  if (!post.title || !post.slug) {
    return NextResponse.json({ message: "Başlık ve slug gereklidir." }, { status: 400 });
  }
  const dup = await query("SELECT id FROM blog_posts WHERE slug = ? AND id != ? LIMIT 1", [post.slug, id]);
  if (dup.length) {
    return NextResponse.json({ message: "Bu slug zaten kullanılıyor." }, { status: 400 });
  }

  await query(
    `UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, featured_image=?, category_id=?, status=?, featured=?, published_at=?, seo_title=?, seo_description=?
     WHERE id=?`,
    [post.title, post.slug, post.excerpt, post.content, post.featured_image, post.category_id, post.status, post.featured, post.published_at, post.seo_title, post.seo_description, id]
  );
  return NextResponse.json({ success: true });
});

export const DELETE = withAdmin(async (_request, { params }) => {
  const { id } = await params;
  await query("DELETE FROM blog_posts WHERE id = ?", [id]);
  return NextResponse.json({ success: true });
});
