"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FaFingerprint } from 'react-icons/fa'
import { auth, getUserTeams, getUserVaults } from '../lib/firebase'
import { IconDashboard, IconListDetails, IconChartBar, IconFolder, IconUsers, IconHelp } from '@tabler/icons-react'
import { User, onAuthStateChanged } from 'firebase/auth'


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [setup, setSetup] = React.useState(true)
  const [data, setData] = React.useState<any>({
    vaults: [],
    user: {}
  })

  const [user, setUser] = React.useState<User | null>(null);
  const [vaults, setVaults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setVaults([]);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const teams = await getUserTeams(); // Retrieves teams where the user is a member

        if (teams.length === 0) {
          setVaults([]);
          setLoading(false);
          return;
        }

        // For now, we just pick the first team (extend later to allow team switching)
        const activeTeamId = teams[0].id;
        const vaultsData = await getUserVaults(activeTeamId);

        const myVaults = vaultsData.map((vault) => ({
          id: vault.id,
          name: vault.name,
          url: `/vaults/${vault.id}`,
        }));

        setData({
          user: {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: "/avatars/shadcn.jpg",
          },
          navMain: [],
          navSecondary: [
            {
              title: "Get Help",
              url: "#",
              icon: IconHelp,
            },
          ],
          vaults: myVaults,
        });
      } catch (error) {
        console.error("Error fetching teams or vaults:", error);
        setVaults([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/vaults">
                <FaFingerprint className="!size-5" />
                <span className="text-base font-semibold">Envolt</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain  />
        <NavDocuments items={data.vaults} loading={loading} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
