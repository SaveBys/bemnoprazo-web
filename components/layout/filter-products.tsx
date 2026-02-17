"use client"

import { Controller, useForm } from "react-hook-form"

import { Button } from "../ui/button"
import InputSearch from "../ui/input/input-search"
import { InputText } from "../ui/input/input-text"
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request"
import { Checkbox } from "../ui/input/checkbox"
import { CheckboxGroup } from "../ui/input/checkbox-group"

type Props = {
  onSubmitFilters: (data: AnnouncementsFilterParams) => void
}

export function FilterProducts({ onSubmitFilters }: Props) {
  const defaultFilters: AnnouncementsFilterParams = {
    category: [],
    price: [],
    expirationSoon: false,
    minExpirationDate: "",
    maxExpirationDate: "",
  }
  
  const { register, handleSubmit, reset, control } = useForm<AnnouncementsFilterParams>({
    defaultValues: defaultFilters
  })

  function onSubmit(data: AnnouncementsFilterParams) {
    onSubmitFilters(data)
  }

  function handleClear() {
    reset(defaultFilters)
    onSubmitFilters(defaultFilters)
  }

  return (
    <div className="w-[300px] flex flex-col gap-8">
      <h1 className="text-title text-base-2">Filtros</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>

        <InputSearch
          label="Buscar"
          placeholder="Digite nome ou código"
          {...register("search")}
        />

        <h2 className="text-subtitle text-base-2">Categoria</h2>

        <CheckboxGroup
          name="category"
          control={control}
          className="flex flex-col gap-6"
          options={[
            { label: "Medicamentos especiais", value: "ESPECIAIS" },
            { label: "Medicamentos", value: "MEDICAMENTOS" },
            { label: "Contraceptivos", value: "CONTRACEPTIVOS" },
            { label: "Suplementos", value: "SUPLEMENTOS" }
          ]}
        />

        <hr className="w-full border-base-3 border-1" />

        <h2 className="text-subtitle text-base-2">Valor</h2>

        <CheckboxGroup
          name="price"
          control={control}
          className="flex flex-col gap-6"
          options={[
            { label: "Até R$ 250,00", value: "UP_TO_250" },
            { label: "De R$ 250,00 até R$ 599,00", value: "250_599" },
            { label: "De R$ 599,00 até 999,00", value: "599_999" },
            { label: "A partir de R$ 1.000,00", value: "1000_PLUS" }
          ]}
        />

        <hr className="w-full border-base-3 border-1" />

        <h2 className="text-subtitle text-base-2">Validade</h2>

        <div className="flex flex-col gap-4">

          <Controller
            name="expirationSoon"
            control={control}
            render={({ field }) => (
              <Checkbox
                label="Vence em breve"
                checked={field.value || false}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
            )}
          />

          <InputText
            label="Validade inicial"
            placeholder="00/00/0000"
            mask="99/99/9999"
            {...register("minExpirationDate")}
          />

          <InputText
            label="Validade final"
            placeholder="00/00/0000"
            mask="99/99/9999"
            {...register("maxExpirationDate")}
          />

        </div>

        <div className="flex flex-col gap-6">
          <Button type="submit">Buscar</Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            Limpar Filtros
          </Button>
        </div>

      </form>
    </div>
  )
}