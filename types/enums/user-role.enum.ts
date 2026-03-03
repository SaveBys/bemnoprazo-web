export enum userRoleEnum {
  USER_EMPLOYEE = "USER_EMPLOYEE",
  USER_ADM = "USER_ADM",
  ADM = "ADM",
}

export function userRoleEnumValue(key: userRoleEnum | string) {
  const enumValue = {
    [userRoleEnum.ADM]: {
      label: "ADM BemNoPrazo",
    },
    [userRoleEnum.USER_ADM]: {
      label: "Administrador",
    },
    [userRoleEnum.USER_EMPLOYEE]: {
      label: "Colaborador",
    },
  };
  return enumValue[key as userRoleEnum] ?? { label: "Desconhecido" };
}
