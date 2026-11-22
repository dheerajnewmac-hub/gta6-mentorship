import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateCheckoutForm,
  generateOrderReference,
  buildUpiUri,
  buildWhatsAppUrl,
  buildTelegramUrl,
} from './checkout';

test('rejects empty full name and short phone numbers for India/Pakistan', () => {
  const result = validateCheckoutForm({
    fullName: '',
    countryCode: '+91',
    whatsappNumber: '98765',
    planId: 'lifetime',
    paymentMethod: 'upi',
  });

  assert.equal(result.success, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.whatsappNumber);
});

test('accepts valid Indian, Pakistani, and USDT TRC-20 checkout submissions', () => {
  const india = validateCheckoutForm({
    fullName: 'Aarav Sharma',
    countryCode: '+91',
    whatsappNumber: '98765 43210',
    planId: 'lifetime',
    paymentMethod: 'upi',
  });
  assert.equal(india.success, true);
  assert.equal(india.data?.whatsappNumber, '9876543210');

  const pakistan = validateCheckoutForm({
    fullName: 'Hamza Khan',
    countryCode: '+92',
    whatsappNumber: '3001234567',
    planId: 'monthly',
    paymentMethod: 'whatsapp',
  });
  assert.equal(pakistan.success, true);
  assert.equal(pakistan.data?.countryCode, '+92');

  const usdt = validateCheckoutForm({
    fullName: 'Vikram Singh',
    countryCode: '+1',
    whatsappNumber: '4155550199',
    planId: 'lifetime',
    paymentMethod: 'usdt',
  });
  assert.equal(usdt.success, true);
  assert.equal(usdt.data?.paymentMethod, 'usdt');
});

test('generates deterministic order references, UPI URIs, WhatsApp, and Telegram links including USDT', () => {
  const ref = generateOrderReference('lifetime', '9876543210');
  assert.equal(ref, 'GTA6-VIP-3210');

  const upi = buildUpiUri({
    amountInr: 1999,
    orderRef: ref,
    planName: 'Lifetime VIP Access',
  });
  assert.ok(upi.startsWith('upi://pay?'));
  assert.ok(upi.includes('am=1999'));
  assert.ok(upi.includes('GTA6-VIP-3210'));

  const wa = buildWhatsAppUrl({
    fullName: 'Hamza Khan',
    countryCode: '+92',
    whatsappNumber: '3001234567',
    planId: 'monthly',
    currency: 'PKR',
    paymentMethod: 'whatsapp',
    orderRef: 'GTA6-MTH-4567',
  });
  assert.ok(wa.startsWith('https://wa.me/'));
  assert.ok(wa.includes(encodeURIComponent('Rs. 3,500')));

  const tgUsdt = buildTelegramUrl({
    fullName: 'Aarav Sharma',
    countryCode: '+91',
    whatsappNumber: '9876543210',
    planId: 'lifetime',
    currency: 'INR',
    paymentMethod: 'usdt',
    orderRef: ref,
  });
  assert.ok(tgUsdt.startsWith('https://t.me/'));
  assert.ok(tgUsdt.includes(encodeURIComponent('GTA6-VIP-3210')));
  assert.ok(tgUsdt.includes(encodeURIComponent('USDT (Tron TRC-20 Crypto)')));
});
