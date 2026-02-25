"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/input/select";
import InputSearch from "@/components/ui/input/input-search";

import { InputText } from "@/components/ui/input/input-text";
import { findAllAnnouncementsCategory } from "@/services/announcements-category.service";
import { useEffect, useState } from "react";
import { AnnouncementCategoryResponse } from "@/types/announcement-category.response";
import { UpdateAnnouncementRequest } from "@/types/update-announcement.request";
import { Controller, useForm } from "react-hook-form";
import { AnnouncementStatusEnum } from "@/types/enums/announcement-status.enum";
import { MedicationTypeEnum } from "@/types/enums/medication-type.enum";

export default function EditProductPage() {
  const [categories, setCategories] = useState<AnnouncementCategoryResponse[]>();
  const [pageCategory, setPageCategory] = useState<number>(0);

  const defaultValues: UpdateAnnouncementRequest = {
    id: "",
    ean: "",
    name: "",
    batch: "",
    expirationDate: "",
    quantity: 0,
    status: AnnouncementStatusEnum.AWAITING_APPROVAL,
    requiresRefrigeration: false,
    medicationType: "none",
    activeIngredient: "",
    contentDescription: "",
    classification: "",
    requiresPrescription: false,
    administrationRoute: "",
    usageInstructions: "",
    conservation: "",
    idCategory: "",
    price: 0,
    basePrice: 0,
    dynamicPrice: false,
    dynamicPriceUnit: 0,
    dynamicPriceUnitValue: 0,
    dynamicPricePercent: 0,
    dynamicTotalPrice: 0,
  };

  const { register, handleSubmit, reset, control } = useForm<UpdateAnnouncementRequest>({
    defaultValues,
  });

  function onSubmit(data: UpdateAnnouncementRequest) {
    console.log(data);
  }

  useEffect(() => {
    findAllAnnouncementsCategory({ page: pageCategory }).then((res) => {
      setCategories(res.content);
      setPageCategory(res.page.number);
    });
  }, [pageCategory]);

  return (
    <form
      className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-title text-base-2">Editar Anúncio</h1>

      <fieldset className="w-full flex flex-row justify-between gap-4">
        <InputSearch className="w-full" label="Código EAN" placeholder="000000" />
        <InputSearch className="w-full" label="Nome Comercial" placeholder="000000" />
        <InputSearch className="w-full" label="Lote do medicamento" placeholder="n° do lote" />
      </fieldset>

      <fieldset className="w-full grid grid-cols-4 justify-between gap-4">
        <InputText
          className="w-full"
          label="Data de validade"
          placeholder="00/00/00"
          mask="99/99/9999"
          name="min-expiration-date"
        />
        <InputText className="w-full" label="Quantidade" placeholder="0" name="quantity" />

        <Controller
          name="idCategory"
          control={control}
          render={({ field }) => (
            <div className="w-full flex flex-col gap-1">
              <label className="text-4/5 text-base-3">Categoria</label>

              <Select
                value={field.value ?? "none"}
                onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup placeholder="Selecione">
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="size-4"></p>
            </div>
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="w-full flex flex-col gap-1">
              <label className="text-4/5 text-base-3">Status</label>

              <Select
                value={field.value ?? "none"}
                onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
              >
                <SelectTrigger className="w-full" disabled>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup placeholder="Aguardando aprovação">
                    <SelectItem value={AnnouncementStatusEnum.ACTIVE}>Ativo</SelectItem>
                    <SelectItem value={AnnouncementStatusEnum.AWAITING_APPROVAL}>
                      Aguardando aprovação
                    </SelectItem>
                    <SelectItem value={AnnouncementStatusEnum.INACTIVE}>Inativo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <p className="size-4"></p>
            </div>
          )}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <h2 className="text-title text-base-2">Especificações</h2>

        <div className="w-full flex flex-col gap-1">
          <Controller
            name="requiresRefrigeration"
            control={control}
            render={({ field }) => (
              <div className="w-full flex flex-col gap-1">
                <label className="text-4/5 text-base-3">Necessita refrigeração</label>

                <RadioGroup
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <div className="flex flex-row gap-3 items-center">
                    <RadioGroupItem
                      className="w-6 h-6 border-base-3"
                      value="true"
                      id="refrigeration-yes"
                    />
                    <Label htmlFor="refrigeration-yes">Sim</Label>

                    <RadioGroupItem
                      className="w-6 h-6 border-base-3"
                      value="false"
                      id="refrigeration-no"
                    />
                    <Label htmlFor="refrigeration-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <Controller
              name="medicationType"
              control={control}
              render={({ field }) => (
                <div className="w-full flex flex-col gap-1">
                  <label className="text-4/5 text-base-3">Tipo</label>

                  <Select
                    value={field.value ?? "none"}
                    onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup placeholder="Selecione">
                        <SelectItem value={MedicationTypeEnum.REFERENCE}>Referência</SelectItem>
                        <SelectItem value={MedicationTypeEnum.GENERIC}>Genérico</SelectItem>
                        <SelectItem value={MedicationTypeEnum.SIMILAR}>Similar</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <p className="size-4"></p>
                </div>
              )}
            />

            <InputText className="w-full" label="Classificação" />
          </div>

          <div className="flex justify-between items-center gap-4">
            <InputText label="Principio ativo" />
            <InputText label="Conteúdo" />
          </div>

          <div className="flex justify-between items-center gap-4">
            <InputText label="Conservação" />
            <InputText label="Prescrição médica" />
          </div>

          <div className="flex justify-between items-center gap-4">
            <InputText label="Formas de administração" />
            <InputText label="Modo de uso" />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <h2 className="text-title text-base-2">Preços</h2>

        <div className="flex items-end gap-4">
          <InputText label="Preço de mercado" placeholder="R$ 00,00" disabled />

          <InputText label="Preço ofertado" placeholder="R$ 00,00" />
        </div>

        <div className="w-full flex flex-col gap-1">
          <Controller
            name="dynamicPrice"
            control={control}
            render={({ field }) => (
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="dinamicPrice" className="text-4/5 text-base-3">
                  Preço dinâmico
                </label>

                <RadioGroup
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <div className="flex flex-row gap-3 items-center">
                    <RadioGroupItem
                      className="w-6 h-6 border-base-3"
                      value="true"
                      id="dynamicPrice-yes"
                    />
                    <Label htmlFor="dynamicPrice-yes">Sim</Label>

                    <RadioGroupItem
                      className="w-6 h-6 border-base-3"
                      value="false"
                      id="dynamicPrice-no"
                    />
                    <Label htmlFor="dynamicPrice-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <div className="w-full flex flex-row justify-between gap-4">
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="unidade" className="text-4/5 text-base-3">
              Unidade
            </label>

            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Dia" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup placeholder="Dia">
                  <SelectItem value="Referência">Referência</SelectItem>
                  <SelectItem value="Genérico">Genérico</SelectItem>
                  <SelectItem value="Similar">Similar</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <p className="size-4"></p>
          </div>

          <InputText label="Quantidade" placeholder="5" />

          <InputText label="Percentual desconto" placeholder="15%" />
        </div>
      </fieldset>

      <div className="w-full flex justify-between">
        <Button variant="secondary" type="button" href="/dashboard/products" isLink>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
