import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { CurrencyCode, PlanId } from '../utils/pricing';
import { ProofItem } from '../utils/proofFilter';

interface ProofLightboxProps {
  item: ProofItem | null;
  currency: CurrencyCode;
  onClose: () => void;
  onEnrollClick: (planId: PlanId) => void;
}

export function ProofLightbox({
  item,
  currency,
  onClose,
  onEnrollClick,
}: ProofLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#059669]">
              {item.verifiedSource} · {item.timeframe}
            </p>
            <h3
              id="lightbox-title"
              className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-slate-900"
            >
              {item.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close proof preview"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex max-h-[420px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-950 p-3">
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            referrerPolicy="no-referrer"
            className="max-h-[390px] w-auto rounded-lg object-contain"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {item.breakdown.map((row) => (
            <div
              key={row.label}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
            >
              <p className="text-xs text-slate-500">{row.label}</p>
              <p className="mt-0.5 font-mono text-sm font-bold text-slate-900 tabular-nums">
                {row.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
            <CheckCircle2
              className="h-4 w-4 shrink-0 text-[#059669]"
              aria-hidden="true"
            />
            <span>
              Verified Result:{' '}
              <strong className="font-mono text-[#059669]">
                {item.headlineMetric[currency]}
              </strong>
            </span>
          </p>

          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            onClick={() => {
              onClose();
              onEnrollClick('lifetime');
            }}
            className="btn-sheen group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-bold text-white whitespace-nowrap shrink-0 brand-cta-shadow transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
          >
            <span>Learn This GTA 6 System</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
