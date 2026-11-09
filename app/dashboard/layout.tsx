import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashbordSidebar } from "../components/DashbordSidebar"

export default function DashbordLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashbordSidebar />
      <main className="min-h-screen w-full flex-1 overflow-x-hidden bg-[#070709] text-white">
        <div className="p-4 sm:p-6 md:p-8">
          <SidebarTrigger className="mb-4 text-white hover:bg-white/10" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
