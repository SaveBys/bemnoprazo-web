"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Message } from "@/components/layout/dialog";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/ui/input/input-password";
import InputText from "@/components/ui/input/input-text";
import { register } from "@/services/user.service";
import { CreateUserRequest } from "@/types/create-user-request";

export default function RegisterPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<Message>();

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as unknown as CreateUserRequest;

    register(data).then(() => {
      setMessage({
        title: "Sucesso!",
        description: "Recebemos seu cadastro e ele já está em análise. Em breve entraremos em contato.",
        callback: () => router.push("/user/login")
      });
    }).catch((error) => {
      const errorMessage = error.response.data.message;
      setMessage({
        title: "Ocorreu um erro",
        description: errorMessage,
      })
    }).finally(() => setOpen(true));
  }

  return (
    <div className="w-fit flex flex-col items-center gap-8 p-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-title text-primary-2">Cadastro</h1>
        <h2 className="text-subtitle text-base-3">
          Informe os seus dados para realizar o cadastro.
        </h2>
      </div>

      <form
        className="flex flex-col gap-4 w-md"
        onSubmit={handleRegister}
      >
        <InputText
          label="Nome da Empresa"
          name="companyName"
          type="text"
          placeholder="Bem no Prazo Tecnologia LTDA"
        />

        <InputText
          label="CNPJ"
          name="companyDocument"
          type="text"
          placeholder="00.000.000/0001-00"
          mask="99.9999.999/9999-99"
        />

        <InputText
          label="Responsável pela conta"
          name="companyResponsible"
          type="text"
          placeholder="João Silva"
        />

        <InputText
          label="Telefone/Whatsapp"
          name="contactNumber"
          type="text"
          placeholder="(11) 9 8959-9760"
          mask={["(99) 9999-9999", "(99) 9 9999-9999"]}
        />

        <InputText
          label="E-mail"
          name="email"
          type="email"
          placeholder="exemplo@gmail.com"
        />

        <InputPassword
          label="Senha"
          name="password"
          type="password"
          placeholder="Mínimo de 8 caracteres"
        />

        <InputPassword
          label="Confirmar Senha"
          name="confirmPassword"
          type="password"
          placeholder="Repita a senha"
        />

        <div className="flex flex-col items-center gap-8 mt-4">
          <Button type="submit">Cadastrar</Button>

          <Button href="/user/login" variant="text" isLink>
            Já possui conta? Clique aqui para entrar
          </Button>
        </div>
      </form>

      <Dialog
        open={open}
        setOpen={setOpen}
        title={message?.title}
        description={message?.description}
        onActionClick={message?.callback}
      />
    </div>
  )
}

