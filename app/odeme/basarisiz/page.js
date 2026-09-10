import { Suspense } from "react";
import PaymentResultClient from "@/components/shop/PaymentResultClient";
import ShopPageShell from "@/components/shop/ShopPageShell";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Ödeme Başarısız", path: "/odeme/basarisiz", noIndex: true });

export default function PaymentFailPage() {
  return (
    <ShopPageShell title="Ödeme Sonucu">
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <PaymentResultClient type="failed" />
      </Suspense>
    </ShopPageShell>
  );
}
