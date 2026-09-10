import { Suspense } from "react";
import PaymentResultClient from "@/components/shop/PaymentResultClient";
import ShopPageShell from "@/components/shop/ShopPageShell";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({ title: "Ödeme Başarılı", path: "/odeme/basarili", noIndex: true });

export default function PaymentSuccessPage() {
  return (
    <ShopPageShell title="Ödeme Sonucu">
      <Suspense fallback={<p>Yükleniyor...</p>}>
        <PaymentResultClient type="success" />
      </Suspense>
    </ShopPageShell>
  );
}
