"use client";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";
import { getById, updateProfile } from "@/services/user.service";

import { UpdateCompanyUserFormData } from "@/types/schemas/update-company-user.schema";
import { UpdateProfileFormData, updateProfileSchema } from "@/types/schemas/update-profile.schema";
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
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema) as Resolver<UpdateProfileFormData>,
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      getById(id)
        .then((res) => {
          reset({
            companyName: res.companyName,
            accountResponsible: res.name,
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
      await updateProfile({ ...data, id }, data.email!);
      setMessage({
        title: "Sucesso!",
        callback() {
          router.push("/backoffice/users");
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
              {...register("companyName")}
              errorMessage={errors.companyName?.message}
              className="w-full"
              label="Empresa"
              required
            />

            <InputText
              {...register("accountResponsible")}
              errorMessage={errors.accountResponsible?.message}
              className="w-full"
              label="Reponsável"
              required
            />
          </div>

          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              {...register("contactNumber")}
              errorMessage={errors.contactNumber?.message}
              className="w-full"
              label="Número para contato"
              mask="(99) 9 9999-9999"
              required
            />

            <InputText
              {...register("email")}
              errorMessage={errors.email?.message}
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
