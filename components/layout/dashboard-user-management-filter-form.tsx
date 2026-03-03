"use client";

import { useForm } from "react-hook-form";

import InputSearch from "@/components/ui/input/input-search";
import { Button } from "@/components/ui/button";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";

export function DashboardUsersManagementFilterForm({
  onSubmitFilters,
}: {
  onSubmitFilters: (data: AnnouncementsFilterParams) => void;
}) {
  const defaultFilters: AnnouncementsFilterParams = {
    search: "",
  };

  const { register, handleSubmit, reset } = useForm<AnnouncementsFilterParams>({
    defaultValues: defaultFilters,
  });

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

      <Button type="button" variant="secondary" onClick={handleClear}>
        Limpar filtro
      </Button>

      <Button type="submit">Buscar</Button>
    </form>
  );
}
