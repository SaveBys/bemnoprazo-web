"use client";

import { Button } from "@/components/ui/button";
import { InputText } from "@/components/ui/input/input-text";

export default function EditUserPage() {
  return (
    <main className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <div className="flex flex-col gap-12">
        <h1 className="text-title text-base-2">Editar usuário</h1>

        <form action="" className="flex flex-col gap-4">
          <h2 className="text-subtitle text-base-2">Dados do usuário</h2>

          <div className="w-full flex flex-row justify-between gap-4">
            <InputText className="w-full" label="Nome" />
            <InputText className="w-full" label="Cargo" />
            <InputText
              className="w-full"
              label="Número para contato"
              placeholder="(99) 9 9999-9999"
            />
          </div>

          <div className="w-full flex flex-row justify-between gap-4">
            <InputText label="CNPJ" placeholder="00.000.000/0001-00" mask="99.999.999/9999-99" />
            <InputText label="E-mail" placeholder="Exemplo@gmail.com" />
          </div>

          <Button className="w-fit mx-auto">Cadastrar</Button>
        </form>
      </div>
    </main>
  );
}
