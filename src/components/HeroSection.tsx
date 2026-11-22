import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clapperboard,
  Gamepad2,
  Gift,
  Instagram,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { DUAL_BENEFIT_FEATURE, MARQUEE_METRICS, PROOF_ITEMS } from '../data/content';
import { CURRENCY_META, CurrencyCode, PlanId } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface HeroSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onEnrollClick: (plan?: PlanId) => void;
  onSelectProof: (item: ProofItem) => void;
}

const CURRENCIES: CurrencyCode[] = ['INR', 'PKR', 'USD'];

const HERO_TOTAL_SHOWN: Record<CurrencyCode, string> = {
  INR: '₹3,10,000+',
  PKR: 'Rs. 10,30,000+',
  USD: '$3,650+',
};

const HERO_SBI_LABEL: Record<CurrencyCode, string> = {
  INR: '₹42,282.27',
  PKR: 'Rs. 1,41,500',
  USD: '$467.21',
};

const PILLARS_LIST = [
  { icon: Gamepad2, label: 'GTA 6 Se Earning', color: 'from-blue-500 to-indigo-600' },
  { icon: Instagram, label: 'Instagram Growth & Earning', color: 'from-pink-500 to-rose-600' },
  { icon: TrendingUp, label: 'Affiliate Marketing', color: 'from-amber-500 to-orange-600' },
  { icon: Bot, label: 'AI Tools & Automation', color: 'from-emerald-500 to-teal-600' },
  { icon: Zap, label: '100% Practical Training', color: 'from-violet-500 to-purple-600' },
];

export function HeroSection({
  currency,
  onCurrencyChange,
  onEnrollClick,
  onSelectProof,
}: HeroSectionProps) {
  const sbiProof = PROOF_ITEMS[0];
  const viralViewsProof = PROOF_ITEMS[2];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Cosmic Atmospheric Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cosmic-grid-bg absolute inset-0 opacity-85" />
        <div
          className="absolute left-1/2 top-[-100px] h-[580px] w-[980px] -translate-x-1/2 rounded-full opacity-90 blur-[110px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.58) 0%, rgba(124, 58, 237, 0.28) 44%, rgba(7, 5, 15, 0) 76%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-1.5 text-xs font-bold text-violet-200 shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)] backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>India&apos;s Most Advanced Online Earning Mentorship</span>
          </motion.div>

          {/* Main Headline from User Design */}
          <h1 className="mt-6 font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] text-white sm:text-[54px] lg:text-[62px]">
            Master Online Earning{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Mentorship Course
            </span>
            <span className="mt-2 block text-2xl font-bold tracking-tight text-zinc-200 sm:text-3xl lg:text-4xl">
              From Zero to Pro – Learn, Apply &amp; Earn!
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            GTA 6, Instagram Reels, Affiliate Marketing, AI Tools aur Automation ke saath online earning ka complete roadmap!{' '}
            <strong className="text-white">Ek teer se do nishana:</strong> Method hum sikhayenge aur{' '}
            <span className="font-semibold text-emerald-400">har mahine earning ke liye kaam bhi hum khud denge!</span>
          </p>

          {/* 5 Highlight Pills from Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {PILLARS_LIST.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-zinc-200 shadow-sm backdrop-blur-sm hover:border-violet-400/40"
                >
                  <Icon className="h-3.5 w-3.5 text-violet-400" />
                  <span>{pillar.label}</span>
                </div>
              );
            })}
          </div>

          {/* Dual Offer Pill Banner */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-3 text-xs text-amber-200">
            <span className="inline-flex items-center gap-1 font-bold text-amber-300">
              <Gift className="h-4 w-4" />
              Special Monthly Validity Offer:
            </span>
            <span>
              ₹499 Plan me <strong className="text-white">1+1 Month (2 Months)</strong>
            </span>
            <span>·</span>
            <span>
              ₹999 Plan me <strong className="text-white">1+2 Months (3 Months) + All Future Softwares FREE</strong>
            </span>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => onEnrollClick('vip_3m')}
              className="btn-sheen violet-cta-glow inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-bold text-white sm:w-auto shadow-[0_12px_32px_-8px_rgba(124,58,237,0.7)]"
            >
              <span>Enroll Pro VIP (1+2 Months @ ₹999)</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onEnrollClick('starter_2m')}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md hover:bg-white/10 sm:w-auto"
            >
              <span>Starter Pass (1+1 Month @ ₹499)</span>
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Free Instagram Automation Software Included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
              Direct PhonePe QR &amp; Telegram Onboarding (@Eliteclippers1)
            </span>
          </div>
        </div>

        {/* Dashboard Visual Deck with Banner & Proof Highlights */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="glass-card overflow-hidden rounded-3xl p-4 sm:p-6 shadow-2xl">
            {/* Currency Switcher & Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="font-display text-sm font-bold text-white">
                  Course Dashboard &amp; Software Suite
                </span>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-violet-300">
                  Batch 1 Active
                </span>
              </div>

              <div
                role="group"
                aria-label="Select display currency"
                className="inline-flex items-center rounded-full border border-white/10 bg-[#07050F]/80 p-1"
              >
                {CURRENCIES.map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onCurrencyChange(code)}
                      aria-pressed={active}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        active
                          ? 'bg-violet-600 text-white shadow-[0_0_14px_rgba(139,92,246,0.7)]'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {CURRENCY_META[code].label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Banner Showcase & Key Feature Cards */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0816] lg:col-span-8">
                <img
                  src="/assets/banners/ai_income_pro_hero.jpg"
                  alt="AI Income Pro Mentorship Course and Instagram Automation Software Overview"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right Side Quick Summary Card */}
              <div className="flex flex-col justify-between rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-900/20 to-[#0A0714] p-5 lg:col-span-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    <Gift className="h-3.5 w-3.5" />
                    <span>Free Software Ready</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    Instagram Automation Software
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
                    Auto-DM, auto-engagement aur reel audience outreach software ready kar diya gaya hai. Course join karte hi instant download milega.
                  </p>
                </div>

                <div className="my-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs space-y-2">
                  <p className="font-semibold text-white">🎯 Ek Teer Se Do Nishane:</p>
                  <p className="text-zinc-300">
                    1. Account grow &amp; reel viral karne ka secret method.
                  </p>
                  <p className="text-zinc-300">
                    2. <strong className="text-emerald-400">Har mahine kaam hum denge</strong> taaki earning guaranteed ho.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onEnrollClick('vip_3m')}
                  className="btn-sheen violet-cta-glow inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold text-white"
                >
                  <span>Claim Software &amp; Access</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Verified Payout Cards */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => onSelectProof(sbiProof)}
                className="rounded-2xl border border-white/[0.08] bg-[#0B0816]/90 p-4 text-left transition-all hover:border-violet-400/40"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>SBI Bank Settlement</span>
                  <Landmark className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-emerald-400 tabular-nums">
                  {HERO_SBI_LABEL[currency]}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>+$467.21 wire settlement</span>
                  <span className="text-violet-300 font-semibold">View Proof &rarr;</span>
                </p>
              </button>

              <button
                type="button"
                onClick={() => onSelectProof(viralViewsProof)}
                className="rounded-2xl border border-white/[0.08] bg-[#0B0816]/90 p-4 text-left transition-all hover:border-violet-400/40"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Kick USDT + 1.3M Views</span>
                  <Clapperboard className="h-4 w-4 text-violet-400" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-white tabular-nums">
                  $953.16 USDT
                </p>
                <p className="mt-1 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Trust Wallet &amp; 1.3M Views</span>
                  <span className="text-violet-300 font-semibold">View Proof &rarr;</span>
                </p>
              </button>

              <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-b from-violet-500/12 to-[#0B0816]/90 p-4">
                <div className="flex items-center justify-between text-xs text-violet-200">
                  <span>Total Verified Proofs</span>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-white tabular-nums">
                  {HERO_TOTAL_SHOWN[currency]}
                </p>
                <p className="mt-1 text-[11px] text-violet-200/75">
                  9 Bank, USDT &amp; Campaign Proofs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-12 border-y border-white/[0.07] bg-white/[0.02] py-3.5">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07050F] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07050F] to-transparent sm:w-28" />
          <div className="animate-marquee flex items-center gap-8 pr-8">
            {[...MARQUEE_METRICS, ...MARQUEE_METRICS].map((metric, idx) => (
              <div
                key={`${metric.label}-${idx}`}
                className="flex shrink-0 items-center gap-2.5 text-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span className="font-medium text-zinc-400">{metric.label}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 font-mono font-semibold text-white tabular-nums">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
