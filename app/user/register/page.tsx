import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Register() {
    return (
            <div className="flex flex-col items-center gap-8 p-12">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-title text-[#FF8D28]">Cadastro</h1>
                    <h2 className="text-subtitle text-[#8e8d8d]">Informe os seus dados para realizar o cadastro.</h2>
                </div>

                <div className="flex flex-col gap-8 w-md">
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Nome da Empresa</label>
                        <Input type="email" placeholder="Ex: Bem no Prazo Tecnologia LTDA" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">CNPJ</label>
                        <Input type="email" placeholder="00.000.000/0001-00" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Responsável pela conta</label>
                        <Input type="email" placeholder="João Silva" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Telefome/Whatsapp</label>
                        <Input type="email" placeholder="(11) 9 9999-9999" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">E-mail</label>
                        <Input type="email" placeholder="exemplo@gmail.com" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Senha</label>
                        <Input type="email" placeholder="Mínimo de 8 caracteres" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Confirmar Senha</label>
                        <Input type="password" placeholder="Repita a senha" className="border-orange-300 border-2 " />
                    </div>
                </div>
                
                
                <div className="flex flex-col items-center gap-8">
                    <Button>Cadastrar</Button>
                <a href="" className="text-legend text-[#FF8D28]">Já possui conta? Clique aqui para entrar</a>
                </div>
            </div>
    )
}