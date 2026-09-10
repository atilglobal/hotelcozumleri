import { createMetadata } from "@/lib/metadata";
import AccountDashboard from "@/components/shop/AccountDashboard";

export const metadata = createMetadata({
  title: "Hesabım",
  path: "/hesabim",
  noIndex: true,
});

export default function HesabimPage() {
  return <AccountDashboard />;
}
