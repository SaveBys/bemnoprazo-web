"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import { registerUser as registerUser } from "@/services/user.service";
import { CreateUserRequest } from "@/types/request/create-user.request";

import InputPassword from "@/components/ui/input/input-password";
import { InputText } from "@/components/ui/input/input-text";

export default function RegisterPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateUserRequest>({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  function onSubmit(data: CreateUserRequest) {
    registerUser(data)
      .then(() => {
        setMessage({
          title: "Sucesso!",
          description:
            "Recebemos seu cadastro e ele já está em análise. Em breve entraremos em contato.",
          callback: () => router.push("/user/login"),
        });
      })
      .finally(() => setOpen(true));
  }

  return (
    <div className="flex w-fit flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Cadastro</h1>
        <h2 className="text-subtitle text-base-3">
          Informe os seus dados para realizar o cadastro.
        </h2>
      </div>

      <form className="flex w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputText
          label="Nome da Empresa"
          placeholder="Bem no Prazo Tecnologia LTDA"
          {...register("companyName", { required: "Campo obrigatório" })}
          errorMessage={errors.companyName?.message}
          required
        />

        <InputText
          label="CNPJ"
          placeholder="00.000.000/0001-00"
          mask="99.999.999/9999-99"
          {...register("companyDocument", { required: "Campo obrigatório" })}
          errorMessage={errors.companyDocument?.message}
          required
        />

        <InputText
          label="Responsável pela conta"
          placeholder="João Silva"
          {...register("accountResponsible", { required: "Campo obrigatório" })}
          errorMessage={errors.accountResponsible?.message}
          required
        />

        <InputText
          label="Telefone/Whatsapp"
          placeholder="(11) 9 8959-9760"
          mask={["(99) 9999-9999", "(99) 9 9999-9999"]}
          {...register("contactNumber", { required: "Campo obrigatório" })}
          errorMessage={errors.contactNumber?.message}
          required
        />

        <InputText
          label="E-mail"
          type="email"
          placeholder="exemplo@gmail.com"
          {...register("email", {
            required: "Campo obrigatório",
          })}
          errorMessage={errors.email?.message}
          required
        />

        <InputPassword
          label="Senha"
          placeholder="Mínimo de 8 caracteres"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 8,
              message: "Mínimo de 8 caracteres",
            },
          })}
          errorMessage={errors.password?.message}
          required
        />

        <InputPassword
          label="Confirmar Senha"
          placeholder="Repita a senha"
          {...register("confirmPassword", {
            required: "Campo obrigatório",
            validate: (value) => value === password || "As senhas não coincidem",
          })}
          errorMessage={errors.confirmPassword?.message}
          required
        />

        <div className="mt-4 flex flex-col items-center gap-8">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Cadastrar
          </Button>

          <Button href="/user/login" variant="text" isLink>
            Já possui conta? Clique aqui para entrar
          </Button>
        </div>
      </form>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </div>
  );
}
