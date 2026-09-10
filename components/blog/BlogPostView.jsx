import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function BlogPostView({ post, relatedPosts }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;
  const isHotelio = post.category_slug === "hotelio";

  return (
    <>
      <article className="pt-[calc(var(--header-height)+3rem)] pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {post.category_name && (
              <Link href={`/blog?kategori=${post.category_slug}`} className="text-blue text-xs font-semibold tracking-wider uppercase hover:underline">
                {post.category_name}
              </Link>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-navy mt-4 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-light mb-8">
              {date && <time dateTime={post.published_at}>{date}</time>}
              {post.author_name && <span>{post.author_name}</span>}
            </div>
          </div>

          {post.featured_image && (
            <div className="relative max-w-4xl mx-auto aspect-[16/9] rounded-xl overflow-hidden mb-10">
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
            className="max-w-3xl mx-auto prose prose-navy prose-headings:font-display prose-a:text-blue"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>

      {relatedPosts?.length > 0 && (
        <section className="py-12 bg-navy/5">
          <Container>
            <h2 className="font-display text-2xl text-navy mb-6">İlgili Yazılar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="bg-white rounded-lg p-5 border border-navy/8 hover:border-blue transition-colors">
                  <h3 className="font-display text-lg text-navy">{rp.title}</h3>
                  {rp.excerpt && <p className="text-sm text-gray-light mt-2 line-clamp-2">{rp.excerpt}</p>}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 bg-navy text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-4">
              {isHotelio ? "Hotelio\u2019yu Keşfet" : "Oteliniz İçin Çözüm Arıyorsanız Bizimle Görüşün."}
            </h2>
            <p className="text-white/70 mb-8">
              {isHotelio
                ? "Akıllı otel yönetim platformu Hotelio ile operasyonlarınızı tek merkezden yönetin."
                : "Tekstilden teknolojiye, otelinizin tüm ihtiyaçları için yanınızdayız."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {isHotelio ? (
                <>
                  <Button href="/hotelio" variant="gold" size="lg">Hotelio&apos;yu Keşfet</Button>
                  <Button href="/hotelio-demo" variant="secondary" size="lg">Demo Talep Et</Button>
                </>
              ) : (
                <>
                  <Button href="/iletisim" variant="gold" size="lg">İletişime Geç</Button>
                  <Button href="/cozumler" variant="secondary" size="lg">Çözümleri İncele</Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
