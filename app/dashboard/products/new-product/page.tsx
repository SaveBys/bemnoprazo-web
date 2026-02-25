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

export default function NewProductPage() {
  return (
    <main className="w-full flex flex-col gap-8 pr-4 py-8 overflow-x-scroll">
      <div className="flex flex-col gap-8">
        <h1 className="text-title text-base-2">Novo produto</h1>

        <fieldset className="w-full flex flex-row justify-between gap-4">
          <InputSearch className="w-full" label="Código EAN" placeholder="000000" />
          <InputSearch className="w-full" label="Nome Comercial" placeholder="000000" />
          <InputSearch className="w-full" label="Lote do medicamento" placeholder="n° do lote" />
        </fieldset>

        <fieldset className="w-full flex flex-row justify-between gap-4">
          <InputText
            className="w-full"
            label="Data de validade"
            placeholder="00/00/00"
            mask="99/99/9999"
            name="min-expiration-date"
          />
          <InputText className="w-full" label="Quantidade" placeholder="0" name="quantity" />
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="status" className="text-4/5 text-base-3">
              Status
            </label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
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
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <h2 className="text-title text-base-2">Especificações</h2>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="refrigeration" className="text-4/5 text-base-3">
              Necessita refrigeração
            </label>

            <RadioGroup defaultValue="refrigeration-option-one" id="refrigeration">
              <div className="flex flex-row gap-3">
                <RadioGroupItem
                  className="w-6 h-6 border-base-3"
                  value="true"
                  id="refrigeration-option-one"
                />
                <Label htmlFor="refrigeration-option-one">Sim</Label>
                <RadioGroupItem
                  className="w-6 h-6 border-base-3"
                  value="false"
                  id="refrigeration-option-two"
                />
                <Label htmlFor="refrigeration-option-two">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="tipo" className="text-4/5 text-base-3">
                  Tipo
                </label>

                <Select>
                  <SelectTrigger id="tipo">
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

              <InputText className="w-full" label="Classificação" />
            </div>

            <div className="flex justify-between items-center gap-4">
              <InputText label="Principio ativo" />
              <InputText label="Conteúdo" />
            </div>

            <div className="flex justify-between items-center gap-4">
              <InputText label="Conservação" />
              <InputText label="Prescrição médica" />
            </div>

            <div className="flex justify-between items-center gap-4">
              <InputText label="Formas de administração" />
              <InputText label="Modo de uso" />
            </div>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <h2 className="text-title text-base-2">Preços</h2>

          <div className="flex items-end gap-4">
            <InputText label="Preço de mercado" placeholder="R$ 00,00" />

            <InputText label="Preço ofertado" placeholder="R$ 00,00" />
          </div>

          <div className="w-full flex flex-col gap-1">
            <label htmlFor="dinamicPrice" className="text-4/5 text-base-3">
              Preço dinâmico
            </label>

            <RadioGroup defaultValue="dinamic-price-option-one" id="dinamicPrice">
              <div className="flex flex-row gap-3">
                <RadioGroupItem
                  className="w-6 h-6 border-base-3"
                  value="true"
                  id="dinamic-price-option-one"
                />
                <Label htmlFor="dinamic-price-option-one">Sim</Label>
                <RadioGroupItem
                  className="w-6 h-6 border-base-3"
                  value="false"
                  id="dinamic-price-option-two"
                />
                <Label htmlFor="dinamic-price-option-two">Não</Label>
              </div>
            </RadioGroup>

            <p className="size-4"></p>
          </div>

          <div className="w-full flex flex-row justify-between gap-4">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="unidade" className="text-4/5 text-base-3">
                Unidade
              </label>

              <Select>
                <SelectTrigger id="status">
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

            <InputText label="Quantidade" placeholder="5" />

            <InputText label="Percentual desconto" placeholder="15%" />
          </div>
        </fieldset>

        <div className="w-full flex justify-between">
          <Button variant="secondary">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      </div>
    </main>
  );
}
