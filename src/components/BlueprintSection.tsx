import { motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  Clapperboard,
  DollarSign,
  Gamepad2,
  Gift,
  Handshake,
  Instagram,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import {
  COURSE_MODULES_8,
  DUAL_BENEFIT_FEATURE,
  SOLO_VS_MENTORSHIP,
} from '../data/content';
import { CURRENCY_META, CurrencyCode, PlanId } from '../utils/pricing';

interface BlueprintSectionProps {
  currency: CurrencyCode;
  onEnrollClick: (plan?: PlanId) => void;
}

const MODULE_ICONS = [
  Gamepad2,
  Instagram,
  Handshake,
  Bot,
  Clapperboard,
  DollarSign,
  Briefcase,
  Gift,
];

export function BlueprintSection({
  currency,
  onEnrollClick,
}: BlueprintSectionProps) {
  const meta = CURRENCY_META[currency];

  const earningTiers = [
    {
      label: 'Level 01 · Beginner',
      pace: '1–2 Reels / Clips Daily',
      amount: meta.starterMonthly,
      detail:
        'Hamare diye gaye monthly tasks & campaigns se shuru karke pehle 30 din me consistent payouts generate karna.',
      featured: false,
    },
    {
      label: 'Level 02 · Consistent Earner',
      pace: 'Instagram + GTA 6 Clipping + Automation',
      amount: meta.consistentMonthly,
      detail:
        'Instagram Automation software + viral reel formula use karke multiple pages se monthly dollar income scale karna.',
      featured: true,
    },
    {
      label: 'Level 03 · Pro VIP Multi-Stream',
      pace: 'High-Ticket Brand Work + All Softwares',
      amount: meta.proMonthly,
      detail:
        'Secret dollar deals, multiple automated accounts aur direct high-paying campaigns se full-time online career.',
      featured: false,
    },
  ];

  return (
    <section
      id="modules"
      className="relative scroll-mt-20 overflow-x-clip border-t border-white/[0.06] py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[760px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.55) 0%, rgba(7, 5, 15, 0) 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Ek Teer Se Do Nishane Feature Spotlight */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-violet-500/35 bg-gradient-to-b from-violet-950/40 via-[#0C081D] to-[#07050F] p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(124,58,237,0.35)]">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-4 py-1.5 text-xs font-bold text-emerald-300">
              <Target className="h-4 w-4" />
              <span>{DUAL_BENEFIT_FEATURE.badge}</span>
            </span>

            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl max-w-2xl">
              {DUAL_BENEFIT_FEATURE.heading}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {DUAL_BENEFIT_FEATURE.subheading}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DUAL_BENEFIT_FEATURE.points.map((pt, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-violet-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/30 text-violet-300">
                  <span className="font-mono text-sm font-extrabold">0{idx + 1}</span>
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-white">
                  {pt.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 8 Powerful Course Modules Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
            <span>Course Modules · Complete Blueprint</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
          </div>

          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Course Modules —{' '}
            <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              8 Powerful Modules
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
            Zero se pro level tak ka practical step-by-step framework jo aapko online earning ka independent creator banayega.
          </p>
        </div>

        {/* 8 Module Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSE_MODULES_8.map((mod, idx) => {
            const Icon = MODULE_ICONS[idx % MODULE_ICONS.length];
            return (
              <div
                key={mod.number}
                className={`group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 ${
                  mod.isHighlight
                    ? 'border-2 border-amber-400/60 bg-gradient-to-b from-amber-500/15 via-[#161026] to-[#0A0714] shadow-[0_12px_36px_-12px_rgba(245,158,11,0.35)]'
                    : 'glass-card glass-card-hover'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-extrabold text-violet-400/80">
                      {mod.number}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {mod.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-amber-300">
                    {mod.subtitle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300">
                    {mod.tag}
                  </span>
                  {mod.isHighlight && (
                    <span className="text-[11px] font-bold text-amber-400 animate-pulse">
                      ★ Included Free
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Free Software Showcase Section (#software) */}
        <div
          id="software"
          className="mt-16 overflow-hidden rounded-3xl border border-emerald-400/35 bg-gradient-to-r from-emerald-950/30 via-[#0B1516] to-[#07050F] p-6 sm:p-10 shadow-2xl"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3.5 py-1 text-xs font-bold text-emerald-300">
                <Gift className="h-4 w-4" />
                <span>Ready-To-Use Custom Software</span>
              </div>
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                FREE Instagram Automation Software Ready!
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                Aapke Instagram account ko autopilot par grow karne ke liye humne exclusive software ready kar diya hai. Direct DMs, comments, audience triggers aur engagement auto-pilot mode par handle honge.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs space-y-2">
                <p className="font-bold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  ₹999 Pro VIP Super Deal:
                </p>
                <p className="text-zinc-300">
                  Aapko current Instagram Automation software to milega hi, sath me{' '}
                  <strong className="text-emerald-300 font-semibold">
                    future me hum jo bhi naye softwares banayenge, wo sab bhi 100% FREE
                  </strong>{' '}
                  with secret earning methods provide honge!
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onEnrollClick('vip_3m')}
                  className="btn-sheen violet-cta-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
                >
                  <span>Claim Software &amp; Pro VIP Access (₹999)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-[#0B0816] p-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="font-mono text-xs font-bold text-white">Instagram_Bot_v1.0.exe</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400">STATUS: READY</span>
                </div>
                <div className="mt-3 space-y-2 text-xs font-mono text-zinc-300">
                  <p className="text-zinc-400">✓ Auto DM Trigger Active</p>
                  <p className="text-zinc-400">✓ Reel Audience Engagement ON</p>
                  <p className="text-zinc-400">✓ Anti-Ban 0-Risk Shield Enabled</p>
                  <p className="text-amber-300">★ All Future Softwares Included in ₹999 Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Earning Potential Tiers */}
        <div className="mt-16">
          <div className="text-center">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Earning Potential &amp; Roadmap
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              Phone (CapCut) ya PC dono se daily execute karo.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {earningTiers.map((tier, idx) => (
              <div
                key={tier.label}
                className={`relative rounded-2xl p-6 ${
                  tier.featured ? 'vip-cosmic-card' : 'glass-card glass-card-hover'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/40 bg-violet-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-[0_0_16px_rgba(139,92,246,0.85)]">
                      Most Realistic Target
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                  <span>{tier.label}</span>
                </div>
                <p className="mt-4 font-mono text-2xl font-extrabold text-white tabular-nums sm:text-3xl">
                  {tier.amount}
                </p>
                <p className="mt-1 text-xs font-semibold text-emerald-400">
                  {tier.pace}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-zinc-300">
                  {tier.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solo vs Mentorship Comparison */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10">
          <div className="text-center">
            <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
              Kyu 95% Log Solo Fail Ho Jate Hain Aur Mentorship Wale Kamate Hain?
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-rose-300">
                <X className="h-4 w-4 text-rose-400" />
                Solo Shuru Karne Ke Nuksan
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-zinc-300">
                {SOLO_VS_MENTORSHIP.solo.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05] p-5">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-emerald-300">
                <Check className="h-4 w-4 text-emerald-400" />
                Mentorship Ke Sath Guaranteed Fayde
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-zinc-300">
                {SOLO_VS_MENTORSHIP.mentorship.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
