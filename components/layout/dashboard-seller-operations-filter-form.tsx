"use client";

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

import { OperationFilterRequest } from "@/types/request/operation-filter-request.request";
import {
  OperationParticipantRoleEnum,
  OperationParticipantRoleEnumValue,
} from "@/types/enums/operation-participant-role.enum";
import { OperationStatusEnum, OperationStatusEnumValue } from "@/types/enums/operation-status.enum";

export function DashboardSellerOperationsFilterForm({
  onSubmitFilters,
}: {
  onSubmitFilters: (data: OperationFilterRequest) => void;
}) {
  const defaultFilters: OperationFilterRequest = {
    type: "",
    status: "",
  };

  const { handleSubmit, reset, control } = useForm<OperationFilterRequest>({
    defaultValues: defaultFilters,
  });

  function onSubmit(data: OperationFilterRequest) {
    onSubmitFilters(data);
  }

  function handleClear() {
    reset(defaultFilters);
    onSubmitFilters(defaultFilters);
  }

  return (
    <form className="flex items-end gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="tipo" className="text-4/5 text-base-3">
              Tipo
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
                  <SelectItem
                    key={OperationParticipantRoleEnum.BUYER}
                    value={OperationParticipantRoleEnum.BUYER}
                  >
                    {OperationParticipantRoleEnumValue(OperationParticipantRoleEnum.BUYER).label}
                  </SelectItem>
                  <SelectItem
                    key={OperationParticipantRoleEnum.SELLER}
                    value={OperationParticipantRoleEnum.SELLER}
                  >
                    {OperationParticipantRoleEnumValue(OperationParticipantRoleEnum.SELLER).label}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="status"
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
                  <SelectItem key={OperationStatusEnum.CREATED} value={OperationStatusEnum.CREATED}>
                    {OperationStatusEnumValue(OperationStatusEnum.CREATED).label}
                  </SelectItem>
                  <SelectItem
                    key={OperationStatusEnum.CONFIRMED}
                    value={OperationStatusEnum.CONFIRMED}
                  >
                    {OperationStatusEnumValue(OperationStatusEnum.CONFIRMED).label}
                  </SelectItem>
                  <SelectItem
                    key={OperationStatusEnum.CANCELLED}
                    value={OperationStatusEnum.CANCELLED}
                  >
                    {OperationStatusEnumValue(OperationStatusEnum.CANCELLED).label}
                  </SelectItem>
                  <SelectItem
                    key={OperationStatusEnum.FINISHED}
                    value={OperationStatusEnum.FINISHED}
                  >
                    {OperationStatusEnumValue(OperationStatusEnum.FINISHED).label}
                  </SelectItem>
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
