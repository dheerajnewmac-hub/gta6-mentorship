import { useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  Send,
} from 'lucide-react';
import {
  CheckoutFormValues,
  PRIMARY_PAYEE_NAME,
  PRIMARY_UPI_ID,
  PAYMENT_QR_IMAGE_PATH,
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
  const [copiedId, setCopiedId] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const plan = PRICING_PLANS[values.planId];
  const priceInfo = getPlanPriceInfo(values.planId, currency);
  const inrAmount = plan.prices.INR.current;
  const orderRef = generateOrderReference(values.planId, values.whatsappNumber);
  const upiId = PRIMARY_UPI_ID;

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

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(upiId);
    }
    setCopiedId(true);
    window.setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = PAYMENT_QR_IMAGE_PATH;
    link.download = `PhonePe_QR_Dheeraj_Kiroriwal_${orderRef}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (confirmed) {
    return (
      <div className="space-y-5 py-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0284C7] border border-sky-200">
          <CheckCircle2 className="h-8 w-8 text-[#059669]" />
        </div>
        <div>
          <p className="font-mono text-xs font-semibold text-[#059669]">
            Ref #{orderRef} · Onboarding Queued
          </p>
          <h4 className="mt-1 font-display text-2xl font-extrabold text-slate-900">
            Welcome to Batch 1, {values.fullName}!
          </h4>
          <p className="mt-2 text-sm text-slate-600">
            Your enrollment details for{' '}
            <span className="font-semibold text-slate-900">{plan.name}</span>{' '}
            have been logged. Send your payment screenshot on{' '}
            <strong className="font-semibold text-slate-900">Telegram</strong>{' '}
            to unlock your GTA 6 mentorship access & VIP group within 5
            minutes.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0088cc] px-5 py-3 text-sm font-bold text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0077b5]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            <span>Send Confirmation on Telegram</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Return to Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div>
          <p className="text-xs text-slate-500">Order Ref · {orderRef}</p>
          <p className="font-display text-base font-bold text-slate-900">
            {plan.name} ({plan.billingCycleLabel})
          </p>
        </div>
        <p className="font-mono text-xl font-extrabold text-[#059669] tabular-nums">
          {priceInfo.currentFormatted}
        </p>
      </div>

      {values.paymentMethod === 'upi' ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative rounded-2xl border-2 border-slate-800 bg-black p-2.5 shadow-md overflow-hidden">
                <img
                  src={PAYMENT_QR_IMAGE_PATH}
                  alt="PhonePe QR Code - Dheeraj Kiroriwal"
                  className="w-36 h-36 rounded-lg object-contain"
                />
              </div>
              <button
                type="button"
                onClick={handleDownloadQr}
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1E40AF] transition-colors active:scale-95"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download QR Code</span>
              </button>
            </div>

            <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
              <div>
                <p className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-[#1D4ED8]">
                  <QrCode className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>PhonePe / GPay / Paytm QR Code</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Name: <strong className="text-slate-800">{PRIMARY_PAYEE_NAME}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
                <div className="text-left min-w-0">
                  <p className="text-[10px] uppercase font-semibold text-slate-400">UPI ID</p>
                  <p className="font-mono text-xs font-bold text-slate-900 truncate">
                    {upiId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-[#1D4ED8] hover:bg-slate-200 whitespace-nowrap shrink-0 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#059669]" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy UPI
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <a
                  href={upiUri}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] underline underline-offset-4 hover:text-[#1E40AF]"
                >
                  <span>Open UPI App Directly on Mobile</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <p className="text-[11px] text-slate-500 bg-white/80 p-2 rounded-md border border-slate-200/60 leading-tight">
                💡 <strong>Scan from Gallery:</strong> &apos;Download QR Code&apos; dabayein aur PhonePe/GPay scanner me gallery se select karke pay karein.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-5 space-y-3">
          <p className="text-xs font-semibold text-[#0284C7]">
            Pakistan & Direct Telegram Onboarding
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            EasyPaisa, JazzCash, Sadapay ya direct Bank Transfer details ke
            liye niche button click karein. Aapka Order Ref{' '}
            <span className="font-mono font-semibold text-slate-900">
              {orderRef}
            </span>{' '}
            Telegram message me auto-fill ho jayega.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
            <div className="rounded-lg border border-sky-200/80 bg-white p-3">
              <p className="text-slate-500">EasyPaisa / JazzCash</p>
              <p className="mt-0.5 font-mono font-semibold text-slate-900">
                Instant Verified Account
              </p>
            </div>
            <div className="rounded-lg border border-sky-200/80 bg-white p-3">
              <p className="text-slate-500">Activation Time</p>
              <p className="mt-0.5 font-mono font-semibold text-[#059669]">
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
          className="btn-sheen inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#1D4ED8] px-5 py-3 text-sm font-bold text-white brand-cta-shadow transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#1E40AF] active:scale-[0.98]"
        >
          {values.paymentMethod === 'upi'
            ? "I've Paid — Activate My Access"
            : 'Confirm & Proceed to Telegram Onboarding'}
        </button>
        <button
          type="button"
          onClick={onEditDetails}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 py-1.5"
        >
          Edit Name, Number, or Plan
        </button>
      </div>
    </div>
  );
}
