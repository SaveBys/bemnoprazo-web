import { OperationStatusEnum } from "../enums/operation-status.enum";

export interface AnnouncementOperationDetailsTable {
  operationId: string;
  code: string;
  buyerName: string;
  operationStatus: OperationStatusEnum;
  quantity: number;
  price: number;
}
