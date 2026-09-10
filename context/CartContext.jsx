"use client";

import { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage, STORAGE_KEYS } from "@/lib/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(readStorage(STORAGE_KEYS.cart, []));
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEYS.cart, items);
  }, [items, hydrated]);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId && i.logoOption === item.logoOption
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + (item.quantity || 1) };
        return next;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, variantId, quantity) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.variantId === variantId ? { ...i, quantity: Math.max(1, quantity) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((productId, variantId) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const mergeItems = useCallback((incoming) => {
    if (!incoming?.length) return;
    setItems((prev) => {
      const merged = [...prev];
      for (const item of incoming) {
        const idx = merged.findIndex(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        );
        if (idx >= 0) merged[idx].quantity += item.quantity || 1;
        else merged.push(item);
      }
      return merged;
    });
  }, []);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, count, addItem, updateQuantity, removeItem, clearCart, mergeItems, hydrated }),
    [items, count, addItem, updateQuantity, removeItem, clearCart, mergeItems, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
