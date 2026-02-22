import { api } from "@/lib/axios";
import { AnnouncementResponse } from "@/types/announcement-details.response";
import { AnnouncementsFilterParams } from "@/types/announcements-filter-params.request";
import { Pageable } from "@/types/pageable";
import { AnnouncementResumeResponse } from "@/types/annoucement-resume.response";
import { AnnouncementTableResponse } from "@/types/announcement-table.response";

export async function findAllAnnouncements(
  params: AnnouncementsFilterParams,
): Promise<Pageable<AnnouncementResumeResponse>> {
  const { data } = await api.get("/announcements", {
    params: params,
  });
  return data;
}

export async function findAllMyAnnouncements(
  params: AnnouncementsFilterParams,
): Promise<Pageable<AnnouncementTableResponse>> {
  const { data } = await api.get("/announcements/my-announcements", {
    params: params,
  });
  return data;
}

export async function getById(id: string): Promise<AnnouncementResponse> {
  const { data } = await api.get(`/announcements/${id}`);
  return data;
}

export async function getMyById(id: string): Promise<AnnouncementResponse> {
  const { data } = await api.get(`/announcements/my-announcements/${id}`);
  return data;
}