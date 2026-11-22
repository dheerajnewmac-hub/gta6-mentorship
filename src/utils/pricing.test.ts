import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRICING_PLANS,
  formatCurrencyAmount,
  getPlanPriceInfo,
} from './pricing';
import { filterProofItems, countProofByCategory } from './proofFilter';
import { PROOF_ITEMS } from '../data/content';

test('formats INR, PKR, and USD amounts accurately', () => {
  assert.equal(formatCurrencyAmount(999, 'INR'), '₹999');
  assert.equal(formatCurrencyAmount(1999, 'INR'), '₹1,999');
  assert.equal(formatCurrencyAmount(3500, 'PKR'), 'Rs. 3,500');
  assert.equal(formatCurrencyAmount(6500, 'PKR'), 'Rs. 6,500');
  assert.equal(formatCurrencyAmount(24, 'USD'), '$24');
});

test('computes Lifetime VIP savings percentage and 8 deliverables accurately across currencies', () => {
  const inrLifetime = getPlanPriceInfo('lifetime', 'INR');
  assert.equal(inrLifetime.currentFormatted, '₹1,999');
  assert.equal(inrLifetime.regularFormatted, '₹9,999');
  assert.equal(inrLifetime.savingsPercent, 80);

  const pkrLifetime = getPlanPriceInfo('lifetime', 'PKR');
  assert.equal(pkrLifetime.currentFormatted, 'Rs. 6,500');
  assert.equal(pkrLifetime.regularFormatted, 'Rs. 32,500');
  assert.equal(pkrLifetime.savingsPercent, 80);

  const usdLifetime = getPlanPriceInfo('lifetime', 'USD');
  assert.equal(usdLifetime.currentFormatted, '$24');
  assert.equal(usdLifetime.regularFormatted, '$119');
  assert.equal(usdLifetime.savingsPercent, 80);

  assert.equal(PRICING_PLANS.lifetime.features.length, 8);
  assert.equal(
    PRICING_PLANS.lifetime.features[0],
    'Direct High-Paying Paid Campaigns Provided (No Searching Needed)'
  );
  assert.equal(
    PRICING_PLANS.lifetime.features[3],
    '100% Guaranteed Campaign Approval — Start Earning From Day 1'
  );

  const pkrMonthly = getPlanPriceInfo('monthly', 'PKR');
  assert.equal(pkrMonthly.currentFormatted, 'Rs. 3,500');
  assert.equal(pkrMonthly.regularFormatted, null);
  assert.equal(pkrMonthly.savingsPercent, null);
});

test('filters all 9 real user Proof Vault items and counts categories deterministically', () => {
  const counts = countProofByCategory(PROOF_ITEMS);
  assert.equal(counts.all, 9);
  assert.equal(counts.payouts, 6);
  assert.equal(counts.analytics, 3);

  const payoutsOnly = filterProofItems(PROOF_ITEMS, 'payouts');
  assert.equal(payoutsOnly.length, 6);
  assert.ok(payoutsOnly.every((item) => item.category === 'payouts'));

  const analyticsOnly = filterProofItems(PROOF_ITEMS, 'analytics');
  assert.equal(analyticsOnly.length, 3);
  assert.ok(analyticsOnly.every((item) => item.category === 'analytics'));
});
