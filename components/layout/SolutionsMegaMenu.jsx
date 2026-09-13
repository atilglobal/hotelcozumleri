"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { megaMenuSolutions } from "@/config/services";
import { cn } from "@/utils/cn";

export default function SolutionsMegaMenu({ isLight = false, isActive = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <Link
        href="/cozumler"
        className={cn(
          "px-3 py-2 text-sm font-medium transition-colors duration-300 relative inline-flex items-center gap-1",
          isLight
            ? isActive || open
              ? "text-white"
              : "text-white/75 hover:text-white"
            : isActive || open
              ? "text-blue"
              : "text-gray hover:text-navy"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onFocus={openMenu}
      >
        Çözümler
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden="true"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
        {(isActive || open) && (
          <span
            className={cn(
              "absolute bottom-0 left-3 right-3 h-px",
              isLight ? "bg-gold" : "bg-blue"
            )}
          />
        )}
      </Link>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[720px] max-w-[90vw] z-50"
          role="menu"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <div className="glass-card-dark rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="grid grid-cols-5">
              <div className="col-span-2 bg-navy/80 p-6 md:p-8">
                <h3 className="font-display text-xl heading-on-dark mb-3 leading-snug">
                  {megaMenuSolutions.title}
                </h3>
                <p className="text-body-on-dark text-sm leading-relaxed mb-6">
                  {megaMenuSolutions.description}
                </p>
                <Link
                  href="/cozumler"
                  className="text-gold text-sm font-medium hover:text-gold-light transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Tüm Çözümler →
                </Link>
              </div>

              <div className="col-span-3 p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {megaMenuSolutions.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      role="menuitem"
                      className="group p-3 rounded-lg hover:bg-white/5 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <span className="block text-sm font-medium heading-on-dark group-hover:text-gold-light transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted-on-dark mt-0.5">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  href={megaMenuSolutions.hotelio.href}
                  role="menuitem"
                  className="mt-4 block p-4 rounded-lg bg-navy/60 border border-gold/20 hover:border-gold/40 transition-colors group"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-gold text-xs font-bold tracking-[0.25em]">
                    {megaMenuSolutions.hotelio.label}
                  </span>
                  <span className="block heading-on-dark text-sm mt-1 group-hover:text-gold-light transition-colors">
                    {megaMenuSolutions.hotelio.description}
                  </span>
                  <span className="inline-flex items-center gap-1 text-gold text-xs font-medium mt-2 group-hover:gap-2 transition-all">
                    {megaMenuSolutions.hotelio.cta} →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
