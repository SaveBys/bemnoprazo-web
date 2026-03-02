"use client"

import { DataTable } from "../ui/data-table"

import { Button } from "../ui/button"
import { EyeIcon } from "@phosphor-icons/react/dist/ssr"
import { ColumnDef } from "@tanstack/react-table"
import z from "zod"
import { announcementStatusEnumValue } from "@/types/enums/announcement-status.enum"

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  expirationDate: z.string(),
  status: z.string(),
  ean: z.string(),
})

export type RowData = z.infer<typeof schema>

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "ean",
    header: "EAN",
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="w-3xs overflow-hidden text-ellipsis">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "expirationDate",
    header: "Validade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{announcementStatusEnumValue(row.original.status).label}</span>,
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <Button
        variant="secondary"
        href={`/dashboard/products/edit-product/${encodeURIComponent(row.original.id)}`}
        isLink
      >
        <EyeIcon className="size-5" />
      </Button>
    ),
  },
]

interface TabelaProdutosProps {
  data: RowData[]
}

export function TabelaProdutos({ data }: TabelaProdutosProps) {
  return <DataTable columns={columns} data={data} />
}
