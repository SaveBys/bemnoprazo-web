import { Button } from "@/components/ui/button"
import InputPassword from "@/components/ui/input/input-password"

export default function ResetPasswordPage() {
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
          placeholder="Mínimo de 8 caracteres" >
        </InputPassword>

        <InputPassword
          label="Confirmar Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres" >
        </InputPassword>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button>Salvar</Button>

        <Button href="/user/login" variant="text" isLink>
          Já possui conta? Clique aqui para entrar
        </Button>
      </div>
    </div>
  )
}