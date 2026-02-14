"use client"

import { Button } from "@/components/ui/button"
import InputPassword from "@/components/ui/input/input-password"
import InputText from "@/components/ui/input/input-text"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter()

  async function handleLogin(username: string, password: string) {
    login(username, password).then(() => (router.push("/dashboard")));
  }

  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Login</h1>
        <h2 className="text-subtitle text-base-3">Informe os seus dados de acesso.</h2>
      </div>

      <form className="flex flex-col gap-8 w-md">
        <InputText
          label="E-mail"
          name="email"
          type="email"
          placeholder="exemplo@gmail.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}>
        </InputText>

        <InputPassword
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}>
        </InputPassword>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button onClick={() => handleLogin(username, password)}>
          Entrar
        </Button>

        <Button href="/user/register" variant="text" isLink>
          Ainda não possui conta? Clique aqui para se cadastrar
        </Button>

        <Button href="/user/reset-password" variant="text" isLink>
          Esqueci minha senha
        </Button>
      </div>
    </div>
  )
}
