"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  ean: string;
  name: string;
  contentDescription: string;
  manufacturer: string;
  expirationDate: string;
  quantity: number;
  announcementQuantity: number;
  price: number;
};

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(stored));
      }
    } catch {}

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function clearCart() {
    setCart([]);
  }

  function increaseQuantity(id: string) {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }

  function decreaseQuantity(id: string) {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalPrice,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
