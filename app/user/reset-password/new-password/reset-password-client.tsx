"use client";

import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/ui/input/input-password";
import { updatePassword } from "@/services/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  function onSubmit(data: FormData) {
    if (!token) return;

    updatePassword(token, data.password)
      .then(() => {
        setMessage({
          title: "Sucesso!",
          description: "Senha alterada com sucesso, você será redirecionado ao login.",
          callback: () => router.push("/user/login"),
        });
      })
      .finally(() => setOpen(true));
  }

  return (
    <div className="flex w-fit flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Nova senha</h1>
        <h2 className="text-subtitle text-base-3">Informe a nova senha</h2>
      </div>

      <form className="flex w-md flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <InputPassword
          label="Senha"
          placeholder="Mínimo de 8 caracteres"
          {...register("password", {
            required: "Campo obrigatório",
            minLength: {
              value: 8,
              message: "A senha deve ter no mínimo 8 caracteres",
            },
          })}
          errorMessage={errors.password?.message}
        />

        <InputPassword
          label="Confirmar Senha"
          placeholder="Repita a senha"
          {...register("confirmPassword", {
            required: "Campo obrigatório",
            validate: (value) => value === password || "As senhas não coincidem",
          })}
          errorMessage={errors.confirmPassword?.message}
        />

        <div className="flex flex-col items-center gap-8">
          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
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
