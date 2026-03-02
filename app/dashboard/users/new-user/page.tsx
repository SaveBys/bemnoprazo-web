"use client"

import { Button } from "@/components/ui/button"
import { InputText } from "@/components/ui/input/input-text"
import {
  createUserEmployee,
  getByIdCompanyUser,
  getUserData,
  updateProfileCompanyUser,
} from "@/services/user.service"
import { CreateAnnouncementFormData } from "@/types/schemas/create-announcement.schema"
import {
  createUserEmployeeSchema,
  CreateUserEmployeeSchemaFormData,
} from "@/types/schemas/create-user-employee.schema"
import {
  UpdateAnnouncementFormData,
  updateAnnouncementSchema,
} from "@/types/schemas/update-announcement.schema"
import {
  updateCompanyUserSchema,
  UpdateCompanyUserSchemaFormData,
} from "@/types/schemas/update-company-user.schema"
import { UserDataResponse } from "@/types/user-data.response"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import React, { useEffect, useState } from "react"
import { Resolver, useForm } from "react-hook-form"

export default function EditUserPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserEmployeeSchemaFormData>({
    resolver: zodResolver(createUserEmployeeSchema) as Resolver<CreateUserEmployeeSchemaFormData>,
  })

  async function onSubmit(data: CreateUserEmployeeSchemaFormData) {
    try {
      setLoading(true)
      await createUserEmployee(data)
      router.push("/dashboard/users")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-12">
        <h1 className="text-title text-base-2">Editar usuário</h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}
        >
          <h2 className="text-subtitle text-base-2">Dados do usuário</h2>

          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              {...register("name")}
              errorMessage={errors.name?.message}
              className="w-full"
              label="Nome"
            />

            <InputText
              {...register("position")}
              errorMessage={errors.position?.message}
              className="w-full"
              label="Cargo"
            />

            <InputText
              {...register("document")}
              errorMessage={errors.document?.message}
              className="w-full"
              label="CPF"
              mask="999.999.999-99"
            />
          </div>

          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              {...register("contactNumber")}
              errorMessage={errors.contactNumber?.message}
              className="w-full"
              label="Número para contato"
              mask="(99) 9 9999-9999"
            />

            <InputText
              {...register("email")}
              errorMessage={errors.email?.message}
              label="E-mail"
              placeholder="Exemplo@gmail.com"
            />
          </div>

          <Button className="mx-auto w-fit" disabled={loading}>
            Salvar
          </Button>
        </form>
      </div>
    </main>
  )
}
