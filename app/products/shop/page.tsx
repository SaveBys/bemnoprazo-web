import { CardShop } from "@/components/layout/card-shop";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";


export default function Shop() {
  return (
    <main className="width-barrier px-11 mx-auto my-16">
      <div className="w-full grid grid-cols-4 gap-8">
        <CardShop />

        <div className="w-full flex flex-col gap-4">
          <div className="custom-shadow-sm rounded-md p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-subtitle text-base-2">Entrega</h1>
                <InputText
                  label="CEP"
                  placeholder="0000-000"
                  mask="9999-999"
                  name="CEP" />
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

              <hr className="w-full bg-gray-300 border-1"></hr>

              <div>
                <p className="text-content text-base-3">Valor total dos produtos:</p>
                <p className="text-subtitle text-base-2">R$ 200,00</p>
              </div>

              <hr className="w-full bg-gray-300 border-1"></hr>

              <div>
                <p className="text-content text-base-3">Frete:</p>
                <p className="text-subtitle text-base-2">R$ 15,00</p>
              </div>

              <hr className="w-full bg-gray-300 border-1"></hr>

              <div>
                <p className="text-content text-base-3">Total da compra:</p>
                <p className="text-subtitle text-base-2">R$ 215,00</p>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <Button>
                  Finalizar a reserva
                </Button>

                <Button variant="secondary">
                  Continuar escolhendo
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}