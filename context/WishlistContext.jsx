"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setProductIds(readStorage(STORAGE_KEYS.wishlist, []));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.wishlist, productIds);
  }, [productIds, hydrated]);

  const toggle = useCallback((productId) => {
    setProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId) => productIds.includes(productId), [productIds]);

  const mergeIds = useCallback((ids) => {
    if (!ids?.length) return;
    setProductIds((prev) => [...new Set([...prev, ...ids])]);
  }, []);

  const value = useMemo(
    () => ({ productIds, count: productIds.length, toggle, isWishlisted, mergeIds, hydrated }),
    [productIds, toggle, isWishlisted, mergeIds, hydrated]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
