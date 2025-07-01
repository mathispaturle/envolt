import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { Fingerprint } from 'lucide-react'

// EmailTemplateProps.ts
export type EmailTemplateProps = {
  firstName: string
  role: string
  inviteLink: string
}


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const EmailTemplate = ({
  firstName,
  role,
  inviteLink,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>{`You're invited to join a team on Envolt`}</Preview>
    <Body style={main}>
      <Container style={container}>

        <Container style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }}>
            <Fingerprint size={24} color="black" />
          </div>
          <Text style={{ display: 'inline-block', verticalAlign: 'middle', fontWeight: 'bold', fontSize: '20px' }}>
            Envolt
          </Text>
        </Container>

        <Text style={title}>
          {firstName}, you've been invited to join a team on Envolt
        </Text>

        <Section style={section}>
          <Text style={text}>
            You've been invited as a <strong>{role}</strong>. Envolt is a simple
            and secure way to manage and share environment variables with your
            team.
          </Text>

          <Text style={text}>
            Click the button below to accept the invitation and get started:
          </Text>

          <Button style={button} href={inviteLink}>
            Accept Invitation
          </Button>
        </Section>

        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this
          email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export // Add below the component or separate into a styles file
  const main = {
    backgroundColor: '#ffffff',
    color: '#24292e',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif',
  }

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '16px',
  textAlign: 'center' as const,
}

const title = {
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: '16px',
  textAlign: 'left' as const,
}

const section = {
  padding: '24px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  textAlign: 'center' as const,
  backgroundColor: '#f9fafb',
}

const text = {
  fontSize: '14px',
  lineHeight: 1.6,
  marginBottom: '16px',
  textAlign: 'left' as const,
}

const button = {
  display: 'inline-block',
  padding: '12px 20px',
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '14px',
  borderRadius: '6px',
  textDecoration: 'none',
}

const footer = {
  fontSize: '12px',
  color: '#6b7280',
  textAlign: 'center' as const,
  marginTop: '40px',
}
