import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = createMetadata({
  title: "Kayıt Ol",
  path: "/kayit",
  noIndex: true,
});

export default function KayitPage() {
  return (
    <ShopPageShell title="Kayıt Ol">
      <RegisterForm />
    </ShopPageShell>
  );
}
