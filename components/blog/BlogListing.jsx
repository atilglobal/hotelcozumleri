import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

function PostCard({ post }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <article className="group modern-card glass-card-dark glass-card-dark-hover overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-white/5 overflow-hidden">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-display text-4xl">HC</div>
          )}
        </div>
        <div className="p-5">
          {post.category_name && (
            <span className="text-xs font-semibold tracking-wider uppercase text-gold-light">{post.category_name}</span>
          )}
          <h2 className="font-display text-xl heading-on-dark mt-2 mb-2 group-hover:text-gold-light transition-colors line-clamp-2">
            {post.title}
          </h2>
          {post.excerpt && <p className="text-body-on-dark text-sm line-clamp-3">{post.excerpt}</p>}
          {date && <time className="block text-xs text-muted-on-dark mt-4">{date}</time>}
        </div>
      </Link>
    </article>
  );
}

export default function BlogListing({ featuredPosts, latestPosts, categories }) {
  return (
    <>
      <section className="relative pt-[calc(var(--header-height)+4rem)] pb-16 section-dark-gradient overflow-hidden">
        <SectionBackdrop variant="gradient" watermark="BLOG" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <span className="pill-eyebrow pill-eyebrow-dark mb-4">Blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-on-dark mt-2 leading-[1.05] tracking-tight">
              Otelcilik Dünyasından
              <br />
              Bilgi, Teknoloji ve Çözümler
            </h1>
            <p className="text-body-on-dark text-lg mt-6 leading-relaxed">
              Otel yönetimi, teknoloji, tekstil, hijyen ve dijital pazarlama alanlarında sektör uzmanlığımızı paylaşıyoruz.
            </p>
          </div>
        </Container>
      </section>

      {categories?.length > 0 && (
        <section className="py-6 section-dark-a relative overflow-hidden border-b border-white/10">
          <Container className="relative z-10">
            <div className="flex flex-wrap gap-2">
              <Link href="/blog" className="px-4 py-2 rounded-full text-sm bg-gold text-navy font-medium">Tümü</Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blog?kategori=${cat.slug}`}
                  className="px-4 py-2 rounded-full text-sm glass-card-dark text-body-on-dark hover:border-gold/40 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {featuredPosts?.length > 0 && (
        <section className="py-12 section-dark-b relative overflow-hidden">
          <SectionBackdrop variant="b" />
          <Container className="relative z-10">
            <h2 className="font-display text-2xl heading-on-dark mb-8">Öne Çıkan Yazılar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-12 pb-20 section-dark-c relative overflow-hidden">
        <SectionBackdrop variant="c" />
        <Container className="relative z-10">
          <h2 className="font-display text-2xl heading-on-dark mb-8">En Yeni Yazılar</h2>
          {latestPosts?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-body-on-dark">Henüz yayınlanmış blog yazısı bulunmuyor.</p>
          )}
        </Container>
      </section>
    </>
  );
}
