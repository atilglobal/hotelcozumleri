"use client";

import { CartProvider } from "@/context/CartContext";
import { QuoteCartProvider } from "@/context/QuoteCartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";

export default function AppProviders({ children }) {
  return (
    <CartProvider>
      <QuoteCartProvider>
        <WishlistProvider>
          <AuthProvider>{children}</AuthProvider>
        </WishlistProvider>
      </QuoteCartProvider>
    </CartProvider>
  );
}
