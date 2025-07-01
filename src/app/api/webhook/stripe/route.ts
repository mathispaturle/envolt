import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to verify webhook signature
  },
};

// Helper to read raw request body as buffer
async function buffer(readable: ReadableStream<Uint8Array> | null) {
  if (!readable) {
    throw new Error('Request body is empty');
  }
  const chunks = [];
  const reader = readable.getReader();
  let done, value;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks);
}


export async function POST(req: NextRequest) {
  const buf = await buffer(req.body);
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // Extract vaultId from metadata or session (depends how you set it)
  // For example, you might store vaultId in session metadata
  const getVaultId = (obj: any) => obj.metadata?.vaultId || null;

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const vaultId = getVaultId(session);

        if (vaultId) {
          // Mark vault as paid/unlocked
          const vaultRef = doc(db, 'vaults', vaultId);
          await updateDoc(vaultRef, {
            paid: true,
            updatedAt: serverTimestamp(),
          });
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const vaultId = getVaultId(invoice);

        if (vaultId) {
          // Keep vault active
          const vaultRef = doc(db, 'vaults', vaultId);
          await updateDoc(vaultRef, {
            subscriptionStatus: 'active',
            updatedAt: serverTimestamp(),
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const vaultId = getVaultId(invoice);

        if (vaultId) {
          // Mark subscription as payment_failed
          const vaultRef = doc(db, 'vaults', vaultId);
          await updateDoc(vaultRef, {
            subscriptionStatus: 'past_due',
            updatedAt: serverTimestamp(),
          });
          // Optionally send email notification here
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const vaultId = getVaultId(subscription);

        if (vaultId) {
          // Revoke vault access
          const vaultRef = doc(db, 'vaults', vaultId);
          await updateDoc(vaultRef, {
            subscriptionStatus: 'canceled',
            paid: false,
            updatedAt: serverTimestamp(),
          });
        }
        break;
      }

      // Add more event types if you want...

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error('Error handling event:', err);
    return new NextResponse('Error', { status: 500 });
  }

  return new NextResponse('Success', { status: 200 });
}
