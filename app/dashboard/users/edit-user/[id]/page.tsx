"use client";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";
import { getByIdCompanyUser, updateProfileCompanyUser } from "@/services/user.service";

import {
  updateCompanyUserSchema,
  UpdateCompanyUserFormData,
} from "@/types/schemas/update-company-user.schema";
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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();
  const router = useRouter();
  const { id } = React.use(params);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCompanyUserFormData>({
    resolver: zodResolver(updateCompanyUserSchema) as Resolver<UpdateCompanyUserFormData>,
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

  async function onSubmit(data: UpdateCompanyUserFormData) {
    try {
      setLoading(true);
      await updateProfileCompanyUser({ ...data, id }, data.email!);
      setMessage({
        title: "Sucesso!",
        callback() {
          router.push("/dashboard/users");
        },
      });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <div className="flex flex-col gap-12">
        <h1 className="text-title text-base-2">Editar usuário</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-subtitle text-base-2">Dados do usuário</h2>

          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              {...register("name")}
              errorMessage={errors.name?.message}
              className="w-full"
              label="Nome"
              required
            />

            <InputText
              {...register("position")}
              errorMessage={errors.name?.message}
              className="w-full"
              label="Cargo"
              required
            />
          </div>

          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              {...register("contactNumber")}
              errorMessage={errors.name?.message}
              className="w-full"
              label="Número para contato"
              mask="(99) 9 9999-9999"
              required
            />

            <InputText
              {...register("email")}
              errorMessage={errors.name?.message}
              label="E-mail"
              placeholder="Exemplo@gmail.com"
              required
            />
          </div>

          <Button className="mx-auto w-fit" loading={loading}>
            Salvar
          </Button>
        </form>
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </main>
  );
}
