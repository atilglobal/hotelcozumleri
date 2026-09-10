import BlogForm from "@/components/admin/BlogForm";

export default async function AdminBlogEditPage({ params }) {
  const { id } = await params;
  return <BlogForm postId={id} />;
}
