import { createMetadata } from "@/lib/metadata";
import ShopPageShell from "@/components/shop/ShopPageShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = createMetadata({
  title: "Şifremi Unuttum",
  path: "/sifremi-unuttum",
  noIndex: true,
});

export default function SifremiUnuttumPage() {
  return (
    <ShopPageShell title="Şifremi Unuttum">
      <ForgotPasswordForm />
    </ShopPageShell>
  );
}
