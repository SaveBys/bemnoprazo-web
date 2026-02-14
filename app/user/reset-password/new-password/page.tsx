"use client"

import { Dialog, Message } from "@/components/layout/dialog"
import { Button } from "@/components/ui/button"
import InputPassword from "@/components/ui/input/input-password"
import { updatePassword } from "@/services/user.service"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const [password, setPassword] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>()

  const handleUpdatePassword = () => {
    if (token) {

      updatePassword(token, password).then(() => {
        setMessage({
          title: "Sucesso!",
          description: "Senha alterada com sucesso, você será redirecionado ao login.",
          callback: () => router.push("/user/login")
        })
      }).catch((error) => {
        const errorMessage = error.response.data.message;
        setMessage({
          title: "Ocorreu um erro",
          description: errorMessage,
        })
      }).finally(() => setOpen(true));
    }
  }

  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Nova senha</h1>
        <h2 className="text-subtitle text-base-3">Informe a nova senha</h2>
      </div>

      <form className="flex flex-col gap-8 w-md">
        <InputPassword
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)} >
        </InputPassword>

        <InputPassword
          label="Confirmar Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres" >
        </InputPassword>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button onClick={handleUpdatePassword}>
          Salvar
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
        onActionClick={message?.callback} >
      </Dialog>
    </div>
  )
}