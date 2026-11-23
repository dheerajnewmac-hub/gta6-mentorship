export type CurrencyCode = 'INR' | 'PKR' | 'USD';
export type PlanId = 'starter' | 'pro';

export interface PlanPricing {
  id: PlanId;
  name: string;
  shortName: string;
  subtitle: string;
  billingCycleLabel: string;
  bonusDurationBadge: string;
  totalAccessSummary: string;
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
  starter: {
    id: 'starter',
    name: 'Starter Monthly Program',
    shortName: 'Starter (1+1 Mo)',
    subtitle: 'Complete GTA 6 System + Free Insta Software + Monthly Work Group',
    billingCycleLabel: '1+1 Months (2 Months Total)',
    bonusDurationBadge: '1+1 Month FREE',
    totalAccessSummary: '1 Month Paid + 1 Month Extra FREE',
    popular: false,
    prices: {
      INR: { current: 499, regular: 998 },
      PKR: { current: 1650, regular: 3300 },
      USD: { current: 6, regular: 12 },
    },
    features: [
      '1+1 Months Full Access (1 Month Paid + 1 Month Extra FREE = 2 Months)',
      'Complete GTA 6 Clipping Video Modules (Phone + PC)',
      'Secret High-Paying GTA 6 Clipping Platforms & Campaign List',
      'FREE Ready-Made Instagram Automation Software Included',
      'Account Setup Se Reel Viral Method + Har Mahine Direct Paid Work Group',
      'Weekly Live Q&A Calls & Direct Clip Reviews',
      'Copyright Protection & 0-Strike Editing Shield',
      'Private VIP Telegram & Active Clippers Community Access',
    ],
    shortNote:
      'Ek Teer Se Do Nishana: Account kaise banana hai aur reel kaise viral karni hai wo method hum sikhayenge, aur har mahine direct earning ka kaam bhi hamare private group me hum hi denge — 2 full months (1+1) access!',
    ctaLabel: 'Join Starter — 1+1 Months',
  },
  pro: {
    id: 'pro',
    name: 'Pro All-Software Program',
    shortName: 'Pro All-Software (1+2 Mo)',
    subtitle: 'All Current & Future Earning Softwares FREE + Direct Campaigns + Full Roadmap',
    billingCycleLabel: '1+2 Months (3 Months Total)',
    bonusDurationBadge: '1+2 Months FREE',
    totalAccessSummary: '1 Month Paid + 2 Months Extra FREE',
    popular: true,
    prices: {
      INR: { current: 999, regular: 2997 },
      PKR: { current: 3300, regular: 9900 },
      USD: { current: 12, regular: 36 },
    },
    features: [
      '1+2 Months Full Access (1 Month Paid + 2 Months Extra FREE = 3 Months)',
      'All Earning Softwares FREE — Ready-Made Insta Automation + Future Me Aane Wale Sabhi Softwares FREE + New Earning Methods',
      'Direct High-Paying Paid Campaigns Provided — Hum Khud Campaigns Denge (No Searching Needed)',
      'Complete Account-to-Views Roadmap — Kaise Account Banana Hai, Kaise Views Aayenge & Kaise Kamana Hai (Sari Details)',
      'Early Access Campaigns — Secret Dollar-Earning Deals Before Public Release',
      'Complete A-to-Z Done-For-You Setup (Account, Approval & Payouts)',
      '100% Guaranteed Campaign Approval — Start Earning From Day 1',
      '1-on-1 Direct Mentor VIP Support & Daily Clip / Reel Audits',
      '500+ Viral GTA 6 & Reels SFX, BGM & CapCut/Premiere Presets Pack',
      'Everything inside Starter Plan + All Future GTA 6 Launch Drops & Secret Algorithm Updates Free',
    ],
    shortNote:
      'All-Software & Campaign Promise: Is ₹999 Pro Plan me aapko sabhi earning softwares aur future me jitne bhi naye softwares aayenge wo bilkul FREE milenge + naye earning methods milte rahenge. Saath hi hum aapko direct paid campaigns denge aur account banana, views laana & earning ka poora roadmap sikhayenge — 3 full months (1+2) ke liye!',
    ctaLabel: 'Join Pro All-Software — 1+2 Months',
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
