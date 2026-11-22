import { ProofItem } from '../utils/proofFilter';

export const USDT_WALLET_INFO = {
  network: 'Tron (TRC-20)',
  asset: 'USDT',
  address: 'TFeiajwFZRy4yMGmDX4HXoyo5qjKiHCMkJ',
  qrImageSrc: '/assets/aistudio/photo_2026-10-26_18-09-56_aa206d06.jpg',
  warning: 'Only send Tron (TRC-20) assets to this address. Other networks will be lost.',
};

export const MARQUEE_METRICS = [
  { label: 'Kick Clipping Payout', value: '$953.16 USDT' },
  { label: 'SBI Bank Settlement', value: '₹42,282.27' },
  { label: '30-Day Verified Views', value: '1,302,905 Views' },
  { label: 'Analytics Dashboard #1', value: '$658.30 Paid' },
  { label: 'Analytics Dashboard #2', value: '$641.55 Paid' },
  { label: 'Multi-Payout Pipeline', value: '$518.18 Total' },
  { label: 'Single Campaign Payout', value: '$256.50 Paid' },
  { label: 'Official Payout Email', value: '$76.34 Credited' },
  { label: 'Approval Rate', value: '95%+ Approved' },
];

export const PROOF_ITEMS: ProofItem[] = [
  {
    id: 'sbi-bank-transfer',
    category: 'payouts',
    title: 'Direct SBI Bank Transfer (GTA 6 Clipping Payout)',
    platform: 'State Bank of India · Bank Wire',
    timeframe: '20–21 Nov · 2-Day Settlement',
    headlineMetric: {
      INR: '₹42,282.27',
      PKR: 'Rs. 1,41,500',
      USD: '$467.21',
    },
    secondaryMetric: '+$467.21 Invoice Received',
    caption:
      '20 Nov ko $467.21 GTA 6 clipping payout aaya aur 21 Nov ko seedha mere State Bank of India account me ₹42,282.27 credit hua.',
    imageSrc: '/assets/aistudio/IMG_20261121_151537_241_43254979.png',
    imageAlt:
      'Verified payout screenshot showing +$467.21 payment received from Deval Limited on 20 Nov and ₹42,282.27 INR transferred to State Bank of India on 21 Nov',
    verifiedSource: 'Real Bank Settlement',
    breakdown: [
      { label: 'Invoice Payment Received (20 Nov)', value: '+$467.21 USD' },
      { label: 'Transferred to SBI Bank (21 Nov)', value: '₹42,282.27 INR' },
      { label: 'Work Duration', value: '2–3 Days GTA 6 Sprint' },
      { label: 'Niche', value: 'GTA 6 Trailers, Leaks & Clips' },
    ],
    chartPoints: [30, 48, 66, 84, 100],
  },
  {
    id: 'kick-clipping-953-usdt',
    category: 'payouts',
    title: 'Kick Clipping Payout — $953.16 USDT Received',
    platform: 'Kick Clipping · Direct USDT (TRC-20) Wallet',
    timeframe: 'Verified Trust Wallet Balance',
    headlineMetric: {
      INR: '₹80,500+',
      PKR: 'Rs. 2,67,000+',
      USD: '$953.16',
    },
    secondaryMetric: '953.34 USDT · Kick Clipping Payment',
    caption:
      'Yeh $953.16 (953.34 USDT) direct Kick clipping ki payment hai jo seedha mere personal wallet me receive hui. Complete Kick + GTA 6 clipping setup mentorship me milega.',
    imageSrc:
      '/assets/aistudio/Screenshot_20261115-103750_Trust_Wallet_f09c8093.png',
    imageAlt:
      'Trust Wallet screenshot showing $953.16 (953.34 Tether USDT on Tron) received from Kick clipping payment',
    verifiedSource: 'Kick Clipping USDT Payout',
    breakdown: [
      { label: 'Payout Source', value: 'Kick Clipping Payment' },
      { label: 'Amount Credited', value: '$953.16 (953.34 USDT)' },
      { label: 'INR Equivalent', value: '₹80,500+ Direct Crypto' },
      { label: 'Settlement Network', value: 'Tether USDT (Tron TRC-20)' },
    ],
    chartPoints: [38, 56, 74, 90, 100],
  },
  {
    id: 'analytics-1-3m-views',
    category: 'analytics',
    title: '1.3M+ Views & $658.30 Verified Campaign Analytics',
    platform: 'YouTube · TikTok · Reels · X',
    timeframe: 'Last 30 Days · 85/90 Approved',
    headlineMetric: {
      INR: '₹55,600+',
      PKR: 'Rs. 1,84,300+',
      USD: '$658.30',
    },
    secondaryMetric: '1,302,905 Total Views',
    caption:
      'Sirf 2 active clipping campaigns me 1.3 Million+ views aur 85 approved submissions ke sath $658.30 direct payout unlock hua.',
    imageSrc:
      '/assets/aistudio/RDT_20261122_00081540817089714076432__1___1__608f1adc.jpg',
    imageAlt:
      'Clean analytics dashboard showing 1,302,905 views, $658.3 payouts, 85 approved out of 90 submissions, and 2 active campaigns',
    verifiedSource: 'Live Analytics Dashboard',
    breakdown: [
      { label: 'Total Verified Views (30 Days)', value: '1,302,905 Views' },
      { label: 'Total Campaign Payouts', value: '$658.30 USD' },
      { label: 'Submissions Approved', value: '85 / 90 (94.4%)' },
      { label: 'Active Campaigns', value: '2 Parallel Campaigns' },
    ],
    chartPoints: [22, 46, 62, 85, 100],
  },
  {
    id: 'payout-pipeline-518',
    category: 'payouts',
    title: '$518+ Verified Multi-Payout Clipping Pipeline',
    platform: 'Private Clipping Platform · 20 Live Payouts',
    timeframe: '14 Received · 2 Arriving · 4 Queued',
    headlineMetric: {
      INR: '₹43,750+',
      PKR: 'Rs. 1,45,000+',
      USD: '$518.18',
    },
    secondaryMetric: '$348.66 Received + $169.52 Active',
    caption:
      '14 payouts already bank me received ($348.66), 2 payouts arriving ($79.00) aur 4 active clips still accumulating ($90.52). Exact platform name mentorship me reveal hoga.',
    imageSrc: '/assets/aistudio/IMG_20261122_000005_670_18efd613.jpg',
    imageAlt:
      'Mobile payout dashboard screenshot showing Received (14): $348.66, Arriving (2): $79.00, and Queued (4): $90.52 still accumulating',
    verifiedSource: 'Live Mobile App Payouts',
    breakdown: [
      { label: 'Received (14 Payouts)', value: '$348.66 USD' },
      { label: 'Arriving Next (2 Payouts)', value: '$79.00 USD' },
      { label: 'Queued & Accumulating (4)', value: '$90.52 USD' },
      { label: 'Combined Pipeline Total', value: '$518.18 USD' },
    ],
    chartPoints: [34, 52, 68, 86, 100],
  },
  {
    id: 'clipping-campaign-256',
    category: 'analytics',
    title: '$256.50 Single Campaign Paid Out ($900/1M Pool)',
    platform: 'Clipping Campaigns · 855 Total Submissions',
    timeframe: '113 Approved Submissions',
    headlineMetric: {
      INR: '₹21,650+',
      PKR: 'Rs. 71,800+',
      USD: '$256.50',
    },
    secondaryMetric: 'Paid Out · $900 / 1M Views Pool',
    caption:
      'Active clipping campaign dashboard jahan $900 per 1M views pool live hai aur single campaign se $256.50 cleanly paid out hua.',
    imageSrc: '/assets/aistudio/3ebd59ad10e34d11f50aa6b4c7dd4e2a_f6f80291.jpg',
    imageAlt:
      'Mobile clipping campaign dashboard showing Paid Out $256.50 across 113 submissions and an active $900 per 1M views campaign pool',
    verifiedSource: 'Campaign Payout Dashboard',
    breakdown: [
      { label: 'Campaign Status', value: 'Paid Out ($256.50 USD)' },
      { label: 'Campaign Submissions', value: '113 Clips Submitted' },
      { label: 'Active Pool Rate', value: '$900 per 1M Views' },
      { label: 'Account Track Record', value: '855 Total Submissions' },
    ],
    chartPoints: [26, 44, 65, 81, 96],
  },
  {
    id: 'analytics-304k-views',
    category: 'analytics',
    title: '304K Views & $641.55 High-RPM Clipping Dashboard',
    platform: 'Multi-Platform Analytics · 38/39 Approved',
    timeframe: '30-Day High-RPM Window',
    headlineMetric: {
      INR: '₹54,200+',
      PKR: 'Rs. 1,79,600+',
      USD: '$641.55',
    },
    secondaryMetric: '304,357 Views · 97.4% Approval',
    caption:
      'High-RPM campaign strategy se sirf 304,357 views par $641.55 payout generate hua — 39 me se 38 clips approve hui.',
    imageSrc:
      '/assets/aistudio/RDT_20261122_0007532720198075501011420__2___1__dc6728cc.jpg',
    imageAlt:
      'Clean horizontal analytics bar showing 304,357 views, $641.55 payouts, 38 approved of 39 submissions, and 1 active campaign',
    verifiedSource: 'High-RPM Analytics Proof',
    breakdown: [
      { label: 'Total Views', value: '304,357 Views' },
      { label: 'Verified Payouts', value: '$641.55 USD' },
      { label: 'Approval Rate', value: '38 / 39 Approved (97.4%)' },
      { label: 'Effective Yield', value: '~$2.10 per 1K Views' },
    ],
    chartPoints: [18, 42, 36, 94, 82],
  },
  {
    id: 'payout-email-receipt-76',
    category: 'payouts',
    title: 'Official Direct Payout Email Confirmation',
    platform: 'Verified Clipping Platform · Email Receipt',
    timeframe: '7:51 AM · Direct Auto-Payout',
    headlineMetric: {
      INR: '₹6,450+',
      PKR: 'Rs. 21,380+',
      USD: '$76.34',
    },
    secondaryMetric: '"You just got paid!" Verified Email',
    caption:
      'Subah uthte hi inbox me aise official auto-payout emails aate hain — $76.34 directly credited. Saare private platforms mentorship me bataye jayenge.',
    imageSrc: '/assets/aistudio/2e80767a13b71dd033266934e496a622_c74314e6.jpg',
    imageAlt:
      'Official inbox payout receipt reading You just got paid! $76.34 credited directly from clipping campaign',
    verifiedSource: 'Official Email Receipt',
    breakdown: [
      { label: 'Platform Access', value: 'Revealed Inside Mentorship' },
      { label: 'Single Email Payout', value: '$76.34 USD' },
      { label: 'Payout Mode', value: 'Direct Card / Bank Credit' },
      { label: 'Timestamp', value: '7:51 AM Verified Inbox' },
    ],
    chartPoints: [30, 50, 64, 78, 90],
  },
  {
    id: 'clipping-dashboard-acct-1',
    category: 'payouts',
    title: 'Verified Clipping Payout Dashboard #1',
    platform: 'Private Platform · GTA 6 Campaigns',
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
      'Mobile clipping earnings screenshot showing $61.43 lifetime earned, $16.43 today, $9.53 arriving, and $22.28 queued',
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
    id: 'clipping-dashboard-acct-2',
    category: 'payouts',
    title: 'Verified Clipping Payout Dashboard #2',
    platform: 'Private Platform · Secondary GTA 6 Page',
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
      'Secondary clipping dashboard screenshot showing $45.26 lifetime earned, $27.98 this week, 8 payouts received, and 7 queued',
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
    title: 'GTA 6 Trailers, Leaks & High-RPM Campaigns Pick Karo',
    description:
      'Abhi GTA 6 duniya ka sabse bada gaming wave hai — har trailer detail, leak aur streamer reaction par millions of views aate hain. Exact viral topics aur private paid clipping platforms sirf mentorship ke andar reveal kiye jate hain.',
  },
  {
    number: '02',
    title: '2-Second Viral Hook Edit Lagao (Phone Ya PC)',
    description:
      'CapCut Mobile ya Premiere Pro me hamare GTA 6 caption presets, fast zoom cuts aur copyright-safe SFX lagao — taaki viewer end tak watch kare aur 95%+ clips approve hon.',
  },
  {
    number: '03',
    title: 'Upload Karo & Direct Bank / USDT Me Dollars Earn Karo',
    description:
      'YouTube Shorts, Instagram Reels & TikTok par post karo aur verified clipping platform payouts seedha apne Indian/Pakistani bank ya USDT wallet me withdraw karo.',
  },
];

export interface MentorshipModule {
  id: string;
  number: string;
  title: string;
  outcome: string;
  detail: string;
  deliverables: string[];
}

export const MENTORSHIP_PILLARS: MentorshipModule[] = [
  {
    id: 'mod-campaigns',
    number: '01',
    title: 'Secret High-Paying Platforms & GTA 6 Campaigns',
    outcome: 'Day 1 se verified private clipping platforms & campaigns join karo',
    detail:
      'Kaunse private clipping platforms aur GTA 6 campaign pools ($900/1M+) sabse fast approve aur pay karte hain — sab kuch mentorship ke andar live reveal hota hai.',
    deliverables: [
      'All secret high-paying clipping platforms revealed step-by-step',
      'Daily trending GTA 6 trailer/leak angle alerts',
      '95%+ submission approval checklist & RPM breakdown',
    ],
  },
  {
    id: 'mod-editing',
    number: '02',
    title: '2-Second Hook Editing (Phone + PC)',
    outcome: '15–20 minute me viral-ready GTA 6 clip export karo',
    detail:
      'CapCut Mobile & Premiere Pro step-by-step retention editing + 500+ ready-made GTA 6 SFX, captions aur presets included.',
    deliverables: [
      '2-second scroll-stopper hook formula & pacing map',
      '500+ GTA 6 SFX, BGM & dynamic caption presets',
      'Phone (CapCut) aur PC (Premiere) dono workflows',
    ],
  },
  {
    id: 'mod-algorithm',
    number: '03',
    title: '0-Strike Copyright & Algorithm Growth Shield',
    outcome: 'Naye page par bhi pehle week se real views lao',
    detail:
      'Clean fair-use layering, visual transformations aur smart upload timing jisse channel safe rahe aur clips consistently 100K–1M+ views hit karein.',
    deliverables: [
      '0-strike copyright-safe audio/visual layering rules',
      'YouTube Shorts, Reels & TikTok posting blueprint',
      'Retention drop diagnosis & hook optimization guide',
    ],
  },
  {
    id: 'mod-payouts',
    number: '04',
    title: 'Bank / USDT Payout Setup + 1-on-1 Mentor Support',
    outcome: 'Seedha Indian / Pakistani bank ya USDT me withdraw karo',
    detail:
      'India (SBI, HDFC, UPI), Pakistan (EasyPaisa, JazzCash, Wise/Payoneer) aur USDT TRC-20 payout setup + weekly live calls aur direct clip reviews.',
    deliverables: [
      'Step-by-step India, Pakistan & USDT settlement setup',
      'Weekly live Q&A calls + direct clip teardown reviews',
      'Private VIP Telegram group with active GTA 6 clippers',
    ],
  },
];

export const SOLO_VS_MENTORSHIP = {
  solo: [
    'Random GTA 6 clips daalna jahan 200 views par video freeze ho jati hai',
    'Free YouTube tutorials dekh kar purani outdated strategies try karna',
    'Copyright strike ya campaign submission reject hone ka constant risk',
    'Pata hi nahi hota kaunse private clipping platforms aur pools real payout dete hain',
  ],
  mentorship: [
    'Proven 2-second viral hook system jisne 1.3M+ views aur ₹42,282+ bank payout diye',
    'Saare secret high-paying clipping platforms + ready-made CapCut/Premiere presets',
    '0-strike copyright shield + 95%+ campaign approval framework',
    'Direct 1-on-1 clip reviews + India/Pakistan/USDT payout setup support',
  ],
};

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
      'GTA 6 launch aur har naye trailer/update ke aas-paas billions of views generate ho rahe hain. Jo creators abhi apna GTA 6 clip page aur campaign system ready kar lete hain, wo is massive hype wave ka sabse bada fayda uthate hain.',
  },
  {
    id: 'faq-device',
    question: 'Kya phone se GTA 6 clipping kar sakte hain ya heavy PC chahiye?',
    answer:
      '100% phone (CapCut Mobile) ya normal laptop se ho jata hai. Heavy gaming PC ki bilkul zaroorat nahi hai — kyunki aap existing trailers, updates aur top streams ke clips smart tareeke se edit karte hain.',
  },
  {
    id: 'faq-real',
    question: 'Kya upar dikhaye gaye 9 bank, Kick clipping & analytics screenshots real hain?',
    answer:
      'Haan, ye 100% real payouts aur analytics dashboards hain — SBI bank transfer (₹42,282.27), Kick clipping USDT payment ($953.16), 1.3M+ views ($658.30), 304K views ($641.55), multi-payout pipelines ($518+) aur direct email receipt ($76.34). Baaki saare private clipping platforms mentorship ke andar step-by-step reveal kiye jate hain.',
  },
  {
    id: 'faq-payments',
    question: 'India, Pakistan ya Crypto (USDT) se kaise join karein aur access kab milega?',
    answer:
      'India ke liye UPI / QR / GPay / PhonePe, Crypto ke liye direct USDT (Tron TRC-20) QR wallet, aur Pakistan ke liye EasyPaisa / JazzCash / Direct Telegram onboarding available hai. Payment confirm hone ke 5 minute ke andar aapko full mentorship aur VIP Telegram group access mil jata hai.',
  },
];
