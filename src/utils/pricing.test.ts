import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRICING_PLANS,
  formatCurrencyAmount,
  getPlanPriceInfo,
} from './pricing';
import { filterProofItems, countProofByCategory } from './proofFilter';
import { PROOF_ITEMS } from '../data/content';

test('formats INR, PKR, and USD amounts accurately for ₹499 and ₹999 monthly plans', () => {
  assert.equal(formatCurrencyAmount(499, 'INR'), '₹499');
  assert.equal(formatCurrencyAmount(999, 'INR'), '₹999');
  assert.equal(formatCurrencyAmount(1650, 'PKR'), 'Rs. 1,650');
  assert.equal(formatCurrencyAmount(3300, 'PKR'), 'Rs. 3,300');
  assert.equal(formatCurrencyAmount(6, 'USD'), '$6');
  assert.equal(formatCurrencyAmount(12, 'USD'), '$12');
});

test('computes Starter (1+1 Mo) and Pro All-Software (1+2 Mo) pricing and deliverables accurately', () => {
  const starterInr = getPlanPriceInfo('starter', 'INR');
  assert.equal(starterInr.currentFormatted, '₹499');
  assert.equal(starterInr.regularFormatted, '₹998');
  assert.equal(starterInr.savingsPercent, 50);

  const proInr = getPlanPriceInfo('pro', 'INR');
  assert.equal(proInr.currentFormatted, '₹999');
  assert.equal(proInr.regularFormatted, '₹2,997');
  assert.equal(proInr.savingsPercent, 67);

  const proPkr = getPlanPriceInfo('pro', 'PKR');
  assert.equal(proPkr.currentFormatted, 'Rs. 3,300');

  const proUsd = getPlanPriceInfo('pro', 'USD');
  assert.equal(proUsd.currentFormatted, '$12');

  // Verify no Lifetime access plan exists and required features are transferred properly
  assert.equal(Object.keys(PRICING_PLANS).includes('lifetime'), false);
  assert.equal(PRICING_PLANS.starter.features.length, 8);
  assert.equal(PRICING_PLANS.pro.features.length, 10);
  assert.ok(
    PRICING_PLANS.pro.features.some((f) =>
      f.includes('Future Me Aane Wale Sabhi Softwares FREE')
    )
  );
  assert.ok(
    PRICING_PLANS.pro.features.some((f) =>
      f.includes('100% Guaranteed Campaign Approval')
    )
  );
  assert.ok(
    PRICING_PLANS.starter.features.some((f) =>
      f.includes('Complete GTA 6 Clipping Video Modules')
    )
  );
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
