import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CurrencyCode, PlanId, getPlanPriceInfo } from '../utils/pricing';

interface MobileStickyBarProps {
  currency: CurrencyCode;
  onEnrollClick: (plan?: PlanId) => void;
}

export function MobileStickyBar({
  currency,
  onEnrollClick,
}: MobileStickyBarProps) {
  const lifetime = getPlanPriceInfo('lifetime', currency);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.1] bg-[#0B0816]/95 px-4 py-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-violet-300">
            Lifetime VIP Access
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-base font-extrabold text-white tabular-nums">
              {lifetime.currentFormatted}
            </span>
            {lifetime.regularFormatted && (
              <span className="font-mono text-xs text-zinc-500 line-through tabular-nums">
                {lifetime.regularFormatted}
              </span>
            )}
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => onEnrollClick('lifetime')}
          whileTap={{ scale: 0.97 }}
          className="btn-sheen violet-cta-glow inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white"
        >
          <span>Join Batch 1</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
