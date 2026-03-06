"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { CartItem } from "@/hooks/cart-context";

interface CardShopProps {
  data: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export function CardShop({ data, ...props }: CardShopProps) {
  return (
    <div className="custom-shadow-sm flex h-fit w-full items-center justify-between gap-18 rounded-md px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-title text-base-2">{data.name}</h2>
          {data.ean && <p className="text-legend text-base-2">Código EAN: {data.ean}</p>}
        </div>

        {data.contentDescription && (
          <p className="text-legend text-base-2">Informações: {data.contentDescription}</p>
        )}

        {data.manufacturer && (
          <p className="text-base-2 text-base font-bold">
            <span>Produto disponibilizado por:</span>
            <span className="ml-2 font-normal underline">{data.manufacturer}</span>
          </p>
        )}

        <p className="text-content text-base-2">Quantidade disponível: {data.quantity}</p>
      </div>

      <div className="flex items-center">
        <hr className="bg-base-4 h-50 w-px border" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <p className="text-subtitle text-base-3">Quantidade</p>

        <p className="text-title text-base-3">{data.quantity}</p>

        <div className="flex w-full flex-row gap-6">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => props.onDecrease(data.id)}
            disabled={data.quantity <= 1}
          >
            <MinusIcon className="size-5" />
          </Button>

          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => props.onIncrease(data.id)}
            disabled={data.quantity >= data.announcementQuantity}
          >
            <PlusIcon className="size-5" />
          </Button>
        </div>

        <Button variant="secondary" onClick={() => props.onRemove(data.id)}>
          <TrashIcon className="size-5" />
          <span>Remover</span>
        </Button>
      </div>

      <div className="flex items-center">
        <hr className="h-50 w-px border bg-gray-300" />
      </div>

      <div className="flex w-48 flex-col gap-2">
        <p className="text-content text-base-3">Total</p>
        <p className="text-base-3 flex items-center gap-1">
          <span className="text-subtitle">R$</span>
          <span className="text-title">{data.price * data.quantity}</span>
        </p>
      </div>
    </div>
  );
}
