import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { PlanId } from '../utils/pricing';

interface FaqSectionProps {
  onEnrollClick: (plan?: PlanId) => void;
}

export function FaqSection({ onEnrollClick }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
            <span>05 · FAQ</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Aapke Sawal, Seedhe Jawab
          </h2>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Join karne se pehle har zaroori doubt yahan clear kar lo.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-violet-400/40 bg-violet-500/[0.08]'
                    : 'border-white/[0.08] bg-white/[0.025] hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-violet-400"
                >
                  <span className="font-display text-sm font-bold text-white sm:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 border-violet-400/40 text-violet-200' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.07] px-5 pb-5 pt-3.5 text-sm leading-relaxed text-zinc-300 sm:px-6">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Final Luminous Conversion CTA Block */}
        <div className="vip-cosmic-card relative mt-16 overflow-hidden rounded-3xl p-8 text-center sm:mt-20 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/35 blur-3xl"
          />

          <p className="font-mono text-xs font-semibold tracking-wide text-amber-300">
            Skill Seekho · Income Kamao
          </p>
          <h3 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Free Insta Software + Monthly Paid Work Group Join Karo
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">
            ₹499 (1+1 Month) ya ₹999 (1+2 Months All Software + Future Software
            FREE) choose karo aur 5 minute me Telegram par start karo.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.button
              type="button"
              onClick={() => onEnrollClick('pro')}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              className="btn-sheen gold-cta-glow inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[15px] font-extrabold sm:w-auto"
            >
              <span>Enroll Now &amp; Start Earning Today</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
