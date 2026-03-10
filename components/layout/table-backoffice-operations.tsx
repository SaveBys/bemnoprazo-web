"use client";

import { DataTable } from "../ui/data-table";

import { Button } from "../ui/button";
import { EyeIcon } from "@phosphor-icons/react/dist/ssr";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";

export const schema = z.object({
  announcementId: z.string(),
  announcementName: z.string(),
  companyName: z.string(),
  operations: z.string(),
});

export type RowData = z.infer<typeof schema>;

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "announcementName",
    header: "Produto",
  },
  {
    accessorKey: "companyName",
    header: "Anunciante",
    cell: ({ row }) => (
      <div className="w-3xs overflow-hidden text-ellipsis">{row.original.companyName}</div>
    ),
  },
  {
    accessorKey: "operations",
    header: "Propostas",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <Button
        variant="secondary"
        href={`/backoffice/operations/analysis/${encodeURIComponent(row.original.announcementId)}`}
        isLink
      >
        <EyeIcon className="size-5" />
      </Button>
    ),
  },
];

interface TableBackofficeOperationsProps {
  data: RowData[];
}

export function TableBackofficeOperations({ data }: TableBackofficeOperationsProps) {
  return <DataTable columns={columns} data={data} />;
}
