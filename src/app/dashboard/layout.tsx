import { AppSidebarView } from "@/components/app-sidebar/app-sidebar-view";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebarView />
      <main className="flex w-full h-full items-start justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
}
