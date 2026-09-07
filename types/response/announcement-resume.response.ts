import { expirationDateRangeEnum } from "../enums/expiration-date-range.enum";

export interface AnnouncementResumeResponse {
  id: string;
  name: string;
  ean: string;
  basePrice: number;
  price: number;
  expirationDate: string;
  expirationDateRange: expirationDateRangeEnum;
}
