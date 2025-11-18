import { defineEventHandler, getRouterParam } from 'h3';
import { connectDB } from '../../../../utils/db';
import { Review } from '../../../../models/Review';
import { Shop } from '../../../../models/Shop';

export default defineEventHandler(async (event) => {
  await connectDB();

  const reviewId = getRouterParam(event, 'reviewId');

  if (!reviewId) {
    throw new Error('Review ID is required');
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }

  // Delete review
  await Review.findByIdAndDelete(reviewId);

  // Update shop statistics
  const shop = await Shop.findById(review.shopId);
  if (shop) {
    shop.totalReviews = Math.max(0, shop.totalReviews - 1);
    if (review.type === 'positive') {
      shop.positiveReviews = Math.max(0, shop.positiveReviews - 1);
    } else {
      shop.negativeReviews = Math.max(0, shop.negativeReviews - 1);
    }
    
    // Recalculate trust score
    const positiveRatio = shop.totalReviews > 0 
      ? shop.positiveReviews / shop.totalReviews 
      : 0.5;
    shop.trustScore = Math.round(positiveRatio * 100);
    
    await shop.save();
  }

  return { success: true };
});
