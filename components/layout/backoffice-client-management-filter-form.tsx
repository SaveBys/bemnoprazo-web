"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/input/select";

import { findAllAnnouncementsCategory } from "@/services/announcements-category.service";
import { AnnouncementCategoryResponse } from "@/types/response/announcement-category.response";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import InputSearch from "../ui/input/input-search";

export function BackofficeClientFilterForm({
  onSubmitFilters,
}: {
  onSubmitFilters: (data: AnnouncementsFilterParams) => void;
}) {
  const [categories, setCategories] = useState<AnnouncementCategoryResponse[]>();
  const [pageCategory, setPageCategory] = useState<number>(0);

  const defaultFilters: AnnouncementsFilterParams = {
    search: "",
    category: undefined,
  };

  const { register, handleSubmit, reset, control } = useForm<AnnouncementsFilterParams>({
    defaultValues: defaultFilters,
  });

  useEffect(() => {
    findAllAnnouncementsCategory({ page: pageCategory }).then((res) => {
      setCategories(res.content);
      setPageCategory(res.page.number);
    });
  }, [pageCategory]);

  function onSubmit(data: AnnouncementsFilterParams) {
    onSubmitFilters(data);
  }

  function handleClear() {
    reset(defaultFilters);
    onSubmitFilters(defaultFilters);
  }

  return (
    <form className="flex items-end gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputSearch
              className="w-full"
              label="Busca"
              placeholder="Informe nome ou documento"
              {...register("search")}
            />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="status" className="text-4/5 text-base-3">
              Status
            </label>
            <Select
              value={field.value ?? ""}
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
          </div>
        )}
      />

      <Button type="button" variant="secondary" onClick={handleClear}>
        Limpar filtro
      </Button>

      <Button type="submit">Buscar</Button>
    </form>
  );
}