import { z } from "zod";
import { AnnouncementStatusEnum } from "../enums/announcement-status.enum";
import { MedicationTypeEnum } from "../enums/medication-type.enum";
import { expirationDateValidator } from "@/lib/utils";

export const updateAnnouncementSchema = z.object({
  id: z.string(),
  ean: z.string().optional(),
  name: z.string().min(1, "Nome deve ser informado."),
  batch: z.string().min(1, "Lote deve ser informado."),
  expirationDate: z.string().refine((value) => expirationDateValidator(value), {
    message: "A data deve ser pelo menos 90 dias no futuro",
  }),
  quantity: z.coerce.number().min(1, "Quantidade deve ser maior que 0."),
  status: z.enum(AnnouncementStatusEnum),
  requiresRefrigeration: z.boolean().optional(),
  medicationType: z.union([z.enum(MedicationTypeEnum), z.enum(["none"])]),
  activeIngredient: z.string().optional(),
  contentDescription: z.string().optional(),
  classification: z.string().optional(),
  requiresPrescription: z.boolean().optional(),
  administrationRoute: z.string().optional(),
  usageInstructions: z.string().optional(),
  conservation: z.string().optional(),
  idCategory: z.string("A Categoria deve ser informada."),
  price: z.coerce.number().min(1, "Preço deve ser maior informado."),
  basePrice: z.coerce.number().optional(),
  dynamicPrice: z.boolean().optional(),
  dynamicPriceUnit: z.string().nullable().optional(),
  dynamicPriceUnitValue: z.coerce.number().nullable().optional(),
  dynamicPricePercent: z.coerce.number().nullable().optional(),
  dynamicTotalPrice: z.coerce.number().nullable().optional(),
});

export type UpdateAnnouncementFormData = z.infer<typeof updateAnnouncementSchema>;
