"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

export default function HeaderActions({ isLight }) {
  const { count } = useCart();
  const { user } = useAuth();

  return (
    <div className="hidden lg:flex items-center gap-2 shrink-0">
      <Link
        href="/sepet"
        className={cn(
          "relative w-10 h-10 flex items-center justify-center rounded-sm transition-colors",
          isLight ? "text-white/80 hover:text-white hover:bg-white/10" : "text-navy hover:text-blue hover:bg-navy/5"
        )}
        aria-label="Sepet"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6h15l-1.5 9h-12z" /><path d="M6 6l-1-2H2" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gold text-navy text-[10px] font-bold rounded-full flex items-center justify-center">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
      <Link
        href={user ? "/hesabim" : "/giris"}
        className={cn(
          "w-10 h-10 flex items-center justify-center rounded-sm transition-colors",
          isLight ? "text-white/80 hover:text-white hover:bg-white/10" : "text-navy hover:text-blue hover:bg-navy/5"
        )}
        aria-label={user ? "Hesabım" : "Giriş"}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      </Link>
    </div>
  );
}
