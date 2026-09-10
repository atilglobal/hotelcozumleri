"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavigation, ctaLinks } from "@/config/navigation";
import { megaMenuSolutions } from "@/config/services";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { cn } from "@/utils/cn";

export default function MobileMenu({ isOpen, onClose }) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setSolutionsOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy/60 backdrop-blur-sm lg:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-navy shadow-2xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <Logo variant="light" />
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Menüyü kapat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6L18 18M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-5">
              <ul className="space-y-1">
                {mainNavigation.map((item, index) => {
                  if (item.megaMenu) {
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <button
                          type="button"
                          onClick={() => setSolutionsOpen(!solutionsOpen)}
                          className="mobile-nav-link w-full flex items-center justify-between py-3 px-4 text-lg font-display hover:bg-white/5 rounded-sm transition-colors"
                          aria-expanded={solutionsOpen}
                        >
                          Çözümler
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            className={cn("transition-transform", solutionsOpen && "rotate-180")}
                            aria-hidden="true"
                          >
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {solutionsOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 space-y-1"
                            >
                              {megaMenuSolutions.items.map((solution) => (
                                <li key={solution.slug}>
                                  <Link
                                    href={solution.href}
                                    onClick={handleClose}
                                    className="mobile-nav-sublink block py-2.5 px-4 text-sm transition-colors"
                                  >
                                    {solution.label}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href={megaMenuSolutions.hotelio.href}
                                  onClick={handleClose}
                                  className="block py-2.5 px-4 text-sm text-gold font-medium"
                                >
                                  HOTELIO — {megaMenuSolutions.hotelio.description}
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cozumler"
                                  onClick={handleClose}
                                  className="block py-2.5 px-4 text-sm text-blue-bright"
                                >
                                  Tüm Çözümler →
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        className="mobile-nav-link block py-3 px-4 text-lg font-display hover:bg-white/5 rounded-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-5 border-t border-white/10 space-y-3">
              <Button href={ctaLinks.teklif} variant="gold" size="lg" className="w-full" onClick={handleClose}>
                Teklif Al
              </Button>
              <Button href={ctaLinks.hotelioDemo} variant="secondary" size="lg" className="w-full" onClick={handleClose}>
                Hotelio Demo
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
