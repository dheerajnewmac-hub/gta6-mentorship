import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Quote, Star } from 'lucide-react';
import { STUDENT_REVIEWS } from '../data/reviews';
import { PlanId } from '../utils/pricing';
import {
  ReviewFilter,
  computeRatingSummary,
  filterStudentReviews,
} from '../utils/reviews';

interface StudentReviewsSectionProps {
  onEnrollClick: (plan?: PlanId) => void;
}

const REVIEW_FILTERS: { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: 'All Reviews (12)' },
  { id: 'pro', label: 'Pro Plan · ₹999' },
  { id: 'starter', label: 'Starter Plan · ₹499' },
];

export function StudentReviewsSection({
  onEnrollClick,
}: StudentReviewsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');

  const summary = computeRatingSummary(STUDENT_REVIEWS);
  const visibleReviews = filterStudentReviews(STUDENT_REVIEWS, activeFilter);

  return (
    <section
      id="reviews"
      className="relative scroll-mt-20 border-t border-white/[0.06] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Rating Summary Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/80" />
            <span>Mentorship Rating &amp; Student Reviews</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/80" />
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Students Kya Bolte Hain Is Mentorship Ke Baare Me
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            India aur Pakistan ke students jo daily phone aur PC se GTA 6
            clipping, Free Instagram Automation Software aur hamare direct
            monthly campaigns se earn kar rahe hain.
          </p>
        </div>

        {/* Overall Mentorship Rating Dashboard Card */}
        <div className="mt-9 grid grid-cols-1 items-center gap-6 rounded-2xl border border-amber-400/25 bg-gradient-to-br from-[#160D2C] via-[#0F0920] to-[#0B0718] p-6 sm:p-7 lg:grid-cols-12">
          {/* Left: Big Score + 5 Stars */}
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Verified Mentorship Rating
            </p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-mono text-5xl font-extrabold tracking-tight text-white tabular-nums sm:text-6xl">
                {summary.averageRating}
              </span>
              <span className="font-mono text-lg font-semibold text-zinc-400">
                / 5.0
              </span>
            </div>
            <div
              className="mt-2 flex items-center gap-1"
              aria-label={`Rated ${summary.averageRating} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-2 text-xs font-medium text-zinc-300">
              {summary.totalReviews} Verified Student Reviews · 480+ Active Members
            </p>
          </div>

          {/* Center: Rating Breakdown Bars */}
          <div className="space-y-2.5 lg:col-span-5">
            <div className="flex items-center gap-3 text-xs">
              <span className="w-14 shrink-0 whitespace-nowrap font-mono font-semibold text-amber-300">
                5 Star
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300"
                  style={{ width: `${summary.fiveStarPercent}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-zinc-300 tabular-nums">
                {summary.fiveStarPercent}% ({summary.fiveStarCount})
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="w-14 shrink-0 whitespace-nowrap font-mono font-semibold text-zinc-300">
                4 Star
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-violet-400"
                  style={{ width: `${summary.fourStarPercent}%` }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-zinc-400 tabular-nums">
                {summary.fourStarPercent}% ({summary.fourStarCount})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-zinc-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>95%+ Clip Approval</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Direct Monthly Paid Campaigns</span>
              </span>
            </div>
          </div>

          {/* Right: Filter Controls */}
          <div className="flex flex-col items-center gap-3 lg:col-span-3 lg:items-end">
            <p className="text-xs font-semibold text-zinc-400">
              Filter by Plan Purchased
            </p>
            <div
              role="tablist"
              aria-label="Filter student reviews by plan"
              className="flex flex-wrap justify-center gap-1.5 lg:justify-end"
            >
              {REVIEW_FILTERS.map((tab) => {
                const active = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-violet-600 text-white shadow-sm'
                        : 'border border-white/10 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 12 Student Review Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, idx) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: Math.min(idx * 0.04, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card glass-card-hover flex flex-col justify-between rounded-2xl p-5"
            >
              <div>
                {/* Student Avatar + Name + City + Stars */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-violet-400/50 bg-[#120A24]">
                      <img
                        src={review.avatar}
                        alt={`${review.name} — verified student`}
                        referrerPolicy="no-referrer"
                        className={`h-full w-full object-cover object-top ${
                          review.avatarZoom ? 'scale-[1.15]' : ''
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-bold text-white">
                        {review.name}
                      </h3>
                      <p className="truncate text-[11px] text-zinc-400">
                        {review.city} · {review.dateLabel}
                      </p>
                      <div
                        className="mt-1 flex items-center gap-0.5"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-600'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote
                    className="h-5 w-5 shrink-0 text-violet-400/40"
                    aria-hidden="true"
                  />
                </div>

                {/* Review Text */}
                <p className="mt-3.5 text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Footer: Verified Outcome + Plan */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3 text-[11px]">
                <span className="font-mono font-bold text-emerald-300">
                  {review.outcome}
                </span>
                <span className="font-medium text-violet-300">
                  {review.planLabel}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Conversion Strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-violet-400/25 bg-violet-500/[0.08] p-5 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-base font-bold text-white sm:text-lg">
              Ready to Be the Next Verified Student Success Story?
            </p>
            <p className="mt-0.5 text-xs text-zinc-300 sm:text-sm">
              ₹499 (1+1 Month) ya ₹999 (1+2 Months All Software + Direct Campaigns) se aaj hi shuru karo.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => onEnrollClick('pro')}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="btn-sheen gold-cta-glow inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold"
          >
            <span>Join Mentorship Now</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
