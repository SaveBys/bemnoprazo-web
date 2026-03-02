"use client"

import { Dialog, Message } from "@/components/layout/dialog"
import { Button } from "@/components/ui/button"
import { InputText } from "@/components/ui/input/input-text"
import { resetPassword } from "@/services/user.service"
import { useState } from "react"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<Message>()

  const handleResetPassword = () => {
    resetPassword(email)
      .then(() => {
        setMessage({
          title: "Sucesso!",
          description: "Em breve receberá um e-mail com os próximos passos.",
        })
      })
      .catch((error) => {
        const errorMessage = error.response.data.message
        setMessage({
          title: "Ocorreu um erro",
          description: errorMessage,
        })
      })
      .finally(() => setOpen(true))
  }

  return (
    <div className="flex w-fit flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Recuperar senha</h1>
        <h2 className="text-subtitle text-base-3">Informe seu usuário</h2>
      </div>

      <form className="flex w-md flex-col gap-8">
        <InputText
          label="E-mail"
          name="email"
          type="email"
          placeholder="exemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputText>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button onClick={handleResetPassword}>Enviar</Button>

        <Button href="/user/register" variant="text" isLink>
          Ainda não possui conta? Clique aqui para se cadastrar
        </Button>

        <Button href="/user/login" variant="text" isLink>
          Já possui conta? Clique aqui para entrar
        </Button>
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
      ></Dialog>
    </div>
  )
}
