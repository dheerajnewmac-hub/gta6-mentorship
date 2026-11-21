import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Lock, MessageCircle, Smartphone, X } from 'lucide-react';
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
    currency === 'PKR' ? 'whatsapp' : 'upi'
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
      setPaymentMethod(currency === 'PKR' ? 'whatsapp' : 'upi');
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

  const monthlyPrice = getPlanPriceInfo('monthly', currency);
  const lifetimePrice = getPlanPriceInfo('lifetime', currency);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              Batch 1 Quick Enrollment
            </p>
            <h3
              id="checkout-modal-title"
              className="mt-1 font-display text-2xl font-extrabold text-slate-900"
            >
              {validatedData
                ? 'Complete Your Payment'
                : 'Join Mentorship Now'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout modal"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
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
                <legend className="text-xs font-semibold text-slate-700">
                  Selected Plan
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(['monthly', 'lifetime'] as PlanId[]).map((id) => {
                    const active = planId === id;
                    const priceText =
                      id === 'monthly'
                        ? `${monthlyPrice.currentFormatted}/mo`
                        : `${lifetimePrice.currentFormatted} One-Time`;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPlanId(id)}
                        aria-pressed={active}
                        className={`rounded-xl border p-3 text-left transition-colors ${
                          active
                            ? 'border-[#1D4ED8] bg-blue-50/50 ring-1 ring-[#1D4ED8]/20'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <p className="text-xs font-semibold text-slate-900">
                          {PRICING_PLANS[id].name}
                        </p>
                        <p className="mt-1 font-mono text-sm font-bold text-[#059669] tabular-nums">
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
                  className="block text-xs font-semibold text-slate-700"
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
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="checkout-whatsapp"
                  className="block text-xs font-semibold text-slate-700"
                >
                  WhatsApp Number (Instant Course Access)
                </label>
                <div className="mt-1.5 flex gap-2">
                  <select
                    aria-label="Country code"
                    value={countryCode}
                    onChange={(e) =>
                      setCountryCode(e.target.value as CountryCode)
                    }
                    className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-mono text-slate-900 focus:border-[#1D4ED8] focus:outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    id="checkout-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    placeholder="10-digit WhatsApp number"
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
                    className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/15"
                  />
                </div>
                {errors.whatsappNumber && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                    {errors.whatsappNumber}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="text-xs font-semibold text-slate-700">
                  Preferred Payment Mode
                </legend>
                <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    aria-pressed={paymentMethod === 'upi'}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#1D4ED8] bg-blue-50/50 text-slate-900'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone
                      className="h-4 w-4 shrink-0 text-[#1D4ED8]"
                      aria-hidden="true"
                    />
                    <span>UPI / GPay / PhonePe / Paytm / Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('whatsapp')}
                    aria-pressed={paymentMethod === 'whatsapp'}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${
                      paymentMethod === 'whatsapp'
                        ? 'border-[#059669] bg-emerald-50/60 text-slate-900'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <MessageCircle
                      className="h-4 w-4 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                    <span>Direct WhatsApp / EasyPaisa / JazzCash</span>
                  </button>
                </div>
              </fieldset>

              <motion.button
                type="submit"
                whileHover={{ y: -1.5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                className="btn-sheen mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#1D4ED8] px-6 py-3.5 text-sm sm:text-base font-bold text-white brand-cta-shadow transition-colors hover:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                Continue to Instant Checkout
              </motion.button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5 text-[#059669]" aria-hidden="true" />
                <span>Instant access within 5 minutes after payment</span>
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
