import AppSidebarViewController from "@/components/app-sidebar/app-sidebar-view-controller";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarViewController />
      <main className="flex w-full h-full items-start justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
