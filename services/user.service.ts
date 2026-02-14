import { api } from "@/lib/axios";
import { UserDataResponse } from "@/types/user-data.response";

export async function getUserData(): Promise<UserDataResponse> {
  const { data } = await api.get("/users");
  return data;
}

export async function resetPassword(email: string): Promise<UserDataResponse> {
  const { data } = await api.post("/users/reset-password", null, {
    params: { email },
  });
  return data;
}

export async function updatePassword(token: string, password: string): Promise<UserDataResponse> {
  const { data } = await api.patch("/users/update-password", null, {
    params: { token, password },
  });
  return data;
}