import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Login</h1>
        <h2 className="text-subtitle text-base-3">Informe os seus dados de acesso.</h2>
      </div>

      <form className="flex flex-col gap-8 w-md">
        <div className="">
          <label className="text-legend text-base-3">E-mail:</label>
          <Input type="email" placeholder="exemplo@gmail.com" className="border-primary-3 border-1" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">Senha:</label>
          <Input type="password" placeholder="********" className="border-primary-3 border-1" />
        </div>
      </form>

      <div className="flex flex-col items-center gap-8">
        <Button>Entrar</Button>
        <a href="" className="text-legend text-primary-2">Ainda não possui conta? Clique aqui para se cadastrar</a>
        <a href="" className="text-legend text-primary-2">Esqueci minha senha</a>
      </div>
    </div>
  )
}
