import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "../ui/button"

export function CardShop() {
  return (
    <div className="custom-shadow-sm col-span-3 flex h-fit w-full items-center justify-between gap-18 rounded-md px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-title text-base-2">Anastrolibbs</h2>
          <p className="text-legend text-base-2">Código EAN: 651 642</p>
        </div>

        <p className="text-legend text-base-2">Informações: 1mg 50 comprimidos</p>

        <p className="text-base-2 text-base font-bold">
          <span>Produto disponibilizado por:</span>
          <span className="ml-2 font-normal underline">Libbs Farmacêutica</span>
        </p>

        <p className="text-content text-base-2">Quantidade disponível: 30</p>
      </div>

      <div className="flex items-center">
        <hr className="h-50 w-px border-1 bg-gray-300" />
      </div>

      <div className="flex flex-col items-center gap-6">
        <p className="text-subtitle text-base-3">Quantidade</p>

        <p className="text-title text-base-3">1</p>

        <div className="flex w-full flex-row gap-6">
          <Button className="flex-1" variant="secondary">
            <PlusIcon className="size-5" />
          </Button>

          <Button className="flex-1" variant="secondary">
            <MinusIcon className="size-5" />
          </Button>
        </div>

        <Button variant="secondary">
          <TrashIcon className="size-5" />
          <span>Remover</span>
        </Button>
      </div>

      <div className="flex items-center">
        <hr className="h-50 w-px border-1 bg-gray-300" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-content text-base-3">Total</p>
        <p className="text-base-3 flex items-center gap-1">
          <span className="text-subtitle">R$</span>
          <span className="text-title">200,00</span>
        </p>
      </div>
    </div>
  )
}
