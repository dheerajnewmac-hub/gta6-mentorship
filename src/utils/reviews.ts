import { PlanId } from './pricing';

export type ReviewFilter = 'all' | 'pro' | 'starter';

export interface StudentReview {
  id: string;
  name: string;
  city: string;
  avatar: string;
  avatarZoom?: boolean;
  planId: PlanId;
  planLabel: string;
  rating: 4 | 5;
  dateLabel: string;
  outcome: string;
  quote: string;
}

export interface RatingSummary {
  averageRating: string;
  totalReviews: number;
  fiveStarCount: number;
  fourStarCount: number;
  fiveStarPercent: number;
  fourStarPercent: number;
}

export function computeRatingSummary(reviews: StudentReview[]): RatingSummary {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return {
      averageRating: '0.0',
      totalReviews: 0,
      fiveStarCount: 0,
      fourStarCount: 0,
      fiveStarPercent: 0,
      fourStarPercent: 0,
    };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;

  return {
    averageRating: (sum / totalReviews).toFixed(1),
    totalReviews,
    fiveStarCount,
    fourStarCount,
    fiveStarPercent: Math.round((fiveStarCount / totalReviews) * 100),
    fourStarPercent: Math.round((fourStarCount / totalReviews) * 100),
  };
}

export function filterStudentReviews(
  reviews: StudentReview[],
  filter: ReviewFilter
): StudentReview[] {
  if (filter === 'all') {
    return reviews;
  }
  return reviews.filter((review) => review.planId === filter);
}
