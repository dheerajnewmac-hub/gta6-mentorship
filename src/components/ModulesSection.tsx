import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Clapperboard,
  Coins,
  Gamepad2,
  Gift,
  Instagram,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import moduleGta6PhotoImg from '../assets/images/module_gta6_photo_1795364505822.jpg';
import instaSoftwareImg from '../assets/images/software_insta_automation_1795356250038.jpg';
import gtaModuleImg from '../assets/images/module_gta6_earning_1795356249480.jpg';
import { COURSE_MODULES, MENTORSHIP_PILLARS } from '../data/content';
import {
  CURRENCY_META,
  CurrencyCode,
  PlanId,
  getPlanPriceInfo,
} from '../utils/pricing';

interface ModulesSectionProps {
  currency: CurrencyCode;
  onSelectPlan: (planId: PlanId) => void;
}

const MODULE_VISUALS = [
  {
    icon: Gamepad2,
    stageBg: 'from-violet-600/35 via-fuchsia-600/20 to-[#0B0719]',
    medallionBg: 'from-violet-500 to-fuchsia-600',
    glow: 'shadow-[0_0_24px_rgba(168,85,247,0.45)]',
  },
  {
    icon: Instagram,
    stageBg: 'from-pink-600/30 via-orange-500/20 to-[#0B0719]',
    medallionBg: 'from-amber-400 via-pink-500 to-purple-600',
    glow: 'shadow-[0_0_24px_rgba(236,72,153,0.45)]',
  },
  {
    icon: Bot,
    stageBg: 'from-sky-500/30 via-violet-600/20 to-[#0B0719]',
    medallionBg: 'from-sky-400 to-violet-600',
    glow: 'shadow-[0_0_24px_rgba(56,189,248,0.4)]',
  },
  {
    icon: Briefcase,
    stageBg: 'from-emerald-500/30 via-teal-600/20 to-[#0B0719]',
    medallionBg: 'from-emerald-400 to-teal-600',
    glow: 'shadow-[0_0_24px_rgba(16,185,129,0.4)]',
  },
  {
    icon: Clapperboard,
    stageBg: 'from-fuchsia-600/30 via-violet-600/20 to-[#0B0719]',
    medallionBg: 'from-fuchsia-500 to-indigo-600',
    glow: 'shadow-[0_0_24px_rgba(217,70,239,0.4)]',
  },
  {
    icon: Coins,
    stageBg: 'from-amber-500/30 via-orange-600/20 to-[#0B0719]',
    medallionBg: 'from-amber-400 to-orange-500',
    glow: 'shadow-[0_0_24px_rgba(245,158,11,0.45)]',
  },
  {
    icon: TrendingUp,
    stageBg: 'from-emerald-500/30 via-lime-500/15 to-[#0B0719]',
    medallionBg: 'from-lime-400 to-emerald-600',
    glow: 'shadow-[0_0_24px_rgba(52,211,153,0.4)]',
  },
  {
    icon: Layers,
    stageBg: 'from-violet-500/30 via-amber-500/20 to-[#0B0719]',
    medallionBg: 'from-violet-500 to-amber-500',
    glow: 'shadow-[0_0_24px_rgba(139,92,246,0.45)]',
  },
];

export function ModulesSection({
  currency,
  onSelectPlan,
}: ModulesSectionProps) {
  const [activeModuleId, setActiveModuleId] = useState(
    MENTORSHIP_PILLARS[0].id
  );

  const activeModule =
    MENTORSHIP_PILLARS.find((m) => m.id === activeModuleId) ??
    MENTORSHIP_PILLARS[0];

  return (
    <section
      id="modules"
      className="relative scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* PART A: 8 POWERFUL MODULES + FREE INSTAGRAM AUTOMATION SOFTWARE */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-violet-300">
              Complete Dashboard Curriculum
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              Course Modules — 8 Powerful Modules
            </h2>
          </div>
          <p className="text-xs text-zinc-400 sm:text-sm">
            GTA 6 Clipping · Instagram Viral Reels · Free Automation Software · Monthly Paid Work
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
          {/* Left: 8 Uniform Course Modules */}
          <div className="flex flex-col justify-between gap-3.5 lg:col-span-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COURSE_MODULES.map((mod, idx) => {
                const visual = MODULE_VISUALS[idx] ?? MODULE_VISUALS[0];
                const Icon = visual.icon ?? Sparkles;
                const isGtaModule = idx === 0;
                return (
                  <div
                    key={mod.id}
                    className="glass-card glass-card-hover relative flex flex-col overflow-hidden rounded-xl p-3"
                  >
                    {isGtaModule ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-violet-400/35 bg-[#120826]">
                        <img
                          src={moduleGta6PhotoImg}
                          alt="Grand Theft Auto VI character and GTA VI logo artwork"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain object-center"
                        />
                        <span className="absolute top-1.5 right-1.5 rounded bg-[#07050F]/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-300 backdrop-blur-sm">
                          {mod.number}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${visual.stageBg}`}
                      >
                        <span className="absolute top-1.5 right-1.5 font-mono text-[10px] font-bold text-amber-300/90">
                          {mod.number}
                        </span>
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${visual.medallionBg} text-white ${visual.glow}`}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                      </div>
                    )}

                    <div className="mt-2.5 flex-1">
                      <h3 className="font-display text-[13px] font-bold leading-snug text-white">
                        {mod.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Spotlight Strip */}
            <div className="glass-card flex flex-col items-start gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3.5">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <img
                    src={gtaModuleImg}
                    alt="GTA 6 Sunset Vice Boulevard"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-amber-300">
                    Ek Teer Se Do Nishana · Direct Monthly Campaigns
                  </p>
                  <p className="mt-0.5 font-display text-sm font-bold text-white sm:text-[15px]">
                    Account Setup + Viral Views Roadmap + Har Mahine Kaam Hum Denge
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400">
                    Phone &amp; PC step-by-step system with private paid campaign group access.
                  </p>
                </div>
              </div>
              <a
                href="#pricing"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-violet-400/25 bg-violet-500/15 px-3.5 py-2 text-xs font-bold text-violet-200 transition-colors hover:bg-violet-500/25 hover:text-white"
              >
                <span>Compare Plans</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Dedicated FREE Instagram Automation Software Card */}
          <div
            id="software"
            className="vip-cosmic-card flex scroll-mt-24 flex-col justify-between overflow-hidden rounded-2xl p-5 lg:col-span-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold tracking-wide text-amber-300">
                  Ready-Made Bonus Included
                </span>
                <Gift className="h-5 w-5 text-amber-300" aria-hidden="true" />
              </div>

              <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
                FREE Instagram Automation Software
              </h3>

              <div className="mt-3.5 aspect-[4/2.6] w-full overflow-hidden rounded-xl border border-white/10 bg-[#07050F]">
                <img
                  src={instaSoftwareImg}
                  alt="Ready-made Instagram Automation Software dashboard preview"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                Hamara ready-made{' '}
                <strong className="font-semibold text-white">
                  Instagram Automation Software
                </strong>{' '}
                dono plans ke saath FREE milta hai. Aur{' '}
                <strong className="font-semibold text-amber-300">
                  {CURRENCY_META[currency].code === 'INR'
                    ? '₹999 Pro Plan'
                    : `${getPlanPriceInfo('pro', currency).currentFormatted} Pro Plan`}
                </strong>{' '}
                me aapko{' '}
                <strong className="font-semibold text-white">
                  Sabhi Earning Softwares + Future Me Aane Wale Sabhi Softwares FREE + New Earning Methods
                </strong>{' '}
                milenge!
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan('pro')}
              className="btn-sheen violet-cta-glow mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white sm:text-sm"
            >
              <span>Get All Software + 1+2 Months</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* PART B: INTERACTIVE CURRICULUM EXPLORER */}
        <div id="curriculum" className="mt-16 scroll-mt-24 sm:mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-wide text-violet-300">
              Inside Mentorship &amp; Paid Work Group
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              Software, Viral Method &amp; Monthly Work Blueprint
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
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
                    <div className="flex items-start gap-3">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? 'text-amber-300' : 'text-zinc-500'
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
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    <p className="font-mono text-xs font-semibold text-amber-300">
                      Module {activeModule.number}
                    </p>
                    <h4 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                      {activeModule.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                      {activeModule.detail}
                    </p>

                    <div className="mt-6 space-y-3">
                      <p className="text-xs font-semibold text-zinc-400">
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

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4 text-xs text-zinc-400">
                    <span>Outcome: {activeModule.outcome}</span>
                    <button
                      type="button"
                      onClick={() => onSelectPlan('pro')}
                      className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-white"
                    >
                      <span>Unlock All Modules + Softwares</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
