import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Secret } from '../../types/types';



import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import { updateSecret } from '../../lib/firebase';
import { toast } from 'sonner';

export function EditSecret({ vaultId, secretId, secretKey, secretValue }: { vaultId: string; secretId: string; secretKey: string; secretValue: string }) {

  const [name, setName] = useState(secretValue);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    // Here you would typically call your API to update the secret
    // For example:
    // await updateSecret(vaultId, secretId, name);
    console.log(`Updating secret ${secretKey} with value ${name}`);
    updateSecret(vaultId, secretId, {
      key: secretKey,
      value: name
    }).then((response) => {
      toast("Secret updated successfully", {
        description: `The secret has been updated from vault ${vaultId}.`,
        duration: 2000,
        descriptionClassName: 'text-neutral-600',
      })
      setLoading(false)
    })
  };
  
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'icon'}>
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Secret Key Value</DialogTitle>
            <DialogDescription>
              Update the  value for this secret in your vault.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Key</Label>
              <Input id="name-1" name="name" disabled defaultValue={secretKey} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Value</Label>
              <Input id="username-1" name="username" value={name} onChange={(e)=>{setName(e.target.value)}} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...': 'Save changes'}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
