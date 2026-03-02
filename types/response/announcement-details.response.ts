import { AnnouncementStatusEnum } from "../enums/announcement-status.enum"
import { MedicationTypeEnum } from "../enums/medication-type.enum"

export interface AnnouncementResponse {
  id: string
  ean: string
  name: string
  manufacturer: string
  description: string
  expirationDate: string
  quantity: number
  usageInstructions: string
  contentDescription: string
  batch: string
  status: AnnouncementStatusEnum
  requiresRefrigeration: boolean
  medicationType: MedicationTypeEnum
  activeIngredient: string
  classification: string
  requiresPrescription: boolean
  administrationRoute: string
  conservation: string
  category?: {
    id: string
    name: string
  }
  price: number
  basePrice: number
  dynamicPrice: boolean
  dynamicPriceUnit: string
  dynamicPriceUnitValue: number
  dynamicPricePercent: number
  dynamicTotalPrice: number
}
