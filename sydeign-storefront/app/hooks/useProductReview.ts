import { useState } from 'react';
import { useAuth } from '../data/AuthContext';
import type { ProductReview } from '../data/shopify';

interface SubmitReviewResponse {
  success: boolean;
  review: ProductReview;
  averageRating: number;
  reviewCount: number;
  error?: string;
}

export function useProductReview(
  productId: string,
  initial: { averageRating: number; reviewCount: number; reviews: ProductReview[] },
) {
  const { token, isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState(initial.reviews);
  const [averageRating, setAverageRating] = useState(initial.averageRating);
  const [reviewCount, setReviewCount] = useState(initial.reviewCount);
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async (rating: number, body: string): Promise<boolean> => {
    if (!isLoggedIn || !token) {
      alert('Please sign in to leave a review.');
      return false;
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      alert('Please select a star rating.');
      return false;
    }
    if (!body.trim()) {
      alert('Please write a review.');
      return false;
    }
    if (submitting) return false;

    setSubmitting(true);
    try {
      const response = await fetch('/api/product-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ productId, rating, body: body.trim() }),
      });

      const data = (await response.json()) as SubmitReviewResponse;
      if (!response.ok) throw new Error(data.error || 'Failed to submit review');

      setReviews((prev) => [data.review, ...prev]);
      setAverageRating(data.averageRating);
      setReviewCount(data.reviewCount);
      return true;
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Something went wrong submitting your review. Please try again.');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { reviews, averageRating, reviewCount, submitting, submitReview };
}
