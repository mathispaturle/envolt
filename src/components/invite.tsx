"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function InviteForm({data}: {data: {
  teamId: string | null,
  email:string | null,
}}) {

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleRedirect = () => {
    router.push(`/auth?teamId=${data.teamId}&email=${data.email}&type=signup`)
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Team invite to join Brickbro</CardTitle>
          <CardDescription>
            You have been invited to join the Brickro team and access .env variables securely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="submit" className="w-full" disabled={loading} onClick={handleRedirect}>
            Join team
          </Button>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
        and <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
