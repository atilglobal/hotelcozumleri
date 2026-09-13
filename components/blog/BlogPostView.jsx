import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionBackdrop from "@/components/ui/SectionBackdrop";

export default function BlogPostView({ post, relatedPosts }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const isHotelio = post.category_slug === "hotelio";

  return (
    <>
      <article className="relative pt-[calc(var(--header-height)+3rem)] pb-16 section-dark-b overflow-hidden">
        <SectionBackdrop variant="b" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto">
            {post.category_name && (
              <Link href={`/blog?kategori=${post.category_slug}`} className="text-gold-light text-xs font-semibold tracking-wider uppercase hover:underline">
                {post.category_name}
              </Link>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl heading-on-dark mt-4 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-on-dark mb-8">
              {date && <time dateTime={post.published_at}>{date}</time>}
              {post.author_name && <span>{post.author_name}</span>}
            </div>
          </div>

          {post.featured_image && (
            <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-xl overflow-hidden mb-10 ring-1 ring-white/10">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          <div
            className="max-w-3xl mx-auto prose prose-navy prose-headings:font-display prose-a:text-gold-light"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>

      {relatedPosts?.length > 0 && (
        <section className="py-12 section-dark-c relative overflow-hidden">
          <SectionBackdrop variant="c" />
          <Container className="relative z-10">
            <h2 className="font-display text-2xl heading-on-dark mb-6">İlgili Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="glass-card-dark glass-card-dark-hover rounded-xl p-5 transition-colors">
                  <h3 className="font-display text-lg heading-on-dark">{rp.title}</h3>
                  {rp.excerpt && <p className="text-sm text-body-on-dark mt-2 line-clamp-2">{rp.excerpt}</p>}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 section-dark-gradient relative overflow-hidden">
        <SectionBackdrop variant="gradient" />
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl heading-on-dark mb-4">
              {isHotelio ? "Hotelio\u2019yu Keşfet" : "Oteliniz İçin Çözüm Arıyorsanız Bizimle Görüşün."}
            </h2>
            <p className="text-body-on-dark mb-8">
              {isHotelio
                ? "Akıllı otel yönetim platformu Hotelio ile operasyonlarınızı tek merkezden yönetin."
                : "Tekstilden teknolojiye, otelinizin tüm ihtiyaçları için yanınızdayız."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isHotelio ? (
                <>
                  <Button href="/hotelio" variant="gold" size="lg">Hotelio&apos;yu Keşfet</Button>
                  <Button href="/hotelio-demo" variant="secondary-glass" size="lg">Demo Talep Et</Button>
                </>
              ) : (
                <>
                  <Button href="/iletisim" variant="gold" size="lg">İletişime Geç</Button>
                  <Button href="/cozumler" variant="secondary-glass" size="lg">Çözümleri İncele</Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
