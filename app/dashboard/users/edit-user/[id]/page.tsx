"use client";

import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";
import { getByIdCompanyUser, getUserData, updateProfileCompanyUser } from "@/services/user.service";
import {
  UpdateAnnouncementFormData,
  updateAnnouncementSchema,
} from "@/types/schemas/update-announcement.schema";
import {
  updateCompanyUserSchema,
  UpdateCompanyUserSchemaFormData,
} from "@/types/schemas/update-company-user.schema";
import { UserDataResponse } from "@/types/user-data.response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditUserPage({ params }: PageProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = React.use(params);

  const { register, reset, handleSubmit } = useForm<UpdateCompanyUserSchemaFormData>({
    resolver: zodResolver(updateCompanyUserSchema) as Resolver<UpdateCompanyUserSchemaFormData>,
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      getByIdCompanyUser(id)
        .then((res) => {
          reset({
            name: res.name,
            position: res.position,
            contactNumber: res.contactNumber,
            email: res.email,
          });
        })
        .finally(() => setLoading(false));
    }

    loadData();
  }, [id, reset]);

  async function onSubmit(data: UpdateCompanyUserSchemaFormData) {
    try {
      setLoading(true);
      if (data.email) {
        await updateProfileCompanyUser({ ...data, id }, data.email);
        router.push("/dashboard/users");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <div className="flex flex-col gap-12">
        <h1 className="text-title text-base-2">Editar usuário</h1>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}
        >
          <h2 className="text-subtitle text-base-2">Dados do usuário</h2>

          <div className="w-full flex flex-row justify-between gap-4">
            <InputText {...register("name")} className="w-full" label="Nome" />

            <InputText {...register("position")} className="w-full" label="Cargo" />
          </div>

          <div className="w-full flex flex-row justify-between gap-4">
            <InputText
              {...register("contactNumber")}
              className="w-full"
              label="Número para contato"
              mask="(99) 9 9999-9999"
            />

            <InputText {...register("email")} label="E-mail" placeholder="Exemplo@gmail.com" />
          </div>

          <Button className="w-fit mx-auto" disabled={loading}>
            Salvar
          </Button>
        </form>
      </div>
    </main>
  );
}
