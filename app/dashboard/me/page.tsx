"use client";

import { Button } from "@/components/ui/button";

import { InputText } from "@/components/ui/input/input-text";

export default function MePage() {
  return (
    <main className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <h1 className="text-title text-base-2">Meu perfil</h1>

      <form action="" className="flex flex-col gap-4">
        <p className="text-subtitle text-base-2">Meus dados</p>

        <div className="w-full flex flex-row justify-between gap-4">
          <InputText label="Nome" disabled />
          <InputText label="Número para contato" placeholder="(99) 9 9999-9999" disabled />
        </div>

        <div className="w-full flex flex-row justify-between gap-4">
          <InputText
            label="CNPJ"
            placeholder="56.476.678/0001-99"
            mask="56.476.678/0001-99"
            disabled
          />
          <InputText label="E-mail" placeholder="Exemplo@gmail.com" disabled />
        </div>

        <Button className="w-fit mx-auto">Solicitar alteração dos dados</Button>
      </form>
    </main>
  );
}
