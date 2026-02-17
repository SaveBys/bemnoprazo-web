"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Accordion from "@/components/layout/accordion";
import { useEffect, useEffectEvent, useState } from "react";
import { getById } from "@/services/announcements.service";
import { useRouter, useSearchParams } from "next/navigation";
import { AnnouncementResponse } from "@/types/announcement-details.response";

const itemsEspecificações = [
  {
    value: "item-1",
    trigger: "Especificações",
    content: [
      { key: "Conservação:", value: "15° a 30°" },
      { key: "Conteúdo:", value: "Comprimido revestido contendo 1 mg de anastrozol em embalagem blíster com 30 comprimidos revestidos." },
      { key: "Princípio Ativo:", value: "Anastrozol" },
      { key: "Formas de Administração", value: "Via Oral" },
      { key: "Classificação:", value: "Tarja Vermelha" },
      { key: "Prescrição Médica: ", value: "Sem retenção de receita" },
    ]
  }
]
const itemsModoUso = [
  {
    value: "item-2",
    trigger: "Conteúdo",
    content: [
      { key: "Tome o medicamento por via oral, com um pouco de água." },
      { key: "Engula o comprimido inteiro, sem partir, mastigar ou triturar." },
    ]
  }
]

export default function Detail() {
  const [announcement, setAnnouncement] = useState<AnnouncementResponse>()
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams) return;
    const pid = searchParams.get("pid");

    if (!pid) return;

    getById(pid).then((res) => setAnnouncement(res));
  }, [searchParams]);

  const navigateToProducts = () => {
    router.push("/products");
  };

  const usageList = announcement?.usageInstructions
    ? [{ key: "usageInstructions", value: announcement.usageInstructions }]
    : [];

  return (
    <main className="width-barrier flex flex-col items-center mx-auto py-16 px-11">
      <div className="w-full flex flex-col gap-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="w-full flex flex-col items-start gap-6">
            <Button onClick={navigateToProducts} variant="secondary">Voltar</Button>

            <div>
              <h1 className="text-title text-base-2">{announcement?.name}</h1>
              {
                announcement?.ean
                && <p className="text-legend text-base-2">Código EAN: {announcement.ean}</p>
              }
            </div>

            {
              announcement?.manufacturer
              && <p className="flex gap-2 text-subtitle text-base-2">
                <span>Fabricante:</span>
                <span className="underline">{announcement.manufacturer}</span>
              </p>
            }

            {
              announcement?.description
              && <p className="text-legend text-base-2">{announcement.description}</p>
            }

            {
              announcement?.contentDescription
              && <p className="text-base font-medium text-base-2">
                Informações: {announcement.contentDescription}
              </p>
            }

            <p className="text-base font-medium text-base-2">
              Quantidade disponível: {announcement?.quantity ?? 0}
            </p>

            <Button className="w-full">
              <PlusIcon className="size-5" />
              <span>Reservar item</span>
            </Button>
          </div>

          <figure className="w-full flex flex-col items-center">
            <Image src="/img/Produtos.png" alt="produtos" width={400} height={300} />
          </figure>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {
            announcement?.specs
            && <Accordion
              id="accordion-spec"
              title="Especificações"
              data={announcement.specs} >
            </Accordion>
          }

          {
            announcement?.usageInstructions
            && <Accordion
              id="accordion-content"
              title="Modo de Uso"
              data={usageList} >
            </Accordion>
          }
        </div>
      </div>
    </main>
  )
}