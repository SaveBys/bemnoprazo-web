"use client";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";
import { createUserEmployee } from "@/services/user.service";
import {
  createUserEmployeeSchema,
  CreateUserEmployeeFormData,
} from "@/types/schemas/create-user-employee.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";

export default function EditUserPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserEmployeeFormData>({
    resolver: zodResolver(createUserEmployeeSchema) as Resolver<CreateUserEmployeeFormData>,
  });

  async function onSubmit(data: CreateUserEmployeeFormData) {
    try {
      setLoading(true);
      await createUserEmployee(data);
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
