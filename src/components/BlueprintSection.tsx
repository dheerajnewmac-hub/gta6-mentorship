import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  Flame,
  Layers,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react';
import { CLIPPING_STEPS, SOLO_VS_MENTORSHIP } from '../data/content';
import { CURRENCY_META, CurrencyCode, PlanId } from '../utils/pricing';

interface BlueprintSectionProps {
  currency: CurrencyCode;
  onEnrollClick: (plan?: PlanId) => void;
}

const STEP_ICONS = [Flame, Layers, Wallet];

export function BlueprintSection({
  currency,
  onEnrollClick,
}: BlueprintSectionProps) {
  const meta = CURRENCY_META[currency];

  const earningTiers = [
    {
      label: 'Level 01 · Beginner',
      pace: '1–2 GTA 6 Clips / Day',
      amount: meta.starterMonthly,
      detail:
        'Phone se shuru karke pehle month me private paid clipping platforms se consistent dollar payouts unlock karna.',
      featured: false,
    },
    {
      label: 'Level 02 · Consistent',
      pace: '2–3 Clips / Day + Viral Hooks',
      amount: meta.consistentMonthly,
      detail:
        'Proven 2-second hook formula aur high-RPM GTA 6 trailer angles se multiple pages par weekly payouts scale karna.',
      featured: true,
    },
    {
      label: 'Level 03 · Pro Clipper',
      pace: 'Multi-Page + Paid Campaigns',
      amount: meta.proMonthly,
      detail:
        '1M+ views campaigns ($900/1M pools) aur gaming creator retainers ke sath predictable full-time dollar income.',
      featured: false,
    },
  ];

  return (
    <section
      id="blueprint"
      className="relative scroll-mt-20 overflow-x-clip border-t border-white/[0.06] py-16 sm:py-24"
    >
      {/* Subtle violet section ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[760px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.55) 0%, rgba(7, 5, 15, 0) 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-wide text-amber-300">
            02. Ek Teer Se Do Nishana — Method + Monthly Paid Work Group
          </p>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Method Hum Sikhayenge, Har Mahine Kaam Hum Denge
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Account kaise banana hai, Instagram Reel &amp; GTA 6 clip kaise viral
            karni hai aur kaise kamana hai — sab hum step-by-step batayenge.
            Saath hi hamare private group me har mahine active earning kaam
            direct hum provide karenge taaki ek teer se do nishana lag jaye.
          </p>
        </div>

        {/* 3 Earning Potential Tiers */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {earningTiers.map((tier, idx) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`relative rounded-2xl p-6 ${
                tier.featured
                  ? 'vip-cosmic-card'
                  : 'glass-card glass-card-hover'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-violet-300">
                  {tier.label}
                </span>
                {tier.featured && (
                  <span className="rounded-full border border-violet-400/40 bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200">
                    Sweet Spot
                  </span>
                )}
              </div>

              <p className="mt-4 font-mono text-2xl font-extrabold text-emerald-400 tabular-nums sm:text-[26px]">
                {tier.amount}
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <TrendingUp className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                {tier.pace}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {tier.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Web Angles-Inspired 2-Column Comparison Matrix */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Left: Solo Trial & Error */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="glass-card rounded-2xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Without System
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-zinc-200">
                  Akele Try Karna (Trial & Error)
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-400">
                <X className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <ul className="mt-5 space-y-3.5">
              {SOLO_VS_MENTORSHIP.solo.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400">
                    <X className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: GTA 6 Mentorship System */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="vip-cosmic-card rounded-2xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                  Proven Shortcut
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  GTA 6 Clipping Mentorship System
                </h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/15 text-emerald-400">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>

            <ul className="mt-5 space-y-3.5">
              {SOLO_VS_MENTORSHIP.mentorship.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-zinc-100"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/20 text-emerald-300">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 3-Step Execution Flow */}
        <div className="mt-14">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {CLIPPING_STEPS.map((step, idx) => {
              const Icon = STEP_ICONS[idx] ?? Flame;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="glass-card glass-card-hover relative rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300 shadow-[0_0_24px_-6px_rgba(139,92,246,0.7)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mid-Page Luminous Conversion Banner */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-violet-400/30 bg-gradient-to-r from-violet-950/60 via-[#140E2A] to-purple-950/50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wide text-amber-300">
              Ek Teer Se Do Nishana · Start Today
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-extrabold text-white">
              Free Insta Software + Har Mahine Direct Paid Work Unlock Karo
            </h3>
            <p className="mt-1.5 text-sm text-zinc-300/85">
              Account setup se Reel viral method, 500+ presets, ready-made
              automation software aur private monthly work group sab ek saath.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => onEnrollClick('pro')}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="btn-sheen gold-cta-glow mt-5 inline-flex min-h-[48px] w-full shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-extrabold sm:mt-0 sm:w-auto"
          >
            <span>Join Pro All-Software</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
