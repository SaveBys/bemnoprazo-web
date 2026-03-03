import { SidebarUser } from "@/components/layout/sidebar-user";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
