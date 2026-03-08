export enum expirationDateRangeEnum {
  INVALID = "INVALID",
  ZERO_TO_THIRTY = "ZERO_TO_THIRTY",
  THIRTY_ONE_TO_SIXTY = "THIRTY_ONE_TO_SIXTY",
  SIXTY_ONE_TO_NINETY = "SIXTY_ONE_TO_NINETY",
  ABOVE_NINETY = "ABOVE_NINETY",
}

export function expirationDateRangeEnumValue(key: expirationDateRangeEnum) {
  const enumValue = {
    [expirationDateRangeEnum.INVALID]: {
      label: "Invalido",
    },
    [expirationDateRangeEnum.ZERO_TO_THIRTY]: {
      label: "30 dias",
    },
    [expirationDateRangeEnum.THIRTY_ONE_TO_SIXTY]: {
      label: "60 dias",
    },
    [expirationDateRangeEnum.SIXTY_ONE_TO_NINETY]: {
      label: "90 dias",
    },
    [expirationDateRangeEnum.ABOVE_NINETY]: {
      label: "",
    },
  };
  return enumValue[key as expirationDateRangeEnum] ?? { label: "Desconhecido" };
}
