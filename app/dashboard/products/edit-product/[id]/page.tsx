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

import { zodResolver } from "@hookform/resolvers/zod";

import { findAllAnnouncementsCategory } from "@/services/announcements-category.service";
import { useEffect, useState } from "react";
import { AnnouncementCategoryResponse } from "@/types/response/announcement-category.response";
import { Controller, Resolver, useForm, useWatch } from "react-hook-form";
import { AnnouncementStatusEnum } from "@/types/enums/announcement-status.enum";
import { MedicationTypeEnum } from "@/types/enums/medication-type.enum";
import {
  UpdateAnnouncementFormData,
  updateAnnouncementSchema,
} from "@/types/schemas/update-announcement.schema";
import { getMyAnnouncementById, updateAnnouncement } from "@/services/announcements.service";
import React from "react";
import { AnnouncementResponse } from "@/types/response/announcement-details.response";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { InputText } from "@/components/ui/input/input-text";
import { Dialog, Message } from "@/components/layout/dialog";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({ params }: PageProps) {
  const [categories, setCategories] = useState<AnnouncementCategoryResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();
  const router = useRouter();
  const { id } = React.use(params);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateAnnouncementFormData>({
    resolver: zodResolver(updateAnnouncementSchema) as Resolver<UpdateAnnouncementFormData>,
  });

  const dynamicPrice = useWatch({
    control,
    name: "dynamicPrice",
  });

  async function onSubmit(data: UpdateAnnouncementFormData) {
    try {
      setLoading(true);
      await updateAnnouncement({ ...data, id });
      setMessage({
        title: "Sucesso!",
        callback() {
          router.push("/dashboard/products");
        },
      });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  const [announcementData, setAnnouncementData] = useState<AnnouncementResponse | null>(null);

  useEffect(() => {
    async function loadData() {
      const [categoryResponse, announcement] = await Promise.all([
        findAllAnnouncementsCategory({ page: 0 }),
        getMyAnnouncementById(id),
      ]);

      setCategories(categoryResponse.content);
      setAnnouncementData(announcement);
    }

    loadData();
  }, [id]);

  useEffect(() => {
    if (!categories || !announcementData) return;

    reset({
      ...announcementData,
      expirationDate: formatDate(announcementData.expirationDate),
      idCategory: announcementData.category?.id ?? "",
    });
  }, [categories, announcementData, reset]);

  return (
    <form
      className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-title text-base-2">Editar Anúncio</h1>
      <h1 className="text-subtitle text-base-2">Dados do produto</h1>

      <fieldset className="flex w-full flex-row justify-between gap-4">
        <InputSearch
          {...register("ean")}
          errorMessage={errors.ean?.message}
          className="w-full"
          label="Código EAN"
          placeholder="000000"
        />

        <InputSearch
          {...register("name")}
          errorMessage={errors.name?.message}
          className="w-full"
          label="Nome Comercial"
        />

        <InputSearch
          {...register("batch")}
          errorMessage={errors.batch?.message}
          className="w-full"
          label="Lote do medicamento"
          placeholder="n° do lote"
        />
      </fieldset>

      <fieldset className="grid w-full grid-cols-4 justify-between gap-4">
        <InputText
          {...register("expirationDate")}
          errorMessage={errors.expirationDate?.message}
          className="w-full"
          label="Data de validade"
          placeholder="00/00/00"
          mask="99/99/9999"
        />

        <InputText
          {...register("quantity")}
          errorMessage={errors.quantity?.message}
          className="w-full"
          label="Quantidade"
          placeholder="0"
        />

        <Controller
          name="idCategory"
          control={control}
          render={({ field }) => (
            <div className="flex w-full flex-col gap-1">
              <label className="text-4/5 text-base-3">Categoria</label>

              <Select
                value={field.value ?? "none"}
                onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
              >
                <SelectTrigger className="w-full" valid={!errors.idCategory?.message}>
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
            <div className="flex w-full flex-col gap-1">
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

        <div className="flex items-center gap-4">
          <Controller
            name="requiresRefrigeration"
            control={control}
            render={({ field }) => (
              <div className="flex w-full flex-col gap-1">
                <label className="text-4/5 text-base-3">Necessita refrigeração</label>
                <RadioGroup
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
                      value="true"
                      id="refrigeration-yes"
                    />
                    <Label htmlFor="refrigeration-yes">Sim</Label>
                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
                      value="false"
                      id="refrigeration-no"
                    />
                    <Label htmlFor="refrigeration-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />

          <Controller
            name="requiresPrescription"
            control={control}
            render={({ field }) => (
              <div className="flex w-full flex-col gap-1">
                <label className="text-4/5 text-base-3">Necessita prescrição</label>
                <RadioGroup
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
                      value="true"
                      id="prescription-yes"
                    />
                    <Label htmlFor="prescription-yes">Sim</Label>
                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
                      value="false"
                      id="prescription-no"
                    />
                    <Label htmlFor="prescription-no">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Controller
              name="medicationType"
              control={control}
              render={({ field }) => (
                <div className="flex w-full flex-col gap-1">
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

            <InputText
              {...register("classification")}
              errorMessage={errors.batch?.message}
              className="w-full"
              label="Classificação"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <InputText
              {...register("activeIngredient")}
              errorMessage={errors.batch?.message}
              label="Principio ativo"
            />
            <InputText
              {...register("contentDescription")}
              errorMessage={errors.batch?.message}
              label="Conteúdo"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <InputText
              {...register("conservation")}
              errorMessage={errors.conservation?.message}
              label="Conservação"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <InputText
              {...register("administrationRoute")}
              errorMessage={errors.administrationRoute?.message}
              label="Formas de administração"
            />
            <InputText
              {...register("usageInstructions")}
              errorMessage={errors.usageInstructions?.message}
              label="Modo de uso"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <h2 className="text-title text-base-2">Preços</h2>

        <div className="flex items-end gap-4">
          <InputText
            {...register("basePrice")}
            errorMessage={errors.basePrice?.message}
            label="Preço de mercado"
            placeholder="R$ 00,00"
            disabled
          />

          <InputText
            {...register("price")}
            errorMessage={errors.price?.message}
            label="Preço ofertado"
            placeholder="R$ 00,00"
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <Controller
            name="dynamicPrice"
            control={control}
            render={({ field }) => (
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="dinamicPrice" className="text-4/5 text-base-3">
                  Preço dinâmico
                </label>

                <RadioGroup
                  value={field.value?.toString()}
                  onValueChange={(value) => field.onChange(value === "true")}
                >
                  <div className="flex flex-row items-center gap-3">
                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
                      value="true"
                      id="dynamicPrice-yes"
                    />
                    <Label htmlFor="dynamicPrice-yes">Sim</Label>

                    <RadioGroupItem
                      className="border-base-3 h-6 w-6"
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

        <div className="flex w-full flex-row justify-between gap-4">
          <Controller
            name="dynamicPriceUnit"
            control={control}
            render={({ field }) => (
              <div className="flex w-full flex-col gap-1">
                <label className="text-4/5 text-base-3">Unidade</label>

                <Select
                  value={field.value ?? "none"}
                  onValueChange={(value) => field.onChange(value === "none" ? undefined : value)}
                >
                  <SelectTrigger className="w-full" disabled={!dynamicPrice}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup placeholder="Selecione">
                      <SelectItem value="DAY">Dia</SelectItem>
                      <SelectItem value="MONTH">Mês</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <p className="size-4"></p>
              </div>
            )}
          />

          <InputText
            {...register("dynamicPriceUnitValue")}
            errorMessage={errors.dynamicPriceUnitValue?.message}
            label="Valor"
            placeholder="5"
            disabled={!dynamicPrice}
          />

          <InputText
            {...register("dynamicPricePercent")}
            errorMessage={errors.dynamicPricePercent?.message}
            label="Percentual desconto"
            placeholder="00.0%"
            disabled={!dynamicPrice}
          />
        </div>
      </fieldset>

      <div className="flex w-full justify-between">
        <Button variant="secondary" type="button" href="/dashboard/products" isLink>
          Cancelar
        </Button>
        <Button loading={loading}>Salvar</Button>
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </form>
  );
}
