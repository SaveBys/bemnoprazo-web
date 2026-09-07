"use client";

import {
  OperationParticipantRoleEnum,
  OperationParticipantRoleEnumValue,
} from "@/types/enums/operation-participant-role.enum";
import { DataTable } from "../ui/data-table";

import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import { formatCurrency, formatDateHour } from "@/lib/utils";
import { OperationStatusEnum, OperationStatusEnumValue } from "@/types/enums/operation-status.enum";

export const schema = z.object({
  id: z.string(),
  operationCode: z.number(),
  role: z.enum(OperationParticipantRoleEnum),
  totalPrice: z.number(),
  operationDate: z.string(),
  status: z.enum(OperationStatusEnum),
});

export type RowData = z.infer<typeof schema>;

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "operationCode",
    header: "Número",
  },
  {
    accessorKey: "role",
    header: "Tipo",
    cell: ({ row }) => <div>{OperationParticipantRoleEnumValue(row.original.role).label}</div>,
  },
  {
    accessorKey: "totalPrice",
    header: "Valor Total",
    cell: ({ row }) => <div>{formatCurrency(row.original.totalPrice)}</div>,
  },
  {
    accessorKey: "operationDate",
    header: "Data",
    cell: ({ row }) => <div>{formatDateHour(row.original.operationDate)}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{OperationStatusEnumValue(row.original.status).label}</div>,
  },
];

interface TableDashboardOperationsProps {
  data: RowData[];
}

export function TableDashboardOperations({ data }: TableDashboardOperationsProps) {
  return <DataTable columns={columns} data={data} />;
}
