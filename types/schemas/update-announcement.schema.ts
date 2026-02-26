import { z } from "zod";
import { AnnouncementStatusEnum } from "../enums/announcement-status.enum";
import { MedicationTypeEnum } from "../enums/medication-type.enum";

export const updateAnnouncementSchema = z.object({
  id: z.string(),
  ean: z.string(),
  name: z.string(),
  batch: z.string(),
  expirationDate: z.string(),
  quantity: z.number(),
  status: z.enum(AnnouncementStatusEnum),
  requiresRefrigeration: z.boolean(),
  medicationType: z.union([z.enum(MedicationTypeEnum), z.enum(["none"])]),
  activeIngredient: z.string(),
  contentDescription: z.string(),
  classification: z.string(),
  requiresPrescription: z.boolean(),
  administrationRoute: z.string(),
  usageInstructions: z.string(),
  conservation: z.string(),
  idCategory: z.string(),
  price: z.number(),
  basePrice: z.number(),
  dynamicPrice: z.boolean(),
  dynamicPriceUnit: z.number(),
  dynamicPriceUnitValue: z.number(),
  dynamicPricePercent: z.number(),
  dynamicTotalPrice: z.number(),
});
