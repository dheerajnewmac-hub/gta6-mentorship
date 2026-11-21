import { motion } from 'motion/react';
import { CheckCircle2, Expand } from 'lucide-react';
import { PROOF_ITEMS } from '../data/content';
import { CurrencyCode } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface ProofVaultProps {
  currency: CurrencyCode;
  onSelectProof: (item: ProofItem) => void;
}

export function ProofVault({ currency, onSelectProof }: ProofVaultProps) {
  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="border-b border-slate-200/80 bg-[#FAFAFB] py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#059669]">
              100% Real GTA 6 Clipping Proof
            </p>
            <h2
              id="proof-heading"
              className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
            >
              GTA 6 Clipping Se Mene 2–3 Din Me Kitna Kamaya
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Ye teeno mere khud ke real GTA 6 clipping payouts hain — direct
              SBI bank transfer aur live Content Rewards dashboards. Kisi bhi
              photo par click karke full size me verify karein.
            </p>
          </div>

          <p className="font-mono text-xs sm:text-sm font-semibold text-slate-700 tabular-nums">
            Total Shown: $573.90 Received + $33.47 Queued
          </p>
        </div>

        <div
          data-testid="proof-grid"
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {PROOF_ITEMS.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.32,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectProof(item)}
              aria-label={`Inspect ${item.title} — ${item.headlineMetric[currency]}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left soft-card-shadow transition-colors duration-200 hover:border-[#1D4ED8]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="relative flex h-60 items-center justify-center border-b border-slate-100 bg-slate-950/95 p-3">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-900 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Expand className="h-3 w-3 text-[#1D4ED8]" aria-hidden="true" />
                  Full View
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="truncate">{item.timeframe}</span>
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-2 font-mono text-2xl font-extrabold text-[#059669] tabular-nums">
                    {item.headlineMetric[currency]}
                  </p>

                  <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.caption}
                  </p>
                </div>

                <p className="mt-4 border-t border-slate-100 pt-3 font-mono text-xs font-semibold text-slate-700 tabular-nums">
                  {item.secondaryMetric}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
