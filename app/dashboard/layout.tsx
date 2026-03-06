"use client";

import { SidebarUser } from "@/components/layout/sidebar-user";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isADM } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isADM);
    if (isADM) {
      router.replace("/backoffice");
    }
  }, [isADM, router]);

  return (
    <SidebarProvider>
      <div className="flex w-full gap-4">
        <div className="w-[320px] shrink-0">
          <SidebarUser variant="inset" />
        </div>

        {children}
      </div>
    </SidebarProvider>
  );
}
