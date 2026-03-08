"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMyCart, saveCart } from "@/services/cart.service";
import { usePathname } from "next/navigation";

export type Cart = {
  id: string;
  items: CartItem[];
};

export type CartItem = {
  name: string;
  announcement: AnnouncementCart;
  quantity: number;
  totalPrice?: number;
};

export type AnnouncementCart = {
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
  cart: Cart;
  totalItems: number;
  totalPrice: number;

  addItem: (item: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    id: "",
    items: [],
  });

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function loadCart() {
      if (pathname.includes("/user/")) return;

      try {
        const stored = localStorage.getItem(CART_KEY);
        const localCart: Cart | null = stored ? JSON.parse(stored) : null;

        const apiCart = await getMyCart();

        if (apiCart) {
          setCart({
            ...apiCart,
            items: apiCart.items ?? [],
          });
        } else if (localCart) {
          setCart({
            ...localCart,
            items: localCart.items ?? [],
          });
        } else {
          setCart({ id: "", items: [] });
        }
      } catch (error) {
        console.error("Erro ao carregar carrinho", error);
        setCart({ id: "", items: [] });
      }

      setMounted(true);
    }

    loadCart();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (!mounted) return;

    async function syncCart() {
      try {
        if (cart.items.length > 0) {
          await saveCart(cart);
        }
      } catch (error) {
        console.error("Erro ao sincronizar carrinho", error);
      }
    }

    syncCart();
  }, [cart, mounted]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setCart((prev) => {
      const exists = prev.items.find((i) => i.announcement.id === item.announcement.id);

      if (exists) {
        return {
          ...prev,
          items: prev.items.map((i) =>
            i.announcement.id === item.announcement.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }

      return {
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
      };
    });
  }

  function clearCart() {
    setCart((prev) => ({ ...prev, items: [] }));
  }

  function increaseQuantity(id: string) {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.announcement.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  }

  function decreaseQuantity(id: string) {
    setCart((prev) => ({
      ...prev,
      items: prev.items
        .map((item) =>
          item.announcement.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  }

  function removeItem(id: string) {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.announcement.id !== id),
    }));
  }

  const items = cart.items ?? [];

  const validItems = items.filter((item) => item?.announcement);

  const totalItems = validItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = validItems.reduce(
    (acc, item) => acc + item.quantity * item.announcement.price,
    0,
  );

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
