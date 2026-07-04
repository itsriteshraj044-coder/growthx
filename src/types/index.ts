import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServicePreview {
  id: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
}

export interface ServiceDetail extends ServicePreview {
  description: string;
  features: string[];
  benefits: string[];
  process: ProcessStep[];
  image: string;
}

export interface ProcessStep {
  step: string;
  detail: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
