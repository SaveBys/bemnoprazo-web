import { api } from "@/lib/axios";
import { Pageable } from "@/types/pageable";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { AnnouncementOperationTable } from "@/types/response/announcement-operation-table.response";

export async function findAllAnnouncementOperationsBackoffice(
  params: AnnouncementsFilterParams,
): Promise<Pageable<AnnouncementOperationTable>> {
  const { data } = await api.get("/announcements/operations/backoffice", {
    params: params,
  });
  return data;
}
