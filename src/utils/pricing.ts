export type CurrencyCode = 'INR' | 'PKR' | 'USD';
export type PlanId = 'starter_2m' | 'vip_3m';

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
  starter_2m: {
    id: 'starter_2m',
    name: 'Starter Pass (1 + 1 Month)',
    subtitle: '1 Month Paid + 1 Month FREE (Total 2 Months Full Access)',
    billingCycleLabel: '2 Months Total',
    popular: false,
    prices: {
      INR: { current: 499, regular: 1999 },
      PKR: { current: 1750, regular: 7000 },
      USD: { current: 6, regular: 25 },
    },
    features: [
      '1 Month Paid + 1 Month FREE Access (Total 2 Months)',
      'FREE Instagram Automation Software Included',
      'Har Mahine Earning Ke Liye Kaam Hum Khud Denge',
      'Account Kaise Banayein & Reel Viral Karne Ka Secret Method',
      'GTA 6 Game & Clipping Se Earning System',
      'Direct Payout Setup (SBI Bank / PhonePe UPI / Crypto)',
      'Community Group & Instant Doubt Support',
    ],
    shortNote:
      'Special 1+1 Offer: ₹499 me 2 months access + Free Instagram Automation Software + Har mahine kaam guaranteed!',
    ctaLabel: 'Claim 1+1 Month Pass (₹499)',
  },
  vip_3m: {
    id: 'vip_3m',
    name: 'Pro VIP All-Access (1 + 2 Months)',
    subtitle: '1 Month Paid + 2 Months FREE (Total 3 Months VIP Access)',
    billingCycleLabel: '3 Months Total',
    popular: true,
    prices: {
      INR: { current: 999, regular: 4999 },
      PKR: { current: 3500, regular: 17500 },
      USD: { current: 12, regular: 60 },
    },
    features: [
      '1 Month Paid + 2 Months FREE Access (Total 3 Months VIP Access)',
      'FREE Instagram Automation Software Ready-to-Use',
      'ALL FUTURE SOFTWARES 100% FREE (Future Me Jo Bhi Naye Software Banenge Free Milenge)',
      'Direct High-Paying Monthly Work & Secret Campaigns Provided',
      'Complete A-to-Z Done-For-You Account & Viral Reels Blueprint',
      'Secret Earning Methods (GTA 6 Clipping + Affiliate + AI Automation)',
      '1-on-1 Direct Mentor VIP Support & Daily Reel/Clip Audits',
      'Early Access Secret Dollar Deals Before Public Release',
      'Private VIP Mastermind Telegram Group Access',
    ],
    shortNote:
      'Pro VIP Deal: ₹999 me 3 months full access + Saare future softwares 100% free + High-paying direct kaam!',
    ctaLabel: 'Claim Pro VIP All-Access (₹999)',
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
