'use client'

import { useState } from 'react';
import { createVault, getUserTeams } from '../../lib/firebase';
import { Vault } from '../../types/types';
import CreateVaultModal from './CreateVaultModal';
import { Button } from '@/components/ui/button';
import { IconCirclePlusFilled } from '@tabler/icons-react';

export default function AddNewVaultButton() {

  const [showCreateVault, setShowCreateVault] = useState<boolean>(false);
  const [vaults, setVaults] = useState<Vault[]>([]);


   const handleCreateVault = async (name: string) => {
      
      const teams = await getUserTeams();
      console.log(teams)
      if (teams.length === 0) {
        return;
      }
              
      const newVault = await createVault(teams[0].id, name);
      setShowCreateVault(false);
      if (typeof window !== 'undefined') {
        window.location.href = `/vaults/${newVault.id}`;
      }
   };


  return (
    <>
      <Button onClick={() => setShowCreateVault(true)} className='w-full'>
        <IconCirclePlusFilled />
        Create New Vault
      </Button>
      
      {showCreateVault && (
        <CreateVaultModal
          onClose={() => setShowCreateVault(false)}
          onCreate={handleCreateVault}
        />
      )}
    </>
  );

}