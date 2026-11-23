import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Check,
  Crown,
  Headphones,
  Sparkles,
  Star,
  TrendingUp,
} from 'lucide-react';
import { MARQUEE_METRICS } from '../data/content';
import {
  CURRENCY_META,
  CurrencyCode,
  PRICING_PLANS,
  PlanId,
  getPlanPriceInfo,
} from '../utils/pricing';

interface PricingSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onSelectPlan: (planId: PlanId) => void;
}

const CURRENCIES: CurrencyCode[] = ['INR', 'PKR', 'USD'];

export function PricingSection({
  currency,
  onCurrencyChange,
  onSelectPlan,
}: PricingSectionProps) {
  const starterPlan = PRICING_PLANS.starter;
  const proPlan = PRICING_PLANS.pro;
  const starterPrice = getPlanPriceInfo('starter', currency);
  const proPrice = getPlanPriceInfo('pro', currency);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden scroll-mt-20 pt-6 pb-12 sm:pt-9 sm:pb-16"
    >
      {/* Subtle Cosmic Indigo Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cosmic-grid-bg absolute inset-0 opacity-75" />
        <div
          className="absolute left-1/2 top-[-160px] h-[520px] w-[1080px] -translate-x-1/2 rounded-full opacity-80 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.48) 0%, rgba(76, 29, 149, 0.22) 48%, rgba(7, 5, 15, 0) 76%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* TOP HEADLINE + PREMIUM HIGHLIGHT BAR — Compact so Both Plans Appear Side-by-Side Immediately Below */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-semibold text-violet-300">
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span>4.9/5 Rated</span>
            </span>
            <span aria-hidden="true" className="text-white/25">
              ·
            </span>
            <span>GTA 6 Clipping Mentorship (Phone + PC)</span>
          </div>

          <h1 className="mt-2.5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            GTA 6 Clipping Se{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Daily Dollars Kamao
            </span>
          </h1>

          {/* Premium Verified Earnings & Mentorship Highlight Bar */}
          <div className="relative mx-auto mt-4 max-w-3xl overflow-hidden rounded-2xl border border-amber-300/25 bg-gradient-to-b from-[#17112c]/95 via-[#100b21]/95 to-[#0a0717]/95 shadow-[0_20px_50px_-22px_rgba(124,58,237,0.48),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div
              aria-hidden="true"
              className="h-px w-full bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
            />

            <div className="grid grid-cols-3 divide-x divide-white/[0.08] px-2 py-3 sm:px-6 sm:py-3.5">
              <div className="px-1 text-center sm:px-3">
                <p className="font-mono text-[15px] font-extrabold tracking-tight text-white tabular-nums sm:text-2xl">
                  ₹42,282+
                </p>
                <p className="mt-0.5 text-[10px] font-medium tracking-wide text-zinc-400 sm:text-xs">
                  SBI Bank Transfer
                </p>
              </div>
              <div className="px-1 text-center sm:px-3">
                <p className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text font-mono text-[15px] font-extrabold tracking-tight text-transparent tabular-nums sm:text-2xl">
                  $953.16
                </p>
                <p className="mt-0.5 text-[10px] font-medium tracking-wide text-zinc-400 sm:text-xs">
                  Kick USDT Payout
                </p>
              </div>
              <div className="px-1 text-center sm:px-3">
                <p className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text font-mono text-[15px] font-extrabold tracking-tight text-transparent tabular-nums sm:text-2xl">
                  1.3M+
                </p>
                <p className="mt-0.5 text-[10px] font-medium tracking-wide text-zinc-400 sm:text-xs">
                  Verified Views
                </p>
              </div>
            </div>

            <div className="border-t border-white/[0.08] bg-white/[0.025] px-3 py-2.5 sm:px-6">
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-medium tracking-[0.01em] text-zinc-300 sm:text-[13px]">
                <span className="font-semibold text-white">Account Setup</span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="font-semibold text-white">Viral Views Roadmap</span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text font-extrabold text-transparent">
                  FREE Insta Software
                </span>
                <span aria-hidden="true" className="text-violet-400/60">
                  ·
                </span>
                <span className="font-semibold text-emerald-300">
                  Direct Monthly Paid Campaigns
                </span>
              </p>
            </div>
          </div>

          {/* Compact Currency Switcher + Jump to Results & Reviews */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md"
            >
              {CURRENCIES.map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    aria-pressed={active}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all sm:px-3.5 ${
                      active
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {CURRENCY_META[code].label}
                  </button>
                );
              })}
            </div>

            <a
              href="#proof-vault"
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/35 bg-violet-500/15 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:border-violet-300/60 hover:bg-violet-500/25"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              <span>See My &amp; My Students&apos; Results</span>
              <ArrowDown className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* DIRECT MENTORSHIP PLANS — Always Side-by-Side (2 Equal Columns) for Instant Comparison */}
        <div
          data-testid="plans-comparison-grid"
          className="mx-auto mt-6 grid max-w-5xl grid-cols-2 items-stretch gap-2.5 sm:mt-7 sm:gap-6"
        >
          {/* PLAN 1: ₹499 Starter Monthly Program (1+1 Month = 2 Months Total) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-card flex h-full min-w-0 flex-col justify-between rounded-2xl p-3 sm:rounded-3xl sm:p-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-[10px] font-semibold tracking-wide text-emerald-300 sm:text-xs">
                  <span className="sm:hidden">1+1 Mo FREE</span>
                  <span className="hidden sm:inline">
                    {starterPlan.bonusDurationBadge} · 2 Months Total
                  </span>
                </span>
                <span className="hidden font-mono text-xs font-semibold text-zinc-400 sm:inline">
                  Monthly Program
                </span>
              </div>

              <h2 className="mt-1.5 min-h-[2.6rem] font-display text-[15px] font-extrabold leading-tight text-white sm:mt-2 sm:min-h-0 sm:text-2xl">
                {starterPlan.name}
              </h2>
              <p className="mt-1 min-h-[2.4rem] text-[11px] leading-snug text-zinc-400 sm:min-h-[2.5rem] sm:text-sm">
                {starterPlan.subtitle}
              </p>

              <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-white/[0.08] pb-3.5 sm:mt-5 sm:gap-2.5 sm:pb-5">
                <span className="font-mono text-2xl font-extrabold text-white tabular-nums sm:text-5xl">
                  {starterPrice.currentFormatted}
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 sm:text-xs">
                  {starterPlan.billingCycleLabel}
                </span>
                {starterPrice.regularFormatted && (
                  <span className="font-mono text-xs text-zinc-500 line-through tabular-nums sm:text-sm">
                    {starterPrice.regularFormatted}
                  </span>
                )}
              </div>

              <ul className="mt-3.5 space-y-2 sm:mt-5 sm:space-y-3">
                {starterPlan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-1.5 text-[11px] leading-[1.38] text-zinc-200 sm:gap-2.5 sm:text-sm sm:leading-normal"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 flex items-start gap-1.5 rounded-xl border border-violet-400/20 bg-violet-500/[0.08] p-2.5 text-[10.5px] leading-relaxed text-violet-100/90 sm:mt-5 sm:gap-2 sm:rounded-2xl sm:p-3.5 sm:text-xs">
                <Sparkles
                  className="mt-0.5 hidden h-3.5 w-3.5 shrink-0 text-violet-300 sm:block"
                  aria-hidden="true"
                />
                <span>{starterPlan.shortNote}</span>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => onSelectPlan('starter')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.07] px-2.5 py-2.5 text-[11px] font-semibold text-white transition-colors hover:border-violet-400/50 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:mt-6 sm:min-h-[50px] sm:gap-2 sm:px-6 sm:py-3.5 sm:text-sm"
            >
              <span className="sm:hidden">
                Join Starter ({starterPrice.currentFormatted})
              </span>
              <span className="hidden sm:inline">
                {starterPlan.ctaLabel} ({starterPrice.currentFormatted})
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* PLAN 2: ₹999 Pro All-Software Program (1+2 Months = 3 Months Total) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="vip-cosmic-card relative flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl p-3 sm:rounded-3xl sm:p-7"
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold tracking-wide text-amber-300 sm:text-xs">
                  <span className="sm:hidden">Most Popular · 1+2 Mo</span>
                  <span className="hidden sm:inline">
                    Most Popular · {proPlan.bonusDurationBadge} (3 Months Total)
                  </span>
                </span>
                <Crown className="h-3.5 w-3.5 shrink-0 text-amber-300 sm:h-5 sm:w-5" aria-hidden="true" />
              </div>

              <h2 className="mt-1.5 min-h-[2.6rem] font-display text-[15px] font-extrabold leading-tight text-white sm:mt-2 sm:min-h-0 sm:text-2xl">
                {proPlan.name}
              </h2>
              <p className="mt-1 min-h-[2.4rem] text-[11px] leading-snug text-violet-100/85 sm:min-h-[2.5rem] sm:text-sm">
                {proPlan.subtitle}
              </p>

              <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-white/[0.12] pb-3.5 sm:mt-5 sm:gap-2.5 sm:pb-5">
                <span className="font-mono text-2xl font-extrabold text-amber-400 tabular-nums sm:text-5xl">
                  {proPrice.currentFormatted}
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 sm:text-xs">
                  {proPlan.billingCycleLabel}
                </span>
                {proPrice.regularFormatted && (
                  <span className="font-mono text-xs font-medium text-zinc-400 line-through tabular-nums sm:text-base">
                    {proPrice.regularFormatted}
                  </span>
                )}
                {proPrice.savingsPercent && (
                  <span className="font-mono text-[10px] font-bold text-emerald-300 sm:text-xs">
                    · Save {proPrice.savingsPercent}%
                  </span>
                )}
              </div>

              <ul className="mt-3.5 space-y-2 sm:mt-5 sm:space-y-3">
                {proPlan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-1.5 text-[11px] leading-[1.38] text-white sm:gap-2.5 sm:text-sm sm:leading-normal"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 rounded-xl border border-amber-400/35 bg-amber-500/10 p-2.5 text-[10.5px] leading-relaxed text-amber-100 sm:mt-5 sm:rounded-2xl sm:p-3.5 sm:text-xs">
                {proPlan.shortNote}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => onSelectPlan('pro')}
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="btn-sheen gold-cta-glow mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl px-2.5 py-2.5 text-[11px] font-extrabold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:mt-6 sm:min-h-[52px] sm:gap-2 sm:px-6 sm:py-3.5 sm:text-[15px]"
            >
              <span className="sm:hidden">
                Join Pro ({proPrice.currentFormatted})
              </span>
              <span className="hidden sm:inline">
                {proPlan.ctaLabel} ({proPrice.currentFormatted})
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>

        {/* Direct Mentor & Paid Work Group Onboarding Strip */}
        <div className="mx-auto mt-7 max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
          <div className="flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
              <Headphones className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold text-white sm:text-base">
                Instant Software Delivery + Monthly Paid Work Group Onboarding
              </h3>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                Payment ke 5 minute ke andar aapko Telegram VIP work group,
                ready-made Instagram Automation Software, earning roadmap aur
                live clipping tasks mil jate hain.
              </p>
            </div>
          </div>
          <span className="mt-3 shrink-0 font-mono text-xs font-semibold text-emerald-300 sm:mt-0">
            UPI · USDT TRC-20 · EasyPaisa
          </span>
        </div>
      </div>

      {/* Verified Proof Metrics Infinite Marquee */}
      <div className="mt-10 border-y border-white/[0.07] bg-white/[0.02] py-3">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#07050F] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#07050F] to-transparent sm:w-28" />
          <div className="animate-marquee flex items-center gap-8 pr-8">
            {[...MARQUEE_METRICS, ...MARQUEE_METRICS].map((metric, idx) => (
              <div
                key={`${metric.label}-${idx}`}
                className="flex shrink-0 items-center gap-2 text-xs"
              >
                <span className="font-medium text-zinc-400">{metric.label}</span>
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
                <span className="font-mono font-semibold text-white tabular-nums">
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
