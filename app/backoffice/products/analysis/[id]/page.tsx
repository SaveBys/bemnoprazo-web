"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/input/select";
import InputSearch from "@/components/ui/input/input-search";
import { InputText } from "@/components/ui/input/input-text";

export default function AnalysisProductPage() {
  return (
    <main className="width-barrier flex w-full flex-col items-center">
      <div className="flex w-full flex-col gap-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <h1 className="text-title text-base-2">Analise do Produto</h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-subtitle text-base-2">Dados do produto</h1>
          </div>
          <div className="flex w-full flex-row justify-between gap-4">
            <InputSearch className="w-full" label="Código EAN" placeholder="000000" disabled />
            <InputSearch className="w-full" label="Nome Comercial" placeholder="000000" disabled />
            <InputSearch
              className="w-full"
              label="Lote do medicamento"
              placeholder="n° do lote"
              disabled
            />
          </div>
          <div className="flex w-full flex-row justify-between gap-4">
            <InputText
              className="w-full"
              label="Data de validade"
              placeholder="00/00/00"
              mask="99/99/9999"
              name="min-expiration-date"
              disabled
            />
            <InputText
              className="w-full"
              label="Quantidade"
              placeholder="0"
              mask="99/99/9999"
              name="min-expiration-date"
              disabled
            />
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="status" className="text-4/5 text-base-3">
                Status
              </label>
              <Select>
                <SelectTrigger id="status" disabled>
                  <SelectValue placeholder="Aguardando aprovação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup placeholder="Aguardando aprovação">
                    <SelectItem value="Referência">Referência</SelectItem>
                    <SelectItem value="Genérico">Genérico</SelectItem>
                    <SelectItem value="Similar">Similar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="size-4"></p>
            </div>
          </div>
          <div className="flex items-center">
            <h1 className="text-title text-base-2">Especificações</h1>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-content text-base-2 mb-4">Necessita Refrigeração</h1>
            </div>
            <RadioGroup defaultValue="option-one" disabled>
              <div className="flex flex-row gap-3">
                <RadioGroupItem
                  className="border-base-3 h-6 w-6 border-1"
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Sim</Label>
                <RadioGroupItem
                  className="border-base-3 h-6 w-6 border-1"
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Não</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-row items-center justify-between gap-4">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="tipo" className="text-4/5 text-base-3">
                  Tipo
                </label>
                <Select>
                  <SelectTrigger id="status" disabled>
                    <SelectValue placeholder="Referência, Genérico, Similar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup placeholder="Referência, Genérico, Similar">
                      <SelectItem value="Referência">Referência</SelectItem>
                      <SelectItem value="Genérico">Genérico</SelectItem>
                      <SelectItem value="Similar">Similar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="size-4"></p>
              </div>
              <InputText className="w-full" label="Classificação" disabled />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="w-169" label="Principio ativo" disabled />
              <InputText className="w-169" label="Conteúdo" disabled />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="full w-169" label="Conservação" disabled />
              <InputText className="w-169" label="Prescrição médica" disabled />
            </div>
            <div className="flex items-end gap-4">
              <InputText className="w-169" label="Formas de administração" disabled />
              <InputText className="w-169" label="Modo de uso" disabled />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-title text-base-2">Preços</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-end gap-4">
              <InputText
                className="bg-base-4 border-base-3 w-169 border-1"
                label="Preço de mercado"
                placeholder="R$ 00,00"
                disabled
              />
              <InputText className="w-169" label="Preço ofertado" placeholder="R$ 00,00" disabled />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="text-content text-base-2 mb-4">Preço dinâmico</h1>
            </div>
            <RadioGroup defaultValue="option-one" disabled>
              <div className="flex flex-row gap-3">
                <RadioGroupItem
                  className="border-base-3 h-6 w-6 border-1"
                  value="option-one"
                  id="option-one"
                />
                <Label htmlFor="option-one">Sim</Label>
                <RadioGroupItem
                  className="border-base-3 h-6 w-6 border-1"
                  value="option-two"
                  id="option-two"
                />
                <Label htmlFor="option-two">Não</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex w-full flex-row justify-between gap-4">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="unidade" className="text-4/5 text-base-3">
                  Unidade
                </label>
                <Select>
                  <SelectTrigger id="status" disabled>
                    <SelectValue placeholder="Dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup placeholder="Dia">
                      <SelectItem value="Referência">Referência</SelectItem>
                      <SelectItem value="Genérico">Genérico</SelectItem>
                      <SelectItem value="Similar">Similar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="size-4"></p>
              </div>
              <InputText className="" label="Quantidade" placeholder="5" disabled />
              <InputText className="" label="Percentual desconto" placeholder="15%" disabled />
            </div>
          </div>
          <div className="mt-8 flex w-full flex-col items-end gap-8">
            <div className="flex w-full flex-col items-center gap-4">
              <Button>Aprovar</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
