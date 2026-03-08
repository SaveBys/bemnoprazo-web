"use client";

import { DataTable } from "../ui/data-table";

import { Button } from "../ui/button";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const schema = z.object({
  id: z.string(),
  product: z.string(),
  advertiser: z.string(),
  proposals: z.string(),
});

export type RowData = z.infer<typeof schema>;

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "product",
    header: "Produto",
  },
  {
    accessorKey: "advertiser",
    header: "Anunciante",
    cell: ({ row }) => (
      <div className="w-3xs overflow-hidden text-ellipsis">{row.original.advertiser}</div>
    ),
  },
  {
    accessorKey: "proposals",
    header: "Proposta",
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

interface TabelaPedidosProps {
  data: RowData[];
}

export function TabelaPedidos({ data }: TabelaPedidosProps) {
  return <DataTable columns={columns} data={data} />;
}
