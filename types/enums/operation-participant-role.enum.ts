export enum OperationParticipantRoleEnum {
  BUYER = "BUYER",
  SELLER = "SELLER",
}

export function OperationParticipantRoleEnumValue(key: OperationParticipantRoleEnum) {
  const enumValue = {
    [OperationParticipantRoleEnum.BUYER]: {
      label: "Compra",
    },
    [OperationParticipantRoleEnum.SELLER]: {
      label: "Venda",
    },
  };
  return enumValue[key as OperationParticipantRoleEnum] ?? { label: "Desconhecido" };
}
