"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";

export function TeamForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      // Create new team with auto-generated ID
      const teamDocRef = await addDoc(collection(db, "teams"), {
        name: teamName,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });

      // Add user as owner in members subcollection
      await setDoc(doc(db, `teams/${teamDocRef.id}/members`, user.uid), {
        uid: user.uid,
        email: user.email,
        role: "owner",
        joinedAt: serverTimestamp(),
      });

      router.push(`/vaults`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your team</CardTitle>
          <CardDescription>
            Please provide your team's name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="team-name">Team name</Label>
                  <Input
                    id="team-name"
                    type="text"
                    placeholder="My Company"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating..." : "Create team"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking create team, you agree to our{" "}
        <Link href="/terms" target="_blank">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" target="_blank">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
