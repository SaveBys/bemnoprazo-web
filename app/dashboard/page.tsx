import data from "./data.json"
import { TabelaProdutos } from "@/components/layout/tabela-produtos"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select"
import InputSearch from "@/components/ui/input/input-search"

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-8 pr-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h1 className="text-title text-base-2">Meus produtos</h1>
          <Button variant="secondary">
            <PlusIcon className="size-5" />
            <span>Novo produto</span>
          </Button>
        </div>

        <div className="flex items-end gap-4">
          <InputSearch className="w-full" label="Busca" />

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup placeholder="Theme">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="secondary">
            <span>Limpar filtro</span>
          </Button>
          <Button>
            <span>Buscar</span>
          </Button>
        </div>
      </div>

      <TabelaProdutos data={data[0]} />
    </div>
  )
}
