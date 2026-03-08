"use client";

import { Button } from "@/components/ui/button";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "proposta-3",
    trigger: {
      title: "Proposta N° 00003",
      comprador: "Comprador:",
      status: "Status:",
    },
    content: {
      quantidade: "10",
      preco: "R$ 100,00",
      nome: "Lucas Augusto",
      status: "Processando",
    },
  },
];

export default function AnalysisPage() {
  return (
    <div className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-title text-base-2">Analisar proposta</h1>
        </div>
        <div className="row flex items-center gap-2">
          <h1 className="text-subtitle text-primary-2">Dipirona</h1>
          <EyeIcon size={32} color="#ff8d28" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="row flex items-center gap-2">
            <h1 className="text-subtitle text-base-2">Propostas</h1>
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col gap-4"
              defaultValue="billing"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="border-base-2 rounded-md border px-4"
                >
                  <div className="flex flex-col gap-3">
                    <AccordionTrigger>
                      <div className="flex flex-col gap-4">
                        <span className="text-subtitle text-base-2">{item.trigger.title}</span>
                        <span className="flex gap-2">
                          <span className="text-content text-base-2">{item.trigger.comprador}</span>
                          <span className="text-legend text-base-2">{item.content.nome}</span>
                        </span>
                        <span className="flex gap-2">
                          <span className="text-content text-base-2">{item.trigger.status}</span>
                          <span className="text-legend text-base-2">{item.content.status}</span>
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4">
                        <span className="flex gap-2">
                          <span className="text-content text-base-2">Quantidade:</span>
                          <span className="text-legend text-base-2">{item.content.quantidade}</span>
                        </span>
                        <span className="flex gap-2">
                          <span className="text-content text-base-2">Preço:</span>
                          <span className="text-legend text-base-2">{item.content.preco}</span>
                        </span>
                      </div>
                      <hr className="border-base-3 mt-4 mb-3 border" />
                      <div className="flex-items-center flex justify-between pt-2 pb-2">
                        <Button variant="secondary">Recusar</Button>
                        <Button>Aprovar</Button>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
