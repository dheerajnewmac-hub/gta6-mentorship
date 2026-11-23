import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#05030B] pb-24 pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 text-white ring-1 ring-white/20">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-white">
                GTA 6 Income Pro
              </p>
              <p className="text-xs text-zinc-500">
                India · Pakistan · Global Creators (UPI / USDT TRC-20 / Telegram)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-zinc-400">
            <a href="#pricing" className="hover:text-white">
              Plans
            </a>
            <a href="#proof-vault" className="hover:text-white">
              Results (9)
            </a>
            <a href="#reviews" className="hover:text-white">
              Reviews (12)
            </a>
            <a href="#modules" className="hover:text-white">
              Modules
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-white/[0.06] pt-6 text-[11px] leading-relaxed text-zinc-500">
          Disclaimer: Displayed payout screenshots represent real historical
          clipping &amp; verified campaign results. Individual results depend on
          consistent execution, clip quality, and platform guidelines. Independent
          creator mentorship — not affiliated with Rockstar Games or Take-Two
          Interactive.
        </p>
      </div>
    </footer>
  );
}
