import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "item-1",
    trigger: "Especificações",
    content: [
      { titulo: "Conservação", valor: "15" },
      { titulo: "Conservação", valor: "15" },
    ]
  }
]

export default function Detail() {
  return (
    <>
      <main className="width-barrier flex flex-col items-center mx-21 my-16">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-8">
            <div className="w-135 flex flex-col items-start gap-5">
              <Button className="w-45 h-13 bg-base-5 text-primary-2 border-2 border-primary-2">Voltar</Button>
              <h1 className="text-title text-base-2">Anastrolibbs</h1>
              <p className="text-legend text-base-2">Código EAN: 651 642</p>
              <p className="text-subtitle text-base-2">Fabricante:<a href="">Libbs Farmacêutica</a></p>
              <p className="text-legend text-base-2">Anastrolibbs é um medicamento à base de anastrozol,
                um inibidor da aromatase usado no tratamento do câncer de mama em mulheres na pós-menopausa</p>
              <p className="text-content text-base-2">Informações: 1mg 50comprimidos</p>
              <p className="text-content text-base-2">Quantidade disponível: 30</p>
              <Button className="w-full">Reservar item</Button>
            </div>
            <div className="flex flex-col">
              <Image src={"/img/Produtos.png"} alt={"produtos"} width={584} height={462}></Image>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-row">
              <div className="w-135 flex flex-col border-1 border-base-3 rounded-md">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-1"
                  className="max-w-lg"
                >
                  {items.map((item) => (
                    <AccordionItem key={item.value} value={item.value}>
                      <AccordionTrigger><h1 className="text-subtitle text-base-2 mx-4">{item.trigger}</h1></AccordionTrigger>
                      {item.content.map((conteudo) => {
                        return <AccordionContent key={conteudo.titulo}>
                          <div className="w-full flex justify-between">
                            <p className="text-legend text-base-2 ml-4">{conteudo.titulo}</p>
                            <p className="text-legend text-base-2 mr-4">{conteudo.valor}</p>
                          </div>
                        </AccordionContent>
                      })}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="w-135 flex flex-col border-1 border-base-3 rounded-md">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                className="max-w-lg"
              >
                {items.map((item) => (
                  <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger><h1 className="text-subtitle text-base-2 mx-4">{item.trigger}</h1></AccordionTrigger>
                    {item.content.map((conteudo) => {
                      return <AccordionContent key={conteudo.titulo}>
                          <p className="text-legend text-base-2 ml-4">{conteudo.titulo}</p>
                      </AccordionContent>
                    })}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}