export interface AnnouncementResponse {
  id: string;
  ean: string;
  name: string;
  manufacturer: string;
  description: string;
  contentDescription: string;
  expirationDate: string;
  quantity: number;
  usageInstructions: string;
  price: number;
  basePrice: number;
  specs: { key: string, value: string }[];
}