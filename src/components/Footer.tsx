import { Mail, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#FAFAFB] pt-10 pb-22 md:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-base font-bold text-slate-900"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D4ED8] text-white"
            >
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="font-display">
              GTA 6 <span className="text-[#1D4ED8]">Clipping</span> Mentorship
            </span>
          </a>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <a href="#proof" className="hover:text-slate-900 transition-colors">
              My Earnings
            </a>
            <a
              href="#gta6-earning"
              className="hover:text-slate-900 transition-colors"
            >
              How You Earn
            </a>
            <a
              href="#mentorship"
              className="hover:text-slate-900 transition-colors"
            >
              Mentorship
            </a>
            <a
              href="#pricing"
              className="hover:text-slate-900 transition-colors"
            >
              Pricing
            </a>
          </div>

          <a
            href="mailto:support@gta6clippingmastery.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#1D4ED8] transition-colors"
          >
            <Mail className="h-4 w-4 text-[#1D4ED8]" aria-hidden="true" />
            <span>support@gta6clippingmastery.com</span>
          </a>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} GTA 6 Clipping Mentorship. Privacy
            Policy · Mentorship Terms.
          </p>
          <p className="max-w-xl sm:text-right">
            Disclaimer: Not affiliated with Rockstar Games. Shared bank &
            reward screenshots are real personal results; individual earnings
            depend on daily consistency.
          </p>
        </div>
      </div>
    </footer>
  );
}
