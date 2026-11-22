export type CurrencyCode = 'INR' | 'PKR' | 'USD';
export type PlanId = 'monthly' | 'lifetime';

export interface PlanPricing {
  id: PlanId;
  name: string;
  subtitle: string;
  billingCycleLabel: string;
  popular: boolean;
  prices: Record<CurrencyCode, { current: number; regular?: number }>;
  features: string[];
  shortNote: string;
  ctaLabel: string;
}

export const CURRENCY_META: Record<
  CurrencyCode,
  {
    code: CurrencyCode;
    symbol: string;
    label: string;
    locale: string;
    starterMonthly: string;
    consistentMonthly: string;
    proMonthly: string;
    bonusValue: string;
  }
> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    label: 'INR ₹',
    locale: 'en-IN',
    starterMonthly: '₹25,000–₹45,000/mo',
    consistentMonthly: '₹60,000–₹1,20,000/mo',
    proMonthly: '₹1,50,000+/mo',
    bonusValue: '₹15,000',
  },
  PKR: {
    code: 'PKR',
    symbol: 'Rs.',
    label: 'PKR Rs.',
    locale: 'en-PK',
    starterMonthly: 'Rs. 85,000–1,50,000/mo',
    consistentMonthly: 'Rs. 2,00,000–4,00,000/mo',
    proMonthly: 'Rs. 5,00,000+/mo',
    bonusValue: 'Rs. 50,000',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    label: 'USD $',
    locale: 'en-US',
    starterMonthly: '$300–$550/mo',
    consistentMonthly: '$750–$1,450/mo',
    proMonthly: '$1,800+/mo',
    bonusValue: '$180',
  },
};

export const PRICING_PLANS: Record<PlanId, PlanPricing> = {
  monthly: {
    id: 'monthly',
    name: 'Monthly Pass',
    subtitle: 'Complete GTA 6 Clipping System + Community',
    billingCycleLabel: '/month',
    popular: false,
    prices: {
      INR: { current: 999 },
      PKR: { current: 3500 },
      USD: { current: 12 },
    },
    features: [
      'Complete GTA 6 Clipping Video Modules (Phone + PC)',
      'Secret High-Paying GTA 6 Clipping Platforms & Campaign List',
      'Weekly Live Q&A Calls & Clip Reviews',
      'Copyright Protection & 0-Strike Editing Shield',
      'Private VIP Telegram & Community Access',
    ],
    shortNote:
      'Pro Tip: Jo log Lifetime Access lete hain, unhe 30 days me jitna invest kiya hai utna return GTA 6 clipping se hi mil jata hai.',
    ctaLabel: 'Start Monthly Pass',
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime VIP Access',
    subtitle: 'Full GTA 6 Blueprint + 1-on-1 Personal Support',
    billingCycleLabel: 'One-Time',
    popular: true,
    prices: {
      INR: { current: 1999, regular: 9999 },
      PKR: { current: 6500, regular: 32500 },
      USD: { current: 24, regular: 119 },
    },
    features: [
      'Direct High-Paying Paid Campaigns Provided (No Searching Needed)',
      'Early Access Campaigns — Secret Dollar-Earning Deals Before Public Release',
      'Complete A-to-Z Done-For-You Setup (Account, Approval & Payouts)',
      '100% Guaranteed Campaign Approval — Start Earning From Day 1',
      '1-on-1 Direct Mentor VIP Support & Daily Clip Audits',
      '500+ Viral GTA 6 SFX, BGM & CapCut/Premiere Presets Pack',
      'Everything inside Monthly Pass — Lifetime Access (No Recurring Fee)',
      'All Future GTA 6 Launch Drops & Secret Algorithm Updates Free',
    ],
    shortNote:
      '30-Day Return Note: Jo log Lifetime Access lete hain, unhe 30 days ke andar jitna invest kiya hai utna return GTA 6 clipping se hi mil jata hai.',
    ctaLabel: 'Claim Lifetime VIP Access',
  },
};

export function formatCurrencyAmount(amount: number, currency: CurrencyCode): string {
  const meta = CURRENCY_META[currency];
  const formattedNumber = new Intl.NumberFormat(meta.locale, {
    maximumFractionDigits: 0,
  }).format(amount);

  if (currency === 'PKR') {
    return `${meta.symbol} ${formattedNumber}`;
  }
  return `${meta.symbol}${formattedNumber}`;
}

export function getPlanPriceInfo(planId: PlanId, currency: CurrencyCode): {
  currentFormatted: string;
  regularFormatted: string | null;
  savingsPercent: number | null;
  rawCurrent: number;
} {
  const plan = PRICING_PLANS[planId];
  const { current, regular } = plan.prices[currency];

  const savingsPercent =
    regular && regular > current
      ? Math.round(((regular - current) / regular) * 100)
      : null;

  return {
    currentFormatted: formatCurrencyAmount(current, currency),
    regularFormatted: regular ? formatCurrencyAmount(regular, currency) : null,
    savingsPercent,
    rawCurrent: current,
  };
}
