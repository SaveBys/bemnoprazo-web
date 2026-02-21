export interface AnnouncementsFilterParams {
  search?: string;
  category?: string[];
  rangePrice?: number[];
  expirationSoon?: boolean;
  minExpirationDate?: string;
  maxExpirationDate?: string;
  page?: number;
  size?: number;
}