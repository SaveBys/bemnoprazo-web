export enum OperationStatusEnum {
  CREATED = "CREATED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
}

export function OperationStatusEnumValue(key: OperationStatusEnum) {
  const enumValue = {
    [OperationStatusEnum.CREATED]: {
      label: "Criado",
    },
    [OperationStatusEnum.CONFIRMED]: {
      label: "Confirmado",
    },
    [OperationStatusEnum.CANCELLED]: {
      label: "Cancelado",
    },
    [OperationStatusEnum.FINISHED]: {
      label: "Finalizado",
    },
  };
  return enumValue[key as OperationStatusEnum] ?? { label: "Desconhecido" };
}
