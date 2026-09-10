import { createMetadata } from "@/lib/metadata";
import WishlistView from "@/components/shop/WishlistView";

export const metadata = createMetadata({
  title: "Favorilerim",
  path: "/hesabim/favoriler",
  noIndex: true,
});

export default function FavorilerPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-navy mb-6">Favorilerim</h1>
      <WishlistView />
    </div>
  );
}
