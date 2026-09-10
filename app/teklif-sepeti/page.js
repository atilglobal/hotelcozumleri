import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import QuoteCartPageClient from "@/components/shop/QuoteCartPageClient";

export const metadata = createMetadata({
  title: "Teklif Sepeti",
  path: "/teklif-sepeti",
  noIndex: true,
});

export default function TeklifSepetiPage() {
  return (
    <ShopPageShell title="Teklif Sepeti" subtitle="Toplu alım ve teklif talepleriniz için ürünlerinizi burada biriktirin.">
      <QuoteCartPageClient />
    </ShopPageShell>
  );
}
