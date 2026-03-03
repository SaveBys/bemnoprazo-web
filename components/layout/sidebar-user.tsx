"use client";

import * as React from "react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import {
  CurrencyDollarIcon,
  HouseIcon,
  MoneyIcon,
  UserGearIcon,
  UsersIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Início",
      url: "/products",
      icon: HouseIcon,
    },
    {
      title: "Meus produtos",
      url: "/dashboard/products",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Gestão de usuários",
      url: "/dashboard/users",
      icon: UsersIcon,
    },
    {
      title: "Minhas operações",
      url: "/dashboard/operations",
      icon: MoneyIcon,
    },
    {
      title: "Meu perfil",
      url: "/dashboard/me",
      icon: UserGearIcon,
    },
  ],
};

export function SidebarUser({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="m-auto w-fit">
          <Image src="/img/LogoBemnoprazo.png" alt="logo" width={200} height={88} />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
