"use client"

import { Dialog, Message } from "@/components/layout/dialog"
import { Button } from "@/components/ui/button"
import InputPassword from "@/components/ui/input/input-password"
import { InputText } from "@/components/ui/input/input-text"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useForm } from "react-hook-form"

type LoginFormData = {
  email: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<LoginFormData>({
    mode: "onChange",
  })
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();

  function onSubmit(data: LoginFormData) {
    login(data.email, data.password).then(() => {
      router.push("/dashboard")
    }).catch((error) => {
      setMessage({
        title: "Ocorreu um erro"
      })
      setOpen(true);
    });
  }

  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Login</h1>
        <h2 className="text-subtitle text-base-3">
          Informe os seus dados de acesso.
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-md">
        <InputText
          label="E-mail"
          type="email"
          placeholder="exemplo@gmail.com"
          errorMessage={errors.email?.message}
          {...register("email", {
            required: "E-mail é obrigatório",
          })}
        />

        <InputPassword
          label="Senha"
          placeholder="Mínimo de 8 caracteres"
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 8,
              message: "Senha deve ter no mínimo 8 caracteres",
            },
          })}
        />

        <Button type="submit" disabled={!isValid || isSubmitting}>
          Entrar
        </Button>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button href="/user/register" variant="text" isLink>
          Ainda não possui conta? Clique aqui para se cadastrar
        </Button>

        <Button href="/user/reset-password" variant="text" isLink>
          Esqueci minha senha
        </Button>
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </div>
  )
}
