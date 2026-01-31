import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
    return (
            <div className="flex flex-col items-center gap-8 p-12">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-title text-[#FF8D28]">Login</h1>
                    <h2 className="text-subtitle text-[#8e8d8d]">Informe os seus dados de acesso.</h2>
                </div>

                <div className="flex flex-col gap-8 w-md">
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">E-mail</label>
                        <Input type="email" placeholder="exemplo@gmail.com" className="border-orange-300 border-2" />
                    </div>
                    <div className="">
                        <label className="text-legend text-[#8e8d8d]">Senha</label>
                        <Input type="password" placeholder="********" className="border-orange-300 border-2 " />
                    </div>
                </div>
                
                
                <div className="flex flex-col items-center gap-8">
                    <Button>Entrar</Button>
                <a href="" className="text-legend text-[#FF8D28]">Ainda não possui conta? Clique aqui para se cadastrar</a>
                <a href="" className="text-legend text-[#FF8D28]">Esqueci minha senha</a>
                </div>
            </div>
        
        
    )
}
