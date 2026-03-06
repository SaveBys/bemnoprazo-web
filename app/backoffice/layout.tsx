"use client";

import { SidebarBackoffice } from "@/components/layout/sidebar-backoffice";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isUserAdm, isEmployee, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isUserAdm || isEmployee) {
      router.replace("/dashboard");
    }
  }, [isEmployee, isUserAdm, router]);

  if (loading) return null;

  return (
    <SidebarProvider>
      <div className="flex w-full gap-4">
        <div className="w-[320px] shrink-0">
          <SidebarBackoffice variant="inset" />
        </div>

        {children}
      </div>
    </SidebarProvider>
  );
}
