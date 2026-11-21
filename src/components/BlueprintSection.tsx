import { motion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { CLIPPING_STEPS } from '../data/content';
import { CURRENCY_META, CurrencyCode, PlanId } from '../utils/pricing';

interface BlueprintSectionProps {
  currency: CurrencyCode;
  onEnrollClick: (planId: PlanId) => void;
}

export function BlueprintSection({
  currency,
  onEnrollClick,
}: BlueprintSectionProps) {
  const meta = CURRENCY_META[currency];

  const earningTiers = [
    {
      level: 'Beginner (1–2 Clips / Day)',
      amount: meta.starterMonthly,
      note: 'College ya job ke sath roz 1 ghanta — pehla viral month target.',
    },
    {
      level: 'Consistent Clipper (3+ Clips / Day)',
      amount: meta.consistentMonthly,
      note: 'Active GTA 6 Content Rewards campaigns + Shorts/Reels views.',
    },
    {
      level: 'Multi-Page Pro (GTA 6 Hype Drops)',
      amount: meta.proMonthly,
      note: '2–3 GTA 6 pages + international gaming streamer retainers.',
    },
  ];

  return (
    <section
      id="gta6-earning"
      aria-labelledby="gta6-earning-heading"
      className="border-b border-slate-200/80 bg-white py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#1D4ED8]">
            GTA 6 Hype Opportunity
          </p>
          <h2
            id="gta6-earning-heading"
            className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Aap GTA 6 Clipping Se Kaise Aur Kitne Paise Kama Sakte Hai?
          </h2>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
            GTA 6 abhi internet ka sabse zyada search aur watch kiya jane wala
            game hai. Har trailer breakdown, leak aur top streamer moment par
            crores of views aa rahe hain — aur isi traffic se clippers roz
            dollars earn kar rahe hain.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {earningTiers.map((tier, idx) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.32,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-5"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                <span>{tier.level}</span>
                <TrendingUp
                  className="h-4 w-4 shrink-0 text-[#059669]"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-2 font-mono text-xl sm:text-2xl font-extrabold text-[#059669] tabular-nums">
                {tier.amount}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                {tier.note}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CLIPPING_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-slate-200 bg-[#FAFAFB] p-6 transition-colors duration-150 hover:border-[#1D4ED8]/40"
            >
              <p className="font-mono text-sm font-bold text-[#1D4ED8] tabular-nums">
                Step {step.number}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4 sm:px-6">
          <p className="text-sm text-slate-700">
            <strong className="font-semibold text-slate-900">
              Galat clips daalkar time waste mat karo:
            </strong>{' '}
            Mentorship me aapko exact GTA 6 viral angles, paid campaign links
            aur step-by-step editing templates Day 1 se milte hain.
          </p>
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            onClick={() => onEnrollClick('lifetime')}
            className="btn-sheen group inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0 brand-cta-shadow transition-colors hover:bg-[#1E40AF]"
          >
            <span>Join GTA 6 Mentorship</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
