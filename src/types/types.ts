import { Timestamp } from 'firebase/firestore';
import React from 'react';

export interface Vault {
  id: string;
  name: string;
  ownerId?: string;
  members?: string[];
  secretsCount?: number;
  createdAt: Date | Timestamp;
  updatedAt?: Date | Timestamp;
  isFavorite?: boolean;
}

export interface Secret {
  id: string;
  key: string;
  value: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
}

export interface IMenuItem {
    text: string;
    url: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: React.JSX.Element;
}

export interface IPricing {
    name: string;
    available: boolean
    price: number | string;
    features: string[];
    cta: string;
    type: 'login' |  'contact' | 'stripe'
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

export interface IStats {
    title: string;
    icon: React.JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}

export type FullVaultData = {
  vaultId: string;
  vaultData: any;
  secrets: Secret[];
  views: any[];
};