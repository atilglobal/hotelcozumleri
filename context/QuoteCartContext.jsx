"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

const QuoteCartContext = createContext(null);

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(readStorage(STORAGE_KEYS.quoteCart, []));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.quoteCart, items);
  }, [items, hydrated]);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + (item.quantity || 1), note: item.note || next[idx].note };
        return next;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const updateItem = useCallback((productId, variantId, updates) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, ...updates } : i
      )
    );
  }, []);

  const removeItem = useCallback((productId, variantId) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, count, addItem, updateItem, removeItem, clearCart, hydrated }),
    [items, count, addItem, updateItem, removeItem, clearCart, hydrated]
  );

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}
