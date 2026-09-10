import AccountLayout from "@/components/shop/AccountLayout";

export default function HesabimLayout({ children }) {
  return (
    <section className="pt-[calc(var(--header-height)+3rem)] pb-20 min-h-[60vh] bg-cream/30">
      <div className="mx-auto max-w-[var(--container-max)] px-5 md:px-8 lg:px-10">
        <AccountLayout>{children}</AccountLayout>
      </div>
    </section>
  );
}
