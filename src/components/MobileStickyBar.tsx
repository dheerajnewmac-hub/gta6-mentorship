import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { CurrencyCode, PlanId, getPlanPriceInfo } from '../utils/pricing';

interface MobileStickyBarProps {
  currency: CurrencyCode;
  onEnrollClick: (planId: PlanId) => void;
}

export function MobileStickyBar({
  currency,
  onEnrollClick,
}: MobileStickyBarProps) {
  const lifetime = getPlanPriceInfo('lifetime', currency);
  const monthly = getPlanPriceInfo('monthly', currency);

  return (
    <div
      data-testid="mobile-sticky-bar"
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 backdrop-blur-md shadow-[0_-4px_16px_rgba(15,23,42,0.06)] md:hidden"
    >
      <div className="min-w-0">
        <p className="font-mono text-sm font-extrabold text-slate-900 tabular-nums truncate">
          {monthly.currentFormatted}/mo · {lifetime.currentFormatted} VIP
        </p>
        <p className="text-[11px] font-medium text-[#059669] truncate">
          GTA 6 Batch 1 · 12 Spots
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => onEnrollClick('lifetime')}
          aria-label="Quick Telegram Enrollment"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-[#0088cc] transition-colors hover:bg-sky-100"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 450, damping: 24 }}
          onClick={() => onEnrollClick('lifetime')}
          className="btn-sheen inline-flex h-10 items-center justify-center rounded-lg bg-[#1D4ED8] px-4 text-xs font-bold text-white whitespace-nowrap brand-cta-shadow hover:bg-[#1E40AF]"
        >
          Join Mentorship
        </motion.button>
      </div>
    </div>
  );
}
