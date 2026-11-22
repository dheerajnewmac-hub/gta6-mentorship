import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, ZoomIn } from 'lucide-react';
import { PROOF_ITEMS } from '../data/content';
import { CurrencyCode } from '../utils/pricing';
import {
  ProofCategory,
  ProofItem,
  countProofByCategory,
  filterProofItems,
} from '../utils/proofFilter';

interface ProofVaultProps {
  currency: CurrencyCode;
  onSelectProof: (item: ProofItem) => void;
}

const FILTER_TABS: { id: ProofCategory; label: string }[] = [
  { id: 'all', label: 'All Proofs' },
  { id: 'payouts', label: 'Bank & Payouts' },
  { id: 'analytics', label: 'Viral Analytics' },
];

export function ProofVault({ currency, onSelectProof }: ProofVaultProps) {
  const [activeCategory, setActiveCategory] = useState<ProofCategory>('all');
  const counts = countProofByCategory(PROOF_ITEMS);
  const filteredItems = filterProofItems(PROOF_ITEMS, activeCategory);

  return (
    <section
      id="proof-vault"
      className="relative scroll-mt-20 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Quantix-Style Glowing Hairline Eyebrow */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-violet-500/80" />
            <span>01 · Verified Results</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-violet-500/80" />
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            9 Real Bank, Kick Clipping &amp; Analytics Proofs
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Koi fake edited numbers nahi — direct SBI bank settlement, $953.16
            Kick clipping USDT payment, live payout pipelines aur 1.3M+ views
            dashboards. Saare private clipping platforms mentorship ke andar
            reveal kiye jate hain.
          </p>

          {/* Animated Glass Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter verified proofs by category"
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-[13px] ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="proof-vault-active-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-violet-600 shadow-[0_0_20px_-2px_rgba(139,92,246,0.75)]"
                    />
                  )}
                  <span>
                    {tab.label}{' '}
                    <span className="ml-0.5 font-mono opacity-80">
                      ({counts[tab.id]})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8-Proof Dark Glass Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, idx) => {
            const isTwoColSpan =
              activeCategory === 'all' && item.id === 'sbi-bank-transfer';
            const isFullWidthSpan =
              activeCategory === 'all' && item.id === 'analytics-304k-views';

            const isWideBank = item.id === 'sbi-bank-transfer';
            const isAnalyticsWideStrip = item.id === 'analytics-304k-views';
            const isAnalyticsCard = item.id === 'analytics-1-3m-views';
            const isKickWallet = item.id === 'kick-clipping-953-usdt';
            const isEmailReceipt = item.id === 'payout-email-receipt-76';
            const isCampaignMobile = item.id === 'clipping-campaign-256';

            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(idx * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`glass-card glass-card-hover group flex flex-col overflow-hidden rounded-2xl ${
                  isFullWidthSpan
                    ? 'md:col-span-2 lg:col-span-3'
                    : isTwoColSpan
                    ? 'md:col-span-2 lg:col-span-2'
                    : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProof(item)}
                  aria-label={`Inspect ${item.title}`}
                  className="flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-violet-400"
                >
                  {/* Visual Preview Frame */}
                  <div className="relative overflow-hidden border-b border-white/[0.07] bg-[#0A0714] p-3.5">
                    <div
                      className={`relative overflow-hidden rounded-xl border border-white/[0.08] ${
                        isWideBank
                          ? 'flex min-h-[210px] items-center justify-center bg-white p-3'
                          : isAnalyticsWideStrip
                          ? 'flex min-h-[140px] items-center justify-center bg-[#0C0B0E] p-3 sm:p-5'
                          : isAnalyticsCard
                          ? 'flex aspect-[4/3] items-center justify-center bg-[#0E0D0F] p-2'
                          : isEmailReceipt
                          ? 'aspect-[4/3] bg-white'
                          : 'aspect-[4/3] bg-[#0D0A1A]'
                      }`}
                    >
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                          isWideBank || isAnalyticsWideStrip || isAnalyticsCard
                            ? 'object-contain'
                            : isKickWallet
                            ? 'object-cover object-[50%_22%]'
                            : isEmailReceipt
                            ? 'object-cover object-[50%_72%]'
                            : isCampaignMobile
                            ? 'object-cover object-[50%_54%]'
                            : 'object-cover object-top'
                        }`}
                      />
                    </div>

                    {/* Hover Zoom Badge */}
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#07050F]/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md transition-colors group-hover:border-violet-400/50 group-hover:bg-violet-600/90">
                      <ZoomIn className="h-3 w-3" aria-hidden="true" />
                      <span>Full View</span>
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          {item.verifiedSource}
                        </span>
                        <span className="font-mono text-zinc-500">
                          {item.timeframe}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-mono text-2xl font-extrabold text-white tabular-nums">
                          {item.headlineMetric[currency]}
                        </p>
                        <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-violet-200">
                          {item.secondaryMetric}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-base font-bold text-white transition-colors group-hover:text-violet-200">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                        {item.caption}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3.5 text-xs font-semibold text-zinc-300">
                      <span className="truncate text-zinc-400">
                        {item.platform}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-violet-300 transition-transform group-hover:translate-x-0.5">
                        Details
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
