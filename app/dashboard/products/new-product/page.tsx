"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/input/select"
import InputSearch from "@/components/ui/input/input-search"
import { InputText } from "@/components/ui/input/input-text"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, Resolver, useForm, useWatch } from "react-hook-form"
import { useEffect, useState } from "react"

import { findAllAnnouncementsCategory } from "@/services/announcements-category.service"
import { AnnouncementCategoryResponse } from "@/types/response/announcement-category.response"
import { AnnouncementStatusEnum } from "@/types/enums/announcement-status.enum"
import { MedicationTypeEnum } from "@/types/enums/medication-type.enum"
import { useRouter } from "next/navigation"
import {
  CreateAnnouncementFormData,
  createAnnouncementSchema,
} from "@/types/schemas/create-announcement.schema"
import { createAnnouncement } from "@/services/announcements.service"

export default function NewProductPage() {
  const [categories, setCategories] = useState<AnnouncementCategoryResponse[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateAnnouncementFormData>({
    resolver: zodResolver(createAnnouncementSchema) as Resolver<CreateAnnouncementFormData>,
    defaultValues: {
      status: AnnouncementStatusEnum.AWAITING_APPROVAL,
      requiresRefrigeration: false,
      dynamicPrice: false,
    },
  })

  const dynamicPrice = useWatch({ control, name: "dynamicPrice" })

  useEffect(() => {
    findAllAnnouncementsCategory({ page: 0 })
      .then((res) => setCategories(res.content))
      .catch((err) => {
        console.error("Failed to fetch categories:", err)
      })
  }, [])

  async function onSubmit(data: CreateAnnouncementFormData) {
    try {
      setLoading(true)
      await createAnnouncement(data)
      router.push("/dashboard/products")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4"
      onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}
    >
      <h1 className="text-title text-base-2">Novo produto</h1>

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
              <p className="min-h-5 text-sm text-red-600">{errors.idCategory?.message}</p>
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
                  <SelectGroup placeholder="Selecione">
                    <SelectItem value={AnnouncementStatusEnum.ACTIVE}>Ativo</SelectItem>
                    <SelectItem value={AnnouncementStatusEnum.AWAITING_APPROVAL}>
                      Aguardando aprovação
                    </SelectItem>
                    <SelectItem value={AnnouncementStatusEnum.INACTIVE}>Inativo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="min-h-5 text-sm text-red-600">{errors.status?.message}</p>
            </div>
          )}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <h2 className="text-title text-base-2">Especificações</h2>

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
                  <p className="min-h-5 text-sm text-red-600"></p>
                </div>
              )}
            />
            <InputText
              {...register("classification")}
              errorMessage={errors.classification?.message}
              className="w-full"
              label="Classificação"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <InputText
              {...register("activeIngredient")}
              errorMessage={errors.activeIngredient?.message}
              label="Principio ativo"
            />
            <InputText
              {...register("contentDescription")}
              errorMessage={errors.contentDescription?.message}
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

        <Controller
          name="dynamicPrice"
          control={control}
          render={({ field }) => (
            <div className="flex w-full flex-col gap-1">
              <label className="text-4/5 text-base-3">Preço dinâmico</label>
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
                <p className="min-h-5 text-sm text-red-600"></p>
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
        <Button disabled={loading}>Salvar</Button>
      </div>
    </form>
  )
}
