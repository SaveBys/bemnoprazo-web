"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"
import { useEffect, useState } from "react"
import { getUserData } from "@/services/user.service"
import { UserDataResponse } from "@/types/user-data.response"

export function NavUser() {
  const [userData, setUserData] = useState<UserDataResponse>()
  const router = useRouter()

  useEffect(() => {
    getUserData().then(res => setUserData(res));
  }, [])

  async function handleLogout() {
    logout().then(() => router.push("/user/login"));
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <hr className='w-full border-primary-2 border-2' />
        <div className="flex flex-col gap-8 mt-4">
          <div className="flex flex-col gap-1 leading-tight">
            <span className="truncate text-subtitle text-base-2">{userData?.companyName}</span>
            <span className="truncate text-content text-base-2">{userData?.name}</span>
            <span className="truncate text-content text-base-2">{userData?.email}</span>
          </div>

          <Button onClick={handleLogout} className="w-fit" variant="secondary">
            Sair
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
