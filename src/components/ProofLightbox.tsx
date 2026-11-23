import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { CurrencyCode, PlanId } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface ProofLightboxProps {
  item: ProofItem | null;
  currency: CurrencyCode;
  onClose: () => void;
  onEnrollClick: (plan?: PlanId) => void;
}

export function ProofLightbox({
  item,
  currency,
  onClose,
  onEnrollClick,
}: ProofLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="proof-lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04020A]/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-[#0E0A1D] p-5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {item.verifiedSource} · {item.timeframe}
              </span>
            </p>
            <h3
              id="proof-lightbox-title"
              className="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl"
            >
              {item.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close proof preview"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Full Uncropped Screenshot */}
          <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07050F] p-3 lg:col-span-7">
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              className="max-h-[62vh] w-full rounded-xl object-contain"
            />
          </div>

          {/* Breakdown & Enroll Action */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-5">
            <div>
              <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-4">
                <p className="text-xs font-medium text-violet-200">
                  Verified Headline Result
                </p>
                <p className="mt-1 font-mono text-3xl font-extrabold text-emerald-400 tabular-nums">
                  {item.headlineMetric[currency]}
                </p>
                <p className="mt-1 font-mono text-xs text-zinc-300">
                  {item.secondaryMetric}
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {item.caption}
              </p>

              <div className="mt-5 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Proof Breakdown
                </p>
                {item.breakdown.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5 text-xs"
                  >
                    <span className="text-zinc-400">{row.label}</span>
                    <span className="font-mono font-semibold text-white">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => {
                onClose();
                onEnrollClick('pro');
              }}
              whileHover={{ y: -1.5, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="btn-sheen gold-cta-glow inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold"
            >
              <span>Join Pro Program &amp; Get Free Software</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
