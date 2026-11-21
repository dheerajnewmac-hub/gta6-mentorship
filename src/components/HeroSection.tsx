import { motion } from 'motion/react';
import { ArrowDownRight, ArrowRight, CheckCircle2, Expand } from 'lucide-react';
import { PROOF_ITEMS } from '../data/content';
import { CurrencyCode, PlanId } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface HeroSectionProps {
  currency: CurrencyCode;
  onEnrollClick: (planId: PlanId) => void;
  onSelectProof: (item: ProofItem) => void;
}

const TOTAL_EARNED_LABEL: Record<CurrencyCode, string> = {
  INR: '₹48,000+ ($573+)',
  PKR: 'Rs. 1,60,000+ ($573+)',
  USD: '$573.90+',
};

const SBI_PAYOUT_LABEL: Record<CurrencyCode, string> = {
  INR: '₹42,282.27',
  PKR: 'Rs. 1,41,500',
  USD: '$467.21',
};

export function HeroSection({
  currency,
  onEnrollClick,
  onSelectProof,
}: HeroSectionProps) {
  const featuredProof = PROOF_ITEMS[0];

  const stats = [
    { value: TOTAL_EARNED_LABEL[currency], label: 'GTA 6 Clipping in 2–3 Days' },
    { value: SBI_PAYOUT_LABEL[currency], label: 'Direct SBI Bank Transfer' },
    { value: 'Phone or PC', label: 'Edit with CapCut / Premiere' },
    { value: '1-on-1 Support', label: 'Direct Mentor Clip Reviews' },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-10 pb-14 sm:pt-14 sm:pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-80 w-96 rounded-full bg-blue-50 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold">
              <span className="text-[#059669]">
                GTA 6 Hype Peak · Verified 2–3 Day Earnings
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300">
                ·
              </span>
              <span className="text-[#1D4ED8]">
                Batch 1 Mentorship (12 Spots)
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.1rem,4vw,3.35rem)] font-extrabold leading-[1.09] tracking-tight text-slate-900">
              GTA 6 Clipping Se Sirf 2–3 Din Me{' '}
              <span className="text-[#1D4ED8]">
                {TOTAL_EARNED_LABEL[currency]}
              </span>{' '}
              Kamaye.
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              Abhi GTA 6 duniya ka sabse bada trend hai — aur is hype se mene
              khud{' '}
              <strong className="font-semibold text-slate-900">
                SBI Bank me ₹42,282.27
              </strong>{' '}
              aur live Content Rewards payouts earn kiye hain. Ab wahi exact
              GTA 6 clipping system main aapko apni Mentorship me sikha raha
              hoon.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                onClick={() => onEnrollClick('lifetime')}
                className="btn-sheen group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-6 py-3.5 text-sm sm:text-base font-bold text-white whitespace-nowrap brand-cta-shadow transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Join GTA 6 Mentorship</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>

              <motion.a
                href="#proof"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm sm:text-base font-semibold text-slate-800 whitespace-nowrap transition-colors duration-150 hover:border-[#1D4ED8]/40 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>See All 3 Real Proofs</span>
                <ArrowDownRight
                  className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-500">
              100% Practical Hinglish Mentorship · Instant Access via UPI, Card,
              EasyPaisa & JazzCash
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <button
              type="button"
              onClick={() => onSelectProof(featuredProof)}
              aria-label="Zoom verified SBI bank transfer payout screenshot of ₹42,282.27"
              className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left soft-card-shadow transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1D4ED8]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#059669]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Verified GTA 6 Payout · 20–21 Nov</span>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] group-hover:underline">
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                  Zoom
                </span>
              </div>

              <div className="bg-slate-50 p-3 sm:p-4">
                <img
                  src={featuredProof.imageSrc}
                  alt={featuredProof.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full rounded-xl border border-slate-200/80 bg-white object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3.5">
                <div>
                  <p className="text-xs text-slate-500">
                    State Bank of India Settlement
                  </p>
                  <p className="font-mono text-lg font-bold text-[#059669] tabular-nums">
                    ₹42,282.27 INR{' '}
                    <span className="text-xs font-medium text-slate-500">
                      (+$467.21)
                    </span>
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  2–3 Day Sprint
                </span>
              </div>
            </button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-7 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-0.5">
              <p className="font-mono text-lg sm:text-xl font-bold tracking-tight text-slate-900 tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
