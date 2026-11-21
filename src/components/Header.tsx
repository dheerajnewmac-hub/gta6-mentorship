import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { CurrencyCode, PlanId } from '../utils/pricing';

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onEnrollClick: (planId?: PlanId) => void;
}

const NAV_LINKS = [
  { href: '#proof', label: 'My Earnings' },
  { href: '#gta6-earning', label: 'How You Earn' },
  { href: '#mentorship', label: 'Mentorship' },
  { href: '#pricing', label: 'Pricing' },
];

const CURRENCY_OPTIONS: {
  code: CurrencyCode;
  mobileLabel: string;
  desktopLabel: string;
  ariaLabel: string;
}[] = [
  { code: 'INR', mobileLabel: '₹', desktopLabel: 'INR ₹', ariaLabel: 'INR ₹' },
  {
    code: 'PKR',
    mobileLabel: 'Rs',
    desktopLabel: 'PKR Rs.',
    ariaLabel: 'PKR Rs.',
  },
  { code: 'USD', mobileLabel: '$', desktopLabel: 'USD $', ariaLabel: 'USD $' },
];

export function Header({
  currency,
  onCurrencyChange,
  onEnrollClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-14 md:h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 text-xs sm:text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#1D4ED8] text-white shrink-0"
          >
            <ShieldCheck className="h-4 w-4" />
          </span>
          <span className="font-display">
            GTA 6 <span className="text-[#1D4ED8]">Clipping</span> Mentorship
          </span>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            role="group"
            aria-label="Select currency"
            className="flex items-center rounded-lg border border-slate-200 bg-slate-100/80 p-0.5"
          >
            {CURRENCY_OPTIONS.map((option) => {
              const active = currency === option.code;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => onCurrencyChange(option.code)}
                  aria-pressed={active}
                  aria-label={option.ariaLabel}
                  className={`rounded-md px-2 sm:px-2.5 py-1 text-xs font-semibold tabular-nums whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="sm:hidden">{option.mobileLabel}</span>
                  <span className="hidden sm:inline">{option.desktopLabel}</span>
                </button>
              );
            })}
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -1.5, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 460, damping: 24 }}
            onClick={() => onEnrollClick('lifetime')}
            className="btn-sheen hidden sm:inline-flex items-center justify-center rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 brand-cta-shadow transition-colors duration-150 hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            Join Mentorship
          </motion.button>
        </div>
      </div>
    </header>
  );
}
