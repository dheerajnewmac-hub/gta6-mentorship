export type ProofCategory = 'all' | 'payouts' | 'analytics';

export interface ProofItem {
  id: string;
  category: Exclude<ProofCategory, 'all'>;
  title: string;
  platform: string;
  timeframe: string;
  headlineMetric: {
    INR: string;
    PKR: string;
    USD: string;
  };
  secondaryMetric: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  verifiedSource: string;
  breakdown: { label: string; value: string }[];
  chartPoints: number[];
}

export function filterProofItems(
  items: readonly ProofItem[],
  category: ProofCategory
): ProofItem[] {
  if (category === 'all') {
    return [...items];
  }
  return items.filter((item) => item.category === category);
}

export function countProofByCategory(
  items: readonly ProofItem[]
): Record<ProofCategory, number> {
  let payouts = 0;
  let analytics = 0;
  for (const item of items) {
    if (item.category === 'payouts') payouts += 1;
    if (item.category === 'analytics') analytics += 1;
  }
  return {
    all: items.length,
    payouts,
    analytics,
  };
}
