"use client";

import { CardShop } from "@/components/layout/card-shop";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";
import { CartItem, useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export default function Shop() {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: CartItem[]) {
    setLoading(true);
    try {
      console.log(data);
    } finally {
      clearCart();
      setLoading(false);
    }
  }

  return (
    <main className="width-barrier mx-auto my-16 px-11">
      <div className="grid w-full grid-cols-4 gap-8">
        <div className="col-span-3">
          {cart.map((item) => (
            <CardShop
              key={item.id}
              data={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="custom-shadow-sm rounded-md p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-subtitle text-base-2">Entrega</h1>
                <InputText label="CEP" placeholder="0000-000" mask="9999-999" name="CEP" />
              </div>
              <div>
                <Button className="w-full" variant="secondary">
                  Calcular
                </Button>
              </div>
            </div>
          </div>

          <div className="custom-shadow-sm rounded-md">
            <div className="flex flex-col gap-5 p-6">
              <h2 className="text-subtitle text-base-2">Resumo</h2>

              <hr className="w-full border bg-gray-300" />

              <div>
                <p className="text-content text-base-3">Valor total dos produtos:</p>
                <p className="text-subtitle text-base-2">{formatCurrency(totalPrice)}</p>
              </div>

              <hr className="w-full border bg-gray-300" />

              <div>
                <p className="text-content text-base-3">Frete:</p>
                <p className="text-subtitle text-base-2">R$ 15,00</p>
              </div>

              <hr className="w-full border bg-gray-300" />

              <div>
                <p className="text-content text-base-3">Total da compra:</p>
                <p className="text-subtitle text-base-2">{formatCurrency(totalPrice)}</p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <Button onClick={() => onSubmit(cart)} loading={loading}>
                  Finalizar a reserva
                </Button>

                <Button variant="secondary" href="/products" isLink>
                  Continuar escolhendo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
