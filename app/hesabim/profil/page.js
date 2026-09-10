import { createMetadata } from "@/lib/metadata";
import ProfileForm from "@/components/shop/ProfileForm";

export const metadata = createMetadata({
  title: "Profil",
  path: "/hesabim/profil",
  noIndex: true,
});

export default function ProfilPage() {
  return <ProfileForm />;
}
