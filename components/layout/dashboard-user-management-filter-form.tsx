"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { UserFilterRequest } from "@/types/request/user-filter-params.request";

import InputSearch from "../ui/input/input-search";

export function DashboardUsersFilterForm({
  onSubmitFilters,
}: {
  onSubmitFilters: (data: UserFilterRequest) => void;
}) {
  const defaultFilters: UserFilterRequest = {
    search: "",
  };

  const { register, handleSubmit, reset } = useForm<UserFilterRequest>({
    defaultValues: defaultFilters,
  });

  function onSubmit(data: UserFilterRequest) {
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
