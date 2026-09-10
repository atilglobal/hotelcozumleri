import { createMetadata } from "@/lib/metadata";
import { getBlogCategories, getPublishedPosts } from "@/lib/blog";
import BlogListing from "@/components/blog/BlogListing";

export const metadata = createMetadata({
  title: "Blog",
  description: "Otelcilik dünyasından bilgi, teknoloji ve çözümler. Otel yönetimi, Hotelio, tekstil, hijyen ve dijital pazarlama içerikleri.",
  path: "/blog",
});

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const categorySlug = params?.kategori || null;

  const [categories, featuredPosts, latestPosts] = await Promise.all([
    getBlogCategories(),
    categorySlug ? [] : getPublishedPosts({ limit: 3, featured: true }),
    getPublishedPosts({ limit: 12, categorySlug }),
  ]);

  return (
    <BlogListing
      featuredPosts={featuredPosts}
      latestPosts={latestPosts}
      categories={categories}
    />
  );
}
