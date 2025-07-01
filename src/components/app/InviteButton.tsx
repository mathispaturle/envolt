'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Plus, Trash } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { getUserTeams } from '../../lib/firebase'

export type Invite = {
  email: string
  role: 'editor' | 'viewer'
}

export default function InviteButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invites, setInvites] = useState<Invite[]>([
    { email: '', role: 'viewer' },
  ])

  const handleChange = (index: number, field: keyof Invite, value: string) => {
    const updated = [...invites]
    updated[index][field] = value as Invite['role']
    setInvites(updated)
  }

  const addInvite = () => {
    setInvites([...invites, { email: '', role: 'viewer' }])
  }

  const removeInvite = (index: number) => {
    const updated = invites.filter((_, i) => i !== index)
    setInvites(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {

    if (loading) return;

    setLoading(true)

    e.preventDefault();

    const teams = await getUserTeams();

    if (!teams || teams.length === 0) {
      console.error('No teams found for user.');
      setLoading(false);
      return;
    }

    const teamId = teams[0].id;
    
    try {
      const results = await Promise.all(
        invites.map(async (invite) => {
          const res = await fetch('/api/resend/send-invite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: invite.email,
              // role: invite.role,
              teamId,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error(`Failed to send invite to ${invite.email}`, errorData);
            return { success: false, email: invite.email };
          }

          return { success: true, email: invite.email };
        })
      );

      console.log('Invite results:', results);
      setOpen(false);
      setLoading(false)
    } catch (err) {
      console.error('Failed to send invites', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="ml-2">
          <Mail className="h-4 w-4 mr-2" />
          Share link via mail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Add emails and assign their roles below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4 max-h-[50vh] overflow-scroll">
            {invites.map((invite, index) => (
              <div className="flex gap-2 items-end" key={index}>
                <div className="flex-1">
                  <Label className='pb-2'>Email</Label>
                  <Input
                    type="email"
                    value={invite.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    required
                  />
                </div>
                {/* <div className="w-32">
                  <Label className='pb-2'>Role</Label>
                  <Select
                    value={invite.role}
                    onValueChange={(value) => handleChange(index, 'role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive hover:text-red-600"
                  onClick={() => removeInvite(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addInvite} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add another
            </Button>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit"> {loading ? "Sending..." : "Send Invites"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
