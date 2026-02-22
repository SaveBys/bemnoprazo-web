import { api } from "@/lib/axios";
import { AnnouncementCategoryFilterRequest } from "@/types/announcement-category-filter.request";
import { AnnouncementCategoryResponse } from "@/types/announcement-category.response";
import { Pageable } from "@/types/pageable";

export async function findAllAnnouncementsCategory(
  params: AnnouncementCategoryFilterRequest
): Promise<Pageable<AnnouncementCategoryResponse>> {
  const { data } = await api.get("/announcements/category", {
    params: params
  });
  return data;
}