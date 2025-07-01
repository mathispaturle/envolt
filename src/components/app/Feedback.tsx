'use client'

import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from 'sonner' // Assuming you're using Sonner for toasts

export function FeedbackButton() {
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const submitFeedback = async () => {
    if (!feedback.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'feedback'), {
        message: feedback.trim(),
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      })

      setFeedback('')
      toast.success("Thanks for your feedback — we really appreciate it!")
    } catch (err) {
      console.error('Failed to submit feedback', err)
      toast.error('Failed to send feedback')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-3">
          <Label htmlFor="feedback">Tell us what you think</Label>
          <Textarea
            id="feedback"
            placeholder="Your feedback..."
            rows={4}
            value={feedback}
            onChange={(e:any) => setFeedback(e.target.value)}
            className="resize-none"
          />
          <Button
            onClick={submitFeedback}
            disabled={loading || !feedback.trim()}
          >
            {loading ? 'Sending...' : 'Submit'}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
