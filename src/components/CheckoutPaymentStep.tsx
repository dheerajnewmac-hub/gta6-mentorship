import { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  Send,
} from 'lucide-react';
import { USDT_WALLET_INFO } from '../data/content';
import {
  CheckoutFormValues,
  PRIMARY_PAYEE_NAME,
  PRIMARY_TELEGRAM_USERNAME,
  PRIMARY_UPI_ID,
  buildTelegramUrl,
  buildUpiUri,
  generateOrderReference,
} from '../utils/checkout';
import {
  CurrencyCode,
  PRICING_PLANS,
  getPlanPriceInfo,
} from '../utils/pricing';

interface CheckoutPaymentStepProps {
  values: CheckoutFormValues;
  currency: CurrencyCode;
  onEditDetails: () => void;
  onClose: () => void;
}


export function CheckoutPaymentStep({
  values,
  currency,
  onEditDetails,
  onClose,
}: CheckoutPaymentStepProps) {
  const [copiedKey, setCopiedKey] = useState<'upi' | 'usdt' | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const plan = PRICING_PLANS[values.planId];
  const priceInfo = getPlanPriceInfo(values.planId, currency);
  const usdPriceInfo = getPlanPriceInfo(values.planId, 'USD');
  const inrAmount = plan.prices.INR.current;
  const orderRef = generateOrderReference(values.planId, values.whatsappNumber);
  const upiId = PRIMARY_UPI_ID;
  const payeeName = PRIMARY_PAYEE_NAME;

  const upiUri = buildUpiUri({
    amountInr: inrAmount,
    orderRef,
    planName: plan.name,
  });

  const telegramUrl = buildTelegramUrl({
    ...values,
    currency,
    orderRef,
  });

  const handleCopy = (text: string, key: 'upi' | 'usdt') => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  };

  if (confirmed) {
    return (
      <div className="space-y-5 py-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/35 bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <div>
          <p className="font-mono text-xs font-semibold text-emerald-400">
            Ref #{orderRef} · Onboarding Queued
          </p>
          <h4 className="mt-1 font-display text-2xl font-extrabold text-white">
            Welcome to Batch 1, {values.fullName}!
          </h4>
          <p className="mt-2 text-sm text-zinc-300">
            Your enrollment details for{' '}
            <span className="font-semibold text-white">{plan.name}</span> have
            been logged. Send your payment screenshot on{' '}
            <strong className="font-semibold text-emerald-400">Telegram (@{PRIMARY_TELEGRAM_USERNAME})</strong> to
            unlock your GTA 6 mentorship access & VIP group within 5 minutes.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#0088cc] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-8px_rgba(0,136,204,0.75)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0077b5]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Send Screenshot to @{PRIMARY_TELEGRAM_USERNAME}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-white/10"
          >
            Return to Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#07050F] p-4">
        <div>
          <p className="font-mono text-xs text-zinc-400">
            Order Ref · {orderRef}
          </p>
          <p className="font-display text-base font-bold text-white">
            {plan.name} ({plan.billingCycleLabel})
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-extrabold text-emerald-400 tabular-nums">
            {values.paymentMethod === 'usdt'
              ? `${usdPriceInfo.currentFormatted} USDT`
              : priceInfo.currentFormatted}
          </p>
          {values.paymentMethod === 'usdt' && currency !== 'USD' && (
            <p className="font-mono text-[11px] text-zinc-400">
              ({priceInfo.currentFormatted})
            </p>
          )}
        </div>
      </div>

      {values.paymentMethod === 'upi' ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex flex-col items-center gap-2">
              <div className="shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-lg">
                <img
                  src="/assets/payment/phonepe_qr.png"
                  alt={`UPI Payment PhonePe QR Code for ${orderRef}`}
                  className="h-32 w-32 object-contain"
                />
              </div>
              <a
                href="/assets/payment/phonepe_qr.png"
                download="PhonePe_QR_Dheeraj.png"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-violet-300 hover:text-white"
              >
                <Download className="h-3 w-3" />
                Download QR
              </a>
            </div>

            <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold text-white sm:justify-start">
                <QrCode
                  className="h-4 w-4 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                <span>Scan with PhonePe, GPay, Paytm or BHIM</span>
              </p>
              
              <div className="rounded-xl border border-white/10 bg-[#07050F] p-3 text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-400">Beneficiary Name</p>
                <p className="font-display text-xs font-bold text-white">{payeeName}</p>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#07050F] px-3.5 py-2.5">
                <div className="min-w-0 text-left">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400">UPI ID</p>
                  <span className="truncate font-mono text-xs font-semibold text-emerald-400">
                    {upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(upiId, 'upi')}
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg bg-violet-600/90 px-2.5 py-1 text-xs font-semibold text-white hover:bg-violet-500"
                >
                  {copiedKey === 'upi' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy UPI
                    </>
                  )}
                </button>
              </div>
              <a
                href={upiUri}
                className="inline-flex text-xs font-semibold text-violet-300 underline underline-offset-4 hover:text-white"
              >
                Open UPI App Directly on Mobile
              </a>
            </div>
          </div>
        </div>
      ) : values.paymentMethod === 'usdt' ? (
        <div className="space-y-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-5">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {/* Real User-Uploaded USDT Tron TRC-20 QR Image */}
            <div className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-white p-1.5 shadow-lg">
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-white">
                <img
                  src={USDT_WALLET_INFO.qrImageSrc}
                  alt={`Official Receive USDT (${USDT_WALLET_INFO.network}) QR code for ${USDT_WALLET_INFO.address}`}
                  className="h-full w-full scale-[1.22] object-cover object-[50%_38%]"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
                <span>Receive {USDT_WALLET_INFO.asset}</span>
                <span>·</span>
                <span>{USDT_WALLET_INFO.network}</span>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300">
                Binance, Bybit, OKX, Trust Wallet ya kisi bhi crypto app se{' '}
                <strong className="font-mono text-white">
                  {usdPriceInfo.currentFormatted} USDT (TRC-20)
                </strong>{' '}
                scan ya copy karke send karein.
              </p>

              <div className="flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-[#07050F] px-3 py-2.5">
                <span className="truncate font-mono text-[11px] text-white">
                  {USDT_WALLET_INFO.address}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(USDT_WALLET_INFO.address, 'usdt')}
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg bg-violet-600/90 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-violet-500"
                >
                  {copiedKey === 'usdt' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-300" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy Wallet
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3.5 py-2.5 text-[11px] leading-relaxed text-amber-200">
            <AlertTriangle
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300"
              aria-hidden="true"
            />
            <span>{USDT_WALLET_INFO.warning}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3 rounded-2xl border border-sky-400/25 bg-sky-500/[0.08] p-5">
          <p className="text-xs font-semibold text-sky-300">
            Pakistan & Direct Telegram Onboarding
          </p>
          <p className="text-sm leading-relaxed text-zinc-300">
            EasyPaisa, JazzCash, Sadapay ya direct Bank Transfer details ke liye
            niche button click karein. Aapka Order Ref{' '}
            <span className="font-mono font-semibold text-white">
              {orderRef}
            </span>{' '}
            Telegram message me auto-fill ho jayega.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-xl border border-white/10 bg-[#07050F] p-3">
              <p className="text-zinc-400">EasyPaisa / JazzCash</p>
              <p className="mt-0.5 font-mono font-semibold text-white">
                Instant Verified Account
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#07050F] p-3">
              <p className="text-zinc-400">Activation Time</p>
              <p className="mt-0.5 font-mono font-semibold text-emerald-400">
                Under 5 Minutes
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="btn-sheen violet-cta-glow inline-flex min-h-[50px] w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white active:scale-[0.98]"
        >
          {values.paymentMethod === 'whatsapp'
            ? 'Confirm & Proceed to Telegram Onboarding'
            : "I've Paid — Activate My Access"}
        </button>
        <button
          type="button"
          onClick={onEditDetails}
          className="py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
        >
          Edit Name, Number, or Plan
        </button>
      </div>
    </div>
  );
}
