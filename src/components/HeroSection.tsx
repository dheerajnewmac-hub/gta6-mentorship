import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Eye,
  Landmark,
  ShieldCheck,
} from 'lucide-react';
import { MARQUEE_METRICS, PROOF_ITEMS } from '../data/content';
import { CURRENCY_META, CurrencyCode, PlanId } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface HeroSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onEnrollClick: (plan?: PlanId) => void;
  onSelectProof: (item: ProofItem) => void;
}

const CURRENCIES: CurrencyCode[] = ['INR', 'PKR', 'USD'];

const DASHBOARD_BARS = [32, 46, 38, 62, 54, 78, 68, 92, 84, 100];

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

const HEADLINE_WORDS_LINE1 = ['GTA', '6', 'Clipping', 'Se'];
const HEADLINE_WORDS_LINE2 = ['Daily', 'Dollars', 'Earn', 'Karo'];

export function HeroSection({
  currency,
  onCurrencyChange,
  onEnrollClick,
  onSelectProof,
}: HeroSectionProps) {
  const sbiProof = PROOF_ITEMS[0];
  const viralViewsProof = PROOF_ITEMS[2];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Quantix + Web Angles Cosmic Atmospheric Backdrop (Pure GPU CSS/SVG) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle coordinate grid */}
        <div className="cosmic-grid-bg absolute inset-0 opacity-85" />

        {/* Top luminous radial rays */}
        <div
          className="absolute left-1/2 top-[-120px] h-[560px] w-[960px] -translate-x-1/2 rounded-full opacity-90 blur-[110px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.58) 0%, rgba(124, 58, 237, 0.28) 44%, rgba(7, 5, 15, 0) 76%)',
          }}
        />

        {/* Signature Quantix glowing curved horizon arc */}
        <svg
          viewBox="0 0 1440 420"
          fill="none"
          aria-hidden="true"
          className="absolute left-1/2 top-[34px] w-[1440px] max-w-none -translate-x-1/2 opacity-100 sm:top-[20px]"
        >
          <defs>
            <linearGradient id="horizonStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
              <stop offset="18%" stopColor="rgba(139, 92, 246, 0.65)" />
              <stop offset="50%" stopColor="rgba(245, 243, 255, 0.98)" />
              <stop offset="82%" stopColor="rgba(139, 92, 246, 0.65)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </linearGradient>
            <linearGradient id="horizonGlowFill" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.32)" />
              <stop offset="55%" stopColor="rgba(124, 58, 237, 0.08)" />
              <stop offset="100%" stopColor="rgba(7, 5, 15, 0)" />
            </linearGradient>
          </defs>
          <path
            d="M 60 390 Q 720 -18 1380 390 L 1380 420 L 60 420 Z"
            fill="url(#horizonGlowFill)"
          />
          <path
            d="M 60 390 Q 720 -18 1380 390"
            stroke="url(#horizonStroke)"
            strokeWidth="2.5"
          />
          <path
            d="M 130 404 Q 720 16 1310 404"
            stroke="url(#horizonStroke)"
            strokeWidth="1.2"
            strokeOpacity="0.38"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-200 shadow-[0_0_24px_-6px_rgba(139,92,246,0.65)] backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>GTA 6 Hype Wave Live · 9 Real Payout &amp; Analytics Proofs Inside</span>
          </motion.div>

          {/* Word-by-word staggered Framer-style reveal */}
          <h1 className="mt-7 font-display text-[38px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-[58px] lg:text-[66px]">
            <span className="block">
              {HEADLINE_WORDS_LINE1.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-[0.24em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="mt-1 block bg-gradient-to-b from-white via-violet-100 to-violet-300/80 bg-clip-text text-transparent">
              {HEADLINE_WORDS_LINE2.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.28 + idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mr-[0.24em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300/90 sm:text-lg"
          >
            Sirf 2–3 din ke GTA 6 clipping sprint me{' '}
            <span className="font-mono font-semibold text-emerald-400">
              {HERO_SBI_LABEL[currency]}
            </span>{' '}
            SBI bank me,{' '}
            <span className="font-mono font-semibold text-emerald-400">
              $953.16
            </span>{' '}
            Kick clipping USDT payout aur{' '}
            <span className="font-semibold text-white">1.3M+ verified views</span>.
            Wahi exact system step-by-step seekho.
          </motion.p>

          {/* Primary & Secondary Pill CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
          >
            <motion.button
              type="button"
              onClick={() => onEnrollClick('lifetime')}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="btn-sheen violet-cta-glow inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-[15px] font-semibold text-white sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <span>Join GTA 6 Mentorship</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>

            <motion.a
              href="#proof-vault"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-zinc-100 backdrop-blur-md transition-colors hover:border-violet-400/40 hover:bg-white/[0.08] sm:w-auto"
            >
              <span>Inspect All 9 Real Proofs</span>
              <ArrowUpRight className="h-4 w-4 text-violet-300" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* Inline Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.66 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              Phone (CapCut) & PC dono ke liye
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
              UPI · USDT TRC-20 · EasyPaisa Accepted
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              5-Min Instant Telegram Onboarding
            </span>
          </motion.div>
        </div>

        {/* Quantix-Style Floating Dark Glass Payout & Analytics Showcase Deck */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          {/* Ambient violet glow halo behind the dashboard */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -top-8 bottom-8 -z-10 rounded-full opacity-55 blur-[90px]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.45), rgba(7, 5, 15, 0) 72%)',
            }}
          />

          <div className="glass-card overflow-hidden rounded-3xl p-4 sm:p-6">
            {/* Deck Top Bar with Currency Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="font-display text-sm font-bold text-white">
                  Verified GTA 6 Mentor Payout Ledger
                </span>
                <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-zinc-400 sm:inline-block">
                  9 Unedited Proofs
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

            {/* 3 KPI Stat Cards */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-[#0B0816]/90 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>SBI Bank Settlement (2–3 Days)</span>
                  <Landmark className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-emerald-400 tabular-nums sm:text-[26px]">
                  {HERO_SBI_LABEL[currency]}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Direct wire transfer · 20–21 Nov
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#0B0816]/90 p-4">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>30-Day Verified Views</span>
                  <Eye className="h-4 w-4 text-violet-400" aria-hidden="true" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-white tabular-nums sm:text-[26px]">
                  1,302,905
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  85/90 clips approved · $658.30 paid
                </p>
              </div>

              <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-b from-violet-500/12 to-[#0B0816]/90 p-4">
                <div className="flex items-center justify-between text-xs text-violet-200/90">
                  <span>Total Verified Proof Shown</span>
                  <BarChart3 className="h-4 w-4 text-violet-300" aria-hidden="true" />
                </div>
                <p className="mt-2 font-mono text-2xl font-extrabold text-white tabular-nums sm:text-[26px]">
                  {HERO_TOTAL_SHOWN[currency]}
                </p>
                <p className="mt-1 text-[11px] text-violet-200/75">
                  Bank Wires & Private Clipping Platforms
                </p>
              </div>
            </div>

            {/* Interactive Real Proof Previews + Quantix Purple Bar Graph */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left: Clickable SBI Bank Transfer Proof */}
              <button
                type="button"
                onClick={() => onSelectProof(sbiProof)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0714] p-4 text-left transition-all hover:border-violet-400/45 lg:col-span-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      Bank Transfer Proof
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-white">
                      SBI Wire · ₹42,282.27 (+$467.21)
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-zinc-200 transition-colors group-hover:border-violet-400/40 group-hover:text-white">
                    Zoom
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-white p-2">
                  <img
                    src={sbiProof.imageSrc}
                    alt={sbiProof.imageAlt}
                    className="h-auto w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                </div>
              </button>

              {/* Middle: Clickable 1.3M Views Dark Analytics Proof */}
              <button
                type="button"
                onClick={() => onSelectProof(viralViewsProof)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0714] p-4 text-left transition-all hover:border-violet-400/45 lg:col-span-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">
                      Viral Analytics Proof
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-white">
                      1.3M+ Views · $658.30 Paid
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-zinc-200 transition-colors group-hover:border-violet-400/40 group-hover:text-white">
                    Inspect
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-3 flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0E0D0F] p-1.5">
                  <img
                    src={viralViewsProof.imageSrc}
                    alt={viralViewsProof.imageAlt}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>

              {/* Right: Quantix-Style Violet Momentum Bar Visualizer */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0A0714] p-4 lg:col-span-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Payout Velocity
                  </p>
                  <p className="mt-1 font-display text-sm font-bold text-white">
                    GTA 6 Campaign Growth
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    95%+ clip approval on private clipping platforms (revealed inside mentorship).
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-4 flex h-28 items-end gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                >
                  {DASHBOARD_BARS.map((height, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleY: 0.15, opacity: 0.4 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.65 + idx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        height: `${height}%`,
                        transformOrigin: 'bottom',
                      }}
                      className={`flex-1 rounded-t-md ${
                        idx >= 7
                          ? 'bg-gradient-to-t from-violet-600 to-violet-300 shadow-[0_0_16px_rgba(139,92,246,0.65)]'
                          : 'bg-gradient-to-t from-violet-950/90 to-violet-500/65'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Infinite Marquee Strip (Quantix + Web Angles signature) */}
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
