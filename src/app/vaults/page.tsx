'use client'

import { DataTable } from "@/components/data-table"

import {  auth, getUserTeams, getUserVaults } from '@/lib/firebase';
import { useEffect, useState } from 'react';

import AddNewVaultButton from '../../components/app/AddNewVaultButton';
import { Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import Image from 'next/image';

type VaultItem = {
  id: string;
  name: string;
  url: string;
  ownerId?: string;
  members?: string[];
  secretsCount?: number;
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
};

type LayoutData = {
  user: {
    name: string | null;
    email: string | null;
    avatar: string;
  };
  navMain: Array<any>; // Replace `any` with a proper type if needed
  navSecondary: Array<{ title: string; url: string; icon: any }>;
  vaults: Array<{
    id: string;
    name: string;
    url: string;
  }>;
};

export default function Page() {

  const [user, setUser] = useState<User | null>(null);
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setVaults([]);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      try {
        const teams = await getUserTeams();

        if (!teams.length) {
          setVaults([]);
          setLoading(false);
          return;
        }

        const activeTeamId = teams[0].id;
        const vaultsData = await getUserVaults(activeTeamId);

        const myVaults = vaultsData.map((vault) => ({
          id: vault.id,
          name: vault.name,
          url: `/vaults/${vault.id}`,
          ownerId: vault.ownerId,
          members: vault.members,
          secretsCount: vault.secretsCount,
          createdAt:
            vault.createdAt instanceof Timestamp
              ? vault.createdAt.toDate()
              : new Date(vault.createdAt || Date.now()),
          updatedAt:
            vault.updatedAt instanceof Timestamp
              ? vault.updatedAt.toDate()
              : new Date(vault.updatedAt || Date.now()),
          isFavorite: vault.isFavorite || false,
        }));

        console.log(myVaults)
        setVaults([...myVaults]);

      } catch (error) {
        console.error("Error fetching teams or vaults:", error);
        setVaults([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  

 

  return (
    <>
    <div className="flex flex-1 flex-col mt-8 px-5">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className='max-w-screen-lg mx-auto w-full'>
          <div className="px-4 lg:px-6 flex justify-between items-end mt-8">
            <div>
              <h1 className="text-2xl font-semibold">My Vaults</h1>
              <p className="text-gray-600">Manage your vaults and their contents.</p>
            </div>
            <div>
              <AddNewVaultButton />
            </div>
           
          </div>
          <div className="flex flex-col gap-4 py-4 mt-8">
            {
                vaults.length > 0 ? <DataTable data={vaults} />
                :
                <>
                  <div className='relative max-w-screen-sm w-full h-72 mx-auto mt-32'>
                    <Image
                        src={"/images/vault.svg"}
                        fill
                        quality={100}
                        priority={true}
                        unoptimized={true}
                        alt="app mockup"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>
                </>
            }
              
          </div>
      </div>
      </div>
    </div>
     
    </>
  )
}
