import assert from 'node:assert/strict';
import test from 'node:test';
import {
  StudentReview,
  computeRatingSummary,
  filterStudentReviews,
} from './reviews.ts';

const SAMPLE_REVIEWS: StudentReview[] = [
  {
    id: 'r1',
    name: 'Rahul Verma',
    city: 'Jaipur',
    avatar: '/a.jpg',
    planId: 'pro',
    planLabel: 'Pro Plan (₹999)',
    rating: 5,
    dateLabel: '2 days ago',
    outcome: '₹24,800 Earned',
    quote: 'Great mentorship!',
  },
  {
    id: 'r2',
    name: 'Priya Singh',
    city: 'Delhi',
    avatar: '/b.jpg',
    planId: 'starter',
    planLabel: 'Starter Plan (₹499)',
    rating: 5,
    dateLabel: '5 days ago',
    outcome: 'First $118 Payout',
    quote: 'Super practical.',
  },
  {
    id: 'r3',
    name: 'Danish Khan',
    city: 'Lahore',
    avatar: '/c.jpg',
    planId: 'pro',
    planLabel: 'Pro Plan (₹999)',
    rating: 4,
    dateLabel: '1 week ago',
    outcome: '$210 USDT Received',
    quote: 'Solid direct campaigns.',
  },
];

test('computeRatingSummary computes accurate average and star breakdown', () => {
  const summary = computeRatingSummary(SAMPLE_REVIEWS);
  assert.equal(summary.totalReviews, 3);
  assert.equal(summary.averageRating, '4.7');
  assert.equal(summary.fiveStarCount, 2);
  assert.equal(summary.fourStarCount, 1);
  assert.equal(summary.fiveStarPercent, 67);
  assert.equal(summary.fourStarPercent, 33);
});

test('filterStudentReviews filters deterministically by plan tier', () => {
  assert.equal(filterStudentReviews(SAMPLE_REVIEWS, 'all').length, 3);
  assert.equal(filterStudentReviews(SAMPLE_REVIEWS, 'pro').length, 2);
  assert.equal(filterStudentReviews(SAMPLE_REVIEWS, 'starter').length, 1);
});
