import { api } from "@/lib/axios";
import { UserDataResponse } from "@/types/user-data.response";

export async function getUserData(): Promise<UserDataResponse> {
  const { data } = await api.get("/users");
  return data;
}