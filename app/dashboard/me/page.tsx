"use client";

import { Button } from "@/components/ui/button";

import { InputText } from "@/components/ui/input/input-text";
import { getByIdCompanyUser, getUserData } from "@/services/user.service";
import {
  UpdateCompanyUserSchemaFormData,
  updateCompanyUserSchema,
} from "@/types/schemas/update-company-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";

export default function MePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, reset, handleSubmit } = useForm<UpdateCompanyUserSchemaFormData>({
    resolver: zodResolver(updateCompanyUserSchema) as Resolver<UpdateCompanyUserSchemaFormData>,
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      getUserData()
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
  }, [reset]);

  return (
    <main className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <h1 className="text-title text-base-2">Meu perfil</h1>

      <form action="" className="flex flex-col gap-4">
        <p className="text-subtitle text-base-2">Meus dados</p>

        <div className="w-full flex flex-row justify-between gap-4">
          <InputText {...register("name")} label="Nome" disabled />
          <InputText
            {...register("contactNumber")}
            label="Número para contato"
            placeholder="(99) 9 9999-9999"
            disabled
          />
        </div>

        <div className="w-full flex flex-row justify-between gap-4">
          <InputText
            label="CNPJ"
            placeholder="56.476.678/0001-99"
            mask="99.999.999/9999-99"
            disabled
          />
          <InputText
            {...register("email")}
            label="E-mail"
            placeholder="Exemplo@gmail.com"
            disabled
          />
        </div>

        <Button className="w-fit mx-auto">Solicitar alteração dos dados</Button>
      </form>
    </main>
  );
}
