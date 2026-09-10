import { query, getPool } from "@/lib/db";
import { sanitizeHtml } from "@/lib/sanitize";

const FALLBACK_CATEGORIES = [
  { id: 1, name: "Otel Yönetimi", slug: "otel-yonetimi", status: "active" },
  { id: 2, name: "Hotelio", slug: "hotelio", status: "active" },
  { id: 3, name: "Otel Teknolojileri", slug: "otel-teknolojileri", status: "active" },
];

export async function getBlogCategories(activeOnly = true) {
  if (!getPool()) return FALLBACK_CATEGORIES;
  try {
    const sql = activeOnly
      ? "SELECT * FROM blog_categories WHERE status = 'active' ORDER BY name"
      : "SELECT * FROM blog_categories ORDER BY name";
    const rows = await query(sql);
    return rows.length ? rows : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function getPublishedPosts({ limit = 12, offset = 0, categorySlug = null, featured = false } = {}) {
  if (!getPool()) return [];
  try {
    let sql = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug,
             CONCAT(a.name, ' ', a.surname) AS author_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON c.id = p.category_id
      LEFT JOIN admin_users a ON a.id = p.author_id
      WHERE p.status = 'published' AND p.published_at <= NOW()`;
    const params = [];
    if (categorySlug) {
      sql += " AND c.slug = ?";
      params.push(categorySlug);
    }
    if (featured) {
      sql += " AND p.featured = 1";
    }
    sql += " ORDER BY p.published_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);
    return await query(sql, params);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug) {
  if (!getPool()) return null;
  try {
    const rows = await query(
      `SELECT p.*, c.name AS category_name, c.slug AS category_slug,
              CONCAT(a.name, ' ', a.surname) AS author_name
       FROM blog_posts p
       LEFT JOIN blog_categories c ON c.id = p.category_id
       LEFT JOIN admin_users a ON a.id = p.author_id
       WHERE p.slug = ? AND p.status = 'published' AND p.published_at <= NOW()
       LIMIT 1`,
      [slug]
    );
    return rows[0] || null;
  } catch {
    return null;
  }
}

export async function getRelatedPosts(post, limit = 3) {
  if (!getPool() || !post?.category_id) return [];
  try {
    return await query(
      `SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.published_at,
              c.name AS category_name, c.slug AS category_slug
       FROM blog_posts p
       LEFT JOIN blog_categories c ON c.id = p.category_id
       WHERE p.status = 'published' AND p.published_at <= NOW()
         AND p.category_id = ? AND p.id != ?
       ORDER BY p.published_at DESC LIMIT ?`,
      [post.category_id, post.id, limit]
    );
  } catch {
    return [];
  }
}

export async function getAllPublishedSlugs() {
  if (!getPool()) return [];
  try {
    const rows = await query(
      "SELECT slug FROM blog_posts WHERE status = 'published' AND published_at <= NOW()"
    );
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}

export async function getAdminPosts({ status = null, page = 1, limit = 20 } = {}) {
  if (!getPool()) return { posts: [], total: 0 };
  const offset = (page - 1) * limit;
  let where = "1=1";
  const params = [];
  if (status) {
    where += " AND p.status = ?";
    params.push(status);
  }
  const posts = await query(
    `SELECT p.*, c.name AS category_name,
            CONCAT(a.name, ' ', a.surname) AS author_name
     FROM blog_posts p
     LEFT JOIN blog_categories c ON c.id = p.category_id
     LEFT JOIN admin_users a ON a.id = p.author_id
     WHERE ${where}
     ORDER BY p.updated_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  const [{ total }] = await query(`SELECT COUNT(*) AS total FROM blog_posts p WHERE ${where}`, params);
  return { posts, total };
}

export async function getAdminPostById(id) {
  if (!getPool()) return null;
  const rows = await query("SELECT * FROM blog_posts WHERE id = ? LIMIT 1", [id]);
  return rows[0] || null;
}

export function normalizePostInput(data, authorId) {
  return {
    title: String(data.title || "").trim(),
    slug: String(data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"),
    excerpt: String(data.excerpt || "").trim(),
    content: sanitizeHtml(data.content || ""),
    featured_image: data.featured_image?.trim() || null,
    author_id: authorId,
    category_id: data.category_id ? Number(data.category_id) : null,
    status: ["draft", "published", "archived"].includes(data.status) ? data.status : "draft",
    featured: data.featured ? 1 : 0,
    seo_title: data.seo_title?.trim() || null,
    seo_description: data.seo_description?.trim() || null,
    published_at: data.status === "published"
      ? (data.published_at || new Date().toISOString().slice(0, 19).replace("T", " "))
      : data.published_at || null,
  };
}
