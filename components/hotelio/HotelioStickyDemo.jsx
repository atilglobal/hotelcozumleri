"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { hotelioCtaIds } from "@/config/hotelio";
import { cn } from "@/utils/cn";

export default function HotelioStickyDemo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <Link
        href="#hotelio-demo"
        data-cta={hotelioCtaIds.stickyDemo}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy border border-gold/30 text-gold text-sm font-medium rounded-sm shadow-lg hover:border-gold/50 transition-colors"
      >
        Hotelio Demo
      </Link>
    </div>
  );
}
