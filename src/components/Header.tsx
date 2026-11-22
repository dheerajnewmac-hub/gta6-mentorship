import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react';
import { PlanId } from '../utils/pricing';

interface HeaderProps {
  onEnrollClick: (plan?: PlanId) => void;
}

const NAV_LINKS = [
  { href: '#proof-vault', label: 'Results (9)' },
  { href: '#blueprint', label: 'How It Works' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Header({ onEnrollClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#07050F]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Mark */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.85)] ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <span className="block font-display text-[15px] font-bold tracking-tight text-white">
              GTA 6 Clipping
            </span>
            <span className="block text-[11px] font-medium text-zinc-400">
              Mentorship · Batch 1
            </span>
          </div>
        </a>

        {/* Centered Floating Glass Nav Pill (Quantix signature) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-full border border-white/[0.09] bg-white/[0.04] p-1.5 backdrop-blur-md md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Glowing Pill CTA */}
        <div className="hidden items-center md:flex">
          <motion.button
            type="button"
            onClick={() => onEnrollClick('lifetime')}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 440, damping: 24 }}
            className="btn-sheen violet-cta-glow inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <span>Join Mentorship</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 transition-colors hover:bg-white/10 hover:text-white md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#0B0816]/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnrollClick('lifetime');
                }}
                className="btn-sheen violet-cta-glow mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              >
                <span>Join GTA 6 Mentorship</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
