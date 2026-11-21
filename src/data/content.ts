import { ProofItem } from '../utils/proofFilter';

export const PROOF_ITEMS: ProofItem[] = [
  {
    id: 'sbi-bank-transfer',
    category: 'payouts',
    title: 'Direct SBI Bank Transfer (GTA 6 Clipping Payout)',
    platform: 'State Bank of India · Wire Transfer',
    timeframe: '20–21 Nov · 2-Day Settlement',
    headlineMetric: {
      INR: '₹42,282.27',
      PKR: 'Rs. 1,41,500',
      USD: '$467.21',
    },
    secondaryMetric: '+$467.21 Invoice Received',
    caption:
      '20 Nov ko $467.21 GTA 6 clipping payout aaya aur 21 Nov ko seedha mere State Bank of India account me ₹42,282.27 transfer hua.',
    imageSrc: '/assets/aistudio/IMG_20261121_151537_241__1__70c150ab.png',
    imageAlt:
      'Verified payout screenshot showing +$467.21 payment received on 20 Nov and ₹42,282.27 INR transferred to State Bank of India on 21 Nov',
    verifiedSource: 'Real Bank Settlement Screenshot',
    breakdown: [
      { label: 'Invoice Payment Received (20 Nov)', value: '+$467.21 USD' },
      { label: 'Transferred to SBI Bank (21 Nov)', value: '₹42,282.27 INR' },
      { label: 'Work Duration', value: '2–3 Days GTA 6 Clipping Sprint' },
      { label: 'Niche', value: 'GTA 6 Trailers, Leaks & Clips' },
    ],
    chartPoints: [30, 48, 66, 84, 100],
  },
  {
    id: 'content-rewards-acct-1',
    category: 'payouts',
    title: 'Content Rewards Payout Dashboard #1',
    platform: 'Content Rewards · GTA 6 Campaigns',
    timeframe: '2–3 Days Active Campaign',
    headlineMetric: {
      INR: '₹5,180+',
      PKR: 'Rs. 17,200+',
      USD: '$61.43',
    },
    secondaryMetric: '+$31.81 Arriving & Queued',
    caption:
      'GTA 6 hype clips se 5 payouts already received ($61.43), $9.53 arriving aur $22.28 still accumulating — roz $16+ live rewards.',
    imageSrc: '/assets/aistudio/IMG_20261121_150736_259_fa73abac.jpg',
    imageAlt:
      'Content Rewards mobile earnings screenshot showing $61.43 lifetime earned, $16.43 today, $9.53 arriving, and $22.28 queued',
    verifiedSource: 'Live Mobile App Screenshot',
    breakdown: [
      { label: 'Received (5 Payouts)', value: '$61.43 USD' },
      { label: 'Today Earnings', value: '$16.43 USD' },
      { label: 'Arriving Next (1 Payout)', value: '$9.53 USD' },
      { label: 'Queued & Accumulating (4 Clips)', value: '$22.28 USD' },
    ],
    chartPoints: [24, 42, 58, 76, 92],
  },
  {
    id: 'content-rewards-acct-2',
    category: 'analytics',
    title: 'Content Rewards Payout Dashboard #2',
    platform: 'Content Rewards · Secondary GTA 6 Page',
    timeframe: 'This Week · 8 Verified Payouts',
    headlineMetric: {
      INR: '₹3,820+',
      PKR: 'Rs. 12,670+',
      USD: '$45.26',
    },
    secondaryMetric: '8 Payouts Received',
    caption:
      'Second GTA 6 clip page se isi week $27.98 aur total $45.26 received (8 verified payouts + 7 more clips queued).',
    imageSrc: '/assets/aistudio/IMG_20261121_150735_875_a6eb03da.jpg',
    imageAlt:
      'Content Rewards secondary dashboard screenshot showing $45.26 lifetime earned, $27.98 this week, 8 payouts received, and 7 queued',
    verifiedSource: 'Live Mobile App Screenshot',
    breakdown: [
      { label: 'Total Received (8 Payouts)', value: '$45.26 USD' },
      { label: 'Earned This Week', value: '$27.98 USD' },
      { label: 'Queued Clips Still Earning', value: '7 Clips ($1.66+)' },
      { label: 'Editing Device', value: 'Phone / Basic Laptop' },
    ],
    chartPoints: [18, 35, 55, 74, 88],
  },
];

export const CLIPPING_STEPS = [
  {
    number: '01',
    title: 'GTA 6 Trailers, Leaks & Top Streamer Moments Pick Karo',
    description:
      'Abhi GTA 6 duniya ka sabse bada gaming trend hai — har trailer detail, hidden easter egg aur streamer reaction par millions of views aate hain. Exact viral topics aur paid campaigns list mentorship me milti hai.',
  },
  {
    number: '02',
    title: '2-Second Viral Hook Edit Lagao (Mobile Ya PC)',
    description:
      'CapCut ya Premiere Pro me hamare GTA 6 caption templates, fast zoom cuts aur copyright-safe sound effects lagao — taaki viewer video ko end tak dekhe.',
  },
  {
    number: '03',
    title: 'Upload Karo & Direct Bank Me Dollars Earn Karo',
    description:
      'Shorts, Reels & TikTok par upload karo, Content Rewards campaigns aur gaming clients ke zariye payouts seedha apne Indian/Pakistani bank me withdraw karo.',
  },
];

export const MENTORSHIP_PILLARS = [
  {
    title: 'Live GTA 6 Viral Topics & Paid Campaigns',
    detail:
      'Kaunse GTA 6 clip angles aur Content Rewards campaigns sabse fast pay karte hain — daily updated list.',
  },
  {
    title: '2-Second Hook Editing (Phone + PC)',
    detail:
      'CapCut & Premiere Pro step-by-step editing + 500+ ready-made GTA 6 SFX, captions aur presets included.',
  },
  {
    title: '0-Strike Copyright & Algorithm Growth Shield',
    detail:
      'Fair-use layering aur clean posting strategy jisse naya GTA 6 page bhi pehle week se viral views laye.',
  },
  {
    title: 'Bank Payout Setup + 1-on-1 Mentor Guidance',
    detail:
      'India (SBI, HDFC, UPI) & Pakistan (EasyPaisa, JazzCash) payout setup + weekly live reviews aur direct mentor help.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-why-gta6',
    question: 'Abhi GTA 6 clipping start karne ka sabse best time kyun hai?',
    answer:
      'GTA 6 launch aur har naye trailer/update ke aas-paas billions of views generate ho rahe hain. Jo creators abhi apna GTA 6 clip page aur campaign system ready kar lete hain, wo is hype wave ka sabse bada fayda uthate hain.',
  },
  {
    id: 'faq-device',
    question: 'Kya phone se GTA 6 clipping kar sakte hain ya heavy PC chahiye?',
    answer:
      '100% phone (CapCut Mobile) ya normal laptop se ho jata hai. Heavy gaming PC ki bilkul zaroorat nahi hai — kyunki aap existing trailers, updates aur top streams ke clips smart tareeke se edit karte hain.',
  },
  {
    id: 'faq-real',
    question: 'Kya upar dikhaye gaye 2–3 din ke payout screenshots real hain?',
    answer:
      'Haan, ye 100% mere khud ke real payouts hain — SBI bank transfer (₹42,282.27) aur live Content Rewards dashboards. Mentorship me main live walkthrough dikhata hoon ki ye payouts kaise generate kiye gaye.',
  },
  {
    id: 'faq-payments',
    question: 'India aur Pakistan se mentorship kaise join karein aur access kab milega?',
    answer:
      'India ke liye UPI / QR / GPay / PhonePe / Card aur Pakistan ke liye EasyPaisa / JazzCash / Direct WhatsApp onboarding available hai. Payment confirm hone ke 5 minute ke andar aapko full mentorship aur VIP community access mil jata hai.',
  },
];
