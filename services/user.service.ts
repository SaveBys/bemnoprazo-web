import { api } from "@/lib/axios"
import { CreateUserRequest } from "@/types/request/create-user.request"
import { Pageable } from "@/types/pageable"
import { UserDataResponse } from "@/types/response/user-data.response"
import { UserFilterRequest } from "@/types/request/user-filter-params.request"
import { UpdateCompanyUserFormData } from "@/types/schemas/update-company-user.schema"
import { CreateUserEmployeeFormData } from "@/types/schemas/create-user-employee.schema"
import { UserDataDetailsResponse } from "@/types/response/user-data-details.response"
import { UpdataUserProfileFormData } from "@/types/schemas/update-user-profile.schema"

export async function getUserData(): Promise<UserDataResponse> {
  const { data } = await api.get("/users/me")
  return data
}

export async function getUserDataDetails(): Promise<UserDataDetailsResponse> {
  const { data } = await api.get("/users/me/details")
  return data
}

export async function getByIdCompanyUser(id: string): Promise<UserDataResponse> {
  const { data } = await api.get("/users/company-users/" + id)
  return data
}

export async function resetPassword(email: string): Promise<UserDataResponse> {
  const { data } = await api.post("/users/reset-password", null, {
    params: { email },
  })
  return data
}

export async function updatePassword(token: string, password: string): Promise<UserDataResponse> {
  const { data } = await api.patch("/users/update-password", null, {
    params: { token, password },
  })
  return data
}

export async function registerUser(body: CreateUserRequest): Promise<UserDataResponse> {
  const { data } = await api.post("/users", body)
  return data
}

export async function getAllCompanyUsers(
  params: UserFilterRequest,
): Promise<Pageable<UserDataResponse>> {
  const { data } = await api.get("/users/company-users", { params })
  return data
}

export async function updateProfileCompanyUser(
  payload: UpdateCompanyUserFormData,
  email: string,
): Promise<void> {
  await api.put("/users/company-users/update-profile", payload, { params: { email } })
}

export async function updateProfileUserAdm(payload: UpdataUserProfileFormData): Promise<void> {
  await api.put("/users/update-profile/request", payload)
}

export async function createUserEmployee(payload: CreateUserEmployeeFormData): Promise<void> {
  await api.post("/users/create/employee", payload)
}
