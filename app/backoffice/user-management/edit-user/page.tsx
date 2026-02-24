"use client"

import { Button } from "@/components/ui/button"

import { InputText } from "@/components/ui/input/input-text"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select"

export default function EditUser() {
  return (
    <>
      <main className="width-barrier w-full flex flex-col items-center">
        <div className="w-full flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-12">
            <div className="flex items-center">
              <h1 className="text-title text-base-2">Editar usuário</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-subtitle text-base-2">Dados do usuário</h1>
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full" label="Nome" />
              <InputText className="w-full" label="Cargo"/>
              <InputText className="w-full" label="Número para contato" placeholder="(99) 9 9999-9999" />
            </div>
            <div className="w-full flex flex-row justify-between gap-4">
              <InputText className="w-full" label="CNPJ" placeholder="56.476.678/0001-99" mask="56.476.678/0001-99"  />
              <InputText className="w-full" label="E-mail" placeholder="Exemplo@gmail.com"  />
              <div className="w-full flex flex-col gap-1">
                <label
                  htmlFor="status"
                  className="text-4/5 text-base-3"
                >
                  Status
                </label>

                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Ativo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup placeholder="Ativo">
                      <SelectItem value="Referência">Referência</SelectItem>
                      <SelectItem value="Genérico">Genérico</SelectItem>
                      <SelectItem value="Similar">Similar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <p className="size-4"></p>
              </div>
            </div>
            <div className="flex flex-col items-center">
            <Button>Liberar Cadastro</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}