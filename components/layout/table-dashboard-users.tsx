"use client"

import { DataTable } from "../ui/data-table"

import { Button } from "../ui/button"
import { EyeIcon } from "@phosphor-icons/react/dist/ssr"
import { ColumnDef } from "@tanstack/react-table"
import z from "zod"
import { userRoleEnumValue } from "@/types/enums/user-role.enum"

export const schema = z.object({
  id: z.string(),
  name: z.string(),
  userRole: z.string(),
  contactNumber: z.string(),
  email: z.string(),
})

export type RowData = z.infer<typeof schema>

export const columns: ColumnDef<RowData>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "userRole",
    header: "Cargo",
    cell: ({ row }) => <span>{userRoleEnumValue(row.original.userRole).label}</span>,
  },
  {
    accessorKey: "contactNumber",
    header: "Contato",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => (
      <Button
        variant="secondary"
        href={`/dashboard/users/edit-user/${encodeURIComponent(row.original.id)}`}
        isLink
      >
        <EyeIcon className="size-5" />
      </Button>
    ),
  },
]

interface TableDashboardUsersProps {
  data: RowData[]
}

export function TableDashboardUsers({ data }: TableDashboardUsersProps) {
  return <DataTable columns={columns} data={data} />
}
