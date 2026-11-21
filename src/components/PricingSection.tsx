import { motion } from 'motion/react';
import { ArrowRight, Check, Crown, Users } from 'lucide-react';
import { MENTORSHIP_PILLARS } from '../data/content';
import {
  CURRENCY_META,
  CurrencyCode,
  PRICING_PLANS,
  PlanId,
  getPlanPriceInfo,
} from '../utils/pricing';

interface PricingSectionProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onSelectPlan: (planId: PlanId) => void;
}

const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: 'INR', label: 'India (INR ₹)' },
  { code: 'PKR', label: 'Pakistan (PKR Rs.)' },
  { code: 'USD', label: 'Global (USD $)' },
];

export function PricingSection({
  currency,
  onCurrencyChange,
  onSelectPlan,
}: PricingSectionProps) {
  const orderedPlans: PlanId[] = ['monthly', 'lifetime'];
  const meta = CURRENCY_META[currency];

  return (
    <section
      id="mentorship"
      aria-labelledby="mentorship-heading"
      className="border-b border-slate-200/80 bg-[#FAFAFB] py-14 sm:py-18"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-semibold text-[#1D4ED8]">
            GTA 6 Clipping Mentorship · Batch 1
          </p>
          <h2
            id="mentorship-heading"
            className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
          >
            Mentorship Me Aapko Exact Kya Milega
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            Sirf recorded videos nahi — mera exact GTA 6 clipping workflow,
            live payout campaigns, ready-made editing pack ({meta.bonusValue}{' '}
            value included), aur direct mentor support.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORSHIP_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.32,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-slate-200 bg-white p-5 soft-card-shadow"
            >
              <Check
                className="h-5 w-5 text-[#059669]"
                aria-hidden="true"
              />
              <h3 className="mt-2.5 font-display text-base font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                {pillar.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          id="pricing"
          className="mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between scroll-mt-20"
        >
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#059669]">
              Simple Transparent Pricing · 12 Spots Left
            </p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Choose Your Mentorship Plan
            </h3>
          </div>

          <div
            role="group"
            aria-label="Pricing currency selector"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 self-start md:self-auto"
          >
            {CURRENCIES.map((item) => {
              const active = currency === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onCurrencyChange(item.code)}
                  aria-pressed={active}
                  className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                    active
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          {orderedPlans.map((planId) => {
            const plan = PRICING_PLANS[planId];
            const price = getPlanPriceInfo(planId, currency);
            const isVip = plan.popular;

            return (
              <motion.div
                key={plan.id}
                data-testid={`pricing-card-${plan.id}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 soft-card-shadow ${
                  isVip
                    ? 'border-[#1D4ED8] bg-white ring-1 ring-[#1D4ED8]/15'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-semibold ${
                        isVip ? 'text-[#1D4ED8]' : 'text-slate-500'
                      }`}
                    >
                      {isVip
                        ? 'Most Popular · Best Value'
                        : 'Flexible Monthly Learning'}
                    </p>
                    {isVip && (
                      <Crown
                        className="h-5 w-5 text-amber-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <h4 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {plan.name}
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">{plan.subtitle}</p>

                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-slate-100 py-4">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                      {price.currentFormatted}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {plan.billingCycleLabel}
                    </span>
                    {price.regularFormatted && (
                      <span className="font-mono text-sm text-slate-400 line-through tabular-nums">
                        {price.regularFormatted}
                      </span>
                    )}
                    {price.savingsPercent && (
                      <span className="font-mono text-xs font-bold text-[#059669] tabular-nums">
                        Save {price.savingsPercent}%
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700"
                      >
                        <Check
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            isVip ? 'text-[#059669]' : 'text-[#1D4ED8]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-5 rounded-xl border px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      isVip
                        ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 font-medium'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {plan.shortNote}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                    onClick={() => onSelectPlan(plan.id)}
                    className={`group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base font-bold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isVip
                        ? 'btn-sheen bg-[#1D4ED8] text-white brand-cta-shadow hover:bg-[#1E40AF]'
                        : 'border border-slate-300 bg-slate-50 text-slate-900 hover:border-[#1D4ED8]/50 hover:bg-slate-100'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </motion.button>
                  <p className="mt-2.5 text-center text-xs text-slate-500">
                    UPI · GPay · PhonePe · EasyPaisa · JazzCash · Instant Access
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1D4ED8] border border-blue-200"
            >
              <Users className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8]">
                Direct Mentor Support · Live GTA 6 Updates
              </p>
              <h4 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                Akele Nahi Seekhoge: Personal Clip Reviews & Payout Guidance.
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-700">
                Har student ko private community me daily clip feedback,
                latest GTA 6 viral angles, aur direct bank payout setup support
                milta hai taaki aap fast results la sakein.
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            onClick={() => onSelectPlan('lifetime')}
            className="btn-sheen group inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-bold text-white whitespace-nowrap shrink-0 brand-cta-shadow transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <span>Book Your Spot</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
