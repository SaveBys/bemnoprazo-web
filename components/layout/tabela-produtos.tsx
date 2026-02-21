"use client"

import { DataTable } from "../ui/data-table";

import { Button } from "../ui/button";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const schema = z.object({
  id: z.number(),
  nome: z.string(),
  categoria: z.string(),
  validade: z.string(),
  status: z.string(),
})

export type RowData = z.infer<typeof schema>

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "validade",
    header: "Validade",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => (
      <Button variant="secondary">
        <EyeIcon className="size-5" />
      </Button>
    ),
  },
]

interface TabelaProdutosProps {
  data: RowData[]
}

export function TabelaProdutos({ data }: TabelaProdutosProps) {
  return (
    <DataTable columns={columns} data={data} />
  )
}