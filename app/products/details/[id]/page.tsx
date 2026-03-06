"use client";

export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Accordion from "@/components/layout/accordion";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "@/services/announcements.service";
import { useRouter } from "next/navigation";
import { AnnouncementResponse } from "@/types/response/announcement-details.response";
import React from "react";
import { useCart } from "@/context/cart-context";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductsDetailPage({ params }: PageProps) {
  const [announcement, setAnnouncement] = useState<AnnouncementResponse>();
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>();
  const [usage, setUsage] = useState<{ key: string; value: string }[]>();
  const { addItem } = useCart();
  const { id } = React.use(params);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    getAnnouncementById(id).then((res) => {
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
  }, [id]);

  async function addToCart() {
    if (announcement) {
      addItem({ ...announcement, announcementQuantity: announcement.quantity });
      router.push("/products/shop");
    }
  }

  const navigateToProducts = () => {
    router.push("/products");
  };

  return (
    <main className="width-barrier mx-auto flex flex-col items-center px-11 py-16">
      <div className="flex w-full flex-col gap-16">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex w-full flex-col items-start gap-6">
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
              <p className="text-subtitle text-base-2 flex gap-2">
                <span>Fabricante:</span>
                <span className="underline">{announcement.manufacturer}</span>
              </p>
            )}

            {announcement?.description && (
              <p className="text-legend text-base-2">{announcement.description}</p>
            )}

            {announcement?.contentDescription && (
              <p className="text-base-2 text-base font-medium">
                Informações: {announcement.contentDescription}
              </p>
            )}

            <p className="text-base-2 text-base font-medium">
              Quantidade disponível: {announcement?.quantity ?? 0}
            </p>

            <Button className="w-full" onClick={() => addToCart()}>
              <PlusIcon className="size-5" />
              <span>Reservar item</span>
            </Button>
          </div>

          <figure className="flex w-full flex-col items-center">
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
