export enum AnnouncementStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
}

export function announcementStatusEnumValue(key: AnnouncementStatusEnum | string) {
  const enumValue = {
    [AnnouncementStatusEnum.ACTIVE]: {
      label: "Ativo",
    },
    [AnnouncementStatusEnum.AWAITING_APPROVAL]: {
      label: "Aguardando aprovação",
    },
    [AnnouncementStatusEnum.INACTIVE]: {
      label: "Inativo",
    },
  };
  return enumValue[key as AnnouncementStatusEnum] ?? { label: "Desconhecido" };
}
