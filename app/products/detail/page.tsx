import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const itemsEspecificações = [
  {
    value: "item-1",
    trigger: "Especificações",
    content: [
      { titulo: "Conservação:", valor: "15° a 30°" },
      { titulo: "Conteúdo:", valor: "Comprimido revestido contendo 1 mg de anastrozol em embalagem blíster com 30 comprimidos revestidos." },
      { titulo: "Princípio Ativo:", valor: "Anastrozol"},
      { titulo: "Formas de Administração", valor: "Via Oral"},
      { titulo: "Classificação:", valor: "Tarja Vermelha"},
      { titulo: "Prescrição Médica: ", valor: "Sem retenção de receita"},
    ]
  }
]
const itemsModoUso = [
  {
    value: "item-1",
    trigger: "Conteúdo",
    content: [
      { titulo: "Tome o medicamento por via oral, com um pouco de água."},
      { titulo: "Engula o comprimido inteiro, sem partir, mastigar ou triturar."},
    ]
  }
]

export default function Detail() {
  return (
    <>
      <main className="width-barrier flex flex-col items-center mx-21 my-16">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-8 mb-16">
            <div className="w-135 flex flex-col items-start gap-6">
              <Button className="w-45 h-13 bg-base-5 text-primary-2 border-2 border-primary-2">Voltar</Button>
              <div>
              <h1 className="text-title text-base-2">Anastrolibbs</h1>
              <p className="text-legend text-base-2">Código EAN: 651 642</p>
              </div>
              <p className="text-subtitle text-base-2">Fabricante:<a href="">Libbs Farmacêutica</a></p>
              <p className="text-legend text-base-2">Anastrolibbs é um medicamento à base de anastrozol,
                um inibidor da aromatase usado no tratamento do câncer de mama em mulheres na pós-menopausa</p>
              <p className="text-content text-base-2">Informações: 1mg 50comprimidos</p>
              <p className="text-content text-base-2">Quantidade disponível: 30</p>
              <Button className="w-full">Reservar item</Button>
            </div>
            <div className="flex flex-col items-center">
              <Image src={"/img/Produtos.png"} alt={"produtos"} width={400} height={300}></Image>
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
                  {itemsEspecificações.map((itemsEspecificações) => (
                    <AccordionItem key={itemsEspecificações.value} value={itemsEspecificações.value}>
                      <AccordionTrigger><h1 className="text-subtitle text-base-2 mx-4">{itemsEspecificações.trigger}</h1></AccordionTrigger>
                      {itemsEspecificações.content.map((conteudo) => {
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
                {itemsModoUso.map((itemsModoUso) => (
                  <AccordionItem key={itemsModoUso.value} value={itemsModoUso.value}>
                    <AccordionTrigger><h1 className="text-subtitle text-base-2 mx-4">{itemsModoUso.trigger}</h1></AccordionTrigger>
                    {itemsModoUso.content.map((conteudoModo) => {
                      return <AccordionContent key={conteudoModo.titulo}>
                          <p className="text-legend text-base-2 ml-4">{conteudoModo.titulo}</p>
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