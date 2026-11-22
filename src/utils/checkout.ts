import { z } from 'zod';
import { CurrencyCode, PlanId, PRICING_PLANS, getPlanPriceInfo } from './pricing';

export type CountryCode = '+91' | '+92' | '+1';
export type PaymentMethod = 'upi' | 'usdt' | 'whatsapp';

export const COUNTRY_CODES: { code: CountryCode; label: string; region: string }[] = [
  { code: '+91', label: '+91 (India)', region: 'India' },
  { code: '+92', label: '+92 (Pakistan)', region: 'Pakistan' },
  { code: '+1', label: '+1 (Intl)', region: 'International' },
];

export const checkoutSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Please enter your full name (at least 2 characters).')
      .max(80, 'Name must be under 80 characters.')
      .regex(/^[a-zA-Z\s.'-]+$/, 'Name should contain letters and spaces only.'),
    countryCode: z.enum(['+91', '+92', '+1']),
    whatsappNumber: z
      .string()
      .trim()
      .transform((val) => val.replace(/[\s-]/g, ''))
      .refine((val) => /^\d+$/.test(val), 'Enter digits only (no symbols or spaces).'),
    planId: z.enum(['starter_2m', 'vip_3m']),
    paymentMethod: z.enum(['upi', 'usdt', 'whatsapp']),
  })
  .superRefine((data, ctx) => {
    const digits = data.whatsappNumber;
    if (data.countryCode === '+91' || data.countryCode === '+92') {
      if (digits.length !== 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['whatsappNumber'],
          message: `Enter a valid 10-digit phone number for ${data.countryCode}.`,
        });
      }
    } else if (digits.length < 7 || digits.length > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['whatsappNumber'],
        message: 'Enter a valid phone number (7 to 15 digits).',
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export interface CheckoutValidationResult {
  success: boolean;
  data?: CheckoutFormValues;
  errors: Partial<Record<keyof CheckoutFormValues, string>>;
}

export function validateCheckoutForm(input: {
  fullName: string;
  countryCode: CountryCode;
  whatsappNumber: string;
  planId: PlanId;
  paymentMethod: PaymentMethod;
}): CheckoutValidationResult {
  const parsed = checkoutSchema.safeParse(input);
  if (parsed.success) {
    return { success: true, data: parsed.data, errors: {} };
  }

  const errors: Partial<Record<keyof CheckoutFormValues, string>> = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof CheckoutFormValues | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return { success: false, errors };
}

export function generateOrderReference(planId: PlanId, phoneDigits: string): string {
  const prefix = planId === 'vip_3m' ? 'VIP3M' : 'STR2M';
  const tail = phoneDigits.slice(-4).padStart(4, '0');
  return `PRO-${prefix}-${tail}`;
}

export function getPaymentMethodLabel(paymentMethod: PaymentMethod): string {
  if (paymentMethod === 'upi') return 'UPI / GPay / PhonePe / Paytm';
  if (paymentMethod === 'usdt') return 'USDT (Tron TRC-20 Crypto)';
  return 'EasyPaisa / JazzCash / Direct Transfer';
}

export const PRIMARY_UPI_ID = 'dheerajkiroriwal@ybl';
export const PRIMARY_PAYEE_NAME = 'Dheeraj Kiroriwal';
export const PRIMARY_TELEGRAM_USERNAME = 'Eliteclippers1';

export function buildUpiUri(params: {
  amountInr: number;
  orderRef: string;
  planName: string;
}): string {
  const upiId = PRIMARY_UPI_ID;
  const payeeName = PRIMARY_PAYEE_NAME;
  const note = `${params.planName} ${params.orderRef}`;
  const query = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    am: String(params.amountInr),
    cu: 'INR',
    tn: note,
  });
  return `upi://pay?${query.toString()}`;
}

export function buildWhatsAppUrl(params: {
  fullName: string;
  countryCode: CountryCode;
  whatsappNumber: string;
  planId: PlanId;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  orderRef: string;
}): string {
  const mentorWhatsApp = '919820145670';
  const plan = PRICING_PLANS[params.planId];
  const price = getPlanPriceInfo(params.planId, params.currency);
  const methodText = getPaymentMethodLabel(params.paymentMethod);

  const message = [
    `Hi Mentor! I want to enroll in GTA 6 Clipping Mentorship.`,
    `Order Ref: ${params.orderRef}`,
    `Name: ${params.fullName}`,
    `Phone: ${params.countryCode} ${params.whatsappNumber}`,
    `Plan: ${plan.name} (${price.currentFormatted} ${plan.billingCycleLabel})`,
    `Payment Mode: ${methodText}`,
  ].join('\n');

  return `https://wa.me/${mentorWhatsApp}?text=${encodeURIComponent(message)}`;
}

export function buildTelegramUrl(params: {
  fullName: string;
  countryCode: CountryCode;
  whatsappNumber: string;
  planId: PlanId;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  orderRef: string;
}): string {
  const mentorTelegramUsername = PRIMARY_TELEGRAM_USERNAME;
  const plan = PRICING_PLANS[params.planId];
  const price = getPlanPriceInfo(params.planId, params.currency);
  const methodText = getPaymentMethodLabel(params.paymentMethod);

  const message = [
    `Hi Mentor! Payment done for GTA 6 Clipping Mentorship.`,
    `Order Ref: ${params.orderRef}`,
    `Name: ${params.fullName}`,
    `Phone: ${params.countryCode} ${params.whatsappNumber}`,
    `Plan: ${plan.name} (${price.currentFormatted} ${plan.billingCycleLabel})`,
    `Payment Mode: ${methodText}`,
    `Maine payment kar diya hai, yahan screenshot bhej raha hoon!`,
  ].join('\n');

  return `https://t.me/${mentorTelegramUsername}?text=${encodeURIComponent(message)}`;
}
