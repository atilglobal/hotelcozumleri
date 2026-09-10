"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

const links = [
  { href: "/hesabim", label: "Genel Bakış" },
  { href: "/hesabim/siparisler", label: "Siparişlerim" },
  { href: "/hesabim/adresler", label: "Adreslerim" },
  { href: "/hesabim/favoriler", label: "Favorilerim" },
  { href: "/hesabim/profil", label: "Profil" },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8">
      <aside className="bg-white border border-navy/8 rounded-sm p-5 h-fit">
        <p className="text-sm text-gray-light mb-1">Hoş geldiniz</p>
        <p className="font-medium text-navy mb-6">{user?.name || "—"}</p>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2 text-sm rounded-sm transition-colors",
                pathname === link.href ? "bg-blue/10 text-blue font-medium" : "text-gray hover:text-navy hover:bg-navy/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button onClick={logout} variant="outline" size="sm" className="w-full mt-6">
          Çıkış Yap
        </Button>
      </aside>
      <div>{children}</div>
    </div>
  );
}
