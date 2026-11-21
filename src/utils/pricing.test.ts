import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrencyAmount, getPlanPriceInfo } from './pricing';
import { filterProofItems, countProofByCategory } from './proofFilter';
import { PROOF_ITEMS } from '../data/content';

test('formats INR, PKR, and USD amounts accurately', () => {
  assert.equal(formatCurrencyAmount(999, 'INR'), '₹999');
  assert.equal(formatCurrencyAmount(1999, 'INR'), '₹1,999');
  assert.equal(formatCurrencyAmount(3500, 'PKR'), 'Rs. 3,500');
  assert.equal(formatCurrencyAmount(6499, 'PKR'), 'Rs. 6,499');
  assert.equal(formatCurrencyAmount(24, 'USD'), '$24');
});

test('computes Lifetime VIP savings percentage correctly across currencies', () => {
  const inrLifetime = getPlanPriceInfo('lifetime', 'INR');
  assert.equal(inrLifetime.currentFormatted, '₹1,999');
  assert.equal(inrLifetime.regularFormatted, '₹9,999');
  assert.equal(inrLifetime.savingsPercent, 80);

  const pkrMonthly = getPlanPriceInfo('monthly', 'PKR');
  assert.equal(pkrMonthly.currentFormatted, 'Rs. 3,500');
  assert.equal(pkrMonthly.regularFormatted, null);
  assert.equal(pkrMonthly.savingsPercent, null);
});

test('filters real user Proof Vault items and counts categories deterministically', () => {
  const counts = countProofByCategory(PROOF_ITEMS);
  assert.equal(counts.all, 3);
  assert.equal(counts.payouts, 2);
  assert.equal(counts.analytics, 1);

  const payoutsOnly = filterProofItems(PROOF_ITEMS, 'payouts');
  assert.equal(payoutsOnly.length, 2);
  assert.ok(payoutsOnly.every((item) => item.category === 'payouts'));

  const analyticsOnly = filterProofItems(PROOF_ITEMS, 'analytics');
  assert.equal(analyticsOnly.length, 1);
  assert.ok(analyticsOnly.every((item) => item.category === 'analytics'));
});
