import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Crown,
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

  const monthlyPlan = PRICING_PLANS.monthly;
  const lifetimePlan = PRICING_PLANS.lifetime;
  const monthlyPrice = getPlanPriceInfo('monthly', currency);
  const lifetimePrice = getPlanPriceInfo('lifetime', currency);

  return (
    <section className="relative border-t border-white/[0.06] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* PART A: INTERACTIVE CURRICULUM EXPLORER */}
        <div id="curriculum" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
              <span>03 · Inside Mentorship</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Step-by-Step GTA 6 Clipping Curriculum
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Zero fluff theory — sirf practical workflows, verified campaigns
              aur presets jo directly views aur payouts laate hain.
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
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold leading-snug sm:text-[15px]">
                          {mod.title}
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                          {mod.outcome}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Module Detail Panel */}
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-violet-600/20 blur-3xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 font-mono text-xs font-semibold text-violet-200">
                      <span>MODULE {activeModule.number}</span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
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
                      onClick={() => onSelectPlan('lifetime')}
                      className="inline-flex items-center gap-1 font-semibold text-violet-300 hover:text-white"
                    >
                      <span>Unlock All 4 Modules</span>
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
              <span>04 · Join Batch 1</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
            </div>

            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Apna Mentorship Plan Choose Karo
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              India (UPI / QR), Crypto (USDT TRC-20) aur Pakistan (EasyPaisa /
              JazzCash / Telegram) — sab supported hain.
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
            {/* Monthly Pass */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="glass-card flex flex-col justify-between rounded-3xl p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    {monthlyPlan.name}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-zinc-300">
                    Monthly Access
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-zinc-400">
                  {monthlyPlan.subtitle}
                </p>

                <div className="mt-6 flex items-baseline gap-2 border-b border-white/[0.08] pb-6">
                  <span className="font-mono text-4xl font-extrabold text-white tabular-nums sm:text-5xl">
                    {monthlyPrice.currentFormatted}
                  </span>
                  <span className="text-sm font-medium text-zinc-400">
                    {monthlyPlan.billingCycleLabel}
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {monthlyPlan.features.map((feature) => (
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

                {/* Required 30-Day Investment Return Short Note */}
                <div className="mt-6 flex items-start gap-2 rounded-2xl border border-violet-400/20 bg-violet-500/[0.08] p-4 text-xs leading-relaxed text-violet-100/90">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" aria-hidden="true" />
                  <span>{monthlyPlan.shortNote}</span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => onSelectPlan('monthly')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="mt-7 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-violet-400/50 hover:bg-white/[0.11] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <span>{monthlyPlan.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </motion.div>

            {/* Lifetime VIP Access (Hero Highlighted Cosmic Card) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="vip-cosmic-card relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold tracking-wide text-violet-300">
                    Most Popular · Best Value
                  </span>
                  <Crown className="h-5 w-5 text-amber-300" aria-hidden="true" />
                </div>

                <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                  {lifetimePlan.name}
                </h3>
                <p className="mt-1.5 text-sm text-violet-100/80">
                  {lifetimePlan.subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-2.5 border-b border-white/[0.12] pb-6">
                  <span className="font-mono text-4xl font-extrabold text-white tabular-nums sm:text-5xl">
                    {lifetimePrice.currentFormatted}
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-violet-200">
                    {lifetimePlan.billingCycleLabel}
                  </span>
                  {lifetimePrice.regularFormatted && (
                    <span className="font-mono text-base font-medium text-zinc-400 line-through tabular-nums">
                      {lifetimePrice.regularFormatted}
                    </span>
                  )}
                  {lifetimePrice.savingsPercent && (
                    <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-300">
                      Save {lifetimePrice.savingsPercent}%
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-3.5">
                  {lifetimePlan.features.map((feature) => (
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

                {/* Required 30-Day Investment Return Short Note */}
                <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs leading-relaxed text-emerald-100">
                  {lifetimePlan.shortNote}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={() => onSelectPlan('lifetime')}
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="btn-sheen violet-cta-glow mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                <span>{lifetimePlan.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>

          {/* Direct Mentor Guidance Trust Strip */}
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                <Headphones className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-white sm:text-base">
                  1-on-1 Direct Mentor Onboarding & Personal Clip Audits
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                  Payment ke 5 minute ke andar aapko Telegram VIP community,
                  live GTA 6 campaign sheets aur editing presets mil jate hain.
                </p>
              </div>
            </div>
            <span className="mt-3 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-emerald-300 sm:mt-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Batch 1 Seats Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
