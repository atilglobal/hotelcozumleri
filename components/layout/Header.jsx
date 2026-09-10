"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { mainNavigation, ctaLinks } from "@/config/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import SolutionsMegaMenu from "./SolutionsMegaMenu";
import MobileMenu from "./MobileMenu";
import HeaderActions from "./HeaderActions";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCozumler = pathname.startsWith("/cozumler");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerTransparent = isHome && !scrolled;
  const headerScrolled = scrolled || !isHome;
  const navLight = headerTransparent && !headerScrolled;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-3 md:pt-4 pointer-events-none">
        <div
          className={cn(
            "mx-auto max-w-[var(--container-max)] pointer-events-auto transition-all duration-500",
            headerScrolled
              ? "glass-header-light rounded-2xl px-4 md:px-6 shadow-[var(--shadow-soft)]"
              : headerTransparent
                ? "bg-transparent px-2"
                : "glass-header rounded-2xl px-4 md:px-6"
          )}
          style={{ height: headerScrolled ? "var(--header-height-scrolled)" : "var(--header-height)" }}
        >
          <div className="h-full flex items-center justify-between gap-4">
            <Logo variant={navLight ? "light" : "dark"} />

            <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl" aria-label="Ana navigasyon">
              {mainNavigation.map((item) => {
                if (item.megaMenu) {
                  return (
                    <SolutionsMegaMenu
                      key={item.href}
                      isLight={navLight}
                      isActive={isCozumler}
                    />
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      navLight
                        ? isActive
                          ? "bg-white/15 text-white"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                        : isActive
                          ? "bg-ice text-blue-deep"
                          : "text-gray hover:text-navy hover:bg-navy/5"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <HeaderActions isLight={navLight} />
              <Button href={ctaLinks.teklif} variant={navLight ? "hero-secondary" : "outline"} size="sm">
                Teklif Al
              </Button>
              <Button href={ctaLinks.hotelioDemo} variant="gold" size="sm">
                Hotelio Demo
              </Button>
            </div>

            <button
              type="button"
              className={cn(
                "lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl transition-colors",
                navLight ? "text-white hover:bg-white/10" : "text-navy hover:bg-navy/5"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Menüyü aç"
              aria-expanded={mobileOpen}
            >
              <span className="block w-5 h-0.5 bg-current rounded-full mb-1" />
              <span className="block w-3.5 h-0.5 bg-current rounded-full mb-1 ml-1.5" />
              <span className="block w-5 h-0.5 bg-current rounded-full" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
