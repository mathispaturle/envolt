// components/CreateVaultModal.jsx
import { useState } from 'react';
import {Button} from '@/components/ui/button';
import { Input } from '../ui/input';

export default function CreateVaultModal({ onClose, onCreate }) {
  const [name, setName] = useState('');

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[999]">
      <div className="bg-white p-6 rounded-md shadow w-96">
        <h3 className="text-xl font-semibold mb-4">Create New Vault</h3>
        <Input
          type="text"
          placeholder="Vault name"
          className="w-full p-2 border mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <div className="flex justify-end gap-2">
          <Button variant={'ghost'} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!name} onClick={() => onCreate(name)}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
