import { AnnouncementStatusEnum } from "../enums/announcement-status.enum";
import { MedicationTypeEnum } from "../enums/medication-type.enum";

export interface CreateAnnouncementRequest {
  id: string;
  ean: string;
  name: string;
  batch: string;
  expirationDate: string;
  quantity: number;
  status: AnnouncementStatusEnum;
  requiresRefrigeration: boolean;
  medicationType: MedicationTypeEnum;
  activeIngredient: string;
  contentDescription: string;
  classification: string;
  requiresPrescription: boolean;
  administrationRoute: string;
  usageInstructions: string;
  conservation: string;
  idCategory: string;
  price: number;
  basePrice: number;
  dynamicPrice: boolean;
  dynamicPriceUnit: number;
  dynamicPriceUnitValue: number;
  dynamicPricePercent: number;
  dynamicTotalPrice: number;
}