import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import {
  LIVE_BUYERS,
  LIVE_BUYER_TIMING,
  formatLiveBuyerNotification,
  getNextBuyerIndex,
  getNextPopupDelayMs,
} from '../utils/liveBuyers';
import { CurrencyCode, PlanId } from '../utils/pricing';

interface LiveBuyerToastProps {
  currency: CurrencyCode;
  isPaused: boolean;
  onSelectPlan: (planId: PlanId) => void;
}

export function LiveBuyerToast({
  currency,
  isPaused,
  onSelectPlan,
}: LiveBuyerToastProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isDismissed || isPaused) {
      return;
    }

    if (!isVisible) {
      const delay =
        cycleCount === 0
          ? LIVE_BUYER_TIMING.initialDelayMs
          : getNextPopupDelayMs(cycleCount - 1);
      const showTimer = window.setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => window.clearTimeout(showTimer);
    }

    if (isHovered) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      setCycleCount((prev) => prev + 1);
      setCurrentIndex((prev) => getNextBuyerIndex(prev, LIVE_BUYERS.length));
    }, LIVE_BUYER_TIMING.visibleDurationMs);

    return () => window.clearTimeout(hideTimer);
  }, [cycleCount, isDismissed, isHovered, isPaused, isVisible]);

  const activeBuyer = formatLiveBuyerNotification(
    LIVE_BUYERS[currentIndex],
    currency
  );
  const shouldRender = isVisible && !isDismissed && !isPaused;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-16 left-2.5 z-40 flex justify-start sm:bottom-5 sm:left-5"
    >
      <AnimatePresence mode="wait">
        {shouldRender && (
          <motion.aside
            key={activeBuyer.id}
            data-testid="live-buyer-toast"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
              transition: { duration: 0.15, ease: 'easeOut' },
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pointer-events-auto relative w-[252px] overflow-hidden rounded-lg border border-slate-200/90 bg-white/95 px-2.5 py-2 shadow-[0_10px_26px_-8px_rgba(15,23,42,0.18)] backdrop-blur-md sm:w-[324px] sm:rounded-xl sm:p-3"
          >
            {/* Subtle top progress bar */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-slate-100">
              <motion.div
                key={`${activeBuyer.id}-progress`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{
                  duration: isHovered
                    ? 0.2
                    : LIVE_BUYER_TIMING.visibleDurationMs / 1000,
                  ease: 'linear',
                }}
                style={{ transformOrigin: 'left' }}
                className={`h-full w-full ${
                  activeBuyer.isLifetime ? 'bg-[#1D4ED8]' : 'bg-[#059669]'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 sm:items-start sm:gap-3">
              {/* Buyer Avatar with Live Verified Dot */}
              <div className="relative shrink-0">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-extrabold tracking-tight sm:h-9 sm:w-9 sm:text-xs ${
                    activeBuyer.isLifetime
                      ? 'bg-blue-50 text-[#1D4ED8] ring-1 ring-blue-200/80'
                      : 'bg-emerald-50 text-[#059669] ring-1 ring-emerald-200/80'
                  }`}
                >
                  {activeBuyer.initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 sm:h-3.5 sm:w-3.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#059669] animate-pulse sm:h-2 sm:w-2" />
                </span>
              </div>

              {/* Purchase Content */}
              <div className="min-w-0 flex-1 pr-4 sm:pr-5">
                <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500 sm:gap-1.5 sm:text-[11px]">
                  <span className="truncate font-bold text-slate-900">
                    {activeBuyer.name}
                  </span>
                  <span aria-hidden="true" className="hidden sm:inline">
                    ·
                  </span>
                  <span className="hidden truncate sm:inline">
                    {activeBuyer.city}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0 font-semibold text-[#059669]">
                    {activeBuyer.timeAgo}
                  </span>
                </div>

                <p className="mt-0.5 text-[11px] leading-tight text-slate-700 sm:text-xs sm:leading-snug">
                  Bought{' '}
                  <span className="font-bold text-slate-950">
                    {activeBuyer.planName}
                  </span>{' '}
                  <span className="inline-flex items-center rounded bg-emerald-50 px-1 py-0.5 font-mono text-[10px] font-extrabold text-[#059669] tabular-nums ring-1 ring-emerald-200/70 sm:px-1.5 sm:text-[11px]">
                    {activeBuyer.priceFormatted}
                  </span>
                </p>

                <div className="mt-1 hidden items-center justify-between gap-2 sm:flex">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                    <CheckCircle2
                      className="h-3 w-3 text-[#059669]"
                      aria-hidden="true"
                    />
                    {activeBuyer.paymentMethod}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectPlan(activeBuyer.planId)}
                    className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#1D4ED8] transition-colors hover:text-[#1E40AF] focus:outline-none focus-visible:underline"
                  >
                    Join Now
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                aria-label="Dismiss live buyer notification"
                className="absolute right-1.5 top-1.5 rounded-md p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:right-2 sm:top-2 sm:p-1"
              >
                <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
