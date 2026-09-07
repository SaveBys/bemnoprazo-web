"use client";

import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "../ui/button";
import InputSearch from "../ui/input/input-search";
import { InputText } from "../ui/input/input-text";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { Checkbox } from "../ui/input/checkbox";
import { CheckboxGroup } from "../ui/input/checkbox-group";
import { Slider } from "../ui/slider";
import { findAllAnnouncementsCategory } from "@/services/announcements-category.service";
import { useEffect, useState } from "react";
import { AnnouncementCategoryResponse } from "@/types/response/announcement-category.response";

type Props = {
  onSubmitFilters: (data: AnnouncementsFilterParams) => void;
};

type FilterFormParams = Omit<AnnouncementsFilterParams, "minPrice" | "maxPrice"> & {
  rangePrice?: number[];
};

export function FilterProducts({ onSubmitFilters }: Props) {
  const [categories, setCategories] = useState<AnnouncementCategoryResponse[]>();

  const defaultFilters: FilterFormParams = {
    categories: [],
    rangePrice: [0, 10000],
    expirationSoon: false,
    minExpirationDate: "",
    maxExpirationDate: "",
  };

  const { register, handleSubmit, reset, control } = useForm<FilterFormParams>({
    defaultValues: defaultFilters,
  });

  const rangePrice = useWatch({
    control,
    name: "rangePrice",
  });

  useEffect(() => {
    findAllAnnouncementsCategory({ page: 0 }).then((res) => {
      setCategories(res.content);
    });
  }, []);

  function onSubmit(data: FilterFormParams) {
    const { rangePrice, ...rest } = data;
    const payload: AnnouncementsFilterParams = {
      ...rest,
      minPrice: rangePrice?.[0],
      maxPrice: rangePrice?.[1],
    };
    onSubmitFilters(payload);
  }

  function handleClear() {
    reset(defaultFilters);
    onSubmitFilters(defaultFilters);
  }

  return (
    <div className="flex w-75 flex-col gap-8">
      <h1 className="text-title text-base-2">Filtros</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <InputSearch label="Buscar" placeholder="Digite nome ou código" {...register("search")} />

        <h2 className="text-subtitle text-base-2">Categoria</h2>

        {categories && (
          <CheckboxGroup
            name="categories"
            control={control}
            className="flex flex-col gap-6"
            options={categories?.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        )}

        <hr className="border-base-3 w-full border" />

        <h2 className="text-subtitle text-base-2">Valor</h2>

        <Controller
          control={control}
          name="rangePrice"
          defaultValue={[0, 10000]}
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

        <span className="text-base-2 font-medium">
          R$ {rangePrice?.[0]} — R$ {rangePrice?.[1]}
        </span>

        <hr className="border-base-3 w-full border" />

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
