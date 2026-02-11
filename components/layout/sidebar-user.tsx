"use client"

import * as React from "react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { CurrencyDollarIcon, HouseIcon, UserGearIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

const data = {
  user: {
    companyName: "BemNoPrazo LTDA",
    name: "João silva",
    email: "joão.silva@email.com.br",
  },
  navMain: [
    {
      title: "Início",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Meus produtos",
      url: "products",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Gestão de usuários",
      url: "users",
      icon: UsersIcon,
    },
    {
      title: "Meu perfil",
      url: "me",
      icon: UserGearIcon,
    },
  ],
}

export function SidebarUser({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="w-fit m-auto">
          <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={88} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
