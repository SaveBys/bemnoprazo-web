"use client";

import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "../ui/button";
import InputSearch from "../ui/input/input-search";
import { InputText } from "../ui/input/input-text";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { Checkbox } from "../ui/input/checkbox";
import { CheckboxGroup } from "../ui/input/checkbox-group";
import { Slider } from "../ui/slider";

type Props = {
  onSubmitFilters: (data: AnnouncementsFilterParams) => void;
};

export function FilterProducts({ onSubmitFilters }: Props) {
  const defaultFilters: AnnouncementsFilterParams = {
    category: [],
    rangePrice: [0, 1000],
    expirationSoon: false,
    minExpirationDate: "",
    maxExpirationDate: "",
  };

  const { register, handleSubmit, reset, control } =
    useForm<AnnouncementsFilterParams>({
      defaultValues: defaultFilters,
    });

  const rangePrice = useWatch({
    control,
    name: "rangePrice",
  });

  function onSubmit(data: AnnouncementsFilterParams) {
    const payload = {
      ...data,
      minPrice: data.rangePrice?.[0] ?? null,
      maxPrice: data.rangePrice?.[1] ?? null,
    };

    onSubmitFilters(payload);
  }

  function handleClear() {
    reset(defaultFilters);
    onSubmitFilters(defaultFilters);
  }

  return (
    <div className="w-75 flex flex-col gap-8">
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
            {
              label: "Medicamentos especiais",
              value: "018f4a10-7a01-7b2c-9c01-1a2b3c4d0001",
            },
            {
              label: "Medicamentos",
              value: "018f4a10-7a02-7b2c-9c01-1a2b3c4d0002",
            },
            {
              label: "Contraceptivos",
              value: "018f4a10-7a03-7b2c-9c01-1a2b3c4d0003",
            },
            {
              label: "Suplementos",
              value: "018f4a10-7a04-7b2c-9c01-1a2b3c4d0004",
            },
          ]}
        />

        <hr className="w-full border-base-3 border" />

        <h2 className="text-subtitle text-base-2">Valor</h2>

        <Controller
          control={control}
          name="rangePrice"
          render={({ field }) => (
            <Slider
              min={0}
              max={10000}
              step={100}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />

        <span className="font-medium text-base-2">
          R$ {rangePrice?.[0]} — R$ {rangePrice?.[1]}
        </span>

        <hr className="w-full border-base-3 border" />

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

          <Button type="button" variant="secondary" onClick={handleClear}>
            Limpar Filtros
          </Button>
        </div>
      </form>
    </div>
  );
}
