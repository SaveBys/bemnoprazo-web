import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Cadastro</h1>
        <h2 className="text-subtitle text-base-3">Informe os seus dados para realizar o cadastro.</h2>
      </div>

      <div className="flex flex-col gap-8 w-md">
        <div className="">
          <label className="text-legend text-base-3">Nome da Empresa</label>
          <Input type="email" placeholder="Ex: Bem no Prazo Tecnologia LTDA" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">CNPJ</label>
          <Input type="email" placeholder="00.000.000/0001-00" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">Responsável pela conta</label>
          <Input type="email" placeholder="João Silva" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">Telefome/Whatsapp</label>
          <Input type="email" placeholder="(11) 9 9999-9999" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">E-mail</label>
          <Input type="email" placeholder="exemplo@gmail.com" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">Senha</label>
          <Input type="email" placeholder="Mínimo de 8 caracteres" className="border-orange-300 border-2" />
        </div>
        <div className="">
          <label className="text-legend text-base-3">Confirmar Senha</label>
          <Input type="password" placeholder="Repita a senha" className="border-orange-300 border-2 " />
        </div>
      </div>


      <div className="flex flex-col items-center gap-8">
        <Button>Cadastrar</Button>
        <a href="" className="text-legend text-primary-2">Já possui conta? Clique aqui para entrar</a>
      </div>
    </div>
  )
}