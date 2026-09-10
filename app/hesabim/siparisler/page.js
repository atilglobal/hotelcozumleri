import { createMetadata } from "@/lib/metadata";
import OrdersList from "@/components/shop/OrdersList";

export const metadata = createMetadata({
  title: "Siparişlerim",
  path: "/hesabim/siparisler",
  noIndex: true,
});

export default function SiparislerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-navy mb-6">Siparişlerim</h1>
      <OrdersList />
    </div>
  );
}
