import Container from "@/components/ui/Container";

export default function ShopPageShell({ title, subtitle, children }) {
  return (
    <>
      {(title || subtitle) && (
        <div className="pt-[calc(var(--header-height)+1rem)] bg-mesh-light border-b border-navy/5">
          <Container className="py-10 md:py-14">
            <div className="max-w-2xl">
              {title && (
                <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3 tracking-tight">{title}</h1>
              )}
              {subtitle && <p className="text-gray-light text-lg font-medium">{subtitle}</p>}
            </div>
          </Container>
        </div>
      )}
      <section className={`pb-20 min-h-[50vh] ${title || subtitle ? "pt-10" : "pt-[calc(var(--header-height)+3rem)]"}`}>
        <Container>{children}</Container>
      </section>
    </>
  );
}
