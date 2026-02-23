"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select"
import InputSearch from "@/components/ui/input/input-search"

import { useState } from "react"
import { InputText } from "@/components/ui/input/input-text"

export default function NewProductPage() {
  const [page, setPage] = useState<number>(0)

  return (
    <main className="width-barrier w-full flex flex-col items-center">
      <div className="w-full flex flex-col gap-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <h1 className="text-title text-base-2">Meus produtos</h1>
          </div>

          <div className="w-full flex flex-row justify-between gap-4">
            <InputSearch className="w-full" label="Código EAN" placeholder="000000" />
            <InputSearch className="w-full" label="Nome Comercial" placeholder="000000" />
            <InputSearch className="w-full" label="Lote do medicamento" placeholder="n° do lote" />
          </div>
          <div className="w-full flex flex-row justify-between gap-4">
            <InputText className="w-191.5" label="Data de validade" placeholder="00/00/00" mask="99/99/9999" name="min-expiration-date" />
            <InputText className="w-70" label="Quantidade" placeholder="0" mask="99/99/9999" name="min-expiration-date" />
            <Select>
              <SelectTrigger className="bg-base-4 border-base-3 border-1 w-70 h-10 mt-7">
                <SelectValue placeholder="Aguardando aprovação" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup placeholder="Aguardando aprovação">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <h1 className="text-title text-base-2">Especificações</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-content text-base-2 mb-4">Necessita Refrigeração</h1>
            </div>
            <RadioGroup defaultValue="option-one">
              <div className="flex flex-row gap-3">
                <RadioGroupItem className="w-6 h-6 border-1 border-base-3" value="option-one" id="option-one" />
                <Label htmlFor="option-one">Sim</Label>
                <RadioGroupItem className="w-6 h-6 border-1 border-base-3" value="option-two" id="option-two" />
                <Label htmlFor="option-two">Não</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-row justify-between items-center">
              <Select>
                <SelectTrigger className="w-169 h-10 mt-2">
                  <SelectValue placeholder="Aguardando aprovação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup placeholder="Aguardando aprovação">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputText className="w-169" label="Classificação" />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="w-169" label="Principio ativo" />
              <InputText className="w-169" label="Conteúdo" />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="w-169 full" label="Conservação" />
              <InputText className="w-169" label="Prescrição médica" />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="w-169" label="Formas de administração" />
              <InputText className="w-169" label="Modo de uso" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-title text-base-2">Preços</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-end gap-4">
              <InputText className="bg-base-4 border-base-3 border-1 w-169" label="Preço de mercado" placeholder="R$ 00,00" />
              <InputText className="w-169" label="Preço ofertado" placeholder="R$ 00,00" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-content text-base-2 mb-4">Preço dinâmico</h1>
            </div>
            <RadioGroup defaultValue="option-one">
              <div className="flex flex-row gap-3">
                <RadioGroupItem className="w-6 h-6 border-1 border-base-3" value="option-one" id="option-one" />
                <Label htmlFor="option-one">Sim</Label>
                <RadioGroupItem className="w-6 h-6 border-1 border-base-3" value="option-two" id="option-two" />
                <Label htmlFor="option-two">Não</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-8">
            <div className="w-full flex flex-row justify-between gap-4">
              <Select>
                <SelectTrigger className="bg-base-4 border-base-3 border-1 w-115 h-10 mt-7">
                  <SelectValue placeholder="Dia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup placeholder="Dia">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputText className="bg-base-4 border-base-3 border-1 w-115" label="Quantidade" placeholder="5"/>
              <InputText className="bg-base-4 border-base-3 border-1 w-115" label="Percentual desconto" placeholder="15%"/>
            </div>
          </div>
          <div className="w-full flex flex-col items-end gap-8 mt-8">
            <div className="w-full flex justify-between gap-4">
              <Button variant="secondary">Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}