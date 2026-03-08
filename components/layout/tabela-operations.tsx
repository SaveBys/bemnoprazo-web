"use client";

import { DataTable } from "../ui/data-table";

import { Button } from "../ui/button";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const schema = z.object({
  id: z.string(),
  tipo: z.string(),
  valor_total: z.string(),
  data: z.string(),
  status: z.string(),
});

export type RowData = z.infer<typeof schema>;

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "Tipo",
    header: "Tipo",
    cell: ({ row }) => (
      <div className="w-3xs overflow-hidden text-ellipsis">{row.original.tipo}</div>
    ),
  },
  {
    accessorKey: "valor_total",
    header: "Valor Total",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "status",
    header: "Status",
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
];

interface TabelaOperationsProps {
  data: RowData[];
}

export function TabelaOperations({ data }: TabelaOperationsProps) {
  return <DataTable columns={columns} data={data} />;
}