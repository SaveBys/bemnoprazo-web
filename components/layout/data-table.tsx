"use client"

import { z } from "zod"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "@phosphor-icons/react/dist/ssr"
import { useMemo } from "react"

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

export function DataTable({ data }: { data: RowData[] }) {
  const memoData = useMemo(() => data, [data])

  const table = useReactTable({
    data: memoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full space-y-4">
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
