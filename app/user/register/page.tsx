import { Button } from "@/components/ui/button"
import InputBase from "@/components/ui/input/input-base"
import InputPassword from "@/components/ui/input/input-password"
import InputText from "@/components/ui/input/input-text"

export default function RegisterPage() {
  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Cadastro</h1>
        <h2 className="text-subtitle text-base-3">Informe os seus dados para realizar o cadastro.</h2>
      </div>

      <div className="flex flex-col gap-4 w-md">
        <InputText
          label="Nome da Empresa"
          name="company-name"
          type="text"
          placeholder="Bem no Prazo Tecnologia LTDA" >
        </InputText>

        <InputText
          label="CNPJ"
          name="cnpj"
          type="email"
          placeholder="00.000.000/0001-00"
          mask="99.9999.999/9999-99" >
        </InputText>

        <InputText
          label="Responsável pela conta"
          name="company-responsible"
          type="text"
          placeholder="João Silva" >
        </InputText>

        <InputText
          label="Telefome/Whatsapp"
          name="numero-contato"
          type="text"
          placeholder="(11) 9 8959-9760"
          mask={["(99) 9999-9999", "(99) 9 9999-9999"]} >
        </InputText>

        <InputText
          label="E-mail"
          name="email"
          type="email"
          placeholder="exemplo@gmail.com" >
        </InputText>

        <InputPassword
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres" >
        </InputPassword>

        <InputPassword
          label="Confirmar Senha"
          name="confirm-password"
          type="password"
          placeholder="Repita a senha" >
        </InputPassword>
      </div>


      <div className="flex flex-col items-center gap-8">
        <Button>Cadastrar</Button>
        <a href="" className="text-legend text-primary-2">Já possui conta? Clique aqui para entrar</a>
      </div>
    </div>
  )
}