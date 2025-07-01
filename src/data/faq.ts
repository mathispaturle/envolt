import { IFAQ } from '@/types/types';
import { siteDetails } from './siteDetails';

export const faqs: IFAQ[] = [
  {
    question: `Is ${siteDetails.siteName} secure?`,
    answer:
      'Absolutely. We use bank-level AES-256 encryption to protect your secrets, and we never store your master passwords. Biometric and multi-factor authentication add extra security layers.',
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer:
      'Yes! Your Envolt vaults sync securely across all your devices and integrate seamlessly with your CI/CD pipelines and development tools.',
  },
  {
    question: `Can I share secrets safely with my team?`,
    answer:
      'Definitely. Envolt offers role-based access control and time-limited sharing links to ensure secrets are shared only with authorized team members.',
  },
  {
    question: `Do I need special skills to use Envolt?`,
    answer:
      'Not at all. Envolt is designed for developers of all levels — with CLI tools, a clean UI, and helpful onboarding to get you started quickly.',
  },
  {
    question: `What if I need help using Envolt?`,
    answer:
      'Our support team is available during business hours via email and chat. We also provide detailed documentation and tutorials to guide you.',
  },
];
