import { AppSidebar } from "@/components/layout/app-sidebar"
import { DataTable } from "@/components/layout/data-table"
import {
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@phosphor-icons/react/dist/ssr"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/input/select"
import InputSearch from "@/components/ui/input/input-search"


export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 80)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <div className="w-full flex gap-4">
        <div className="w-(--sidebar-width)">
          <AppSidebar variant="inset" />
        </div>

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

          <DataTable data={data[0]} />

        </div>
      </div>
    </SidebarProvider>
  )
}
