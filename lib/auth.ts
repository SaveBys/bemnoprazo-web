import { api } from "./axios";

export async function login(username: string, password: string) {
  await api.post("/login", {
    username,
    password,
  });

  return true;
}

export async function logout() {
  await api.post("/logout");

  return true;
}
