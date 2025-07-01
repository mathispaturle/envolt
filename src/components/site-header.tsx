'use client'
import * as React from 'react'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams } from 'next/navigation';
import { FeedbackButton } from '@/components/app/Feedback'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function SiteHeader() {

  const params = useParams();
  const vaultId = params?.id as string;

  const [name, setName] = React.useState<string>("Dashboard");

  React.useEffect(() => {
    async function fetchVaultName() {
      if (!vaultId) return;

      try {
        const vaultRef = doc(db, 'vaults', vaultId);
        const vaultSnap = await getDoc(vaultRef);

        if (vaultSnap.exists()) {
          const vaultData = vaultSnap.data();
          setName(vaultData.name || 'Untitled Vault');
        } else {
          setName('Vault Not Found');
        }
      } catch (error) {
        console.error('Error fetching vault:', error);
        setName('Error Loading Vault');
      }
    }

    fetchVaultName();
  }, [vaultId]);

    
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{name}</h1>
        <div className="ml-auto flex items-center gap-2">

          {
            name !== "Dashboard" ? 
            <>
                {/* <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                  <a
                    href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="dark:text-foreground"
                  >
                    Share Vault With Team
                  </a>
                </Button>
                <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                  <a
                    href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="dark:text-foreground"
                  >
                    Vault Settings
                  </a>
                </Button> */}
            </>
            :
            <></>
          }
          <FeedbackButton />
          
        </div>
      </div>
    </header>
  )
}
