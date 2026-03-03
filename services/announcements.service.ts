import { api } from "@/lib/axios";
import { AnnouncementResponse } from "@/types/response/announcement-details.response";
import { AnnouncementsFilterParams } from "@/types/request/announcements-filter-params.request";
import { Pageable } from "@/types/pageable";
import { AnnouncementResumeResponse } from "@/types/response/annoucement-resume.response";
import { AnnouncementTableResponse } from "@/types/response/announcement-table.response";
import { UpdateAnnouncementFormData } from "@/types/schemas/update-announcement.schema";
import { CreateAnnouncementFormData } from "@/types/schemas/create-announcement.schema";

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

export async function findAllAnnouncementsBackoffice(
  params: AnnouncementsFilterParams,
): Promise<Pageable<AnnouncementTableResponse>> {
  const { data } = await api.get("/announcements/backoffice", {
    params: params,
  });
  return data;
}

export async function getAnnouncementById(id: string): Promise<AnnouncementResponse> {
  const { data } = await api.get(`/announcements/${id}`);
  return data;
}

export async function getMyAnnouncementById(id: string): Promise<AnnouncementResponse> {
  const { data } = await api.get(`/announcements/my-announcements/${id}`);
  return data;
}

export async function updateAnnouncement(payload: UpdateAnnouncementFormData): Promise<void> {
  await api.put("/announcements", payload);
}

export async function createAnnouncement(payload: CreateAnnouncementFormData): Promise<void> {
  const { data } = await api.post("/announcements", payload);
  return data;
}
