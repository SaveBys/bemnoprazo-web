import { api } from "@/lib/axios";
import { Pageable } from "@/types/pageable";
import { OperationFilterRequest } from "@/types/request/operation-filter-request.request";
import { OperationResponse } from "@/types/response/operation.response";

export async function createOperation(): Promise<void> {
  await api.post("/operations");
}

export async function findAllAnnouncementOperations(
  params: OperationFilterRequest,
): Promise<Pageable<OperationResponse>> {
  const { data } = await api.get("/operations", {
    params: params,
  });
  return data;
}

export async function approveOperation(id: string): Promise<void> {
  await api.patch(`/operations/approve/${encodeURIComponent(id)}`);
}

export async function cancelOperation(id: string): Promise<void> {
  await api.patch(`/operations/cancel/${encodeURIComponent(id)}`);
}
