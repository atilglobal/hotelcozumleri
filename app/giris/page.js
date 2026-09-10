import { Suspense } from "react";
import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = createMetadata({
  title: "Giriş",
  path: "/giris",
  noIndex: true,
});

export default function GirisPage() {
  return (
    <ShopPageShell title="Giriş Yap">
      <Suspense fallback={<p className="text-gray-light">Yükleniyor...</p>}>
        <LoginForm />
      </Suspense>
    </ShopPageShell>
  );
}
