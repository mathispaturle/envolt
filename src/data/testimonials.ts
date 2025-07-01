import { ITestimonial } from '@/types/types';
import { siteDetails } from './siteDetails';

export const testimonials: ITestimonial[] = [
  {
    name: 'John Smith',
    role: 'CEO at DevSolutions',
    message: `${siteDetails.siteName} has completely transformed how we manage environment variables securely across our engineering teams. It's become indispensable to our development workflow.`,
    avatar: '/images/testimonial-1.webp',
  },
  {
    name: 'Jane Doe',
    role: 'CTO at StartupX',
    message: `As a CTO, I'm impressed by ${siteDetails.siteName}'s top-notch encryption and easy integrations. It strikes a perfect balance between security and developer experience.`,
    avatar: '/images/testimonial-2.webp',
  },
  {
    name: 'Emily Johnson',
    role: 'Product Manager',
    message: `${siteDetails.siteName} has revolutionized how our team shares secrets and config files. Its intuitive design and powerful features save us time and reduce risk.`,
    avatar: '/images/testimonial-3.webp',
  },
];
