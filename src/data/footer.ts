import { IMenuItem, ISocials } from '@/types/types';

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading:
    'Simplifying secure environment variable management for developers worldwide.',
  quickLinks: [
    {
      text: 'Terms of Service',
      url: '/terms',
    },
    {
      text: 'Cookie Policy',
      url: '/cookie',
    },
    {
      text: 'Privacy Policy',
      url: '/privacy',
    },
    {
      text: 'Security Policy',
      url: '/security',
    },
  ],
  email: 'support@envolt.io',
  telephone: '+1 (555) 123-4567',
  socials: {
    twitter: 'https://twitter.com/envoltapp',
    facebook: 'https://facebook.com/envoltapp',
    linkedin: 'https://linkedin.com/company/envoltapp',
    instagram: 'https://instagram.com/envoltapp',
  },
};
