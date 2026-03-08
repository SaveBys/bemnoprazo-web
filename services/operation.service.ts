import { api } from "@/lib/axios";

export async function createOperation(): Promise<void> {
  await api.post("/operations");
}
