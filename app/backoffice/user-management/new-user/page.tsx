"use client"

import { Button } from "@/components/ui/button"

import { InputText } from "@/components/ui/input/input-text"

export default function NewUser() {
  return (
    <>
      <main className="width-barrier w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-12">
            <div className="flex items-center">
              <h1 className="text-title text-base-2">Novo usuário</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-subtitle text-base-2">Meus dados</h1>
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full" label="Nome" />
              <InputText className="w-full" label="Cargo"/>
              <InputText className="w-full" label="Número para contato" placeholder="(99) 9 9999-9999" />
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full" label="CPF" placeholder="999.999.999-99" mask="999.999.999-99"  />
              <InputText className="w-full" label="E-mail" placeholder="Exemplo@gmail.com"  />
            </div>
            <div className="flex flex-col items-center">
            <Button>Cadastrar</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}