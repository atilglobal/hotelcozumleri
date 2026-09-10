import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import CheckoutPageClient from "@/components/shop/CheckoutPageClient";

export const metadata = createMetadata({
  title: "Ödeme",
  path: "/odeme",
  noIndex: true,
});

export default function OdemePage() {
  return (
    <ShopPageShell title="Ödeme">
      <CheckoutPageClient />
    </ShopPageShell>
  );
}
