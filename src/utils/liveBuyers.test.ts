import test from 'node:test';
import assert from 'node:assert/strict';
import {
  LIVE_BUYERS,
  LIVE_BUYER_TIMING,
  formatLiveBuyerNotification,
  getBuyerInitials,
  getNextBuyerIndex,
  getNextPopupDelayMs,
} from './liveBuyers';

test('first live buyer features Ashok purchasing Pro All-Software (1+2 Mo) at 999 INR', () => {
  const first = LIVE_BUYERS[0];
  assert.equal(first.name, 'Ashok');
  assert.equal(first.planId, 'pro');

  const inr = formatLiveBuyerNotification(first, 'INR');
  assert.equal(inr.planName, 'Pro All-Software (1+2 Mo)');
  assert.equal(inr.priceFormatted, '₹999');
  assert.equal(inr.initials, 'AS');
  assert.equal(inr.isPro, true);

  const pkr = formatLiveBuyerNotification(first, 'PKR');
  assert.equal(pkr.priceFormatted, 'Rs. 3,300');

  const usd = formatLiveBuyerNotification(first, 'USD');
  assert.equal(usd.priceFormatted, '$12');
});

test('all live buyer entries have valid metadata and initials', () => {
  assert.ok(LIVE_BUYERS.length >= 6);
  for (const buyer of LIVE_BUYERS) {
    const formatted = formatLiveBuyerNotification(buyer, 'INR');
    assert.ok(formatted.name.length > 0);
    assert.ok(formatted.city.length > 0);
    assert.equal(formatted.initials.length, 2);
    assert.ok(formatted.priceFormatted.startsWith('₹'));
  }
  assert.equal(getBuyerInitials('Rohan Sharma'), 'RS');
  assert.equal(getBuyerInitials('Ashok'), 'AS');
});

test('getNextBuyerIndex cycles circularly without overflowing', () => {
  assert.equal(getNextBuyerIndex(0, 10), 1);
  assert.equal(getNextBuyerIndex(8, 10), 9);
  assert.equal(getNextBuyerIndex(9, 10), 0);
  assert.equal(getNextBuyerIndex(0, 0), 0);
});

test('popup timing averages 7-8s gap and 10-15s full return cadence', () => {
  const gaps = LIVE_BUYER_TIMING.gapScheduleMs.map((_, idx) =>
    getNextPopupDelayMs(idx)
  );
  const avgGap = gaps.reduce((sum, ms) => sum + ms, 0) / gaps.length;
  assert.ok(avgGap >= 7000 && avgGap <= 8000, `Expected 7-8s avg gap, got ${avgGap}`);

  for (const gap of gaps) {
    const totalCycle = LIVE_BUYER_TIMING.visibleDurationMs + gap;
    assert.ok(
      totalCycle >= 10000 && totalCycle <= 15000,
      `Expected 10-15s cycle, got ${totalCycle}`
    );
  }
});
