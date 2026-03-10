import { OperationParticipantRoleEnum } from "../enums/operation-participant-role.enum";
import { OperationStatusEnum } from "../enums/operation-status.enum";

export interface OperationResponse {
  id: string;
  operationCode: number;
  status: OperationStatusEnum;
  operationDate: string;
  totalPrice: number;
  notes: string;
  role: OperationParticipantRoleEnum;
  items: OperationItemResponse[];
  participants: OperationParticipantResponse[];
}

export interface OperationItemResponse {
  id: string;
  announcementId: string;
  announcementName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  batch: string;
  expirationDate: string;
}

export interface OperationParticipantResponse {
  id: string;
  participantId: string;
  participantName: string;
  role: OperationParticipantRoleEnum;
}
