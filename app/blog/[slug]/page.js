import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, JsonLd } from "@/lib/schema";
import BlogPostView from "@/components/blog/BlogPostView";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return createMetadata({
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title, href: null },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={articleSchema(post)} />
      <BlogPostView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
