import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Crown,
  Gift,
  Headphones,
  Sparkles,
} from 'lucide-react';
import { MENTORSHIP_PILLARS } from '../data/content';
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
  const [activeModuleId, setActiveModuleId] = useState(
    MENTORSHIP_PILLARS[0].id
  );

  const activeModule =
    MENTORSHIP_PILLARS.find((m) => m.id === activeModuleId) ??
    MENTORSHIP_PILLARS[0];

  const starterPlan = PRICING_PLANS.starter_2m;
  const vipPlan = PRICING_PLANS.vip_3m;
  const starterPrice = getPlanPriceInfo('starter_2m', currency);
  const vipPrice = getPlanPriceInfo('vip_3m', currency);

  return (
    <section className="relative border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* PART A: INTERACTIVE CURRICULUM EXPLORER */}
        <div id="curriculum" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
              <span>Inside Mentorship</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Practical Step-by-Step Earning Curriculum
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Zero fluff — direct workflows, high-paying campaigns aur automated software tools.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Left Interactive Module Selector */}
            <div
              role="tablist"
              aria-label="Mentorship curriculum modules"
              className="flex flex-col gap-2.5 lg:col-span-5"
            >
              {MENTORSHIP_PILLARS.map((mod) => {
                const isSelected = mod.id === activeModule.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`relative rounded-2xl border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-violet-400/50 bg-violet-500/15 text-white'
                        : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/15 hover:bg-white/[0.05]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="curriculum-active-indicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-violet-400 shadow-[0_0_12px_#a78bfa]"
                      />
                    )}
                    <div className="flex items-start gap-3 pl-2">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? 'text-violet-300' : 'text-zinc-500'
                        }`}
                      >
                        {mod.number}
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-white">
                          {mod.title}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-400 line-clamp-1">
                          {mod.outcome}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Module Deep-Dive View */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-300">
                      Module {activeModule.number}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-extrabold text-white sm:text-2xl">
                      {activeModule.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                      {activeModule.detail}
                    </p>

                    <div className="mt-6 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Included Inside This Module
                      </p>
                      {activeModule.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-zinc-100"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-zinc-400">
                    <span>Outcome: {activeModule.outcome}</span>
                    <button
                      type="button"
                      onClick={() => onSelectPlan('vip_3m')}
                      className="inline-flex items-center gap-1 font-semibold text-violet-300 hover:text-white"
                    >
                      <span>Unlock All Modules &amp; Softwares</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* PART B: PRICING SECTION */}
        <div id="pricing" className="mt-20 scroll-mt-24 sm:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
              <span>Choose Your Program</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Special Monthly Validity Pass
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              ₹499 me 1+1 Month (2 Months) | ₹999 me 1+2 Months (3 Months) + All Future Softwares Free!
            </p>

            {/* Currency Switcher */}
            <div
              role="group"
              aria-label="Select pricing currency"
              className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
            >
              {CURRENCIES.map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onCurrencyChange(code)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? 'bg-violet-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.75)]'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {CURRENCY_META[code].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Pricing Grid */}
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Plan 1: Starter Pass (1 + 1 Month @ ₹499) */}
            <div className="glass-card flex flex-col justify-between rounded-3xl p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    {starterPlan.name}
                  </h3>
                  <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    1 + 1 Month Offer
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-400">
                  {starterPlan.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-2.5 border-b border-white/[0.08] pb-6">
                  <span className="font-mono text-4xl font-extrabold text-white tabular-nums sm:text-5xl">
                    {starterPrice.currentFormatted}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {starterPlan.billingCycleLabel}
                  </span>
                  {starterPrice.regularFormatted && (
                    <span className="font-mono text-base font-medium text-zinc-500 line-through tabular-nums">
                      {starterPrice.regularFormatted}
                    </span>
                  )}
                  {starterPrice.savingsPercent && (
                    <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                      Save {starterPrice.savingsPercent}%
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-3.5">
                  {starterPlan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-zinc-200"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-emerald-400">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-start gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.08] p-4 text-xs leading-relaxed text-emerald-100">
                  <Gift className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{starterPlan.shortNote}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan('starter_2m')}
                className="btn-sheen mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-violet-400/50 hover:bg-white/[0.11]"
              >
                <span>{starterPlan.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Plan 2: Pro VIP All-Access (1 + 2 Months @ ₹999) */}
            <div className="vip-cosmic-card relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-300">
                    <Crown className="h-3.5 w-3.5" />
                    <span>Best Value · 1 + 2 Months Offer</span>
                  </span>
                  <Sparkles className="h-5 w-5 text-amber-300" aria-hidden="true" />
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                  {vipPlan.name}
                </h3>
                <p className="mt-1.5 text-sm text-violet-100/80">
                  {vipPlan.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-2.5 border-b border-white/[0.12] pb-6">
                  <span className="font-mono text-4xl font-extrabold text-white tabular-nums sm:text-5xl">
                    {vipPrice.currentFormatted}
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-violet-200">
                    {vipPlan.billingCycleLabel}
                  </span>
                  {vipPrice.regularFormatted && (
                    <span className="font-mono text-base font-medium text-zinc-400 line-through tabular-nums">
                      {vipPrice.regularFormatted}
                    </span>
                  )}
                  {vipPrice.savingsPercent && (
                    <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                      Save {vipPrice.savingsPercent}%
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-3.5">
                  {vipPlan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/20 text-emerald-300">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl border border-amber-400/35 bg-amber-500/15 p-4 text-xs leading-relaxed text-amber-100">
                  <span className="font-bold text-amber-300">★ Future Software Guarantee: </span>
                  {vipPlan.shortNote}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan('vip_3m')}
                className="btn-sheen violet-cta-glow mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_28px_-8px_rgba(124,58,237,0.7)]"
              >
                <span>{vipPlan.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Direct Mentor Guidance & Work Guarantee Trust Strip */}
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                <Headphones className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-white sm:text-base">
                  Har Mahine Kaam &amp; Campaigns Hum Denge + Direct Telegram Onboarding
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Payment hone ke 5 minute me Instagram Automation Software download, task assignment sheets aur direct mentor support unlock ho jata hai.
                </p>
              </div>
            </div>
            <span className="mt-3 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-300 sm:mt-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Offers Active Today
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
