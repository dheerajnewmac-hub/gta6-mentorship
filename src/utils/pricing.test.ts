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
  assert.equal(formatCurrencyAmount(499, 'INR'), '₹499');
  assert.equal(formatCurrencyAmount(999, 'INR'), '₹999');
  assert.equal(formatCurrencyAmount(1750, 'PKR'), 'Rs. 1,750');
  assert.equal(formatCurrencyAmount(3500, 'PKR'), 'Rs. 3,500');
  assert.equal(formatCurrencyAmount(6, 'USD'), '$6');
  assert.equal(formatCurrencyAmount(12, 'USD'), '$12');
});

test('computes Pro VIP 3-Month and Starter 2-Month savings percentage and deliverables accurately', () => {
  const inrVip = getPlanPriceInfo('vip_3m', 'INR');
  assert.equal(inrVip.currentFormatted, '₹999');
  assert.equal(inrVip.regularFormatted, '₹4,999');
  assert.equal(inrVip.savingsPercent, 80);

  const inrStarter = getPlanPriceInfo('starter_2m', 'INR');
  assert.equal(inrStarter.currentFormatted, '₹499');
  assert.equal(inrStarter.regularFormatted, '₹1,999');
  assert.equal(inrStarter.savingsPercent, 75);

  const pkrVip = getPlanPriceInfo('vip_3m', 'PKR');
  assert.equal(pkrVip.currentFormatted, 'Rs. 3,500');
  assert.equal(pkrVip.regularFormatted, 'Rs. 17,500');
  assert.equal(pkrVip.savingsPercent, 80);

  const usdVip = getPlanPriceInfo('vip_3m', 'USD');
  assert.equal(usdVip.currentFormatted, '$12');
  assert.equal(usdVip.regularFormatted, '$60');
  assert.equal(usdVip.savingsPercent, 80);

  assert.ok(PRICING_PLANS.vip_3m.features.length >= 7);
  assert.ok(
    PRICING_PLANS.vip_3m.features.some((f) => f.includes('FUTURE SOFTWARES'))
  );
  assert.ok(
    PRICING_PLANS.starter_2m.features.some((f) => f.includes('Instagram Automation Software'))
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
