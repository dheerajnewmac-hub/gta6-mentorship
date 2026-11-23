import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Coins, Lock, MessageCircle, Smartphone, X } from 'lucide-react';
import {
  COUNTRY_CODES,
  CheckoutFormValues,
  CountryCode,
  PaymentMethod,
  validateCheckoutForm,
} from '../utils/checkout';
import {
  CurrencyCode,
  PRICING_PLANS,
  PlanId,
  getPlanPriceInfo,
} from '../utils/pricing';
import { CheckoutPaymentStep } from './CheckoutPaymentStep';

interface CheckoutModalProps {
  isOpen: boolean;
  initialPlan: PlanId;
  currency: CurrencyCode;
  onClose: () => void;
}

export function CheckoutModal({
  isOpen,
  initialPlan,
  currency,
  onClose,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>(
    currency === 'PKR' ? '+92' : currency === 'USD' ? '+1' : '+91'
  );
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [planId, setPlanId] = useState<PlanId>(initialPlan);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    currency === 'PKR' ? 'whatsapp' : currency === 'USD' ? 'usdt' : 'upi'
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormValues, string>>
  >({});
  const [validatedData, setValidatedData] = useState<CheckoutFormValues | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      setPlanId(initialPlan);
      setValidatedData(null);
      setErrors({});
      setCountryCode(
        currency === 'PKR' ? '+92' : currency === 'USD' ? '+1' : '+91'
      );
      setPaymentMethod(
        currency === 'PKR' ? 'whatsapp' : currency === 'USD' ? 'usdt' : 'upi'
      );
    }
  }, [isOpen, initialPlan, currency]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const starterPrice = getPlanPriceInfo('starter', currency);
  const proPrice = getPlanPriceInfo('pro', currency);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateCheckoutForm({
      fullName,
      countryCode,
      whatsappNumber,
      planId,
      paymentMethod,
    });

    if (!result.success || !result.data) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setValidatedData(result.data);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04020A]/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-violet-400/25 bg-[#0E0A1D] p-5 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <p className="text-xs font-semibold text-amber-300">
              Instant Software + Paid Work Group Onboarding
            </p>
            <h3
              id="checkout-modal-title"
              className="mt-1 font-display text-2xl font-extrabold text-white"
            >
              {validatedData
                ? 'Complete Your Payment'
                : 'Enroll in Monthly Program'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout modal"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-violet-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          {validatedData ? (
            <CheckoutPaymentStep
              values={validatedData}
              currency={currency}
              onEditDetails={() => setValidatedData(null)}
              onClose={onClose}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <fieldset>
                <legend className="text-xs font-semibold text-zinc-300">
                  Selected Monthly Plan
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(['starter', 'pro'] as PlanId[]).map((id) => {
                    const active = planId === id;
                    const priceText =
                      id === 'starter'
                        ? `${starterPrice.currentFormatted} · 1+1 Mo`
                        : `${proPrice.currentFormatted} · 1+2 Mo`;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPlanId(id)}
                        aria-pressed={active}
                        className={`rounded-2xl border p-3.5 text-left transition-all ${
                          active
                            ? 'border-amber-400/60 bg-violet-500/20 text-white shadow-[0_0_24px_-8px_rgba(139,92,246,0.7)]'
                            : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'
                        }`}
                      >
                        <p className="text-xs font-semibold">
                          {PRICING_PLANS[id].shortName}
                        </p>
                        <p
                          className={`mt-1 font-mono text-sm font-bold tabular-nums ${
                            active ? 'text-amber-300' : 'text-emerald-400'
                          }`}
                        >
                          {priceText}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="checkout-full-name"
                  className="block text-xs font-semibold text-zinc-300"
                >
                  Full Name
                </label>
                <input
                  id="checkout-full-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Aarav Sharma or Hamza Khan"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) {
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.fullName)}
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#07050F] px-3.5 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-400">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-whatsapp"
                  className="block text-xs font-semibold text-zinc-300"
                >
                  Phone / Telegram Number (Instant Access)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <select
                    aria-label="Country code"
                    value={countryCode}
                    onChange={(e) =>
                      setCountryCode(e.target.value as CountryCode)
                    }
                    className="rounded-xl border border-white/15 bg-[#07050F] px-3 py-3 font-mono text-sm text-white focus:border-violet-400 focus:outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#0E0A1D]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    id="checkout-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit phone number"
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (errors.whatsappNumber) {
                        setErrors((prev) => ({
                          ...prev,
                          whatsappNumber: undefined,
                        }));
                      }
                    }}
                    aria-invalid={Boolean(errors.whatsappNumber)}
                    className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#07050F] px-3.5 py-3 font-mono text-sm text-white placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25"
                  />
                </div>
                {errors.whatsappNumber && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-400">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-xs font-semibold text-zinc-300">
                  Preferred Payment Mode
                </legend>
                <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    aria-pressed={paymentMethod === 'upi'}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-violet-400/60 bg-violet-500/20 text-white'
                        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <Smartphone
                      className="h-4 w-4 shrink-0 text-violet-300"
                      aria-hidden="true"
                    />
                    <span>UPI / GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('usdt')}
                    aria-pressed={paymentMethod === 'usdt'}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                      paymentMethod === 'usdt'
                        ? 'border-emerald-400/60 bg-emerald-500/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <Coins
                      className="h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>USDT (Tron TRC-20)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    aria-pressed={paymentMethod === 'whatsapp'}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                      paymentMethod === 'whatsapp'
                        ? 'border-sky-400/60 bg-sky-500/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <MessageCircle
                      className="h-4 w-4 shrink-0 text-sky-400"
                      aria-hidden="true"
                    />
                    <span>EasyPaisa / Telegram</span>
                  </button>
                </div>
              </fieldset>

              <motion.button
                type="submit"
                whileHover={{ y: -1.5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="btn-sheen violet-cta-glow mt-2 inline-flex min-h-[50px] w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-white sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                Continue to Instant Checkout
              </motion.button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
                <Lock className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Instant Telegram access within 5 minutes after payment</span>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
