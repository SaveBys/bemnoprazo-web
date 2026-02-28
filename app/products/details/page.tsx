"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Accordion from "@/components/layout/accordion";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "@/services/announcements.service";
import { useRouter, useSearchParams } from "next/navigation";
import { AnnouncementResponse } from "@/types/announcement-details.response";

export default function Detail() {
  const [announcement, setAnnouncement] = useState<AnnouncementResponse>();
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>();
  const [usage, setUsage] = useState<{ key: string; value: string }[]>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams) return;
    const pid = searchParams.get("pid");

    if (!pid) return;

    getAnnouncementById(pid).then((res) => {
      setAnnouncement(res);

      setSpecs([
        {
          key: "Conservação",
          value: res.conservation,
        },
        {
          key: "Princípio Ativo:",
          value: res.activeIngredient,
        },
        {
          key: "Classificação",
          value: res.classification,
        },
        {
          key: "Prescrição Médica:",
          value: res.requiresPrescription ? "Sim" : "Não",
        },
      ]);

      setUsage([
        { key: "Administração", value: res.administrationRoute },
        { key: "Modo de uso", value: res.usageInstructions },
      ]);
    });
  }, [searchParams]);

  const navigateToProducts = () => {
    router.push("/products");
  };

  return (
    <main className="width-barrier flex flex-col items-center mx-auto py-16 px-11">
      <div className="w-full flex flex-col gap-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="w-full flex flex-col items-start gap-6">
            <Button onClick={navigateToProducts} variant="secondary">
              Voltar
            </Button>

            <div>
              <h1 className="text-title text-base-2">{announcement?.name}</h1>
              {announcement?.ean && (
                <p className="text-legend text-base-2">Código EAN: {announcement.ean}</p>
              )}
            </div>

            {announcement?.manufacturer && (
              <p className="flex gap-2 text-subtitle text-base-2">
                <span>Fabricante:</span>
                <span className="underline">{announcement.manufacturer}</span>
              </p>
            )}

            {announcement?.description && (
              <p className="text-legend text-base-2">{announcement.description}</p>
            )}

            {announcement?.contentDescription && (
              <p className="text-base font-medium text-base-2">
                Informações: {announcement.contentDescription}
              </p>
            )}

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
          {specs && <Accordion id="accordion-spec" title="Especificações" data={specs} />}

          {usage && <Accordion id="accordion-content" title="Uso" data={usage} />}
        </div>
      </div>
    </main>
  );
}
