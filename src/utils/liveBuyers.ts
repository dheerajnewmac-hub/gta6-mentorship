import {
  CurrencyCode,
  PRICING_PLANS,
  PlanId,
  getPlanPriceInfo,
} from './pricing';

export interface LiveBuyerEntry {
  id: string;
  name: string;
  city: string;
  planId: PlanId;
  timeAgo: string;
  paymentMethod: string;
}

export interface FormattedLiveBuyer {
  id: string;
  name: string;
  city: string;
  initials: string;
  planId: PlanId;
  planName: string;
  priceFormatted: string;
  timeAgo: string;
  paymentMethod: string;
  isPro: boolean;
}

export const LIVE_BUYERS: LiveBuyerEntry[] = [
  {
    id: 'buyer-ashok',
    name: 'Ashok',
    city: 'Jaipur',
    planId: 'pro',
    timeAgo: 'Just now',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-rohan',
    name: 'Rohan Sharma',
    city: 'Pune',
    planId: 'pro',
    timeAgo: '2 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-bilal',
    name: 'Bilal Ahmed',
    city: 'Lahore',
    planId: 'pro',
    timeAgo: '5 mins ago',
    paymentMethod: 'EasyPaisa Verified',
  },
  {
    id: 'buyer-aditya',
    name: 'Aditya Verma',
    city: 'Lucknow',
    planId: 'starter',
    timeAgo: '8 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-arjun',
    name: 'Arjun Patel',
    city: 'Ahmedabad',
    planId: 'pro',
    timeAgo: '11 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-hamza',
    name: 'Hamza Khan',
    city: 'Karachi',
    planId: 'pro',
    timeAgo: '14 mins ago',
    paymentMethod: 'JazzCash Verified',
  },
  {
    id: 'buyer-vivek',
    name: 'Vivek Yadav',
    city: 'Indore',
    planId: 'starter',
    timeAgo: '19 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-sahil',
    name: 'Sahil Thakur',
    city: 'Chandigarh',
    planId: 'starter',
    timeAgo: '24 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-karan',
    name: 'Karan Rajput',
    city: 'Delhi NCR',
    planId: 'pro',
    timeAgo: '29 mins ago',
    paymentMethod: 'UPI Verified',
  },
  {
    id: 'buyer-danish',
    name: 'Danish Ali',
    city: 'Islamabad',
    planId: 'pro',
    timeAgo: '34 mins ago',
    paymentMethod: 'EasyPaisa Verified',
  },
];

export const LIVE_BUYER_TIMING = {
  initialDelayMs: 2000,
  visibleDurationMs: 4500,
  // Varied gaps averaging 7.75s so each popup returns every 11s–14s (within 10–15s)
  gapScheduleMs: [7000, 8500, 6500, 9000, 7500, 8000] as readonly number[],
};

export function getNextPopupDelayMs(stepIndex: number): number {
  const schedule = LIVE_BUYER_TIMING.gapScheduleMs;
  const safeIndex = Math.abs(stepIndex) % schedule.length;
  return schedule[safeIndex];
}

export function getBuyerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'GT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function getNextBuyerIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function formatLiveBuyerNotification(
  entry: LiveBuyerEntry,
  currency: CurrencyCode
): FormattedLiveBuyer {
  const plan = PRICING_PLANS[entry.planId];
  const price = getPlanPriceInfo(entry.planId, currency);

  return {
    id: entry.id,
    name: entry.name,
    city: entry.city,
    initials: getBuyerInitials(entry.name),
    planId: entry.planId,
    planName: plan.shortName,
    priceFormatted: price.currentFormatted,
    timeAgo: entry.timeAgo,
    paymentMethod: entry.paymentMethod,
    isPro: entry.planId === 'pro',
  };
}
