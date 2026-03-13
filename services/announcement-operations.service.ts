import { api } from "@/lib/axios";
import { Pageable } from "@/types/pageable";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { PaginationRequest } from "@/types/request/pagination.request";
import { AnnouncementOperationDetailsTable } from "@/types/response/announcement-operation-details-table.response";
import { AnnouncementOperationTable } from "@/types/response/announcement-operation-table.response";

export async function findAllOperationsBackoffice(
  params: AnnouncementsFilterParams,
): Promise<Pageable<AnnouncementOperationTable>> {
  const { data } = await api.get("/announcements/operations/backoffice", {
    params: params,
  });
  return data;
}

export async function findByIdAnnouncementOperations(
  id: string,
  params: PaginationRequest,
): Promise<Pageable<AnnouncementOperationDetailsTable>> {
  const { data } = await api.get(`/announcements/operations/backoffice/${encodeURIComponent(id)}`, {
    params: params,
  });
  return data;
}
