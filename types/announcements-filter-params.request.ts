export interface AnnouncementsFilterParams {
  search?: string;
  categories?: string[];
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  expirationSoon?: boolean;
  minExpirationDate?: string;
  maxExpirationDate?: string;
  page?: number;
  size?: number;
}