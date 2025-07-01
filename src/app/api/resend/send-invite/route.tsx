// app/api/resend/send-invite/route.ts

import { EmailTemplate } from '@/components/emails/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, role, teamId } = body;

    if (!email || !role || !teamId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Generate a unique token (or use your own invite system logic)
    const inviteToken = Math.random().toString(36).substring(2, 10); // Replace with a secure token
    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL }/invite?teamId=${teamId}&token=${inviteToken}&email=${email}&type=new`;

    const { data, error } = await resend.emails.send({
      // from: 'Envolt <invite@envolt.org>',
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: "You've been invited to join a team on Envolt",
      react: EmailTemplate({
        firstName: email,
        role,
        inviteLink,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Optionally store invite in DB with token/teamId/email/role
    // await saveInvite({ token: inviteToken, email, teamId, role })

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
