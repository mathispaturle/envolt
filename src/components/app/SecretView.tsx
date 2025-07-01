import { Code, Delete, Edit, Eye, Trash } from 'lucide-react';
import { env } from 'process';
import { Secret } from '../../types/types';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import {Button} from '@/components/ui/button';
import { toast } from "sonner"
import DeleteButton from './DeleteButton';
import { EditSecret } from '@/components/app/EditSecret';

export default function SecretView({  env, index, v_id, publicView = false }: { env: Secret; index: number; v_id: string, publicView?: boolean }) {

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div key={index} className="p-6 flex flex-col md:flex-row justify-between items-center not-last:border-b border-neutral-200">
      <div className='flex justify-start items-center gap-4 w-full'>
        <div className='h-8 w-8 rounded-full bg-white border border-neutral-200 flex justify-center items-center'>
          <Code className='h-4 w-4 text-neutral-500' />
        </div>
        <div className='max-w-64 overflow-hidden w-full'>
          <p className="text-sm max-w-64 font-mono font-semibold text-ellipsis">{env.key}</p>
          <p className='text-sm text-neutral-600'>All environments</p>
        </div>
        <div className='max-w-72 overflow-hidden w-full flex justify-start items-center gap-2'>
          <Button variant={'secondary'} size={'icon'} onClick={() => setShow(!show)}>
            <Eye />
          </Button>
          {
            show
              ? <div className="text-sm max-w-72 font-mono text-neutral-600 text-ellipsis truncate bg-neutral-50 border border-neutral-200 rounded-md p-1 cursor-pointer" 
                onClick={() => {
                  navigator.clipboard.writeText(env.value || "");
                  toast("Enviroment variable copied to clipboard", {
                    description: "You can paste it in your code editor",
                    duration: 2000,
                    descriptionClassName: 'text-neutral-600',
                  });
        }}
              >{env.value}</div>
              : <p className="text-sm max-w-72 font-mono text-neutral-600 text-ellipsis truncate">••••••••••</p>
          }
          {/* {
            env.value && (
              <Button variant={'secondary'} size={'icon'} onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            )
          } */}
          {/* <p className="text-sm max-w-72 font-mono text-neutral-600 text-ellipsis truncate">{env.value}</p> */}
        </div>
      </div>
      <div className='flex justify-end items-center gap-2'>
        <p className='text-sm text-neutral-600 whitespace-nowrap'>{env.createdAt
          ? `Added ${(env.createdAt as Timestamp).toDate().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`
          : "Date unknown"}</p>
          
          {
            !publicView &&
            <>
              <EditSecret vaultId={v_id} secretId={env.id} secretKey={env.key} secretValue={env.value} />
              <DeleteButton vaultId={v_id} secretId={env.id} />
            </>  
          }
      </div>
    </div>
  )

}