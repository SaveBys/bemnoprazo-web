import { Cart } from "@/context/cart-context";
import { api } from "@/lib/axios";

export async function getMyCart(): Promise<Cart> {
  const { data } = await api.get("/cart");
  return data;
}

export async function saveCart(payload: Cart): Promise<void> {
  await api.post("/cart", payload);
}
