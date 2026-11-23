import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Gamepad2,
  Star,
  TrendingUp,
} from 'lucide-react';
import moduleGta6PhotoImg from '../assets/images/module_gta6_photo_1795364505822.jpg';
import { MARQUEE_METRICS, PROOF_ITEMS } from '../data/content';
import { CurrencyCode, PlanId, getPlanPriceInfo } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface HeroSectionProps {
  currency: CurrencyCode;
  onEnrollClick: (plan?: PlanId) => void;
  onSelectProof: (item: ProofItem) => void;
}

const HOW_YOU_EARN_STEPS = [
  {
    step: '01',
    icon: Bot,
    title: 'Account Setup + FREE Insta Software',
    desc: 'Zero se Instagram & GTA 6 clip page setup + hamara ready-made Instagram Automation Software bilkul FREE.',
  },
  {
    step: '02',
    icon: Gamepad2,
    title: 'Phone / PC Se Viral Clips Banao',
    desc: 'Daily 1–2 ghante me hamare 2-second hook formula aur 500+ presets se high-views GTA 6 & Reels clips upload karo.',
  },
  {
    step: '03',
    icon: Briefcase,
    title: 'Direct Paid Campaigns Hum Khud Denge',
    desc: 'Ek Teer Se Do Nishana: Views + viral method hum sikhayenge aur har mahine active paid clipping kaam private group me hum denge.',
  },
];

export function HeroSection({
  currency,
  onSelectProof,
}: HeroSectionProps) {
  const starterPrice = getPlanPriceInfo('starter', currency);
  const proPrice = getPlanPriceInfo('pro', currency);

  const sbiProof = PROOF_ITEMS[0];
  const kickProof = PROOF_ITEMS[1];
  const viewsProof = PROOF_ITEMS[2];
  const highRpmProof = PROOF_ITEMS[5];

  const myEarningsHighlights = [
    {
      amount: currency === 'INR' ? '₹42,282.27' : currency === 'PKR' ? 'Rs. 1,41,500' : '$467.21',
      label: 'Direct SBI Bank Transfer',
      sub: '20–21 Nov · GTA 6 Clipping Invoice',
      proof: sbiProof,
      accent: 'text-emerald-400',
    },
    {
      amount: '$953.16 USDT',
      label: 'Kick Clipping Payout',
      sub: '953.34 USDT Received in Trust Wallet',
      proof: kickProof,
      accent: 'text-amber-300',
    },
    {
      amount: '$658.30 Paid',
      label: '1,302,905 Views (30 Days)',
      sub: '85/90 Clips Approved · 2 Campaigns',
      proof: viewsProof,
      accent: 'text-violet-300',
    },
    {
      amount: '$641.55 Paid',
      label: '304K Views High-RPM Pool',
      sub: '38/39 Approved (97.4% Approval)',
      proof: highRpmProof,
      accent: 'text-sky-300',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-14">
      {/* Deep Cosmic Indigo & Violet Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="cosmic-grid-bg absolute inset-0 opacity-75" />
        <div
          className="absolute left-1/2 top-[-140px] h-[560px] w-[1120px] -translate-x-1/2 rounded-full opacity-85 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.5) 0%, rgba(76, 29, 149, 0.24) 48%, rgba(7, 5, 15, 0) 76%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-8">
          {/* LEFT COLUMN (7 cols): GTA 6 Clipping Headline + Aap Kaise Earn Kar Sakte Ho + CTAs */}
          <div className="lg:col-span-7">
            {/* Rating & Trust Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-violet-300 sm:text-sm">
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span>4.9/5 Rated</span>
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span>GTA 6 Clipping Mentorship (Phone + PC)</span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[52px]">
              GTA 6 Clipping Se{' '}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Daily Dollars Kamao
              </span>{' '}
              — Step-by-Step System
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              Maine khud GTA 6 aur Kick clipping se{' '}
              <strong className="font-semibold text-white">
                ₹42,282+ direct SBI bank payout, $953.16 USDT aur 1.3M+ views
              </strong>{' '}
              generate kiye hain — bina kisi badi team ya mehnge setup ke. Ab
              wahi exact{' '}
              <strong className="font-semibold text-amber-300">
                Account Setup + Viral Views Roadmap + FREE Instagram Automation
                Software + Direct Monthly Paid Campaigns
              </strong>{' '}
              aapko step-by-step milenge.
            </p>

            {/* Primary Action Buttons: Direct Plans + See My & My Students' Results */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <motion.a
                href="#pricing"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="btn-sheen gold-cta-glow inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold sm:text-[15px]"
              >
                <span>
                  View Mentorship Plans ({starterPrice.currentFormatted} /{' '}
                  {proPrice.currentFormatted})
                </span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </motion.a>

              <a
                href="#proof-vault"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-violet-400/35 bg-violet-500/15 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-violet-300/60 hover:bg-violet-500/25"
              >
                <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>See My &amp; My Students&apos; Results</span>
                <ArrowDown className="h-4 w-4 text-violet-300" aria-hidden="true" />
              </a>
            </div>

            {/* AAP KAISE EARN KAR SAKTE HO — 3 Crisp Steps */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-[#0B0719]/90 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                <h2 className="font-display text-sm font-extrabold tracking-tight text-white sm:text-base">
                  Aap Kaise Earn Kar Sakte Ho? (3 Simple Steps)
                </h2>
                <span className="font-mono text-[11px] font-semibold text-emerald-300">
                  Zero Experience Required
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {HOW_YOU_EARN_STEPS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[11px] font-bold text-amber-300">
                          STEP {item.step}
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-xs font-bold leading-snug text-white sm:text-[13px]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols): GTA 6 Visual + MAINE KITNA EARN KIYA Real Proof Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hero-offer-card overflow-hidden rounded-2xl p-4 sm:p-5 lg:col-span-5"
          >
            {/* Card Header */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-bold tracking-wide text-amber-300">
                Maine Kitna Earn Kiya (Verified Proofs)
              </span>
              <span className="rounded-md border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                9 Real Proofs
              </span>
            </div>

            {/* Clean Full Uncropped GTA 6 Artwork Banner (No Girl) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-violet-400/30 bg-[#120826]">
              <img
                src={moduleGta6PhotoImg}
                alt="Grand Theft Auto VI key artwork"
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain object-center"
              />
            </div>

            {/* 4 Clickable Real Proof Metrics */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {myEarningsHighlights.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onSelectProof(item.proof)}
                  className="group flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#080513]/85 p-3 text-left transition-colors hover:border-amber-400/45 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-base font-extrabold tabular-nums ${item.accent}`}
                    >
                      {item.amount}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-amber-300"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1 text-xs font-bold text-white">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-400">{item.sub}</p>
                </button>
              ))}
            </div>

            {/* Footer Link to Full Proof Vault & Student Reviews */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3.5 text-xs">
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Direct Bank &amp; USDT Proofs</span>
              </span>
              <a
                href="#proof-vault"
                className="inline-flex items-center gap-1 font-bold text-amber-300 transition-colors hover:text-white"
              >
                <span>See All 9 Proofs + Student Reviews</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
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
