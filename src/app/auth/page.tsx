'use client'

import { Fingerprint } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {

  const searchParams = useSearchParams();

  const teamId = searchParams.get('teamId');
  const email = searchParams.get('email');
  const type = searchParams.get('type');

  const data = {
    teamId,
    email,
    type
  }


  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Fingerprint className="size-4" />
          </div>
          Envolt
        </a>
        <LoginForm data={data}/>
      </div>
    </div>
  )
}
