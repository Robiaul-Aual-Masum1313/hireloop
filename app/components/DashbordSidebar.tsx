import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

export function DashbordSidebar() {
  const {data:session} = useSession()
  const userRole = session?.user?.role || 'Seeker'
  const menuItemByRole = {
    Seeker: [],
    Recruiter: [],
    Admin: []
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
<SidebarMenu>
  {menuItemByRole[userRole].map((item) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton render={<a href={item.url} />}>
        <item.icon />
        <span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
