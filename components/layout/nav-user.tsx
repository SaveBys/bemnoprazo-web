"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useAuth } from "@/context/auth-context";

export function NavUser() {
  const { user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    logout().then(() => router.push("/user/login"));
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <hr className="border-primary-2 w-full border-2" />
        <div className="mt-4 flex flex-col gap-8">
          <div className="flex flex-col gap-1 leading-tight">
            <span className="text-subtitle text-base-2 truncate">{user?.companyName}</span>
            <span className="text-content text-base-2 truncate">{user?.name}</span>
            <span className="text-content text-base-2 truncate">{user?.email}</span>
          </div>

          <Button onClick={handleLogout} className="w-fit" variant="secondary">
            Sair
          </Button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
