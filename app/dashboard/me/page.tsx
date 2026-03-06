"use client";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";

import { InputText } from "@/components/ui/input/input-text";
import { getUserDataDetails, updateProfileUserAdm } from "@/services/user.service";
import {
  UpdataUserProfileFormData,
  updateUserProfileSchema,
} from "@/types/schemas/update-user-profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";

export default function MePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();
  const [loading, setLoading] = useState<boolean>(false);

  const { register, reset, handleSubmit } = useForm<UpdataUserProfileFormData>({
    resolver: zodResolver(updateUserProfileSchema) as Resolver<UpdataUserProfileFormData>,
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      getUserDataDetails()
        .then((res) => {
          reset({
            name: res.name,
            document: res.document,
            contactNumber: res.contactNumber,
            email: res.email,
          });
        })
        .finally(() => setLoading(false));
    }

    loadData();
  }, [reset]);

  async function onSubmit(data: UpdataUserProfileFormData) {
    try {
      setLoading(true);

      await updateProfileUserAdm(data);

      setMessage({
        title: "Sucesso!",
        description: "Entraremos em contato para dar continuidade com a atualização",
        callback() {
          router.push("/dashboard/products");
        },
      });
    } catch (err: unknown) {
      let message = "Erro inesperado";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? message;
      }

      setMessage({
        title: "Ocorreu um erro na solicitação.",
        description: message,
      });
    } finally {
      setOpen(true);
      setLoading(false);
    }
  }

  return (
    <main className="flex w-full flex-col gap-8 overflow-x-scroll py-8 pr-4">
      <h1 className="text-title text-base-2">Meu perfil</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <p className="text-subtitle text-base-2">Meus dados</p>

        <div className="flex w-full flex-row justify-between gap-4">
          <InputText {...register("name")} label="Nome" disabled />
          <InputText
            {...register("contactNumber")}
            label="Número para contato"
            placeholder="(99) 9 9999-9999"
            disabled
          />
        </div>

        <div className="flex w-full flex-row justify-between gap-4">
          <InputText
            {...register("document")}
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

        <Button className="mx-auto w-fit" loading={loading}>
          Solicitar alteração dos dados
        </Button>
      </form>

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
