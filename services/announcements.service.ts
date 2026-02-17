
import { api } from "@/lib/axios";
import { AnnouncementResponse } from "@/types/announcement-details.response";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { Pageable } from "@/types/pageable";
import { AnnouncementResumeResponse } from "@/types/annoucement-resume.response";

export async function getAllAnnouncements(
  params: AnnouncementsFilterParams
): Promise<Pageable<AnnouncementResumeResponse>> {
  const { data } = await api.get("/announcements", {
    params: params
  });
  return data;
}

export async function getById(id: string): Promise<AnnouncementResponse> {
  const { data } = await api.get(`/announcements/${id}`);
  return data;
}