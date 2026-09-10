import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Yönetim Paneli | Hotel Çözümleri",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
