'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { packages, Package } from '@/lib/packages';

export type GroupType = 'solo' | 'couple' | 'friends' | 'family' | 'group';

export type EnquiryPayload = {
  destinations: string[];
  membersCount?: number;
  groupType?: GroupType;
  monthOrDates?: string;
  departureCity?: string;
  name?: string;
  phone?: string;
  notes?: string;
};

interface CartContextType {
  cart: string[];
  cartPackages: Package[];
  cartCount: number;
  addToCart: (slug: string) => void;
  removeFromCart: (slug: string) => void;
  toggleCart: (slug: string) => void;
  isInCart: (slug: string) => boolean;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isEnquiryOpen: boolean;
  enquiryDestinations: string[];
  openEnquiry: (destinationOrDestinations?: string | string[]) => void;
  closeEnquiry: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'himalayahikes_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryDestinations, setEnquiryDestinations] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    setMounted(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart, mounted]);

  const addToCart = useCallback((slug: string) => {
    setCart((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((item) => item !== slug));
  }, []);

  const toggleCart = useCallback((slug: string) => {
    setCart((prev) =>
      prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug]
    );
  }, []);

  const isInCart = useCallback(
    (slug: string) => cart.includes(slug),
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const openEnquiry = useCallback((destinationOrDestinations?: string | string[]) => {
    if (!destinationOrDestinations) {
      // If empty and cart has items, default to cart items, else default to all or prompt
      if (cart.length > 0) {
        const names = cart
          .map((slug) => packages.find((p) => p.slug === slug)?.name)
          .filter(Boolean) as string[];
        setEnquiryDestinations(names.length > 0 ? names : [packages[0].name]);
      } else {
        setEnquiryDestinations([packages[0].name]);
      }
    } else if (Array.isArray(destinationOrDestinations)) {
      setEnquiryDestinations(destinationOrDestinations);
    } else {
      setEnquiryDestinations([destinationOrDestinations]);
    }
    setIsEnquiryOpen(true);
  }, [cart]);

  const closeEnquiry = useCallback(() => {
    setIsEnquiryOpen(false);
  }, []);

  const cartPackages = cart
    .map((slug) => packages.find((p) => p.slug === slug))
    .filter(Boolean) as Package[];

  return (
    <CartContext.Provider
      value={{
        cart,
        cartPackages,
        cartCount: cart.length,
        addToCart,
        removeFromCart,
        toggleCart,
        isInCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        isEnquiryOpen,
        enquiryDestinations,
        openEnquiry,
        closeEnquiry
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

