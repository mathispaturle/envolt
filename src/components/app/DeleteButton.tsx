import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { env } from 'process';
import { toast } from 'sonner';
import { deleteSecret } from '../../lib/firebase';

export default function DeleteButton({
  vaultId,
  secretId,
}: {
  vaultId: string;
  secretId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} size={'icon'}>
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the secret.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              // Call your delete function here
              await deleteSecret(vaultId, secretId);
              toast("Secret deleted successfully", {
                description: `The secret has been deleted from vault ${vaultId}.`,
                descriptionClassName: 'text-neutral-600',
                duration: 2000,
              })

              if (typeof window !== 'undefined') {
                window.location.reload(); // Reload to fetch updated secrets
              }
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}