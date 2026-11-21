export type CurrencyCode = "INR" | "PKR" | "USD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  monthlyPrice: number;
  lifetimePrice: number;
  originalLifetimePrice: number;
  format: (amount: number) => string;
}

export interface ProofItem {
  id: string;
  title: string;
  category: "earnings" | "views" | "payout";
  amountOrMetric: string;
  date: string;
  description: string;
  platform: string;
  accentColor: string;
  badge: string;
  image?: string;
}

export interface CurriculumModule {
  id: number;
  title: string;
  duration: string;
  description: string;
  lessons: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "beginner" | "earning" | "technical";
}

export interface EnrollmentFormData {
  fullName: string;
  whatsapp: string;
  countryCode: string;
  plan: "monthly" | "lifetime";
  experienceLevel: "beginner" | "intermediate";
}
