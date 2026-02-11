"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"

export function NavUser({
  user,
}: {
  user: {
    companyName: string
    name: string
    email: string
  }
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <hr className='w-full border-primary-2 border-2' />
        <div className="flex flex-col gap-8 mt-4">
          <div className="flex flex-col gap-1 leading-tight">
            <span className="truncate text-subtitle text-base-2">{user.companyName}</span>
            <span className="truncate text-content text-base-2">{user.name}</span>
            <span className="truncate text-content text-base-2">{user.email}</span>
          </div>

          <Button className="w-fit" variant="secondary">Sair</Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
