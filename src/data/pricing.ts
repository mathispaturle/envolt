import { IPricing } from '@/types/types';

export const tiers: IPricing[] = [
  {
    name: 'Free',
    available: true,
    price: 0,
    features: [
      'Up to 3 members',
      'Up to 3 secret vaults',
      'Up to 50 variables per vault',
      'End-to-end encryption',
      'Basic secret sharing',
      'Community support',
    ],
    cta: 'Get Started',
    type: 'login',
  },
  {
    name: 'Pro',
    available: false,
    price: 20,
    features: [
      'Up to 15 team members',
      'Up to 10 secret vaults',
      'Unlimited variables per vault',
      'End-to-end encryption',
      'Priority email support',
    ],
    cta: 'Upgrade Now',
    type: 'stripe',
  },
  {
    name: 'Enterprise',
    available: false,
    price: 'Custom',
    features: [
      'Unlimited team members',
      'Unlimited secret vaults',
      'Unlimited variables per vault',
      'Dedicated account manager',
      '24/7 priority support',
    ],
    cta: 'Contact Sales',
    type: 'contact',
  },
];
