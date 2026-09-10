import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import CartPageClient from "@/components/shop/CartPageClient";

export const metadata = createMetadata({
  title: "Sepet",
  path: "/sepet",
  noIndex: true,
});

export default function SepetPage() {
  return (
    <ShopPageShell title="Sepetim">
      <CartPageClient />
    </ShopPageShell>
  );
}
