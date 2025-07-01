"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Loader, LucideVault, ShieldHalf } from 'lucide-react'
import { useParams } from 'next/navigation'

export function NavDocuments({
  items,
  loading
}: {
  items?: {
    id: string
    name: string
    url: string
  }[]; loading: boolean
}) {
  const { isMobile } = useSidebar()

  const params = useParams();
  const vaultId = params?.id as string;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>My Vaults</SidebarGroupLabel>
      <SidebarMenu>
        {
          loading ?
            <SidebarMenuItem>
              <SidebarMenuButton className='hover:bg-transparent'>
                <Loader size={16} className='animate-spin'/>
              </SidebarMenuButton>
              
            </SidebarMenuItem>
          :
          <>
              {items?.map((item) => (
                <SidebarMenuItem key={item.name} className={`rounded-md ${item.id == vaultId ? 'bg-primary/5 text-primary font-semibold' : ''}`}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <ShieldHalf />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </>
        }
        
      </SidebarMenu>
    </SidebarGroup>
  )
}
