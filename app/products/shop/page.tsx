import { Button } from "@/components/ui/button";
import InputText from "@/components/ui/input/input-text";
import { Trash, TrashIcon } from "@phosphor-icons/react/dist/ssr";


export default function Shop() {
  return (
    <>
      <main className="width-barrier flex flex-row items-center mx-21 my-16">
        <div className="w-full flex flex-row gap-8">
          <div className="w-full h-[300] flex flex-row gap-18 shadow-sm rounded-md">
            <div className="flex flex-col my-12 ml-4 gap-3">
              <div className="flex flex-col">
                <h1 className="text-title text-base-2">Anastrolibbs</h1>
                <p className="text-legend text-base-2">Código EAN: 651 642</p>
              </div>
              <div>
                <p className="text-legend text-base-2">Informações: 1mg 50 comprimidos</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-subtitle text-base-2">Produto disponibilizado por:</p>
                <p className="text-content text-base-2"><a href="">Libbs Farmacêutica</a></p>
              </div>
              <div className="flex flex-col pt-2">
                <p className="text-content text-base-2">Quantidade disponível: 30</p>
              </div>
            </div>
            <div className="flex items-center"><hr className="w-px h-50 bg-gray-300 border-1" /></div>
            <div className="flex flex-row items-center gap-6 my-4">
              <div className="flex flex-col items-center gap-9">
                <h1 className="text-subtitle text-base-3">Quantidade</h1>
                <h1 className="text-title text-base-3">1</h1>
                <div className="flex flex-row gap-6">
                  <Button className="bg-base-5 text-primary-2 text-xl border-2 border-primary-2 h-13 w-20">-</Button>
                  <Button className="bg-base-5 text-primary-2 text-xl border-2 border-primary-2 h-13 w-20">+</Button>
                </div>
                <div className="flex flex-col">
                  <Button className="bg-base-5 text-primary-2 border-2 border-primary-2 h-13 w-50"><TrashIcon size={24} color="#FF8D28" />Remover</Button>
                </div>
              </div>

              <hr className="w-px h-50 bg-gray-300 border-1" />
              <div className="flex flex-col">
                <h1 className="text-content text-base-3">Total</h1>
                <p className="text-title text-base-3">R$ 200,00</p>
              </div>
            </div>
          </div>
          <div className="w-[500] flex flex-col gap-4">
            <div className="shadow-sm rounded-md ">
              <div className="flex flex-col gap-6 m-6">
                <div className="flex flex-col gap-4">
                  <h1 className="text-subtitle text-base-2">Entrega</h1>
                  <InputText
                    label="CEP"
                    placeholder="0000-000"
                    mask="9999/999"
                    name="CEP" />
                </div>
                <div>
                  <Button className="w-full bg-base-5 text-primary-2 border-2 border-primary-2 h-13">Calcular</Button>
                </div>
              </div>
            </div>
            <div className="shadow-sm rounded-md">
              <div className="flex flex-col m-6 gap-5">
                <h1 className="text-subtitle text-base-2">Resumo</h1>
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
                  <Button className="h-13">Finalizar a reserva</Button>
                  <Button className="w-full bg-base-5 text-primary-2 border-2 border-primary-2 h-13">Continuar escolhendo</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}