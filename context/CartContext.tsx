"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedTemp?: string;
}

export type Currency = "USD" | "BDT" | "EUR";
export type Ambiance = "candle" | "sunset" | "golden";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedTemp?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  toast: string | null;
  showToast: (message: string) => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInUSD: number) => string;

  ambiance: Ambiance;
  setAmbiance: (a: Ambiance) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("vyqen_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("vyqen_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    if (typeof window === "undefined") return "USD";
    try {
      const saved = localStorage.getItem("vyqen_currency") as Currency;
      return saved || "USD";
    } catch {
      return "USD";
    }
  });

  const [ambiance, setAmbianceState] = useState<Ambiance>(() => {
    if (typeof window === "undefined") return "sunset";
    try {
      const saved = localStorage.getItem("vyqen_ambiance") as Ambiance;
      return saved || "sunset";
    } catch {
      return "sunset";
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Sync Currency to localStorage
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("vyqen_currency", c);
    } catch {
      // ignore
    }
  };

  // Sync Ambiance to localStorage & document classes
  const setAmbiance = (a: Ambiance) => {
    setAmbianceState(a);
    try {
      localStorage.setItem("vyqen_ambiance", a);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("theme-candle", "theme-sunset", "theme-golden");
        document.documentElement.classList.add(`theme-${a}`);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("theme-candle", "theme-sunset", "theme-golden");
      document.documentElement.classList.add(`theme-${ambiance}`);
    }
  }, [ambiance]);

  // Format Price with Currency Rates
  const formatPrice = (amountInUSD: number): string => {
    if (currency === "BDT") {
      const bdt = Math.round(amountInUSD * 122);
      return `৳${bdt.toLocaleString()}`;
    }
    if (currency === "EUR") {
      const eur = Math.round(amountInUSD * 0.92);
      return `€${eur.toLocaleString()}`;
    }
    return `$${amountInUSD.toLocaleString()}`;
  };

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("vyqen_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("vyqen_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1, selectedTemp?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedTemp: selectedTemp || product.colorTemperature }];
    });
    showToast(`Added "${product.name}" to your bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from your wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to your wishlist");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "LUMEN15" || clean === "ORANGE15" || clean === "VYQEN15") {
      setCouponCode(clean);
      setDiscountPercent(0.15);
      showToast("Voucher applied: 15% VIP discount activated!");
      return true;
    }
    showToast("Invalid promo code. Try 'ORANGE15'");
    return false;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = cartSubtotal * discountPercent;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        discount,
        couponCode,
        applyCoupon,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        toast,
        showToast,
        currency,
        setCurrency,
        formatPrice,
        ambiance,
        setAmbiance,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
