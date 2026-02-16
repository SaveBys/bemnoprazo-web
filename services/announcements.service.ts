
import { api } from "@/lib/axios";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params";
import { Pageable } from "@/types/pageable";
import { ProdutoResumo } from "@/types/products-resume";

export async function getAllAnnouncements(
  params: AnnouncementsFilterParams
): Promise<Pageable<ProdutoResumo>> {
  const { data } = await api.get("/announcements", {
    params: params
  });
  return data;
}