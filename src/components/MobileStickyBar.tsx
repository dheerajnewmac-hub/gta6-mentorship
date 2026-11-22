import { ArrowRight, Gift } from 'lucide-react';
import { CurrencyCode, PlanId, getPlanPriceInfo } from '../utils/pricing';

interface MobileStickyBarProps {
  currency: CurrencyCode;
  onEnrollClick: (plan?: PlanId) => void;
}

export function MobileStickyBar({
  currency,
  onEnrollClick,
}: MobileStickyBarProps) {
  const starter = getPlanPriceInfo('starter_2m', currency);
  const vip = getPlanPriceInfo('vip_3m', currency);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.1] bg-[#0B0816]/95 px-4 py-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
            <Gift className="h-3 w-3" />
            1+1 Mo {starter.currentFormatted} · 1+2 Mo VIP {vip.currentFormatted}
          </p>
          <p className="text-[10px] text-zinc-400">
            Free Instagram Software Included
          </p>
        </div>

        <button
          type="button"
          onClick={() => onEnrollClick('vip_3m')}
          className="btn-sheen violet-cta-glow inline-flex min-h-[42px] shrink-0 items-center justify-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.7)]"
        >
          <span>Claim Pass</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
