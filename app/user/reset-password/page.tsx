import { Button } from "@/components/ui/button"
import InputBase from "@/components/ui/input/input-base"

export default function ResetPasswordPage() {
  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Recuperar senha</h1>
        <h2 className="text-subtitle text-base-3">Informe seu usuário</h2>
      </div>

      <form className="flex flex-col gap-8 w-md">
        <div className="">
          <label className="text-legend text-base-3">E-mail</label>
          <InputBase type="email" placeholder="exemplo@gmail.com" className="border-primary-3 border-1" />
        </div>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button>Enviar</Button>
        <a href="" className="text-legend text-primary-2">Ainda não possui conta? Clique aqui para se cadastrar</a>
        <a href="" className="text-legend text-primary-2">Já possui conta? Clique aqui para entrar</a>
      </div>
    </div>
  )
}