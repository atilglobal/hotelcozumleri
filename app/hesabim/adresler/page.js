import { createMetadata } from "@/lib/metadata";
import AddressManager from "@/components/shop/AddressManager";

export const metadata = createMetadata({
  title: "Adreslerim",
  path: "/hesabim/adresler",
  noIndex: true,
});

export default function AdreslerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-navy mb-6">Adreslerim</h1>
      <AddressManager />
    </div>
  );
}
