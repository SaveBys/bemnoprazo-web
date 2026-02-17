export interface AnnouncementsFilterParams {
  search?: string
  category?: string[]
  price?: string[]
  expirationSoon?: boolean
  minExpirationDate?: string
  maxExpirationDate?: string
  page?: number;
  size?: number;
}