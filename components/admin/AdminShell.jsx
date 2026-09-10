"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "◫" },
  { href: "/admin/siparisler", label: "Siparişler", icon: "☰" },
  { href: "/admin/urunler", label: "Ürünler", icon: "▣" },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: "▤" },
  { href: "/admin/markalar", label: "Markalar", icon: "◈" },
  { href: "/admin/musteriler", label: "Müşteriler", icon: "◎" },
  { href: "/admin/teklifler", label: "Teklifler", icon: "✉" },
  { href: "/admin/hotelio-demo", label: "Hotelio Demo", icon: "⬡" },
  { href: "/admin/formlar", label: "Form Talepleri", icon: "☷" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/yasal-sayfalar", label: "Yasal Sayfalar", icon: "§" },
  { href: "/admin/odemeler", label: "Ödemeler", icon: "₺" },
  { href: "/admin/banka-hesaplari", label: "Banka Hesapları", icon: "▭" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "⚿", superOnly: true },
  { href: "/admin/ayarlar/genel", label: "Ayarlar", icon: "⚙" },
];

export default function AdminShell({ children, title }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/admin/auth/me").then((r) => r.json()).then((d) => {
      if (!d.admin) router.push("/admin/login");
      setAdmin(d.admin);
    });
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return children;

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f2347] text-white flex flex-col transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b border-white/10">
          <Link href="/admin" className="font-display text-xl text-white">Hotel Çözümleri</Link>
          <p className="text-xs text-white/50 mt-1">Yönetim Paneli</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {nav.filter((n) => !n.superOnly || admin?.role === "SUPER_ADMIN").map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={cn("flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors", active ? "bg-white/15 text-white font-medium" : "text-white/65 hover:text-white hover:bg-white/8")}>
                <span className="w-5 text-center opacity-70">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/" className="block text-sm text-white/60 hover:text-white">Siteyi Gör →</Link>
          <button type="button" onClick={handleLogout} className="text-sm text-white/60 hover:text-white">Çıkış</button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button type="button" className="lg:hidden text-navy" onClick={() => setSidebarOpen(true)} aria-label="Menü">☰</button>
            <h1 className="font-display text-xl text-navy">{title || "Dashboard"}</h1>
          </div>
          <div className="flex items-center gap-4">
            {unread > 0 && <span className="text-xs bg-gold text-navy px-2 py-0.5 rounded-full">{unread}</span>}
            <div className="text-sm text-right">
              <p className="font-medium text-navy">{admin?.name}</p>
              <p className="text-xs text-gray-light">{admin?.role === "SUPER_ADMIN" ? "Süper Admin" : "Admin"}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
