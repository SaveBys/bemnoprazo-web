"use client"

import { Button } from "@/components/ui/button"

import { InputText } from "@/components/ui/input/input-text"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select"

export default function EditSeller() {
  return (
    <>
      <main className="width-barrier w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-12">
            <div className="flex items-center">
              <h1 className="text-title text-base-2">Meu perfil</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-subtitle text-base-2">Meus dados</h1>
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full bg-base-4 border-1 border-base-3" label="Nome" />
              <InputText className="w-full bg-base-4 border-1 border-base-3" label="Número para contato" placeholder="(99) 9 9999-9999" />
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full bg-base-4 border-1 border-base-3" label="CNPJ" placeholder="56.476.678/0001-99" mask="56.476.678/0001-99"  />
              <InputText className="w-ful bg-base-4 border-1 border-base-3" label="E-mail" placeholder="Exemplo@gmail.com"  />
            </div>
            <div className="flex flex-col items-center">
            <Button>Solicitar alteração dos dados</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}