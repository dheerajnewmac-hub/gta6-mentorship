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
  const pro = getPlanPriceInfo('pro', currency);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.1] bg-[#0B0816]/95 px-4 py-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-amber-300">
            Pro All-Software · 1+2 Mo
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-base font-extrabold text-white tabular-nums">
              {pro.currentFormatted}
            </span>
            {pro.regularFormatted && (
              <span className="font-mono text-xs text-zinc-500 line-through tabular-nums">
                {pro.regularFormatted}
              </span>
            )}
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => onEnrollClick('pro')}
          whileTap={{ scale: 0.97 }}
          className="btn-sheen gold-cta-glow inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-5 py-2 text-xs font-extrabold"
        >
          <span>Enroll Now</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
